Date.prototype.toFormattedUTCString = function () {
  return this.toUTCString().replace('GMT', '').trim();
};
