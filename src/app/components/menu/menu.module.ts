import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';

import { MenuComponent } from './menu.component';
import { RoutesListModule } from '../routes-list/routes-list.module';
import { NewRouteModule } from '../new-route/new-route.module';

@NgModule({
    declarations: [
        MenuComponent,
    ],
    imports: [
        FlexLayoutModule,
        MatTabsModule,
        RoutesListModule,
        NewRouteModule,
    ],
    exports: [
        MenuComponent,
    ],
})
export class MenuModule
{

}
