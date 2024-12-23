# PlaywrightFramework

Testing Framework with basic setup and functionality

## Prerequisites 

1. [NodeJs](https://nodejs.org/en/download)

## Setup

1. Clone the repo
2. cd into root folder
3. run `npm install`

## Run Tests

Check the `scripts` section in `package.json` file to see how to run tests
or follow the next command as an example  
`ENV=dev KEY=secret_key npx playwright test` for multiple browser  
`ENV=dev KEY=secret_key npx playwright test --project=chromium` for particular browser  

## Visualize Report

In order to see the report after the execution, follow the command  
`npx playwright show-report`  
Or you can simple open up the index.html file located under the `/playwright-report/` folder
