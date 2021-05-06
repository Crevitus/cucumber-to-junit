import { CucumberConverter } from '../src';

describe('blah', () => {
  it('works', () => {
    // @ts-ignore
    const converter = new CucumberConverter({
      markUndefinedAsFailed: true // pending scenario steps will fail the test case
    });

    // TODO add tests
  });
});
