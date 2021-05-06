import { CucumberConverter } from '../src';

describe('blah', () => {
  it('works', () => {
    // @ts-ignore
    const converter = new CucumberConverter({
      markUndefinedAsFailed: true // undefined scenario steps will fail the test case
    });

    converter.convertToJunit('test/cucumber.final.json', 'pls.xml');

    // TODO add tests
  });
});
