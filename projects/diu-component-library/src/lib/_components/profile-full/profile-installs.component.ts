import { Component, OnInit } from "@angular/core";
import jwt_decode from "jwt-decode";
import { generateID } from "../../_functions/helper_functions";
import { cDisplayListsHandler, iDisplayListConfig } from "../../_models/componentHandler";
import { iApplication, iInstallation } from "../../_models/installations.interface";
import { APIService } from "../../_services/api.service";

@Component({
    selector: "app-profile-installs",
    templateUrl: "./profile-installs.component.html",
})
export class ProfileInstallsComponent implements OnInit {
    config: any;
    Handler: cDisplayListsHandler;
    tokenDecoded: any;
    displayListsLoaded = false;
    installationlist: iInstallation[] = [];

    constructor(private apiService: APIService) {
        const token = localStorage.getItem("@@STATE");
        if (token) {
            const jsonToken = JSON.parse(token);
            const myToken = jsonToken.stateauth.token;
            this.tokenDecoded = jwt_decode(myToken);
        }
    }

    ngOnInit() {
        if (this.config) {
            this.Handler = new cDisplayListsHandler(this.config);
            console.log(this.Handler);
            this.Handler.displayLists.forEach((list: iDisplayListConfig) => {
                this.getList(list);
            });
        }
    }

    getList(list: iDisplayListConfig) {
        this.apiService.genericGetAPICall(list.getAllEndpoint).subscribe((allInfo: iApplication[]) => {
            const url: string = list.getAllEndpoint + (this.tokenDecoded.username as string);
            this.apiService.genericGetAPICall(url).subscribe((userInfo: iInstallation[]) => {
                list.displayConfigData = this.updateX(userInfo, allInfo);
                this.displayListsLoaded = true;
            });
        });
    }

    updateX(installs: iInstallation[], fullList: iApplication[]) {
        installs.forEach((ins) => {
            this.installationlist.push(ins);
        });
        const output = [];
        fullList.forEach((app) => {
            const newApp = {
                status: null,
                name: app.name,
            };
            const install = installs.find((x) => x.app_name === app.name);
            if (install) {
                if (install.approveddate) {
                    newApp.status = "Installed";
                } else {
                    newApp.status = "Requested";
                }
            } else {
                newApp.status = "";
            }
            output.push(newApp);
        });
        return output;
    }

    install(app, title) {
        const newId = generateID();
        const newInstall: iInstallation = {
            app_name: app.name,
            id: newId,
            requestdate: new Date(),
            requestor: this.tokenDecoded.username,
            requestapprover: this.tokenDecoded.username,
            approveddate: new Date(),
            username: this.tokenDecoded.username,
        };
        const selectedList = this.Handler.displayLists.find((x) => x.title === title);
        if (selectedList) {
            this.apiService.genericPostAPICall(selectedList.registerEndpoint, newInstall).subscribe((res: any) => {
                if (res.err) {
                    console.log(res.err);
                } else {
                    this.installationlist.push(newInstall);
                    app.status = "Installed";
                }
            });
        }
    }

    remove(app, title) {
        const install = this.installationlist.find((x) => x.app_name === app.name);
        const selectedList = this.Handler.displayLists.find((x) => x.title === title);
        if (selectedList) {
            this.apiService.genericPostAPICall(selectedList.removeEndpoint, install).subscribe((res: any) => {
                if (res.err) {
                    console.log(res.err);
                } else {
                    this.installationlist.splice(this.installationlist.indexOf(install), 1);
                    app.status = "";
                }
            });
        }
    }
}
