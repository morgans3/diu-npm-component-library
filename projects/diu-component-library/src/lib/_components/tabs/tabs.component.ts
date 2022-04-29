import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { cTabHandler, iTabDetails } from "../../_models/componentHandler";

@Component({
    selector: "tab-component",
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
/**
 * Tabs Component Class
 */
export class TabsComponent implements OnInit {
    /**
     * config is the data to be passed through to the handler
     */
    config: any;

    /**
     * _Handler is a class containing functionality for making this component work
     */
    _Handler: cTabHandler;

    /**
     * This is a boolean that determins if the tabs are going to be output above or to the left of the content
     */
    leftTabGroup: boolean = false;

    /**
     * tabs contains data for each tab to be displayed, this includes the label and the components to be contained
     */
    tabs: iTabDetails[] = [];

    /**
     * Class constructor function
     */
    constructor() {}

    /**
     * Angular Life-cycle hook that is executed when the dynamic form component is initialized
     */
    ngOnInit() {
        this._Handler = new cTabHandler(this.config);
        if (this._Handler.leftTabGroup) this.leftTabGroup = this._Handler.leftTabGroup;
        if (this._Handler.tabs) this.tabs = this._Handler.tabs;
    }
}
