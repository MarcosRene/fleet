import { Car, FlagCheckered } from 'phosphor-react-native';

import { LocationInfo, LocationInfoProps } from '../LocationInfo';

import { Container, Line } from './styles';

type LocationsProps = {
  departure: LocationInfoProps;
  arrival: LocationInfoProps;
};

export function Locations({ departure, arrival }: LocationsProps) {
  return (
    <Container>
      <LocationInfo
        icon={Car}
        label={departure.label}
        description={departure.description}
      />

      <Line />

      <LocationInfo
        icon={FlagCheckered}
        label={arrival.label}
        description={arrival.description}
      />
    </Container>
  );
}
