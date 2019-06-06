export const RandomId = len =>
  Math.random()
    .toString(36)
    .substr(3, len);
