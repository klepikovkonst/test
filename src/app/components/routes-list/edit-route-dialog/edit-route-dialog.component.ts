import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Route } from 'src/app/models/route.model';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'edit-route-dialog',
    templateUrl: './edit-route-dialog.component.html',
    styleUrls: ['./edit-route-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditRouteDialogComponent
{
    updating$ = new BehaviorSubject<boolean>(false);
    title = 'Параметры статического маршрута';
    route: Route;

    constructor(
        private dialog: MatDialogRef<EditRouteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data: {title?: string, route: Route},
        private apiService: ApiService,
        private snackBar: MatSnackBar,
    )
    {
        if (data.title) {
            this.title = data.title;
        }
        
        this.route = data.route;
    }

    save(route: Route)
    {
        this.updating$.next(true);
        this.apiService.editRoute(this.route.uuid, {...route}).pipe(
            finalize(() => this.updating$.next(false))
        ).subscribe(response => {
            if (response.successful) {
                this.snackBar.open(response.message, 'Done', {duration: 10000});
                this.dialog.close(true);
            } else {
                this.snackBar.open(response.message, 'Error', {duration: 10000, panelClass: ['mat-warn']});
            }
        });
    }

    delete()
    {
        this.updating$.next(true);
        this.apiService.deleteRoute(this.route.uuid).pipe(
            finalize(() => this.updating$.next(false))
        ).subscribe(response => {
            if (response.successful) {
                this.snackBar.open(response.message, 'Done', {duration: 10000});
                this.dialog.close(true);
            } else {
                this.snackBar.open(response.message, 'Error', {duration: 10000, panelClass: ['mat-warn']});
            }
        });
    }
}
