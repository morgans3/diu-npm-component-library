import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { iApplication, iInstallation, iNewsFeed } from "../_models/installations.interface";
import { BaseService } from "./_baseclass.service";
import { iOrganisation } from "../_models/organisation.interface";
/**
 * Reference to Browser Window
 */
declare var window: any;

/**
 * Dynamic API Service Class
 */
@Injectable({ providedIn: "root" })
export class DynamicApiService extends BaseService {
  teameventUrl;
  systemalertUrl;
  dashboardinstallsUrl;
  installationUrl: string;
  installationActionsUrl: string;
  newsfeedUrl: string;
  /**
   * Dynamic API Service Constructor
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
    this.baseUrl = this.combineURL(origin, "dynapi");
    this.teameventUrl = this.baseUrl + "teamevents/";
    this.systemalertUrl = this.baseUrl + "systemalerts/";
    this.dashboardinstallsUrl = this.baseUrl + "dashboardinstalls/";
    this.installationUrl = this.baseUrl + "installations/";
    this.installationActionsUrl = this.baseUrl + "installationactions/";
    this.newsfeedUrl = this.baseUrl + "newsfeeds/";
  }

  /**
   * Method to get Payloads by ID
   */
  public getPayloadById(payloadID) {
    return this.http.get(this.baseUrl + "payloads/getByid?id=" + payloadID);
  }

  /**
   * Generic Method to make any GET request
   */
  public genericGetAPICall(url: string) {
    return this.http.get(url);
  }

  /**
   * Generic Method to make any GET request with paramaters
   */
  public genericGetAPICallByParam(url: string, param: string) {
    return this.http.get(url + param);
  }

  /**
   * POST: Generic Method to make any POST request
   */
  public genericPostAPICall(url: string, payload) {
    return this.http.post(url, payload);
  }

  /**
   * GET: Method to retrieve news feeds
   */
  public getNewsFeeds() {
    return this.http.get(this.baseUrl + "newsfeeds/getAll/");
  }

  /**
   * GET: Method to retrieve ward details
   */
  public getWardDetails() {
    return this.http.get(this.baseUrl + "warddetails/getAll");
  }

  /**
   * POST: Method to add an installations
   */
  public addInstallation(payload: iInstallation) {
    return this.http.post(this.baseUrl + "installations/register/", payload);
  }

  /**
   * POST: Method to archive installations
   */
  public archiveInstallation(payload: iInstallation) {
    return this.http.post(this.baseUrl + "installations/delete/", payload);
  }

  public getTasks() {
    return this.http.get(this.baseUrl + "tasks/getAll/");
  }

  public getTasksByID(id: string) {
    return this.http.get(this.baseUrl + "tasks/getBy_id?_id=" + id);
  }

  public getTasksByUsername(username: string) {
    return this.http.get(this.baseUrl + "tasks/getByusername?username=" + username);
  }

  public getTasksByTeamCode(code: string) {
    return this.http.get(this.baseUrl + "tasks/getByteamcode?teamcode=" + code);
  }

  public addTask(payload: any) {
    return this.http.post(this.baseUrl + "tasks/register/", payload);
  }

  public updateTask(payload: any, id: any) {
    return this.http.post(this.baseUrl + "tasks/update", payload);
  }

  public archiveTask(payload: any) {
    return this.http.put(this.baseUrl + "tasks/delete", payload);
  }

  // Team Events
  public getTeamEvents() {
    return this.http.get(this.teameventUrl + "getAll/");
  }

  public getTeamEventByID(id: string) {
    return this.http.get(this.teameventUrl + "getByID?_id=" + id);
  }

  public getTeamEventsByTeamCode(code: string) {
    return this.http.get(this.teameventUrl + "getByteamcode?teamcode=" + code);
  }

  public addTeamEvent(payload: any) {
    return this.http.post(this.teameventUrl + "register/", payload);
  }

  public updateTeamEvent(payload: any) {
    return this.http.post(this.teameventUrl + "update", payload);
  }

