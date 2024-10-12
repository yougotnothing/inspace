export const daysSinceJ2000 = (date: Date) =>
  Math.floor(
    (date.getTime() - new Date('2000-01-01T12:00:00Z').getTime()) /
      (1000 * 60 * 60 * 24)
  );
