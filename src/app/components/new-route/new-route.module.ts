import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NewRouteComponent } from './new-route.component';
import { RouteFormModule } from '../route-form/route-form.module';

@NgModule({
    declarations: [
        NewRouteComponent,
    ],
    imports: [
        CommonModule,
        RouteFormModule,
        FlexLayoutModule,
        MatButtonModule,
        MatSnackBarModule,
    ],
    exports: [
        NewRouteComponent,
    ]
})
export class NewRouteModule
{

}
