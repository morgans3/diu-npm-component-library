import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { iApplication, iNewsFeed } from "../_models/installations.interface";
import { BaseService } from "./_baseclass.service";
import { iOrganisation } from "../_models/organisation.interface";
/**
 * Reference to Browser Window
 */
declare var window: any;

/**
 * Api Gateway Service Class
 */
@Injectable({ providedIn: "root" })
export class ApiGService extends BaseService {
  systemalertUrl;
  newsfeedUrl: string;

  /**
   * Api Gateway Service Constructor
   */
  constructor(
    /**
     * HTTP Request Handler
     */
    protected http: HttpClient
  ) {
    super(http);
    const parsedUrl = window.location.href;
    const origin = parsedUrl;
    this.baseUrl = this.combineURL(origin, "apig");
    this.systemalertUrl = this.baseUrl + "systemalerts/";
    this.newsfeedUrl = this.baseUrl + "newsfeeds/";
  }

  /**
   * GET: Method to retrieve news feeds
   */
  public getNewsFeeds() {
    return this.http.get(this.baseUrl + "newsfeeds/getAll/");
  }

  // System Alerts
  public getSystemAlerts() {
    return this.http.get(this.systemalertUrl + "getAll/");
  }
  public getActiveSystemAlerts() {
    return this.http.get(this.systemalertUrl + "getActive/");
  }
  public updateSystemAlert(payload: any, id: any) {
    return this.http.post(this.systemalertUrl + "update", payload);
  }
  public addSystemAlert(payload: any) {
    return this.http.post(this.systemalertUrl + "register/", payload);
  }

  public getApps() {
    return this.http.get(this.baseUrl + "publicapps/getAll/");
  }

  public addApp(payload: iApplication) {
    return this.http.post(this.baseUrl + "apps/register/", payload);
  }

  public updateApp(payload: iApplication) {
    return this.http.post(this.baseUrl + "apps/update", payload);
  }

  public archiveApp(payload: iApplication) {
    return this.http.post(this.baseUrl + "apps/delete", payload);
  }

  public addNewsFeed(payload: iNewsFeed) {
    return this.http.post(this.newsfeedUrl + "register/", payload);
  }
  public updateNewsFeed(payload: iNewsFeed) {
    return this.http.post(this.newsfeedUrl + "update", payload);
  }
  public archiveNewsFeed(payload: iNewsFeed) {
    return this.http.post(this.newsfeedUrl + "delete", payload);
  }

  public getOrganisations() {
    return this.http.get(this.baseUrl + "organisation/getAll");
  }

  public addOrganisation(payload: iOrganisation) {
    return this.http.post(this.baseUrl + "organisations/register/", payload);
  }

  public updateOrganisation(payload: iOrganisation) {
    return this.http.post(this.baseUrl + "organisations/update", payload);
  }
}
