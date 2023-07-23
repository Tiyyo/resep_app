export default class MethodError extends Error {
  status: number;
  name: string;
  userMessage: string;

  constructor(message: string) {
    super(message);
    this.message =
      message + " <--> Methods which are allowed are : , POST, PATCH, DELETE";
    this.status = 405;
    this.userMessage = "Method not allowed";
    this.name = "MethodError";
  }
}