  public archiveTeamEvent(payload: any) {
    return this.http.post(this.teameventUrl + "delete", payload);
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

  public getAppByName(name: string) {
    return this.http.get(this.baseUrl + "apps/getByname?name=" + name);
  }

  public getAppsByOwner(owner: string) {
    return this.http.get(this.baseUrl + "apps/getByownerName?ownerName=" + owner);
  }

  public getAppsByEnvironment(env: string) {
    return this.http.get(this.baseUrl + "apps/getByenvironment?environment=" + env);
  }

  public getAppsByStatus(status: string) {
    return this.http.get(this.baseUrl + "apps/getBystatus?status=" + status);
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

  public updateInstallation(payload: iInstallation) {
    return this.http.post(this.installationUrl + "update", payload);
  }

  public getInstallations() {
    return this.http.get(this.installationUrl + "getAll/");
  }
  public getInstallationByID(id: string) {
    return this.http.get(this.installationUrl + "getBy_id?_id=" + id);
  }
  public getInstallationsByUsername(username: string) {
    return this.http.get(this.installationUrl + "getByusername?username=" + username);
  }
  public getInstallationsByTeamCode(teamcode: string) {
    return this.http.get(this.installationUrl + "getByteamcode?teamcode=" + teamcode);
  }
  public getInstallsByAppID(app_name: string) {
    return this.http.get(this.installationUrl + "getByapp_name?app_name=" + app_name);
  }
  public getOutstandingRequests() {
    return this.http.get(this.installationUrl + "getAllByFilteroutstandingrequests");
  }
  public approveLMInstallation(app_name: string, sender: string, requestapprover: string) {
    const payload = {
      app_name: app_name,
      sender: sender,
      requestapprover: requestapprover,
    };
    return this.http.post(this.installationActionsUrl + "approvelminstallation", payload);
  }
  public approveAppInstallation(app_name: string, sender: string, requestapprover: string) {
    const payload = {
      app_name: app_name,
      sender: sender,
      requestapprover: requestapprover,
    };
    return this.http.post(this.installationActionsUrl + "approveappinstallation", payload);
  }
  public rejectAppInstallation(app_name: string, sender: string, requestapprover: string) {
    const payload = {
      app_name: app_name,
      sender: sender,
      requestapprover: requestapprover,
    };
    return this.http.post(this.installationActionsUrl + "rejectappinstallation", payload);
  }
  public approveAppTeamInstallation(app_name: string, teamcode: string, requestapprover: string) {
    const payload = {
      app_name: app_name,
      teamcode: teamcode,
      requestapprover: requestapprover,
    };
    return this.http.post(this.installationActionsUrl + "approveappteaminstallation", payload);
  }
  public rejectAppTeamInstallation(app_name: string, teamcode: string, requestapprover: string) {
    const payload = {
      app_name: app_name,
      teamcode: teamcode,
      requestapprover: requestapprover,
    };
    return this.http.post(this.installationActionsUrl + "rejectappteaminstallation", payload);
  }

  public getNewsFeedByID(id: string) {
    return this.http.get(this.newsfeedUrl + "getBydestination?destination=" + id);
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

  // Dashboards
  public getDashboards() {
    return this.http.get(this.baseUrl + "dashboards/getAll/");
  }

  public getDashboardByName(name: string) {
    return this.http.get(this.baseUrl + "dashboards/getByname?name=" + name);
  }

  public getDashboardsByOwner(owner: string) {
    return this.http.get(this.baseUrl + "dashboards/getByownerName?ownerName=" + owner);
  }

  public getDashboardsByEnvironment(env: string) {
    return this.http.get(this.baseUrl + "dashboards/getByenvironment?environment=" + env);
  }

  public getDashboardsByStatus(status: string) {
    return this.http.get(this.baseUrl + "dashboards/getBystatus?status=" + status);
  }

  public addDashboard(payload: iApplication) {
    return this.http.post(this.baseUrl + "dashboards/register/", payload);
  }

  public updateDashboard(payload: iApplication) {
    return this.http.post(this.baseUrl + "dashboards/update", payload);
  }

  public archiveDashboard(payload: iApplication) {
    return this.http.post(this.baseUrl + "dashboards/delete", payload);
  }

  public addInstallationByType(type: string, payload: iInstallation) {
    if (type == "dashboards") return this.http.post(this.baseUrl + "dashboards/register/", payload);
    return this.http.post(this.installationUrl + "register/", payload);
  }

  // Dashboard Installation Requests

  public addDashboardInstalls(payload: iInstallation) {
    return this.http.post(this.dashboardinstallsUrl + "register/", payload);
  }
  public updateDashboardInstalls(payload: iInstallation) {
    return this.http.post(this.dashboardinstallsUrl + "update", payload);
  }
  public archiveDashboardInstalls(payload: iInstallation) {
    return this.http.post(this.dashboardinstallsUrl + "delete", payload);
  }
  public getDashboardInstalls() {
    return this.http.get(this.dashboardinstallsUrl + "getAll/");
  }
  public getDashboardInstallsByID(id: string) {
    return this.http.get(this.dashboardinstallsUrl + "getBy_id?_id=" + id);
  }
  public getDashboardInstallsByUsername(username: string) {
    return this.http.get(this.dashboardinstallsUrl + "getByusername?username=" + username);
  }
  public getDashboardInstallsByTeamCode(teamcode: string) {
    return this.http.get(this.dashboardinstallsUrl + "getByteamcode?teamcode=" + teamcode);
  }
  public getDashboardInstallsByAppID(app_name: string) {
    return this.http.get(this.dashboardinstallsUrl + "getByapp_name?app_name=" + app_name);
  }
  public getOutstandingDashboardRequests() {
    return this.http.get(this.dashboardinstallsUrl + "getAllByFilteroutstandingrequests");
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

  public getPointsOfInterest() {
    return this.http.get(this.baseUrl + "pointsofinterest/getAll");
  }

  public getMosiacs() {
    return this.http.get(this.baseUrl + "mosaic/getAll");
  }

  public getCodefromPostCode(code) {
    return this.http.get(this.baseUrl + "mosaic/getCodefromPostCode?postcode=" + code);
  }

  public getIncidentMethods() {
    return this.http.get(this.baseUrl + "spi_incidentmethods/getAll/");
  }
  public addIncidentMethod(payload) {
    return this.http.post(this.baseUrl + "spi_incidentmethods/register/", payload);
  }
  public updateIncidentMethod(payload) {
    return this.http.post(this.baseUrl + "spi_incidentmethods/update", payload);
  }
  public removeIncidentMethod(payload) {
    return this.http.post(this.baseUrl + "spi_incidentmethods/delete", payload);
  }
}
