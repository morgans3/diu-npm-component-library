import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { cLayoutHandler, fetchChildren } from "../../_models/componentHandler";
import { APIService } from "../../_services/api.service";

/**
 * Div Column Component Class
 */
@Component({
    selector: "app-divcol",
    template: `
        <div [fxFlex.gt-sm]="Handler.colsize" fxFlex.gt-xs="100" fxFlex="100">
            <ng-container *ngFor="let child of Handler.children" dynamicComponent [config]="child.config"></ng-container>
        </div>
    `,
})
export class DivColComponent implements OnInit {
    /**
     * Initialise Config
     */
    config: any;
    Handler: cLayoutHandler;

    /**
     * Constructor Function
     */
    constructor(private apiService: APIService, private changeDetection: ChangeDetectorRef) {}

    /**
     * Initialisation Function
     */
    ngOnInit() {
        this.Handler = new cLayoutHandler(this.config);
        if (this.Handler.config.children && this.Handler.config.children.length > 0) {
            fetchChildren(this.Handler.config.children, this.apiService).then((result: any) => {
                this.Handler.children = result;
                this.changeDetection.detectChanges();
            });
        }
    }
}
