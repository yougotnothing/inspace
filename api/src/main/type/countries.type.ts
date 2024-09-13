import { NorthernHemisphereCountries } from 'utils/northern-hemisphere-countries';
import { SouthernHemisphereCountries } from 'utils/southern-hemisphere-countries';

export type Countries =
  | SouthernHemisphereCountries
  | NorthernHemisphereCountries;
