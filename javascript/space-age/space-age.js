/**
 *  Code that you can read and reason about is more important than line count!
 *  I strive to keep all my solutions simple, efficient, and straightforward.
 *  I don't always succeed...
 * 
 *  For more of my solutions, check out my profile: https://exercism.org/profiles/Nostromos
 */

const ORBITAL_PERIODS = { // Map orbital periods for each planet compared to Earth
  mercury: 0.2408467,
  venus: 0.61519726,
  earth: 1,
  mars: 1.8808158,
  jupiter: 11.862615,
  saturn: 29.447498,
  uranus: 84.016846,
  neptune: 164.79132
};

const SECONDS_IN_EARTH_YEAR = 86400 * 365.25 // Number of seconds in 1 Earth year.

export const age = (planet, ageInSeconds) => {
  /**
   *  We calculate out the Earth age and divide that by the orbital period for the planet in question, using bracket notation to access the right orbital period.
   *  Then we round it to two decimal points using `Number.prototype.toFixed()`...
   *  And all these calculations are wrapped in `Number()`, so that we're clearly & explicitly returning a number (not a string).
   */
  return Number(((ageInSeconds / SECONDS_IN_EARTH_YEAR) / ORBITAL_PERIODS[planet]).toFixed(2));
};
