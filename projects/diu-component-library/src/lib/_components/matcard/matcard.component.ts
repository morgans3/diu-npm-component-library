import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { cComponentHandler, fetchChildren } from "../../_models/componentHandler";
import { APIService } from "../../_services/api.service";

/**
 * Mat Card Component Class for Form Inputs
 */
@Component({
    selector: "app-matcard",
    templateUrl: "matcard.component.html",
})
export class MatCardComponent implements OnInit {
    /**
     * Initialise iMatCardConfig
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
        if (this.config) {
            this.Handler = new cComponentHandler(this.config);
            if (this.Handler.config.children && this.Handler.config.children.length > 0) {
                fetchChildren(this.Handler.config.children, this.apiService).then((result: any) => {
                    this.Handler.children = result;
                    this.changeDetection.detectChanges();
                });
            }
        }
    }
}
