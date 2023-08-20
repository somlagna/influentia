import { PostStatusFilterPipe } from './post-status-filter.pipe';

describe('PostStatusFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new PostStatusFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
