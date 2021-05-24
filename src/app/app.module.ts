import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ApiIntercepter } from './api.intercepter';
import { AppComponent } from './app.component';
import { MenuModule } from './components/menu/menu.module';
import { AppConfig } from './services/config.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const loadConfig = (config: AppConfig) => {
    return () => config.load();
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FlexLayoutModule,
        MenuModule,
        BrowserAnimationsModule,
    ],
    providers: [
        { provide: APP_INITIALIZER, useFactory: loadConfig, multi: true, deps: [AppConfig] },
        { provide: HTTP_INTERCEPTORS, useClass: ApiIntercepter, multi: true },
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
