export interface Self {
  getSelf: {
    name: string;
    email: string;
    id: string;
    isVerified: boolean;
    isHaveAvatar: boolean;
    avatar: string;
    toSpotted: {
      id: string;
      description: string;
      type: string;
      date: string;
      isSpotted: boolean;
    }[];
    spottedLunarEclipses: number;
    spottedSolarEclipses: number;
    spottedMeteorShowers: number;
    spottedSupermoons: number;
    spottedMicromoons: number;
    spottedPlanetaryAlignments: number;
    timezone: string;
    shownDistance: string;
  };
}
