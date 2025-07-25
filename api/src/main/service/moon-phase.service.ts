import { HttpException, Injectable } from '@nestjs/common';
import { Hemisphere, Moon } from 'lunarphase-js';
import { MoonPhase, MoonPhaseInput } from 'model/moon-phase';
import { Coordinates } from 'type/coordinates';
import { NorthernHemisphereCountries } from 'utils/northern-hemisphere-countries';
import { SouthernHemisphereCountries } from 'utils/southern-hemisphere-countries';
import { daysSinceJ2000 } from 'utils/days-since-J2000';
import { MoonPhase as searchMoonPhase } from 'astronomy-engine';
import { toEnumCase } from 'utils/to-enum-case';

@Injectable()
export class MoonPhaseService {
  private degToRad(deg: number): number {
    return (deg * Math.PI) / 180;
  }

  private calculateMoonIllumination(date: Date): number {
    const synodicMonth = 29.53058867;
    const age = Moon.lunarAge(date);
    const phaseAngle = (age / synodicMonth) * 360;
    const illumination = (1 - Math.cos(this.degToRad(phaseAngle))) / 2;

    return +(illumination * 100).toFixed(2);
  }

  private calculateLightCoordinates(date: Date): Coordinates {
    const angleInRadians = ((searchMoonPhase(date) - 100) * Math.PI) / 180;

    return {
      x: +(5 * Math.cos(angleInRadians)),
      y: 0,
      z: +(5 * Math.sin(angleInRadians)),
    };
  }

  private calculateMoonDeclination(daysSinceJ2000: number): number {
    const rad = Math.PI / 180;
    const L = (218.316 + 13.176396 * daysSinceJ2000) * (Math.PI / 180);
    const sinDeclination = Math.sin(L) * Math.sin(5.145 * rad);

    return Math.asin(sinDeclination) * (180 / Math.PI);
  }

  async getMoonPhase({ date, country }: MoonPhaseInput): Promise<MoonPhase> {
    let hemisphere: Hemisphere = Hemisphere.NORTHERN;

    if (SouthernHemisphereCountries[toEnumCase(country)]) {
      hemisphere = Hemisphere.SOUTHERN;
    }

    if (
      !NorthernHemisphereCountries[toEnumCase(country)] &&
      !SouthernHemisphereCountries[toEnumCase(country)]
    ) {
      throw new HttpException('Unknown country', 434);
    }

    return {
      hemisphere,
      phase: Moon.lunarPhase(date, { hemisphere }),
      emoji: Moon.lunarPhaseEmoji(date, { hemisphere }),
      declination: this.calculateMoonDeclination(daysSinceJ2000(date)),
      illumination: this.calculateMoonIllumination(date),
      distance: Moon.lunarDistance(date) * 6371,
      ...this.calculateLightCoordinates(date),
    };
  }
}
