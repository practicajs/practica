# EarlyAI unit test summary

## Configuration
The repository was already configured to work with JEST.
The tests were created with JEST testing framework.
No special configuration is needed to setup the project except updating jest.config.js collectCoverageFrom:

Original configuration:
  collectCoverageFrom: [
    "**/code-generator/**/*.{ts,tsx}", 
    "!**/test/**"
  ],

Updated to this one to collect coverage correctly where applicable.
  collectCoverageFrom: [
    "**/code-generator/**/*.{ts,tsx}",
    "!**/test/**",
    "!**/code-templates/**",
    "!**/index.ts",
    "!**/entry-points/cli-entry-point.ts",
    "!**/entry-points/interactive-cli.tsx",
  ],


## Target code
src/code-generator
src/code-templates was excluded from testing by the author so it was excluded from this tests run.

## cleanup
For the purposed of this exercise we .skip all existing tests on files so we can see the impact of the newly generated tests by EarlyAI:

practica/src/code-generator/generation-logic/generate-service.test.ts
practica/src/code-generator/test/generator.non-interactive-cli.test.ts

and all tests on files under:
practica/test/

## Results
### src/code-generator Coverage - 96%
### Passed
Test Suites: 9 (Files or describe blocks)
Tests: 48
### Failed
Tests: 0
We did not generate any red tests because this is more of a how-to or example repo rather than a real functional code.



### About Early
Early leverages Generative AI to accelerate development, enhance code quality, and speed up time-to-market. Our AI-driven product generates automated, comprehensive, cost-effective working unit tests, and help catch bugs early, expanding code coverage, and improving overall quality


Learn more at www.startearly.ai or search for EarlyAI on VSCode marketplace, install and user EarlyAI extension to generate unit tests in a click.

Read more on our [blogs](https://www.startearly.ai/early-blog).