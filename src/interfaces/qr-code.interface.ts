// export enum ScanResultEnum {
//   Success,
//   Warning,
//   Error,
//   Right,
// }

export interface IQRCode {
  id: string;
  country: string;
  version: string;
  file: string;
  title: string;
  qrcode: string;
  qrcode64?: string;
}

/**
 * Scan result
 * The structure for reporting the scan result
 */
// export interface IScanResult {
//   ref: string;
//   result: ScanResultEnum;
//   comments: string;
//   image: string; // URL or base64
// }

// /**
//  * Scan results 
//  * The structure for collection all the reported scan results
//  */
// export interface IScanResults {
//   results: Array<IScanResult>;
// }