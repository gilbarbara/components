import { ChangeEvent, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { removeAccents, request } from '@gilbarbara/helpers';
import { useSetState } from '@gilbarbara/hooks';
import { StringOrNull } from '@gilbarbara/types';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, fn, within } from '@storybook/test';

import {
  Anchor,
  Avatar,
  Box,
  Button,
  ButtonUnstyled,
  Chip,
  Dialog,
  Dropdown,
  FormElementWrapper,
  H1,
  Icon,
  Input,
  NonIdealState,
  Spacer,
  Text,
} from '~';

import users from '~/stories/__fixtures__/users.json';
import {
  addChromaticModes,
  colorProps,
  disableControl,
  flexItemProps,
  hideProps,
  layoutProps,
  radiusProps,
  spacingProps,
} from '~/stories/__helpers__';

import { ColorVariantTones, DropdownOption } from '~/types';

import { DataTable, defaultProps } from './DataTable';
import { DataTableColumn, DataTableProps, DataTableRow } from './useDataTable';

type Story = StoryObj<typeof DataTable>;

export default {
  title: 'Components/DataTable',
  // category: 'Display',
  component: DataTable,
  args: {
    ...defaultProps,
    maxWidth: 1024,
    minWidth: '100%',
    responsive: true,
  },
  argTypes: {
    ...hideProps(),
    ...colorProps(['accent', 'bg']),
    ...flexItemProps(),
    ...layoutProps(),
    ...radiusProps(),
    ...spacingProps(),
    columns: disableControl(),
    data: disableControl(),
    defaultSortColumn: disableControl(),
    noResults: disableControl(),
    scrollElement: disableControl(),
  },
  parameters: {
    ...addChromaticModes('desktop_light', 'desktop_dark', 'mobile_light'),
    layout: 'fullscreen',
    minHeight: 300,
    minWidth: '100%',
    paddingDocs: 'md',
  },
} satisfies Meta<typeof DataTable>;

type WrapperColumns = 'avatar' | 'email' | 'team' | 'status' | 'action';

type WrapperState = typeof wrapperState;

interface Props extends SharedState {
  accent?: ColorVariantTones;
  setState: (state: Partial<SharedState>) => void;
}

interface SharedState {
  // eslint-disable-next-line react/no-unused-prop-types
  search: string;
  status: string;
  team: string;
}

const wrapperState = {
  loading: false,
  search: '',
  searchValue: '',
  showDialog: false,
  team: '',
  status: '',
};

const teams = users.reduce((acc, user) => {
  if (!acc.some(d => user.team === d.label)) {
    acc.push({
      label: user.team,
      value: user.team,
    });
  }

  return acc;
}, [] as DropdownOption[]);

const statuses = [
  { label: 'Invites', value: 'invites' },
  { label: 'Users', value: 'users' },
];

const UserHeader = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { accent, setState, status, team } = props;
  const [searchValue, setSearchValue] = useState('');
  const debounceTimeout = useRef<number>();

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    clearTimeout(debounceTimeout.current);

    setSearchValue(value);

    debounceTimeout.current = window.setTimeout(() => {
      setState({ search: value });
    }, 750);
  };

  const handleChangeStatus = (options: DropdownOption[]) => {
    const [selected] = options;
    const nextStatus = selected ? (selected.value as string) : '';

    setState({ status: nextStatus });
  };

  const handleChangeTeam = (options: DropdownOption[]) => {
    const [selected] = options;
    const nextTeam = selected ? (selected.value as string) : '';

    setState({ team: nextTeam });
  };

  return (
    <Spacer ref={ref} data-testid="UserHeader" mb="lg">
      <FormElementWrapper data-flex="1" startContent={<Icon name="search" size={24} />}>
        <Input
          accent={accent}
          name="name"
          onChange={handleChangeInput}
          placeholder="Search by username"
          prefixSpacing
          value={searchValue}
        />
      </FormElementWrapper>
      <Dropdown
        accent={accent}
        items={teams}
        onChange={handleChangeTeam}
        placeholder="Team"
        showClearButton={!!team}
        values={teams.filter(d => d.value === team)}
        width={180}
      />
      <Dropdown
        accent={accent}
        items={statuses}
        onChange={handleChangeStatus}
        placeholder="Status"
        showClearButton={!!status}
        values={statuses.filter(d => d.value === status)}
        width={180}
      />
    </Spacer>
  );
});

