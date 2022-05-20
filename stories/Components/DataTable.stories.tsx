import { ChangeEvent, forwardRef, ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import { useSetState } from 'react-use';
import { removeAccents } from '@gilbarbara/helpers';
import { ComponentMeta } from '@storybook/react';
import {
  Anchor,
  Box,
  Button,
  ButtonBase,
  ComponentWrapper,
  Dialog,
  Dropdown,
  H1,
  Icon,
  Input,
  NonIdealState,
  Spacer,
  Tag,
  Text,
} from 'src';
import { DataTable, DataTableColumn } from 'src/DataTable';

import { DropdownItem } from 'src/types';

import { members } from '../__assets__/data';
import { hideNoControlsWarning, hideProps, layoutProps, marginProps } from '../__helpers__';

export default {
  title: 'Components/DataTable',
  component: DataTable,
  argTypes: {
    ...hideProps(),
    ...layoutProps(),
    ...marginProps(),
  },
  parameters: {
    controls: hideNoControlsWarning(),
  },
} as ComponentMeta<typeof DataTable>;

type Columns = 'email' | 'team' | 'status' | 'action';

type BaseState = typeof baseState;

interface SharedState {
  // eslint-disable-next-line react/no-unused-prop-types
  search: string;
  status: string;
  team: string;
}

interface Props extends SharedState {
  setState: (state: Partial<SharedState>) => void;
}

const baseState = {
  loading: false,
  search: '',
  searchValue: '',
  showDialog: false,
  team: '',
  status: '',
};

const teams = members.reduce((acc, member) => {
  if (member.team && !acc.some(d => member.team === d.label)) {
    acc.push({
      label: member.team,
      value: member.team,
    });
  }

  return acc;
}, [] as DropdownItem[]);

const statuses = [
  { label: 'Invites', value: 'invites' },
  { label: 'Users', value: 'users' },
];

const TalentsHeader = forwardRef<HTMLDivElement, Props>((props, ref): JSX.Element => {
  const { setState, status, team } = props;
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

  const handleChangeStatus = (options: DropdownItem[]) => {
    const [selected] = options;
    const nextStatus = selected ? (selected.value as string) : '';

    setState({ status: nextStatus });
  };

  const handleChangeTeam = (options: DropdownItem[]) => {
    const [selected] = options;
    const nextTeam = selected ? (selected.value as string) : '';

    setState({ team: nextTeam });
  };

  return (
    <Spacer ref={ref} data-component-name="JobTalentsHeader" mb="lg">
      <ComponentWrapper prefix={<Icon name="search" size={24} />}>
        <Input
          name="name"
          onChange={handleChangeInput}
          placeholder="Search by username"
          prefixSpacing
          value={searchValue}
        />
      </ComponentWrapper>
      <Dropdown
        clearable={!!team}
        items={teams}
        onChange={handleChangeTeam}
        placeholder="Team"
        values={teams.filter(d => d.value === team)}
        width={180}
      />
      <Dropdown
        clearable={!!status}
        items={statuses}
        onChange={handleChangeStatus}
        placeholder="Status"
        values={statuses.filter(d => d.value === status)}
        width={180}
      />
    </Spacer>
  );
});

export const Basic = () => {
  const [{ loading, search, showDialog, status, team }, setState] =
    useSetState<BaseState>(baseState);
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

  const columns = useMemo<DataTableColumn<Columns>[]>(() => {
    return [
      { key: 'email', title: 'Nome / E-mail', size: 250 },
      { key: 'team', title: 'Team', min: 150 },
      { key: 'status', title: 'Status', min: 180 },
      {
        key: 'action',
        disableSort: true,
        size: 48,
        title: null,
      },
    ];
  }, []);

  const data = useMemo<Record<Columns, ReactNode>[]>(() => {
    return members
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
      .map(member => ({
        id: member.id,
        email: (
          <>
            <Text variant={!member.name ? 'gray' : undefined}>{member.name || 'Unnamed User'}</Text>
            <Anchor href={`mailto:${member.email}`} size="mid">
              {member.email}
            </Anchor>
          </>
        ),
        team: <Text size="mid">{member.team || '--'}</Text>,

        status: (
          <Tag
            iconAfter={member.id ? 'check' : 'sand-clock'}
            invert
            variant={member.id ? 'green' : 'blue'}
          >
            {member.id ? 'Active' : 'Invite sent'}
          </Tag>
        ),
        action: (
          <ButtonBase data-code={member.code} data-id={member.id} onClick={handleClickDelete}>
            <Icon name="trash" />
          </ButtonBase>
        ),
      }));
  }, [handleClickDelete, search, status, team]);

  const noResults = useMemo(() => {
    if (!members.length) {
      return (
        <NonIdealState icon="info" small title="Você ainda não adicionou candidatos na vaga" />
      );
    }

    return (
      <NonIdealState icon="search" small title="Sua busca não retornou resultados!">
        <Button onClick={handleClickReset} size="sm">
          Reset filters
        </Button>
      </NonIdealState>
    );
  }, [handleClickReset]);

  return (
    <Box mt="xl">
      <H1>Members</H1>
      <TalentsHeader
        ref={headerRef}
        search={search}
        setState={setState}
        status={status}
        team={team}
      />
      <Box data-component-name="DataTableWrapper" minWidth={768}>
        <DataTable
          columns={columns}
          data={data}
          defaultColumn="name"
          disableScroll
          loading={loading}
          noResults={noResults}
          scrollElement={headerRef.current}
        />
      </Box>
      <Dialog
        content="Do you want to remove this user?"
        isActive={showDialog}
        onClickCancel={handleClickCancel}
        onClickConfirmation={handleClickConfirmation}
        title="Remove user"
      />
    </Box>
  );
};
