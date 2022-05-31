import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { APIService } from "../../_services/api.service";
import { iApplication } from "../../_models/installations.interface";
import { ApplicationInfoDialogComponent } from "./dialoginformation";
import { iUserProfile } from "../../_models/user.interface";
import { getUser } from "../../_functions/helper_functions";

@Component({
    selector: "app-application-tile",
    templateUrl: "./application.component.html",
    styleUrls: ["./application.component.scss"],
})
export class ApplicationTileComponent implements OnInit {
    user: iUserProfile;
    @Input() app: iApplication;
    @Input() status: string;
    @Output() changed = new EventEmitter<any>();

    constructor(public dialog: MatDialog, private apiService: APIService) {}

    ngOnInit() {
        // Set user
        this.user = getUser();
    }

    open() {
        if (this.app.url) {
            if (this.status === "installed") {
                window.open(this.app.url, "_self");
            } else {
                this.openInformationModal();
            }
        }
    }

    openInformationModal() {
        // Open information dialog
        const dialogApp = this.dialog.open(ApplicationInfoDialogComponent, {
            width: "40%",
            data: this.app,
        });

        // Listen for close
        dialogApp.afterClosed().subscribe((decision: any) => {
            if (decision && decision.choice === "install") {
                // Install app
                this.apiService
                    .createCapabiltiesLink(this.app.capability, `${this.user.username}#${this.user.organisation}`, "user", "allow")
                    .subscribe(
                        () => {
                            this.status = "installed";
                            this.changed.emit({ action: "installed", app: this.app });
                        },
                        () => {
                            window["notify"]({ message: "Could not install app", status: "error" });
                        }
                    );
            }
        });
    }

    openUserGuide() {
        window.open(this.app.userguideURL, "_blank");
    }

    uninstall() {
        this.apiService.deleteCapabilitiesLink(this.app.capability, `${this.user.username}#${this.user.organisation}`, "user").subscribe(
            () => {
                this.status = "uninstalled";
                this.changed.emit({ action: "uninstalled", app: this.app });
            },
            () => {
                window["notify"]({
                    message: "Could not uninstall app, this is likely because it's authorised by one of your teams/roles",
                    status: "error",
                });
            }
        );
    }
}
