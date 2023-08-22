import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/helpers';

import { rotate } from '~/modules/animations';
import { getTheme } from '~/modules/helpers';
import { getStyledOptions } from '~/modules/system';

import { LoaderProps } from './types';

type LoaderPrideProps = Omit<LoaderProps, 'color'>;

const StyledLoaderPride = styled(
  'div',
  getStyledOptions(),
)<LoaderPrideProps>(props => {
  const { block, size = 32 } = props;
  const { spacing } = getTheme(props);

  return css`
    display: ${block ? 'flex' : 'inline-flex'};
    height: ${px(size)};
    margin: ${block ? spacing.lg : 0} auto;
    position: relative;
    width: ${px(size)};

    #LoaderPrideGroup {
      animation: ${rotate} 1s infinite linear;
      transform-origin: 10px 10px;
    }
  `;
});

export default function LoaderPride(props: LoaderPrideProps) {
  const { size } = props;

  return (
    <StyledLoaderPride data-component-name="LoaderPride" {...props}>
      <svg
        height={size}
        version="1.1"
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Pride</title>
        <defs>
          <linearGradient
            id="linearGradient-vitwvdhq8u-1"
            x1="0%"
            x2="100%"
            y1="44.721611%"
            y2="55.278389%"
          >
            <stop offset="0%" stopColor="#FFCE00" />
            <stop offset="100%" stopColor="#FB9600" />
          </linearGradient>
          <linearGradient
            id="linearGradient-vitwvdhq8u-2"
            x1="23.6069814%"
            x2="76.3930186%"
            y1="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FB9600" />
            <stop offset="100%" stopColor="#E25335" />
          </linearGradient>
          <linearGradient id="linearGradient-vitwvdhq8u-3" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#E25335" />
            <stop offset="100%" stopColor="#DE349E" />
          </linearGradient>
          <linearGradient
            id="linearGradient-vitwvdhq8u-4"
            x1="76.3930186%"
            x2="23.6069814%"
            y1="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#DE349E" />
            <stop offset="100%" stopColor="#BF2FDC" />
          </linearGradient>
          <linearGradient
            id="linearGradient-vitwvdhq8u-5"
            x1="100%"
            x2="7.47355734e-15%"
            y1="44.721611%"
            y2="55.278389%"
          >
            <stop offset="0%" stopColor="#BF2FDC" />
            <stop offset="100%" stopColor="#5D33D5" />
          </linearGradient>
          <linearGradient
            id="linearGradient-vitwvdhq8u-6"
            x1="100%"
            x2="2.41767548e-14%"
            y1="55.278389%"
            y2="44.721611%"
          >
            <stop offset="0%" stopColor="#5D33D5" />
            <stop offset="100%" stopColor="#2B7CD7" />
          </linearGradient>
          <linearGradient
            id="linearGradient-vitwvdhq8u-7"
            x1="76.3930186%"
            x2="23.6069814%"
            y1="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#2B7CD7" />
            <stop offset="100%" stopColor="#33C3DD" />
          </linearGradient>
          <linearGradient
            id="linearGradient-vitwvdhq8u-8"
            x1="100%"
            x2="100%"
            y1="100%"
            y2="-5.74835557e-15%"
          >
            <stop offset="0%" stopColor="#33C3DD" />
            <stop offset="100%" stopColor="#32D9A1" />
          </linearGradient>
          <linearGradient
            id="linearGradient-vitwvdhq8u-9"
            x1="23.6069814%"
            x2="76.3930186%"
            y1="100%"
            y2="5.68434189e-14%"
          >
            <stop offset="0%" stopColor="#32D9A1" />
            <stop offset="100%" stopColor="#3FCB2A" />
          </linearGradient>
          <linearGradient
            id="linearGradient-vitwvdhq8u-10"
            x1="0%"
            x2="100%"
            y1="55.278389%"
            y2="44.721611%"
          >
            <stop offset="0%" stopColor="#3FCB2A" />
            <stop offset="100%" stopColor="#FFCE00" />
          </linearGradient>
        </defs>
        <g transform="translate(2.000000, 2.000000)">
          <g id="LoaderPrideGroup" strokeWidth="4">
            <path
              d="M10,3.70074342e-16 C12.111796,3.70074342e-16 14.1693886,0.668517671 15.8778738,1.90979148"
              stroke="url(#linearGradient-vitwvdhq8u-1)"
            />
            <path
              d="M15.8778738,1.90979148 C17.5863375,3.15106838 18.8579841,4.9013458 19.5105576,6.90976918"
              stroke="url(#linearGradient-vitwvdhq8u-2)"
            />
            <path
              d="M19.5105576,6.90976918 C20.1631475,8.91821275 20.1631475,11.081698 19.5105576,13.0901416"
              stroke="url(#linearGradient-vitwvdhq8u-3)"
            />
            <path
              d="M19.5105576,13.0901416 C18.8579841,15.098565 17.5863375,16.8488424 15.8778738,18.0901193"
              stroke="url(#linearGradient-vitwvdhq8u-4)"
            />
            <path
              d="M15.8778738,18.0901193 C14.1693886,19.3313931 12.111796,19.9999108 10,19.9999108"
              stroke="url(#linearGradient-vitwvdhq8u-5)"
            />
            <path
              d="M10,19.9999108 C7.888204,19.9999108 5.83061142,19.3313931 4.12212622,18.0901193"
              stroke="url(#linearGradient-vitwvdhq8u-6)"
            />
            <path
              d="M4.12212622,18.0901193 C2.41366248,16.8488424 1.14201593,15.098565 0.48944242,13.0901416"
              stroke="url(#linearGradient-vitwvdhq8u-7)"
            />
            <path
              d="M0.48944242,13.0901416 C-0.163147473,11.081698 -0.163147473,8.91821275 0.48944242,6.90976918"
              stroke="url(#linearGradient-vitwvdhq8u-8)"
            />
            <path
              d="M0.48944242,6.90976918 C1.14201593,4.9013458 2.41366248,3.15106838 4.12212622,1.90979148"
              stroke="url(#linearGradient-vitwvdhq8u-9)"
            />
            <path
              d="M4.12212622,1.90979148 C5.83061142,0.668517671 7.888204,3.70074342e-16 10,3.70074342e-16"
              stroke="url(#linearGradient-vitwvdhq8u-10)"
            />
          </g>
        </g>
      </svg>
    </StyledLoaderPride>
  );
}

LoaderPride.displayName = 'LoaderPride';
