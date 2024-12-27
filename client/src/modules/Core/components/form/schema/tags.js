export const TAGS_QUERY = `
query tags($search: String){ 
  tags(search: $search){
    entities{
      name
      key
      id
    }
  }
}
`;
export const parseTagsResult = (res) =>
  res?.tags.entities.map(({ name, key, id }) => ({
    key: { name, key, id },
    readable: name,
  }));
