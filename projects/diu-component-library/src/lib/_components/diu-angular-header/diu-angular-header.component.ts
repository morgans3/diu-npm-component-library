import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { iSystemAlerts } from "../../_models/header.interface";
import { SystemAlertDialogComponent } from "./dialogs/systemalertdialog.component";

/**
 * DIU Angular Header Component Class
 */
@Component({
    selector: "lib-diu-angular-header",
    templateUrl: "diu-angular-header.component.html",
    styles: [],
})
export class DiuAngularHeaderComponent implements OnInit, OnChanges {
    /**
     * Input array of all the Alerts for the Platform
     */
    @Input() alerts: iSystemAlerts[] = [];
    /**
     * Input for the Application Name
     */
    @Input() strAppName: string;
    /**
     * Input for the Application Landing page
     */
    @Input() strHome: string;
    /**
     * Input of the logged in person's JWT
     */
    @Input() tokenDecoded: any;
    /**
     * Event to notify the parent container to logout
     */
    @Output() endSession = new EventEmitter<boolean>();
    /**
     * Event to notify the parent container that the sidebar should change size
     */
    @Output() changeSidebar = new EventEmitter<boolean>();
    /**
     * Array of all the Alerts for the Platform
     */
    arrAlerts: iSystemAlerts[] = [];
    /**
     * Toggle to show if there are active alerts
     */
    boolActiveAlerts = false;
    /**
     * Toggle to show if there are outstanding tasks
     */
    boolOutstandingTasks = false;
    /**
     * Toggle to show if there are unread messages
     */
    boolUnread = false;
    /**
     * Logged in person's display name
     */
    strDisplayName = "Guest";
    /**
     * Logged in person's username
     */
    strUsername = "Guest";

    /**
     * Class Constructor
     *
     * @param dialog Injected Handler for Material Dialog Library
     */
    constructor(
        /**
         * Injected Handler for Material Dialog Library
         */
        public dialog: MatDialog,
        /**
         * Injected Handler for Angular routing
         */
        private router: Router
    ) {}

    /**
     * Angular Life Cycle event that is called when the component is created
     */
    ngOnInit() {
        if (this.tokenDecoded) {
            this.strUsername = this.tokenDecoded.username;
            this.strDisplayName = this.tokenDecoded.name;
        }
        this.checkInputs();
    }

    /**
     * Angular Life Cycle event that is called when the Inputs change
     */
    ngOnChanges() {
        if (this.tokenDecoded && this.tokenDecoded.username !== this.strUsername) {
            this.strUsername = this.tokenDecoded.username;
            this.strDisplayName = this.tokenDecoded.name;
        }
        this.checkInputs();
    }

    /**
     * Function to check the input arrays and update the lists that require it
     */
    checkInputs() {
        if (this.alerts !== this.arrAlerts) {
            this.setAlerts();
        }
    }

    /**
     * Function to calculate the css class on a message depending on whether it has been read
     */
    getClass(message: any) {
        return message.acknowledgeddate ? "round round-primary" : "round round-info";
    }

    /**
     * Notifies the parent component that the application should logout
     */
    logout() {
        this.endSession.emit(true);
    }

    /**
     * Navigates to the profile page (if available)
     */
    profile() {
        this.router.navigate(["/profile"]);
    }

    /**
     * Launches the Alert Dialog Modal
     */
    launchAlertPopup(alert: iSystemAlerts) {
        this.dialog.open(SystemAlertDialogComponent, {
            width: "350px",
            data: alert,
        });
    }

    /**
     * Sets the list of alerts
     */
    setAlerts() {
        this.arrAlerts = [];
        this.boolActiveAlerts = this.alerts.length > 0;
        if (this.boolActiveAlerts) {
            this.arrAlerts = this.alerts;
        }
    }

    /**
     * Notify the parent container that the sidebar should change size
     */
    toggleSidebar() {
        this.changeSidebar.emit(true);
    }
}
