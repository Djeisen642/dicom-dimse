export default class DetailedError extends Error {
  details: unknown;

  constructor (message:string, details:unknown) {
    super(message);
    this.details = details;
  }
}
