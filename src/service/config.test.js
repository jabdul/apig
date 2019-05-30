import config from './config';

describe('config', () => {
  it('contains empty list of files to ignore', async () => {
    expect(config.FILES_IGNORE).toHaveLength(0);
  });
});
