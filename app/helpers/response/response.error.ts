import { json } from "@remix-run/node";

export default class ResponseError {
    message: string;
    name: string;
    status: number;
    userMessage: string;
    error: any;

    constructor(error: any) {
        this.error = error;
        this.name = "ResponseError";
        this.status = error.status ?? 500;
        this.userMessage = error.userMessage;
        this.message = error.message;
    }

    public send() {
        console.log(this.name + this.message, 'ERROR')
        return json({
            error: {
                userMessage: this.userMessage,
            }
        }, {
            status: this.status
        })
    }
}