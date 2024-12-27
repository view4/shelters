export const parseLocationsResult = (res) =>
  res.locations.map(({ city, country, countryCode }) => ({
    key: { city, countryCode },
    readable: `${city} (${countryCode})`,
  }));

export const LOCATIONS_QUERY = `
query locations($search: String) {
  locations(search:  $search) {
    city
    country
    countryCode
  }
}
`;
