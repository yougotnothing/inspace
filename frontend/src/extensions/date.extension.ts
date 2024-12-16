Date.prototype.toFormattedUTCString = function () {
  return this.toUTCString().replace('GMT', '').trim();
};

Date.prototype.toTimezone = function (
  timezone: string | undefined = 'Europe/Warsaw'
): string {
  return Intl.DateTimeFormat('en-US', {
    timeStyle: 'short',
    dateStyle: 'full',
    timeZone: timezone,
  }).format(this);
};
