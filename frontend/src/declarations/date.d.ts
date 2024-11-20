declare interface Date {
  /**
   * @returns string
   * @description formats the Date object into a UTC Date format string and removes the 'GMT' substring
   */
  toFormattedUTCString(): string;
}
