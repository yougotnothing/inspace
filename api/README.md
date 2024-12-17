# ☾ Inspace (backend)

[![stack](https://skillicons.dev/icons?i=nestjs,postgres,prisma,typescript,docker,webpack,yarn,graphql,apollo,pug)](https://skillicons.dev)

### Queries:

```gql
type Query {
  deleteUser: Message!
  getAirPollutionInfo(coords: AirPollutionInput!): AirPollution!
  getEventByDescription(description: String!): Event!
  getEventById(id: String!): Event!
  getEventsBy(settings: ActionSettingsInput!): [Event!]!
  getGoogleCode: String!
  getLocation(coordinates: GeolocationInput!): Geolocation!
  getMoonPhase(location: MoonPhaseInput!): MoonPhase!
  getNearestAsteroids(data: NearestBodiesInput!): [NearestBodies!]!
  getNearestComets(data: NearestBodiesInput!): [NearestBodies!]!
  getNextLunarApsis(data: LunarApsisInput!): LunarApsis!
  getSelf: User!
  getUserById(id: String!): User!
  getUserByName(name: String!): User!
  googleAuth(token: String!): Tokens!
  nextGlobalSolarEclipse(startTime: DateTime!): NextSolarEclipse!
  nextLocalSolarEclipse(observer: ObserverInput!, startTime: DateTime!): SearchSolarEclipse!
  nextLunarEclipse(date: DateTime!): LunarEclipseInfo!
  searchLocalSolarEclipse(observer: ObserverInput!, startTime: DateTime!): SearchSolarEclipse!
  searchLunarApsis(data: LunarApsisInput!): LunarApsis!
  searchLunarEclipse(date: DateTime!): LunarEclipseInfo!
}
```

### Mutations:

```gql
type Mutation {
  changeAvatar(id: String!, image: String!): ChangeAvatar!
  createEvent(event: EventInput!): Event!
  login(loginDto: LoginDtoInput!): Tokens!
  logout: Message!
  refresh: Tokens!
  register(user: RegisterInput!): String!
  sendDeleteUserEmail(email: String!): EmailResponse!
  sendEventEmail(email: String!, eventId: String!): EmailResponse!
  sendVerifyEmail(email: String!): EmailResponse!
  verifyEmail(userId: String!): EmailResponse!
}
```
