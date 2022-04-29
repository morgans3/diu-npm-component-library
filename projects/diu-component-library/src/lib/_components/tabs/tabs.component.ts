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
     * Handler is a class containing functionality for making this component work
     */
    Handler: cTabHandler;

    /**
     * This is a boolean that determins if the tabs are going to be output above or to the left of the content
     */
    leftTabGroup = false;

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
        this.Handler = new cTabHandler(this.config);
        if (this.Handler.leftTabGroup) this.leftTabGroup = this.Handler.leftTabGroup;
        if (this.Handler.tabs) this.tabs = this.Handler.tabs;
    }
}
