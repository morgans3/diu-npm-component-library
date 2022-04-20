import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./_baseclass.service";
/**
 * Reference to Browser Window
 */
declare var window: any;

/**
 * SQL API Service Class
 */
@Injectable({
  providedIn: "root",
})
export class SQLApiService extends BaseService {
  /**
   * SQL API Service Constructor
   */
  constructor(protected http: HttpClient) {
    super(http);
    const origin = window.location.href;
    this.baseUrl = this.combineURL(origin, "sqlapi");
  }

  /**
   * GET: Method to retrieve all Wards
   */
  public getWards() {
    return this.http.get(this.baseUrl + "wards/getAll");
  }

  /**
   * GET: Method to retrieve all GP Practices
   */
  public getGPPractices() {
    return this.http.get(this.baseUrl + "gppractices/getAll");
  }

  /**
   * GET: Method to retrieve all shielding citizens
   */
  public getCitizens() {
    return this.http.get(this.baseUrl + "shielding/getCitizens");
  }
}
