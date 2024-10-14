import { Hemisphere } from 'lunarphase-js';
import { NorthernHemisphereCountries } from 'utils/northern-hemisphere-countries';

export const validateCountry = (country: string): Hemisphere =>
  NorthernHemisphereCountries[country]
    ? Hemisphere.NORTHERN
    : Hemisphere.SOUTHERN;
