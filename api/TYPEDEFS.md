### <a href="#types">Types</a> <a href="#inputs">Inputs</a>

<br id="types">

### types:

```gql
type SearchSolarEclipse {
  kind: String!
  obscuration: Float!
  partial_begin: EclipseEvent!
  partial_end: EclipseEvent!
  peak: EclipseEvent!
  total_begin: EclipseEvent
  total_end: EclipseEvent
}

type Tokens {
  access_token: String!
  expires_in: Float!
  refresh_expires_in: Float!
  refresh_token: String!
  session_state: String!
}

type User {
  avatar: String!
  createdAt: DateTime!
  email: String!
  id: ID!
  isHaveAvatar: Boolean!
  isVerified: Boolean!
  name: String!
  password: String!
  role: String!
  shownDistance: String!
  spottedLunarEclipses: Float!
  spottedMeteorShowers: Float!
  spottedMicromoons: Float!
  spottedPlanetaryAlignments: Float!
  spottedSolarEclipses: Float!
  spottedSupermoons: Float!
  timezone: String!
  toSpotted: [Event!]!
}

type NextSolarEclipse {
  distance: Float!
  kind: String!
  latitude: Float
  longitude: Float
  obscuration: Float
  peak: AstroTimeObject!
}

type NearestBodies {
  cd: String!
  des: String!
  diameter: String
  diameter_sigma: String
  dist: String!
  dist_max: String!
  dist_min: String!
  fullname: String
  h: String!
  jd: String!
  orbit_id: String!
  t_sigma_f: String!
  v_inf: String!
  v_rel: String!
}

type MoonPhase {
  declination: Float!
  emoji: String!
  hemisphere: String!
  illumination: Float!
  phase: String!
  x: Float!
  y: Float!
  z: Float!
}

type LunarEclipseInfo {
  kind: String!
  obscuration: Float!
  peak: AstroTime!
  sd_partial: Float!
  sd_penum: Float!
  sd_total: Float!
}

type Message {
  message: String!
}

type LunarApsis {
  distance: Float!
  kind: String!
  phase: String!
  time: AstroTime!
}

type Geolocation {
  countryName: String!
  placeName: String!
}

type Event {
  data: String!
  date: DateTime!
  description: String!
  id: String!
  isSpotted: Boolean!
  type: String!
  userId: String!
}

type EclipseEvent {
  altitude: Float!
  time: AstroTimeObject!
}

type EmailResponse {
  message: String!
  userEmail: String!
  userId: String!
  userName: String!
}

type AstroTime {
  date: DateTime!
  tt: Float!
  ut: Float!
}

type AstroTimeObject {
  date: DateTime!
  tt: Float!
  ut: Float!
}

type ChangeAvatar {
  avatar: String!
  message: String!
}

type Components {
  co: Float!
  nh3: Float!
  no: Float!
  no2: Float!
  o3: Float!
  pm2_5: Float!
  pm10: Float!
  so2: Float!
}

type AirPollution {
  aqi: String!
  components: Components!
  coords: [Float!]!
  date: String!
}
```

<br id="inputs">

### inputs:

```gql
input ActionSettingsInput {
  date: DateTime
  description: String
  type: String
}

input AirPollutionInput {
  lat: Float!
  lon: Float!
}

input EventInput {
  data: String!
  date: DateTime!
  description: String!
  type: String!
  userId: String!
}

input GeolocationInput {
  latitude: Float!
  longitude: Float!
}

input LoginDtoInput {
  login: String!
  password: String!
}

input LunarApsisInput {
  country: String!
  date: DateTime!
  distance: String!
}

input MoonPhaseInput {
  country: String!
  date: DateTime!
}

input NearestBodiesInput {
  distance_in: String!
  limit_from: Float!
}

input ObserverInput {
  height: Float!
  latitude: Float!
  longitude: Float!
}

input RegisterInput {
  confirmPassword: String!
  email: String!
  name: String!
  password: String!
}
```
