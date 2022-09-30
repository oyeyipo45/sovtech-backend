export const getPersonQuery = `
query Person($search: String) {
   getPerson(search: $search) {
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
