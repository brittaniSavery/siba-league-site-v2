export {};

//#region GENERAL TYPES
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _paq?: any;
  }
}
