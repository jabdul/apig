import routes from './services';

describe('./services', () => {
  describe('.default', () => {
    it('should declare services', () => {
      expect(routes()).toBeDefined();
    });
  });
});
