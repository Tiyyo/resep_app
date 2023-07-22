export default class NotFoundError extends Error {
    status: number
    name: string
    userMessae: string

    constructor(message: string) {
        super(message);
        this.message = message;
        this.status = 404;
        this.userMessae = "Item couldn't be found"
        this.name = "NotFoundError";
    }
}