function DataTableWrapper(props: DataTableProps) {
  const { accent } = props;
  const [{ loading, search, showDialog, status, team }, setState] =
    useSetState<WrapperState>(wrapperState);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleClickReset = useCallback(() => {
    setState({ search: '', searchValue: '', status: '' });
  }, [setState]);

  const handleClickDelete = useCallback(() => {
    setState({ showDialog: true });
  }, [setState]);

  const handleClickCancel = () => {
    setState({ showDialog: false });
  };

  const handleClickConfirmation = () => {
    setState({ showDialog: false });
  };

  const columns = useMemo(() => {
    const items: DataTableColumn<WrapperColumns>[] = [
      { key: 'avatar', title: '', size: 64, disableSort: true },
      { key: 'email', title: 'Name / E-mail', size: 250 },
      { key: 'team', title: 'Team', min: 150 },
      { key: 'status', title: 'Status', min: 180 },
      {
        key: 'action',
        disableSort: true,
        size: 48,
        title: null,
      },
    ];

    return items;
  }, []);

  const data = useMemo(() => {
    return users
      .filter(d => {
        const nameOrEmail = removeAccents(d.name || d.email).toLowerCase();

        const searchFilter = search
          ? nameOrEmail.includes(removeAccents(search).toLowerCase())
          : true;
        let statusFilter = true;
        const teamFilter = team ? d.team === team : true;

        if (status) {
          statusFilter = status === 'invites' ? !!d.code : !!d.id;
        }

        return searchFilter && statusFilter && teamFilter;
      })
      .map(user => {
        const row: DataTableRow<WrapperColumns> = {
          id: user.id || user.code,
          avatar: <Avatar image={user.avatar} name={user.name} />,
          email: (
            <>
              <Text color={!user.name ? 'gray' : undefined}>{user.name || 'Unnamed User'}</Text>
              <Anchor color={accent} href={`mailto:${user.email}`} size="sm">
                {user.email}
              </Anchor>
            </>
          ),
          team: <Text size="sm">{user.team || '--'}</Text>,
          status: (
            <Chip
              bg={user.code ? 'blue' : 'green'}
              endContent={user.code ? <Icon name="clock" /> : <Icon name="check" />}
              variant="bordered"
            >
              {user.code ? 'Invite sent' : 'Active'}
            </Chip>
          ),
          action: (
            <ButtonUnstyled data-code={user.code} data-id={user.id} onClick={handleClickDelete}>
              <Icon name="trash" />
            </ButtonUnstyled>
          ),
        };

        return row;
      });
  }, [accent, handleClickDelete, search, status, team]);

  const noResults = useMemo(() => {
    return (
      <NonIdealState icon="search" size="sm" type="no-results">
        <Button onClick={handleClickReset} size="sm">
          Reset filters
        </Button>
      </NonIdealState>
    );
  }, [handleClickReset]);

  return (
    <Box width="100%">
      <H1>Members</H1>
      <UserHeader
        ref={headerRef}
        accent={accent}
        search={search}
        setState={setState}
        status={status}
        team={team}
      />
      <Box data-testid="DataTableWrapper">
        <DataTable<WrapperColumns>
          {...props}
          columns={columns}
          data={data}
          defaultSortColumn="email"
          disableScroll
          loading={loading}
          noResults={noResults}
          scrollElement={headerRef.current}
        />
      </Box>
      <Dialog
        content="Do you want to remove this user?"
        isOpen={showDialog}
        onClickCancel={handleClickCancel}
        onClickConfirmation={handleClickConfirmation}
        title="Remove user"
      />
    </Box>
  );
}

export const Basic: Story = {
  argTypes: {
    columns: disableControl(),
    data: disableControl(),
    defaultSortColumn: disableControl(),
    noResults: disableControl(),
    scrollElement: disableControl(),
  },
  render: props => <DataTableWrapper {...props} />,
};

type ExternalColumns = 'name' | 'description' | 'keywords' | 'version' | 'links';

interface Entry {
  package: Package;
  score: {
    detail: {
      maintenance: number;
      popularity: number;
      quality: number;
    };
    final: number;
  };
  searchScore: number;
}

interface ExternalState {
  currentPage: number;
  loading: boolean;
  results: Array<Package>;
  selected: StringOrNull;
  showModal: boolean;
  totalPages: number;
}

