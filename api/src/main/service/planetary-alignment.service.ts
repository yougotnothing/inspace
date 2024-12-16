import { Injectable } from '@nestjs/common';
import { Body, HelioVector } from 'astronomy-engine';
import { PlanetPosition } from 'model/planet-position';
import { PlanetaryAlignment } from 'model/planetary-alignment';
import { Planets } from 'utils/planets';

@Injectable()
export class PlanetaryAlignmentService {
  private readonly planets: Body[] = [
    Body.Mercury,
    Body.Venus,
    Body.Earth,
    Body.Mars,
    Body.Jupiter,
    Body.Saturn,
    Body.Uranus,
    Body.Neptune,
  ];

  async getPlanetsPosition(date: Date): Promise<PlanetPosition[]> {
    const positions: PlanetPosition[] = [];

    for (const planet of this.planets) {
      const position = HelioVector(planet as Body, date);

      positions.push({
        planet: planet as unknown as Planets,
        x: position.x,
        y: position.y,
        z: position.z,
        distance: position.Length(),
      });
    }

    return positions;
  }

  async getPlanetaryAlignment(date: Date): Promise<PlanetaryAlignment> {
    const planetsPosition = await this.getPlanetsPosition(date);

    if (planetsPosition.some(position => position.x === planetsPosition[0].x)) {
      return {
        date,
        positions: Array.from(
          new Set(planetsPosition.map(position => ({ ...position })))
        ),
      };
    }
  }
}
