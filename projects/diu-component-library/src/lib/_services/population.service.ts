import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./_baseclass.service";
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
export class PopulationService extends BaseService {
    miniUrl = "";
    /**
     * Population Service Constructor
     */
    constructor(protected http: HttpClient) {
        super(http);
        const origin: string = window.location.href;
        this.baseUrl = this.combineURL(origin, "population");
        this.miniUrl = this.combineURL(origin, "popmini");
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
     * GET: Method to retrieve mini cross filter data
     */
    public getMiniCFServer() {
        return this.http.get(this.miniUrl + "dataset/getCrossfilter/");
    }

    /**
     * GET: Method to retrieve comparison data
     */
    public getComparison(payload) {
        return this.http.post(this.baseUrl + "dataset/getComparison/", payload);
    }
}
