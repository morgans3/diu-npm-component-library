import { Component, OnInit } from "@angular/core";
import jwt_decode from "jwt-decode";
import { cDisplayListsHandler, iDisplayListConfig } from "../../_models/componentHandler";

@Component({
    selector: "app-profile-teams",
    templateUrl: "./profile-teams.component.html",
})
export class ProfileTeamsComponent implements OnInit {
    config: any;
    _Handler: cDisplayListsHandler;
    tokenDecoded: any;
    displayListsLoaded = false;
    teams: any[] = [];
    memberships: any[] = [];

    constructor() {
        const token = localStorage.getItem("@@STATE");
        if (token) {
            const jsonToken = JSON.parse(token);
            const myToken = jsonToken.stateauth.token;
            this.tokenDecoded = jwt_decode(myToken);
            this.teams = jsonToken.statereference.teams;
            this.memberships = this.tokenDecoded.memberships;
        }
    }

    ngOnInit() {
        if (this.config) {
            this._Handler = new cDisplayListsHandler(this.config);
            this._Handler.displayLists.forEach((list: iDisplayListConfig) => {
                this.getList(list);
            });
        }
    }

    getList(list: iDisplayListConfig) {
        // this.applicationService.genericGetAPICall(list.getAllEndpoint).subscribe((allInfo: iApplication[]) => {
        // this.applicationService.genericGetAPICall(list.getByUsernameEndpoint + this.tokenDecoded.username).subscribe((userInfo: iInstallation[]) => {
        list.displayConfigData = this.updateX(this.memberships, this.teams);
        this.displayListsLoaded = true;
        // });
        //});
    }

    updateX(selectList: any[], fullList: any[]) {
        const output = [];
        fullList.forEach((app) => {
            const exists = selectList.find((x) => x.teamcode === app.code);
            if (exists) {
                const newApp = {
                    description: app.description || "",
                    status: null,
                    name: app.name,
                    code: app.code,
                };
                output.push(newApp);
            }
        });
        return output;
    }
}
