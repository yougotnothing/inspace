import { HttpException, Injectable } from '@nestjs/common';
import { Hemisphere, Moon } from 'lunarphase-js';
import { MoonPhase, MoonPhaseInput } from 'model/moon-phase';
import { NorthernHemisphereCountries } from 'utils/northern-hemisphere-countries';
import { SouthernHemisphereCountries } from 'utils/southern-hemisphere-countries';

@Injectable()
export class MoonPhaseService {
  private daysSinceJ2000(date: Date): number {
    return Math.floor(
      (date.getTime() - new Date('2000-01-01T12:00:00Z').getTime()) /
        (1000 * 60 * 60 * 24)
    );
  }

  private calculateMoonIllumination(date: Date): number {
    const lunarAge = Moon.lunarAge(date);
    const synodicMonth = 29.530588853;
    const illumination =
      50 * (1 - Math.cos(((2 * Math.PI) / synodicMonth) * lunarAge));

    return Math.max(0, Math.min(illumination, 100));
  }

  private calculateMoonDeclination(daysSinceJ2000: number): number {
    const meanLongitude = 218.316 + 13.176396 * daysSinceJ2000;
    const rad = Math.PI / 180;
    const L = meanLongitude * rad;
    const sinDeclination = Math.sin(L) * Math.sin(5.145 * rad);

    return Math.asin(sinDeclination) * (180 / Math.PI);
  }

  async getMoonPhase({ date, country }: MoonPhaseInput): Promise<MoonPhase> {
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
      hemisphere,
      declination: this.calculateMoonDeclination(this.daysSinceJ2000(date)),
      illumination: this.calculateMoonIllumination(date),
    };
  }
}
