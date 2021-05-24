import { Component, ChangeDetectionStrategy, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Route } from '../../models/route.model';

@Component({
    selector: 'route-form',
    templateUrl: './route-form.component.html',
    styleUrls: ['./route-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteFormComponent implements OnChanges
{
    form: FormGroup

    @Input() route: Route | null = null;
    @Input() readonly: boolean | null = false;

    constructor(
        private formBuilder: FormBuilder,
    )
    {
        this.form = this.formBuilder.group({
            address: ['', Validators.required],
            mask: ['', Validators.required],
            gateway: ['', Validators.required],
            interface: ['']
        });
    }

    ngOnChanges(changes: SimpleChanges)
    {
        if (changes.route && changes.route.currentValue) {
            this.updateFormByRoute();
        }

        if (changes.readonly) {
            if (this.readonly) {
                this.form.disable()
            } else {
                this.form.enable();
            }
        }
    }

    updateFormByRoute(): void
    {
        if (this.route) {
            const {uuid, ...route} = this.route;
            this.form.patchValue(route)
        }
    }

    updateRouteByForm(): Route
    {
        return new Route(this.form.value);
    }
}
