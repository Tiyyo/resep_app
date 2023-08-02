import { redirect } from "@remix-run/node";

export const upgradeToHttps = (request: Request) => {
    const url = new URL(request.url);
    let hostname = url.hostname;
    let proto = request.headers.get('x-forwarded-proto') ?? url.protocol;

    url.host = request.headers.get('x-forwarded-host') ?? request.headers.get("host") ?? url.host;
    url.protocol = 'https';
    if (proto === 'http' && hostname === 'localhost') {
        return redirect(url.toString(), {
            headers: {
                "x-forwarded-proto": "https"
            }
        })
    }
}