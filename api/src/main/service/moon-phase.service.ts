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

  private calculateLightCoordinates(
    illumination: number,
    hemisphere: Hemisphere,
    date: Date
  ): {
    x: number;
    y: number;
    z: number;
  } {
    const age = Moon.lunarAge(date);

    let x: number =
      -(-age / 100 - Math.cos(this.degToRad(-illumination + -age))) * 5;
    let y: number =
      -(-age / 100 - Math.sin(this.degToRad(-illumination + -age))) * 5;
    let z: number =
      -(-age / 100 - Math.tan(this.degToRad(-illumination + -age))) * 5;

    if (hemisphere === 'Southern') {
      x = (age / 100 - Math.cos(this.degToRad(illumination + age))) * 5;
      y = (age / 100 - Math.sin(this.degToRad(illumination + age))) * 5;
      z = (age / 100 - Math.tan(this.degToRad(illumination + age))) * 5;
    }

    return { x, y, z };
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

    const moonCoordinates = this.calculateLightCoordinates(
      this.calculateMoonIllumination(date),
      hemisphere,
      date
    );

    return {
      emoji: Moon.lunarPhaseEmoji(date, { hemisphere }),
      phase: Moon.lunarPhase(date, { hemisphere }),
      hemisphere,
      declination: this.calculateMoonDeclination(this.daysSinceJ2000(date)),
      illumination: this.calculateMoonIllumination(date),
      x: moonCoordinates.x,
      z: moonCoordinates.z,
      y: moonCoordinates.z,
    };
  }
}
