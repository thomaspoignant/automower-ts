export default class NoGardenError extends Error {
  constructor() {
    super('Impossible to move the auto mower because he is not in a garden');
  }
}
