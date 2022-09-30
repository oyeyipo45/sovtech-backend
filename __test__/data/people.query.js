export const getPeopleQuery = `
query GetPeople($filter: PageFilter) {
   getPeople(filter: $filter) {
      data {
        name
        height
        mass
        gender
        homeworld
      }
      page {
        total
        previous
        next
      }
    }
}
`;