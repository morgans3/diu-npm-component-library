import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { CrossFilterService } from "./_crossfilterclass.service";

/**
 * Reference to Browser Window
 */
declare const window: any;

/**
 * Population Service Class
 */
@Injectable({
    providedIn: "root",
})
export class OutbreakService extends CrossFilterService {
    /**
     * Outbreak Service Constructor
     */
    constructor(protected http: HttpClient, @Inject("environment") environment) {
        super(http, environment);
        const origin: string = window.location.href;
        this.baseUrl = this.combineURL(origin, "outbreak");
    }
}
