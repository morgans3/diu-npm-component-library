import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./_baseclass.service";
declare var window: any;

@Injectable({
  providedIn: "root",
})
export class InterfaceService extends BaseService {
  constructor(protected http: HttpClient) {
    super(http);
    const parsedUrl = window.location.href;
    const origin = parsedUrl;
    this.baseUrl = this.combineURL(origin, "interface");
  }

  /**
   * POST: Method to create a token if the JWT is authorised to include in other calls
   */
  public authenticate() {
    return this.http.post(this.baseUrl + "gpinpatients/authenticate", null);
  }

  /**
   * POST: Method to retrieve inpatient count
   */
  public inpatientCounts(token: string) {
    return this.http.post(this.baseUrl + "gpinpatients/inpatientcounts", {
      token: token,
    });
  }

  /**
   * POST: Method to retrieve outpatient count
   */
  public outpatientCounts(token: string) {
    return this.http.post(this.baseUrl + "gpinpatients/outpatientcounts", {
      token: token,
    });
  }

  /**
   * POST: Method to retrieve accident & emergency patient count
   */
  public aeCounts(token: string) {
    return this.http.post(this.baseUrl + "gpinpatients/aecounts", {
      token: token,
    });
  }

  /**
   * POST: Method to retrieve enhanced care service patient count
   */
  public ecsCounts(token: string) {
    return this.http.post(this.baseUrl + "gpinpatients/ecscounts", {
      token: token,
    });
  }

  /**
   * POST: Method to retrieve enhanced primary care patient count
   */
  public epcCounts(token: string) {
    return this.http.post(this.baseUrl + "gpinpatients/epccounts", {
      token: token,
    });
  }

  /**
   * POST: Method to retrieve inpatient GP summary
   */
  public inpatientGPSummary(token: string) {
    return this.http.post(this.baseUrl + "gpinpatients/inpatientgpsummary", {
      token: token,
    });
  }

  /**
   * POST: Method to retrieve Accident & Emergency GP summary
   */
  public aeGPSummary(token: string) {
    return this.http.post(this.baseUrl + "gpinpatients/aegpsummary", {
      token: token,
    });
  }
}
