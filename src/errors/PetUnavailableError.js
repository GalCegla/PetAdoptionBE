export default class PetUnavailableError extends Error {
  constructor(message) {
    super(message);
    this.name = "PetUnavailableError";
  }
}
