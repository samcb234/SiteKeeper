import {config} from "../config/Constants";

export abstract class Comm {
    private static headers: any = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    private static generateRequest(relativeUrl: string, method: string, body?: any) {
        return fetch(config.API_URL + '' + relativeUrl, {
            method: method,
            headers: this.headers,
            body: body ? JSON.stringify(body) : null,
            credentials: 'include'
        });
    }

    public static post(relativeUrl: string, body: any) {
        return Comm.generateRequest(relativeUrl, 'POST', body);
    }

    public static postNoBody(relativeUrl: string) {
        return Comm.generateRequest(relativeUrl, 'POST');
    }

    public static get(relativeUrl: string) {
        return Comm.generateRequest(relativeUrl, 'GET');
    }

    public static delete(relativeUrl: string) {
        return Comm.generateRequest(relativeUrl, 'DELETE');
    }

    public static putNoBody(relativeUrl: string) {
        return Comm.generateRequest(relativeUrl, 'PUT');
    }

    public static put(relativeUrl: string, body: any) {
        return Comm.generateRequest(relativeUrl, 'PUT', body);
    }

    public static custom(relativeUrl: string, method: string, body?: any) {
        return Comm.generateRequest(relativeUrl, method, body);
    }
}