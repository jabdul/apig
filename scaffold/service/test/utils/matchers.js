export default expect.extend({
  toBeValidUUID(value) {
    return {
      pass: /\b(?=([0-9A-F]{8})\b)\1-(?=([0-9A-F]{4}))\2-(?=(4[0-9A-F]{3}))\3-(?=([89AB][0-9A-F]{3}))\4-(?=([0-9A-F]{12}))\5\b/i.test(value),
      message: () => `${value} not a valid uuid.v4`
    }
  }
});
