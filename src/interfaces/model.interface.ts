/**
 * Result format
 * see https://github.com/skounis/eu-dcc-validation#result-format
 * 
 * 
 * The Result object is serialised in JSON file. 
 * The file name contains the country code, the test date and the platform:
 *
 * `YYYYDDMM-XX-PLATFORM.json` 
 * 
 * So for NL tests conducted on 2022-01-17 you have these two files (for both platforms):
 *
 * `20220117-NL-ANDROID.json`
 * `20220117-NL-IOS.json`
 */
 import * as _ from 'lodash';

/**
 * Target platforms
 * @enum
 */
export enum PlatformEnum {
  Android = 'ANDROID',
  iOS = 'IOS',
  Web = 'WEB'
}

/**
 * Test results
 * @enum
 */
export enum TestResultEnum {
  Valid = 'VALID',
  Invalid = 'INVALID',
  Error = 'ERROR'
}

/**
 * The TestResults
 */
export interface ITestResult {
  metadata: ITestResultMetadata;
  results: Array<ITestResultEntry>;
}

/**
 * Contains various metadata
 * 
 */
export interface ITestResultMetadata {
  /** country code, iso-two-letter code */
  country: string;
  /** date the test was completed, in ISO8601 UTC */
  completedOn: Date;
  /** git hash of the commit tested*/
  commit: string;
  /** platform the tests were done on */
  platform: PlatformEnum;
}

/**
 * Test result entry.
 */
export interface ITestResultEntry {
  /** The relative path to the test file from the root of the QA repository. this path is returned by the github API if you use that. */
  file: string;
  /** the test result, `Valid` for valid, `Invalid` if the DCC was scanned but deemed invalid, `Error` if the DCC did not scan. */
  result: TestResultEnum;
  /** optional free text explaining the result if it isn't `Valid` */
  comment: string;
}

export class TestResult implements ITestResult {
  metadata: ITestResultMetadata;
  results: ITestResultEntry[];
  constructor() {
    this.metadata = new TestResultMetadata();
    // TODO: Should this become a more smart collect?
    this.results = [];
  }

  /**
   * Add a test result entry
   * @param entry 
   */
  addEntry(entry: ITestResultEntry) {
    _.remove(this.results, (e) => {
      return e.file == entry.file;
    });
    // TODO: Do not mutate.
    this.results.push(entry);
  }
}

export class TestResultMetadata implements ITestResultMetadata {
  country: string;
  completedOn: Date;
  commit: string;
  platform: PlatformEnum;
  constructor(country?: string, completedOn?: Date, commit?: string, platform?: PlatformEnum) {
    this.country = country || 'EL';
    this.completedOn= completedOn || new Date();
    this.commit = commit || '';
    this.platform = platform || PlatformEnum.Android
  }
}

/**
 * The Rich representation of an EU DCC
 */
 export interface IQRCode {
  /** Unique ID (is the same with the file) */
  id: string;
  /** The country issued this DCC. */
  country: string;
  /** The version of the specifications the DCC complies with. */
  version: string;
  /** The relative path to the test file from the root of the QA repository */
  file: string;
  /** A friendly title for this DCC */
  title: string;
  /** URI for loading the QR Code. */
  uri: string;
  /** The base64 representation of the QR Code. */
  qrcode64?: string;
}