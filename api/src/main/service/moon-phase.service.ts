import { HttpException, Injectable } from '@nestjs/common';
import { Hemisphere, LunarPhase, Moon } from 'lunarphase-js';
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
    date: Date,
    phase: LunarPhase,
    hemisphere: Hemisphere
  ): {
    x: number;
    y: number;
    z: number;
  } {
    const synodicMonth = 29.53058867;
    const age = Moon.lunarAge(date);
    const phaseAngle = (age / synodicMonth) * 360;

    const invertedPhaseAngle = 180 - phaseAngle;
    const adjustedPhaseAngle = invertedPhaseAngle + 8;
    const radius = 5;
    const y = 0;
    let x = radius * Math.sin(this.degToRad(adjustedPhaseAngle));
    const z = radius * Math.cos(this.degToRad(adjustedPhaseAngle));

    switch (phase) {
      case LunarPhase.WANING_GIBBOUS:
      case LunarPhase.WAXING_CRESCENT:
        if (hemisphere === 'Southern')
          x = radius * Math.sin(this.degToRad(adjustedPhaseAngle));
        else x = -(radius * Math.sin(this.degToRad(adjustedPhaseAngle)));
      case LunarPhase.NEW:
      case LunarPhase.FIRST_QUARTER:
      case LunarPhase.WAXING_GIBBOUS:
      case LunarPhase.FULL:
      case LunarPhase.LAST_QUARTER:
      case LunarPhase.WANING_CRESCENT:
        if (hemisphere === 'Southern')
          x = -(radius * Math.sin(this.degToRad(adjustedPhaseAngle)));
        else x = radius * Math.sin(this.degToRad(adjustedPhaseAngle));
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

    return {
      phase: Moon.lunarPhase(date, { hemisphere }),
      hemisphere,
      declination: this.calculateMoonDeclination(this.daysSinceJ2000(date)),
      illumination: this.calculateMoonIllumination(date),
      x: this.calculateLightCoordinates(
        date,
        Moon.lunarPhase(date, { hemisphere }),
        hemisphere
      ).x,
      z: this.calculateLightCoordinates(
        date,
        Moon.lunarPhase(date, { hemisphere }),
        hemisphere
      ).z,
    };
  }
}
