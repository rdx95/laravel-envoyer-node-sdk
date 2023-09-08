declare class EnvoyerRequest {
    _token: string;
    _baseURL: string;
    constructor(token: string);
    _fetchJson(endpoint: string, options: {}, parseResp: boolean): Promise<any>;
    get(endpoint: string, options: {}, parseResponse: boolean): Promise<any>;
    post(endpoint: string, body: any, options: {}, parseResponse: boolean): Promise<any>;
    put(endpoint: string, body: any | undefined, options: {}, parseResponse: boolean): Promise<any>;
    patch(endpoint: string, operations: any, options: {}): Promise<any>;
    delete(endpoint: string, body: any | undefined, options?: {}): Promise<any>;
}
export default EnvoyerRequest;
