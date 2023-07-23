import { json } from "@remix-run/node";

export default class ResponseValid {
  name: string;
  status: number;
  message?: string;
  userMessage?: string;
  data?: any;

  constructor(status: number = 200, message?: string, data: any) {
    this.name = "ResponseValid";
    this.status = status;
    this.userMessage = message;
    this.data = data;
  }
  public send() {
    return json(
      {
        message: this.userMessage,
        data: this.data,
      },
      {
        status: this.status,
      }
    );
  }
}
