import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { cLayoutHandler, fetchChildren } from "../../_models/componentHandler";
import { APIService } from "../../_services/api.service";

/**
 * Div Column Component Class
 */
@Component({
    selector: "app-divcol",
    template: `
        <div [fxFlex.gt-sm]="_Handler.colsize" fxFlex.gt-xs="100" fxFlex="100">
            <ng-container *ngFor="let child of _Handler.children" dynamicComponent [config]="child.config"></ng-container>
        </div>
    `,
})
export class DivColComponent implements OnInit {
    /**
     * Initialise Config
     */
    config: any;
    _Handler: cLayoutHandler;

    /**
     * Constructor Function
     */
    constructor(private apiService: APIService, private changeDetection: ChangeDetectorRef) {}

    /**
     * Initialisation Function
     */
    ngOnInit() {
        this._Handler = new cLayoutHandler(this.config);
        if (this._Handler.config.children && this._Handler.config.children.length > 0) {
            fetchChildren(this._Handler.config.children, this.apiService).then((result: any) => {
                this._Handler.children = result;
                this.changeDetection.detectChanges();
            });
        }
    }
}
