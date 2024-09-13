import { NorthernHemisphereCountries } from 'utils/northern-hemisphere-countries';
import { SouthernHemisphereCountries } from 'utils/southern-hemisphere-countries';

export interface HemisphereCountries {
  northern: typeof NorthernHemisphereCountries;
  southern: typeof SouthernHemisphereCountries;
}
