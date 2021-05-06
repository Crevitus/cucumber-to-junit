import jsonFile from 'jsonfile';
import builder from "junit-report-builder";
import { Feature, Scenario, StepStatus } from "./model/cucumber";
import { Config } from "./model/config";

export class CucumberConverter {
  constructor(private config: Config) {}

  public convertToJunit(inputFilePath: string, outputFilePath: string): void {
    const cucumberReport: Feature[] = jsonFile.readFileSync(inputFilePath);

    for (const feature of cucumberReport) {
      this.addTestSuite(feature);
    }

    builder.writeTo(outputFilePath);
  }

  private addTestSuite(feature: Feature): void {
    let suiteDuration = 0;
    const suite = builder.testSuite().name(feature.name);

    for (const scenario of feature.elements) {
      suiteDuration += this.addTestCases(scenario, suite);
    }

    const durationInSec = suiteDuration / 1000000000; //ns to seconds

    suite.time(durationInSec);
  }

  private addTestCases(scenario: Scenario, suite: any): number {
    if (scenario.type === 'background') {
      return 0;
    }

    const scenarioResult = this.getScenarioResult(scenario);

    const testCase = suite.testCase()
      .name(scenario.name)
      .className(scenario.id)
      .time(scenarioResult.duration);

    if (scenarioResult.status === 'failed') {
        testCase.failure(scenarioResult.failureMessage);
    } else if (scenarioResult.status === 'skipped' || scenarioResult.status === 'undefined') {
      testCase.skipped();
    }

    return scenarioResult.duration;
  }

  private getScenarioResult(scenario: Scenario) {
    let scenarioStatus: StepStatus = 'passed';
    let failureMessage = '';
    let scenarioDuration = 0;

    for (const step of scenario.steps) {
      scenarioDuration += step.result.duration;

      if(scenarioStatus === 'failed') {
        continue;
      }

      if (step.result.status === 'failed') {
        scenarioStatus = 'failed';
        failureMessage = step.result.error_message!;
      }
      else if (this.config.markUndefinedAsFailed && step.result.status === 'undefined') {
        scenarioStatus = 'failed';
        failureMessage = ''
      } else {
        scenarioStatus = step.result.status;
      }
    }

    return {
      status: scenarioStatus,
      failureMessage: failureMessage,
      duration: scenarioDuration
    };
  }
}
