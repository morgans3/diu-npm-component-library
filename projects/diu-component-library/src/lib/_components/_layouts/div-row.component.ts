import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { cComponentHandler, fetchChildren } from "../../_models/componentHandler";
import { APIService } from "../../_services/api.service";
/**
 * Div Row Component Class
 */
@Component({
    selector: "app-divrow",
    template: `
        <ng-template #myComponentTemplate>
            <div>
                <ng-content></ng-content>
            </div>
            <div fxLayout="row wrap" *ngIf="Handler">
                <ng-container *ngFor="let child of Handler.children" dynamicComponent [config]="child.config"></ng-container>
            </div>
        </ng-template>
        <ng-container *ngTemplateOutlet="myComponentTemplate"></ng-container>
    `,
})
export class DivRowComponent implements OnInit {
    /**
     * Initialise Config
     */
    config: any;
    Handler: cComponentHandler;

    /**
     * Constructor Function
     */
    constructor(private apiService: APIService, private changeDetection: ChangeDetectorRef) {}

    /**
     * Initialisation Function
     */
    ngOnInit() {
        this.Handler = new cComponentHandler(this.config);
        if (this.Handler.config.children && this.Handler.config.children.length > 0) {
            fetchChildren(this.Handler.config.children, this.apiService).then((result: any) => {
                this.Handler.children = result;
                this.changeDetection.detectChanges();
            });
        }
    }
}
