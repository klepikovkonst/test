import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Route } from '../../models/route.model';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'new-route',
    templateUrl: './new-route.component.html',
    styleUrls: ['./new-route.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewRouteComponent
{
    updating$ = new BehaviorSubject(false);

    @Output() onUpdate = new EventEmitter<void>();

    constructor(
        private apiService: ApiService,
        private snackBar: MatSnackBar,
    ) {}

    add(route: Route)
    {
        this.updating$.next(true);
        this.apiService.addRoute({...route}).pipe(
            finalize(() => this.updating$.next(false))
        ).subscribe(response => {
            if (response.successful) {
                this.onUpdate.emit();
                this.snackBar.open(response.message, 'Done', {duration: 10000});
            } else {
                this.snackBar.open(response.message, 'Error', {duration: 10000, panelClass: ['mat-warn']});
            }
        });
    }
}
