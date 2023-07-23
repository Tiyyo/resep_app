import { json } from "@remix-run/node";

export default class ResponseError {
  message: string;
  name: string;
  status: number;
  userMessage: string;
  error: any;
  fieldErrors?: Record<string, string>;

  constructor(error: any, fieldErrors?: Record<string, string>) {
    this.error = error;
    this.name = "ResponseError";
    this.status = error.status ?? 500;
    this.userMessage = error.userMessage;
    this.message = error.message;
    this.fieldErrors = fieldErrors;
  }

  public send() {
    console.log(this.name + this.message, "ERROR");
    return json(
      {
        error: {
          userMessage: this.userMessage,
          fieldErrors: this.fieldErrors,
        },
      },
      {
        status: this.status,
      }
    );
  }
}
