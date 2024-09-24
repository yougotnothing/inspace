import { HttpException, Injectable } from '@nestjs/common';
import { MoonPhaseDto } from 'dto/moon-phase';
import { Hemisphere, Moon } from 'lunarphase-js';
import { NorthernHemisphereCountries } from 'utils/northern-hemisphere-countries';
import { SouthernHemisphereCountries } from 'utils/southern-hemisphere-countries';

@Injectable()
export class MoonPhaseService {
  async getMoonPhase({ date, country }: MoonPhaseDto): Promise<{
    phase: string;
    age: number;
    hemisphere: Hemisphere;
  }> {
    let hemisphere: Hemisphere = Hemisphere.NORTHERN;

    if (
      SouthernHemisphereCountries[country.toUpperCase().replaceAll(' ', '_')]
    ) {
      hemisphere = Hemisphere.SOUTHERN;
    }

    if (
      !NorthernHemisphereCountries[
        country.toUpperCase().replaceAll(' ', '_')
      ] &&
      !SouthernHemisphereCountries[country.toUpperCase().replaceAll(' ', '_')]
    ) {
      throw new HttpException('Unknown country', 434);
    }

    return {
      phase: Moon.lunarPhase(date, { hemisphere }),
      age: Moon.lunarAgePercent(date),
      hemisphere,
    };
  }
}