interface Package {
  author: {
    email: string;
    name: string;
    username: string;
  };
  date: string;
  description: string;
  keywords: string[];
  links: {
    bugs: string;
    homepage: string;
    npm: string;
    repository: string;
  };
  maintainers: Array<{
    email: string;
    username: string;
  }>;
  name: string;
  publisher: Array<{
    email: string;
    username: string;
  }>;
  scope: string;
  version: string;
}

interface Response {
  objects: Entry[];
  time: string;
  total: number;
}

const externalState: ExternalState = {
  currentPage: 1,
  loading: false,
  results: [],
  selected: null,
  showModal: false,
  totalPages: 0,
};

const apiURL = 'https://registry.npmjs.org/-/v1/search?text=author:gilbarbara&size=10';

function DataTableExternal(props: DataTableProps) {
  const { accent, defaultSortColumn, maxRows = 10 } = props;
  const [{ currentPage, loading, results, totalPages }, setState] = useSetState(externalState);

  const getPeople = useCallback(
    async (url = apiURL) => {
      setState({ loading: true });
      const packages = await request<Response>(url, {
        headers: {
          'Content-Type': 'text/plain',
        },
      });

      setState({
        totalPages: Math.ceil(packages.total / 10),
        loading: false,
        results: packages.objects.map(d => d.package),
      });
    },
    [setState],
  );

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  const handleClickPage = async (page: number) => {
    setState({ currentPage: page });
    await getPeople(`${apiURL}&from=${(page - 1) * maxRows}`);
  };

  const columns = useMemo(() => {
    const items: DataTableColumn<ExternalColumns>[] = [
      { key: 'name', title: 'Name', min: 250 },
      { key: 'version', title: 'Version', size: 90 },
      { key: 'description', disableSort: true, min: 140, title: 'Description' },
      { key: 'keywords', title: 'Keywords', min: 100, disableSort: true },
      { key: 'links', title: 'Links', size: 120, disableSort: true },
    ];

    return items;
  }, []);

  const data = useMemo(
    () =>
      results.map(package_ => {
        const row: DataTableRow<ExternalColumns> = {
          id: package_.name,
          name: package_.name,
          description: package_.description,
          keywords: package_.keywords ? package_.keywords.join(', ') : '--',
          version: {
            label: <Chip bg={accent}>{package_.version}</Chip>,
            value: package_.version,
          },
          links: (
            <>
              <Anchor color={accent} href={package_.links.homepage} target="_blank">
                Homepage
              </Anchor>
              <Anchor color={accent} href={package_.links.npm} target="_blank">
                NPM
              </Anchor>
            </>
          ),
        };

        return row;
      }),
    [accent, results],
  );

  return (
    <Box width="100%">
      <H1>NPM Packages</H1>
      <DataTable<ExternalColumns>
        {...props}
        columns={columns}
        data={data}
        defaultSortColumn={defaultSortColumn as ExternalColumns | undefined}
        disableScroll
        loading={loading}
        onClickPage={handleClickPage}
        remote={{
          currentPage,
          totalPages,
          useInternalSorting: true,
        }}
      />
    </Box>
  );
}

export const External: Story = {
  args: {
    clean: true,
    stickyHeader: true,
  },
  render: props => <DataTableExternal {...props} />,
};

export const Tests: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    onClickPage: fn(),
    onClickSort: fn(),
  },
  render: props => <DataTableWrapper {...props} />,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByTestId('DataTable');
    let [firstRow] = canvas.getAllByTestId('DataTableBodyRow');

    expect(within(firstRow).getByText('Addie Huels')).toBeInTheDocument();

    if (canvas.queryByLabelText('Sort menu')) {
      await fireEvent.click(canvas.getByLabelText('Open sort'));
      await fireEvent.click(canvas.getByLabelText('Sort by Name / E-mail - desc'));
    } else {
      await fireEvent.click(canvas.getByText('Name / E-mail'));
    }

    await expect(args.onClickSort).toHaveBeenCalledTimes(1);

    [firstRow] = canvas.getAllByTestId('DataTableBodyRow');
    expect(within(firstRow).getByText('Zoey Stark')).toBeInTheDocument();

    await fireEvent.click(canvas.getByText('2'));
    await expect(args.onClickPage).toHaveBeenCalledTimes(1);

    [firstRow] = canvas.getAllByTestId('DataTableBodyRow');
    expect(within(firstRow).getByText('Ruth Gislason')).toBeInTheDocument();
  },
};
