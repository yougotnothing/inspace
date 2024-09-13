import styled from 'styled-components';
import { LunarPhase } from 'types/lunar-phase';
import moonImg from '../assets/moon.jpg';

interface WrapperProps {
  $moonPhase: LunarPhase;
  $hemisphere: 'Northern' | 'Southern';
}

const Image = styled('img')<{ $moonPhase: LunarPhase }>`
  height: 500px;
  width: 500px;
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
`;

const Wrapper = styled('div')<WrapperProps>`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 500px;
  width: 500px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  background-blend-mode: lighten;

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    right: ${({ $hemisphere, $moonPhase }) => {
      switch ($moonPhase) {
        case 'New':
          return '0';
        case 'Full':
          return '-15%';
        case 'Waxing Crescent':
          return $hemisphere === 'Northern' ? '-15%' : '15%';
        case 'First Quarter':
          return $hemisphere === 'Northern' ? '50%' : '-50%';
        case 'Last Quarter':
          return $hemisphere === 'Northern' ? '-50%' : '50%';
        case 'Waxing Gibbous':
          return $hemisphere === 'Northern' ? '25%' : '-25%';
        case 'Waning Gibbous':
          return $hemisphere === 'Northern' ? '-25%' : '25%';
        case 'Waning Crescent':
          return $hemisphere === 'Northern' ? '15%' : '-15%';
      }
    }};
    z-index: 2;
    width: ${({ $moonPhase }) =>
      $moonPhase === 'Waning Gibbous' ||
      $moonPhase === 'Waxing Gibbous' ||
      $moonPhase === 'Full'
        ? '130%'
        : '100%'};
    height: ${({ $moonPhase }) =>
      $moonPhase === 'Waning Gibbous' ||
      $moonPhase === 'Waxing Gibbous' ||
      $moonPhase === 'Full'
        ? '130%'
        : '100%'};
    ${({ $moonPhase }) =>
      ($moonPhase === 'Waning Gibbous' ||
        $moonPhase === 'Waxing Gibbous' ||
        $moonPhase === 'Full') &&
      'top: -15%'};
    background-color: rgba(0, 0, 0, 0.87);
    ${({ $moonPhase }) =>
      ($moonPhase === 'Waning Gibbous' ||
        $moonPhase === 'Waxing Gibbous' ||
        $moonPhase === 'Full') &&
      `
      background: -moz-radial-gradient(
        transparent 240px,
        rgba(0, 0, 0, 0.87) 240px
      );
      background: -webkit-radial-gradient(
        transparent 240px,
        rgba(0, 0, 0, 0.87) 240px
      );
      background: -ms-radial-gradient(
        transparent 240px,
        rgba(0, 0, 0, 0.87) 240px
      );
      background: -o-radial-gradient(transparent 240px, rgba(0, 0, 0, 0.87) 240px);
    `}
    pointer-events: none;
    pointer-events: none;
    filter: blur(3px);
    border-radius: ${({ $moonPhase }) => {
      switch ($moonPhase) {
        case 'New':
        case 'Full':
        case 'First Quarter':
        case 'Last Quarter':
        case 'Waning Gibbous':
        case 'Waxing Gibbous':
          return 0;
        case 'Waxing Crescent':
        case 'Waning Crescent':
          return '50%';
      }
    }};
  }
`;

export const Moon = ({
  moonPhase,
  hemisphere,
}: {
  moonPhase: LunarPhase;
  hemisphere: 'Northern' | 'Southern';
}) => {
  return (
    <Wrapper
      className="wrapper"
      $moonPhase={moonPhase}
      $hemisphere={hemisphere}
    >
      <Image src={moonImg} alt="moon" $moonPhase={moonPhase} />
    </Wrapper>
  );
};
