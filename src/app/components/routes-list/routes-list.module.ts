import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RoutesListComponent } from './routes-list.component';
import { EditRouteDialogComponent } from './edit-route-dialog/edit-route-dialog.component';
import { RouteFormModule } from '../route-form/route-form.module';

@NgModule({
    declarations: [
        RoutesListComponent,
        EditRouteDialogComponent,
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatTableModule,
        MatDialogModule,
        MatButtonModule,
        MatSortModule,
        MatSnackBarModule,
        RouteFormModule,
    ],
    entryComponents: [
        EditRouteDialogComponent,
    ],
    exports: [
        RoutesListComponent,
    ]
})
export class RoutesListModule
{

}
