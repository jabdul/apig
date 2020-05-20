const attrs = ['name' 'meta.active'];

export const verify{{{scaffold_entity_capitalise}}} = (resource): void => {
  attrs.forEach(attr => {
    expect(resource).toHaveProperty(attr);
  });
};

export const verifyResponse = ({ resource, payload }): void => {
  attrs.forEach(attr => {
    expect(resource[attr]).toEqual(payload[attr]);
  });
};
