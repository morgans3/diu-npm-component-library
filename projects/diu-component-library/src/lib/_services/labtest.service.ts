import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./_baseclass.service";
/**
 * Reference to Browser Window
 */
declare var window: any;

/**
 * Lab API Service Class
 */
@Injectable({
  providedIn: "root",
})
export class LabTestService extends BaseService {
  /**
   * Lab Test Service Constructor
   */
  constructor(protected http: HttpClient) {
    super(http);
    const origin = window.location.href;
    this.baseUrl = this.combineURL(origin, "mosaic");
  }

  /**
   * GET: Method to retrieve all Covid-19 Pathology tests
   */
  public getAllCOVIDTests() {
    return this.http.get(this.baseUrl + "labtests/getAll");
  }

  /**
   * GET: Method to retrieve all Covid-19 Pathology tests by NHS Number
   */
  public getCOVIDTestsByNHSNumber(nhsnumber: string) {
    return this.http.get(this.baseUrl + "labtests/getItemsByNHSNumber?nhsNumber=" + nhsnumber);
  }
}
