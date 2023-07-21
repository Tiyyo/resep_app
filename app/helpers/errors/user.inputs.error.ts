export default class UserInputError extends Error {
    message: string;
    name: string;
    status: number;
    userMessage: string;

    constructor(message: string) {
        super(message);
        this.name = "UserInputError";
        this.status = 400;
        this.userMessage = "Invalid input";
        this.message = message;
    }
}