const { setWorldConstructor, setDefaultTimeout } = require('cucumber');
const { Builder, Capabilities } = require('selenium-webdriver');
require('chromedriver');

const {
  JobsPage,
  LogonPage,
  SectorJobsPage,
  JobListingPage,
} = require('../page_objects');

const DEFAULT_TIMEOUT = 60000;
const BASE_URL = 'https://jobs.economist.com';

function buildDriver() {
  const chromeCapabilities = Capabilities.chrome();
  const chromeOptions = {
    args: ['incognito', 'window-size=1920,1080'],
  };

  chromeCapabilities.set('chromeOptions', chromeOptions);

  return new Builder()
    .forBrowser('chrome')
    .withCapabilities(chromeCapabilities)
    .build();
}

class CustomWorld {
  goToJobsPage() {
    return this.driver.get(BASE_URL);
  }

  start() {
    this.driver = buildDriver();
    this.jobsPage = new JobsPage(this.driver);
    this.logonPage = new LogonPage(this.driver);
    this.sectorJobsPage = new SectorJobsPage(this.driver);
    this.jobListingPage = new JobListingPage(this.driver);
  }

  async end() {
    await this.driver.close();
    return this.driver.quit();
  }
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(DEFAULT_TIMEOUT);

module.exports = new CustomWorld();
