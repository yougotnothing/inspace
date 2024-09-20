import { makeObservable, observable } from 'mobx';
import { Hemisphere } from 'types/hemisphere';
import { LunarPhase } from 'types/lunar-phase';

class MoonPhaseStore {
  hemisphere: Hemisphere = 'Northern';
  geolocation: GeolocationCoordinates | null = null;
  phase: LunarPhase = 'Full';

  constructor() {
    makeObservable(this, {
      hemisphere: observable,
      geolocation: observable,
      phase: observable,
    });
  }

  getGeolocation() {
    navigator.geolocation.getCurrentPosition(
      position => (this.geolocation = position.coords),
      error => {
        console.log(error);
        console.warn(
          "Looks like your browser don't support geolocation features. Please try in another browser"
        );
      },
      {
        timeout: 5000,
        maximumAge: 0,
        enableHighAccuracy: true,
      }
    );
  }

  setPhase(moonPhase: LunarPhase) {
    this.phase = moonPhase;
  }

  setHemisphere(hemisphere: Hemisphere) {
    this.hemisphere = hemisphere;
  }
}

export const moonPhase = new MoonPhaseStore();
