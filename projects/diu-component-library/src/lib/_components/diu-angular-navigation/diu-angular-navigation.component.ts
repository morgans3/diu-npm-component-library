import { Component, Inject, Input, OnChanges, OnInit } from "@angular/core";
import { iMenu } from "../../_models/menu-items.interface";

@Component({
    selector: "lib-diu-angular-navigation",
    templateUrl: "./diu-angular-navigation.component.html",
    styleUrls: ["./diu-angular-navigation.component.scss"],
})
export class DiuAngularNavigationComponent implements OnInit, OnChanges {
    @Input() menuItems: iMenu[];
    @Input() isMinisidebar = false;
    minisidebar = false;
    shownMenuItems: iMenu[] = [];
    url = "";

    constructor(@Inject("environment") environment) {
        this.url = environment.websiteURL;
    }

    ngOnChanges() {
        this.shownMenuItems = this.menuItems;
        this.minisidebar = this.isMinisidebar;
    }

    ngOnInit() {
        this.shownMenuItems = this.menuItems;
        this.minisidebar = this.isMinisidebar;
    }

    navHome() {
        window.open("https://www." + this.url + "/dashboard", "_self");
    }

    nonsubChildren(children) {
        return children.filter((x) => x.type !== "sub");
    }

    subChildren(children) {
        return children.filter((x) => x.type === "sub");
    }
}
