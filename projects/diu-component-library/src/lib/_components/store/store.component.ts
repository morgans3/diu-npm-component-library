import { Component, OnInit } from "@angular/core";
import { iApplication, iInstallation } from "../../_models/installations.interface";
import jwt_decode from "jwt-decode";
import { cStoreHandler } from "../../_models/componentHandler";
import { APIService } from "../../_services/api.service";

export interface iAppContainer {
    app: iApplication;
    install?: iInstallation;
    teaminstall?: boolean;
}

@Component({
    selector: "app-appstore",
    templateUrl: "./store.component.html",
})
export class AppstoreComponent implements OnInit {
    config: any;
    Handler: cStoreHandler;

    tokenDecoded: any;
    InstalledApps: iAppContainer[] = [];
    RequestedApps: iAppContainer[] = [];
    TeamApps: iAppContainer[] = [];
    Apps: iApplication[] = [];
    AppStore: iAppContainer[] = [];

    constructor(private apiService: APIService) {
        const token = localStorage.getItem("@@STATE");
        if (token) {
            const jsonToken = JSON.parse(token);
            const myToken = jsonToken.stateauth.token;
            this.tokenDecoded = jwt_decode(myToken);
        }
    }

    ngOnInit() {
        this.Handler = new cStoreHandler(this.config);
        this.loadAllApps();
    }

    reloadApps() {
        this.loadAllApps();
    }

    loadTeamApps() {
        this.TeamApps = [];
        if (this.tokenDecoded.memberships && this.tokenDecoded.memberships.length > 0) {
            const myteams: any[] = this.tokenDecoded.memberships;
            myteams.forEach((x) => {
                this.apiService
                    .genericGetAPICallByParam(this.Handler.getInstallsByTeamcodeEndpoint, x.teamcode)
                    .subscribe((res: iInstallation[]) => {
                        if (res.length > 0) {
                            res.forEach((install: iInstallation) => {
                                const apparray = this.AppStore.filter((y) => y.app.name === install.app_name);
                                if (apparray.length > 0) {
                                    const app = apparray[0];
                                    app.install = install;
                                    if (install.approveddate) {
                                        const requestedIndex = this.RequestedApps.indexOf(app);
                                        if (requestedIndex > -1) {
                                            this.RequestedApps.splice(requestedIndex, 1);
                                        }
                                        const installedIndex = this.InstalledApps.indexOf(app);
                                        if (installedIndex === -1) {
                                            this.TeamApps.push(app);
                                            this.AppStore.splice(this.AppStore.indexOf(apparray[0]), 1);
                                        }
                                    }
                                }
                            });
                            this.TeamApps = this.sortApps(this.TeamApps);
                        }
                    });
            });
        }
    }

    loadMyApps() {
        this.InstalledApps = [];
        this.RequestedApps = [];
        this.apiService
            .genericGetAPICallByParam(this.Handler.getInstallsByUsernameEndpoint, this.tokenDecoded.username)
            .subscribe((res: iInstallation[]) => {
                if (res.length > 0) {
                    res.forEach((install: iInstallation) => {
                        const apparray = this.AppStore.filter((x) => x.app.name === install.app_name);
                        if (apparray.length > 0) {
                            const app = apparray[0];
                            app.install = install;
                            if (install.approveddate) {
                                this.InstalledApps.push(app);
                            } else {
                                this.RequestedApps.push(app);
                            }
                            this.AppStore.splice(this.AppStore.indexOf(apparray[0]), 1);
                        }
                    });
                    this.InstalledApps = this.sortApps(this.InstalledApps);
                    this.RequestedApps = this.sortApps(this.RequestedApps);
                }
                this.loadTeamApps();
            });
    }

    loadAllApps() {
        this.InstalledApps = [];
        this.RequestedApps = [];
        this.TeamApps = [];
        this.Apps = [];
        this.AppStore = [];
        this.apiService.genericGetAPICall(this.Handler.getAllStoreEndpoint).subscribe((res: iApplication[]) => {
            this.Apps = res;
            this.AppStore = this.container(res);
            this.loadMyApps();
        });
    }

    container(apps: iApplication[]): iAppContainer[] {
        const response: iAppContainer[] = [];
        apps.forEach((app) => {
            response.push({ app });
        });
        return response;
    }

    sortApps(list: iAppContainer[]) {
        const output = list.sort((a, b) => (a.app.name > b.app.name ? 1 : b.app.name > a.app.name ? -1 : 0));
        return output;
    }
}
