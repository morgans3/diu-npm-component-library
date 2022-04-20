import { Component, Inject, Input, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DynamicApiService } from "../../_services/dynapi.service";
import jwt_decode from "jwt-decode";
import { generateID } from "../../_functions/helper_functions";
import { iApplication, iInstallation } from "../../_models/installations.interface";

@Component({
  selector: "dialog-information",
  templateUrl: "dialoginformation.html",
})
export class ApplicationInfoDialogComponent implements OnInit {
  @Input() config: any;
  tokenDecoded: any;
  loadedData: iApplication;

  constructor(public dialogRef: MatDialogRef<ApplicationInfoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: iApplication, private applicationService: DynamicApiService) {
    const token = localStorage.getItem("@@STATE");
    if (token) {
      const jsonToken = JSON.parse(token);
      const myToken = jsonToken.stateauth.token;
      this.tokenDecoded = jwt_decode(myToken);
    }
    if (data) {
      this.loadedData = data;
    }
  }

  ngOnInit() {
    if (!this.loadedData && this.config) this.loadedData = JSON.parse(this.config);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  installApp() {
    const newInstall: iInstallation = {
      app_name: this.data.name,
      _id: generateID(),
      requestdate: new Date(),
      requestor: this.tokenDecoded.username,
      requestapprover: "n/a",
      approveddate: new Date(),
      username: this.tokenDecoded.username,
    };
    this.applicationService.addInstallation(newInstall).subscribe((res: any) => {
      if (!res.err) {
        this.dialogRef.close({ choice: "install" });
      }
    });
  }
}
