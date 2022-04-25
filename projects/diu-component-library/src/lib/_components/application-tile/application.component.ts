import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { iApplication, iInstallation } from "../../_models/installations.interface";
import { ApplicationInfoDialogComponent } from "./dialoginformation";
import jwt_decode from "jwt-decode";

@Component({
  selector: "app-application-tile",
  templateUrl: "./application.component.html",
  styleUrls: ["./application.component.scss"],
})
export class ApplicationTileComponent implements OnInit {
  config: any;
  @Input() thisApp: iApplication;
  @Input() thisInstallation?: iInstallation;
  @Input() teamInstall?: boolean;
  @Output() appStatusChange = new EventEmitter<boolean>();
  tokenDecoded: any;
  status: any;

  constructor(public dialog: MatDialog) {
    const token = localStorage.getItem("@@STATE");
    if (token) {
      const jsonToken = JSON.parse(token);
      const myToken = jsonToken.stateauth.token;
      this.tokenDecoded = jwt_decode(myToken);
    }
  }

  ngOnInit() {
    if (this.thisInstallation) {
      if (this.thisInstallation.approveddate) {
        this.status = "Installed";
      } else {
        this.status = "Requested";
      }
    } else if (this.teamInstall) {
      this.status = "Installed";
    }
  }

  image() {
    return "/assets/images/" + this.thisApp.icon;
  }

  showInformation() {
    const dialogApp = this.dialog.open(ApplicationInfoDialogComponent, {
      width: "60%",
      data: this.thisApp,
    });
    dialogApp.afterClosed().subscribe((decision: any) => {
      if (decision && decision.choice === "install") {
        this.status = "Installed";
        this.appStatusChange.emit(true);
      }
    });
  }

  appAction() {
    if (this.thisApp.url) {
      if (this.status === "Installed") {
        window.open(this.thisApp.url, "_self");
      } else {
        this.showInformation();
      }
    }
  }

  showUserGuide() {
    window.open(this.thisApp.userguideURL, "_blank");
  }

  uninstallApplication() {
    if (!this.teamInstall) {
      // this.applicationService.archiveInstallation(this.thisInstallation).subscribe((res: any) => {
      //   if (!res.err) {
      //     this.appStatusChange.emit(true);
      //   }
      // });
    }
  }
}
