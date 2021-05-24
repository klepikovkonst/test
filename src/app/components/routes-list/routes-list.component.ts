import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ApiService } from '../../services/api.service';
import { Route } from '../../models/route.model';
import { EditRouteDialogComponent } from './edit-route-dialog/edit-route-dialog.component';

@Component({
    selector: 'routes-list',
    templateUrl: './routes-list.component.html',
    styleUrls: ['./routes-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutesListComponent implements AfterViewInit
{
    loading$ = new BehaviorSubject<boolean>(true);
    displayedColumns = ['address', 'gateway', 'inteface'];
    dataSource!: MatTableDataSource<Route>;
    
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private apiService: ApiService,
        private dialog: MatDialog,
        private cdr: ChangeDetectorRef,
    ) {}

    editRoute(route: Route)
    {
        if (this.loading$.value) { return; }

        const dialogRef = this.dialog.open(EditRouteDialogComponent, {
            data: {
                route: route
            }
        });
        dialogRef.afterClosed().pipe(
            filter<boolean>(Boolean),
        ).subscribe(() => {
            this.updateRoutes();
        });
    }

    ngAfterViewInit()
    {
        this.updateRoutes();
    }

    updateRoutes()
    {
        this.loading$.next(true);
        this.apiService.getRoutes().subscribe(routes => {
            this.dataSource = new MatTableDataSource(routes);
            this.dataSource.sort = this.sort;
            this.cdr.detectChanges();
            this.loading$.next(false);
        });
    }
}
