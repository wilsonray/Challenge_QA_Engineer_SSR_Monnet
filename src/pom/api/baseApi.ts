import { APIRequestContext } from '@playwright/test';
import classUrls from '../../data/urls';

let urls = classUrls();

export class BaseApi {
    protected request: APIRequestContext;
    protected baseUrl: string;
    protected urls: Record<string, string>;

    constructor(apiName: string, requestContext: APIRequestContext) {
        this.request = requestContext;
        this.urls = urls.getAllUrls();
        this.baseUrl = this._loadDynamicUrl(apiName);
    }

    async get(endpoint: string, options?: any) {
        return this.request.get(`${this.baseUrl}${endpoint}`, options);
    }

    async post(endpoint: string, data: any, options?: any) {
        return this.request.post(`${this.baseUrl}${endpoint}`, { data, ...options });
    }

    async patch(endpoint: string, data: any, options?: any) {
        return this.request.patch(`${this.baseUrl}${endpoint}`, { data, ...options });
    }

    async delete(endpoint: string, options?: any) {
        return this.request.delete(`${this.baseUrl}${endpoint}`, options);
    }

    private _loadDynamicUrl(apiName: string) {
        return `${this.urls[apiName]}`;
    }
}


