import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./_baseclass.service";
/**
 * Reference to Browser Window
 */
declare var window: any;

/**
 * Results Service Class
 */
@Injectable({
  providedIn: "root",
})
export class ResultsService extends BaseService {
  /**
   * Results Service Constructor
   */
  constructor(protected http: HttpClient) {
    super(http);
    const origin = window.location.href;
    this.baseUrl = this.combineURL(origin, "results");
  }

  /**
   * GET: Method to retrieve all Outbreak map information
   */
  public getOutbreakGeoJson() {
    return this.http.get(this.baseUrl + "outbreak/mapinfo");
  }

  /**
   * GET: Method to retrieve all Postcode map lookups
   */
  public getPostcodeLookup() {
    return this.http.get(this.baseUrl + "tpindex/getPostcodeLookup/");
  }

  /**
   * GET: Method to retrieve cross filter
   */
  public getCFServer() {
    return this.http.get(this.baseUrl + "tpindex/getCrossfilter/");
  }

  /**
   * GET: Method to rebuild and retrieve new cross filter
   */
  public rebuildCFServer() {
    return this.http.get(this.baseUrl + "tpindex/rebuildCrossfilter/");
  }
}
