import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IConfig
{
    [field: string] : string;
}

@Injectable({
    providedIn: 'root'
})
export class AppConfig
{
    private config: IConfig = {};

    public getConfig(param: string): string
    {
        return this.config[param];
    }

    constructor(
        private http: HttpClient,
    ) {}

    public async load(): Promise<void>
    {
        const config = await this.http.get<{[field: string] : string}>('/assets/config.json').toPromise()
        this.config = config;
    }
}
