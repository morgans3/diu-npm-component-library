import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./_baseclass.service";
/**
 * Reference to Browser Window
 */
declare const window: any;

/**
 * Population Management Service Class
 */
@Injectable({
    providedIn: "root",
})
export class PopulationManagementService extends BaseService {
    /**
     * Lab Test Service Constructor
     */
    constructor(protected http: HttpClient) {
        super(http);
        const origin: string = window.location.href;
        this.baseUrl = this.combineURL(origin, "crossfilter");
    }

    /**
     * GET: Method to retrieve all population data
     */
    public get() {
        return this.http.get(this.baseUrl + "dataset/getAll/");
    }

    /**
     * GET: Method to retrieve all cross filter data
     */
    public getCFServer() {
        return this.http.get(this.baseUrl + "dataset/getCrossfilter/");
    }

    /**
     * GET: Method to retrieve comparison data
     */
    public getComparison(payload) {
        return this.http.post(this.baseUrl + "dataset/getComparison/", payload);
    }
}
