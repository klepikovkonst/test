import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppConfig, IConfig } from './config.service';
import { Route, IRoute } from '../models/route.model';
import { IRouteRespose } from '../models/route-response.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService
{
    private get apiUrl(): string
    {
        return this.appConfig.getConfig('api-url');
    }

    constructor(
        private appConfig: AppConfig,
        private http: HttpClient,
    )
    {}

    getRoutes(): Observable<Route[]>
    {
        const url = this.apiUrl + '/api/routes';

        return this.http.get<IRouteRespose<{routes: IRoute[]}>>(url).pipe(
            map(data => data.payload.routes.map(item => new Route(item)))
        );
    }

    editRoute(uuid: string, data: {[field: string]: string}): Observable<IRouteRespose<{uuid: string}>>
    {
        const url = this.apiUrl + '/api/routes/' + uuid;
        const requestData = ['address', 'mask', 'gateway', 'interface'].reduce((acc, value) => ({...acc, [value]: data[value]}), {});

        return this.http.put<IRouteRespose<{uuid: string}>>(url, requestData);
    }

    deleteRoute(uuid: string): Observable<IRouteRespose<{uuid: string}>>
    {
        const url = this.apiUrl + '/api/routes/' + uuid;

        return this.http.delete<IRouteRespose<{uuid: string}>>(url);
    }

    addRoute(data: {[field: string]: string}): Observable<IRouteRespose<{uuid: string}>>
    {
        const url = this.apiUrl + '/api/routes';
        const requestData = ['address', 'mask', 'gateway', 'interface'].reduce((acc, value) => ({...acc, [value]: data[value]}), {});

        return this.http.post<IRouteRespose<{uuid: string}>>(url, requestData);
    }
}
