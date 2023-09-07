import fetch from 'cross-fetch';

class EnvoyerRequest {
    _token: string;
    _baseURL: string;
    constructor(token: string) {
        this._token = token;
        this._baseURL = 'https://envoyer.io/api'
    }

    async _fetchJson(endpoint: string, options: {}, parseResp: boolean) {
        const res = await fetch(this._baseURL + endpoint, {
            ...options,
            headers: {
                Authorization: `Bearer ${this._token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });

        if (res.status == 200 && parseResp == true) {
            const json = await res.json();
            return json;
        }
        else if (res.status == 200 && parseResp == false) {
            const text = await res.text();
            return text;
        }
        else {
            throw new Error(res.statusText);
        }
    }

    get(endpoint: string, options: {}, parseResponse: boolean) {
        return this._fetchJson(
            endpoint,
            {
                ...options,
                body: undefined,
                method: 'GET',
            },
            parseResponse,
        );
    }

    post(endpoint: string, body: any, options: {}, parseResponse: boolean) {
        return this._fetchJson(
            endpoint,
            {
                ...options,
                body: body ? JSON.stringify(body) : undefined,
                method: 'POST',
            },
            parseResponse,
        );
    }

    put(endpoint: string, body: any | undefined, options: {}, parseResponse: boolean) {
        return this._fetchJson(
            endpoint,
            {
                ...options,
                body: body ? JSON.stringify(body) : undefined,
                method: 'POST',
            },
            parseResponse,
        );
    }

    patch(endpoint: string, operations: any, options: {}) {
        return this._fetchJson(
            endpoint,
            {
                ...options,
                body: JSON.stringify(operations),
                method: 'PATCH',
            },
            false,
        );
    }

    delete(endpoint: string, body: any | undefined, options = {}) {
        return this._fetchJson(endpoint, {
            ...options,
            body: body ? JSON.stringify(body) : undefined,
            method: 'DELETE',
        },
            true
        );
    }
}

export default EnvoyerRequest;