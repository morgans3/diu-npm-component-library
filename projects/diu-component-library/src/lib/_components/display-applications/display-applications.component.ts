import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { iDisplayList } from "../../_models/installations.interface";

/**
 * Display Application Component Class
 */
@Component({
    selector: "display-applications",
    templateUrl: "./display-applications.component.html",
    styles: [],
})
export class DisplayApplicationsComponent implements OnInit, OnChanges {
    /**
     * Array of items to display in List
     */
    @Input() applicationData: iDisplayList[];
    /**
     * Title of List
     */
    @Input() applicationTitle = "";

    /**
     * Event for notifying parent that an item in the list needs to be removed
     */
    @Output() removeAppData = new EventEmitter<any>();
    /**
     * Event for notifying parent that an item in the list needs to be installed
     */
    @Output() requestAppData = new EventEmitter<any>();

    /**
     * Display Application Component Constructor
     */
    constructor(private router: Router) {}

    /**
     * Function that runs when inputs are changed
     */
    ngOnChanges() {
        if (this.applicationData && this.applicationData.length > 0) {
            this.sortData();
        }
    }

    /**
     * Function that runs when the component is initialised
     */
    ngOnInit() {}

    /**
     * Data to be emitted when the remove app button is clicked
     *
     * @param app
     */
    removeApp(app: iDisplayList) {
        this.removeAppData.emit(app);
    }

    /**
     * Data to be emitted when the request app button is clicked
     *
     * @param app
     */
    requestApp(app: iDisplayList) {
        this.requestAppData.emit(app);
    }

    sortData() {
        this.applicationData.sort((a, b) => {
            const textA = a.name.toUpperCase();
            const textB = b.name.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
    }

    moreInformation(app: any) {
        console.log(app);
        this.router.navigate(["Team", app.code]);
    }
}
