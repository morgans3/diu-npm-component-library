import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { iCredentials } from "../_models/user.interface";
import { BaseService } from "./_baseclass.service";
import { map } from "rxjs/operators";

/**
 * Authentication API Service Class
 */
@Injectable({
  providedIn: "root",
})
export class MFAAuthService extends BaseService {
  /**
   * Authentication API Service Constructor
   */
  constructor(protected http: HttpClient) {
    super(http);
    const origin = window.location.href;
    this.baseUrl = this.combineURL(origin, "auth");
  }

  login(credentials: iCredentials) {
    return this.http.post(this.baseUrl + "users/authenticate", credentials).pipe(map((response: any) => response));
  }

  logout() {
    // TODO: clear localstorage state?
    document.location.href = "https://www.nexusintelligencenw.nhs.uk/";
  }

  /**
   * Function to check if logged in user has MFA setup
   * @returns HTTP GET Promise
   */
  checkMFA() {
    return this.http.get(this.baseUrl + "mfa/checkmfa/");
  }

  /**
   * Function to begin registration of a device for MFA
   * @returns HTTP GET Promise
   */
  registerMFA() {
    return this.http.get(this.baseUrl + "mfa/register/");
  }

  /**
   * Function to register a device for MFA
   * @returns HTTP POST Promise
   */
  verifyMFA(token, tempSecret) {
    return this.http.post(this.baseUrl + "mfa/verify/", {
      token: token,
      tempSecret: tempSecret,
    });
  }

  /**
   * Function to validate a device already registered for MFA
   * @returns HTTP POST Promise
   */
  validateMFA(token) {
    return this.http.post(this.baseUrl + "mfa/validate/", {
      token: token,
    });
  }

  /**
   * Function to unregister a device for MFA
   * @returns HTTP GET Promise
   */
  unregisterMFA() {
    return this.http.get(this.baseUrl + "mfa/unregister/");
  }

  /**
   * GET: Method to get all capabilities
   * @returns HTTP GET Promise
   */
  public getCapabilities() {
    return this.http.get(this.baseUrl + "capabilities");
  }

  /**
  * GET: Method to get all capabilities by tag(s)
  * @returns HTTP GET Promise
  */
  public getCapabilitiesByTag(tags = [], queryType = 'and') {
    return this.http.get(this.baseUrl + "capabilities/getByTagsAnd", {
      params: { "tags[]": tags }
    });
  }

  /**
   * GET: Method to get capability by id
   * @returns HTTP GET Promise
   */
  public getCapabilityById(id) {
    return this.http.get(this.baseUrl + "capabilities/getByID", { 
      params: { id: id }
    });
  }

  /**
   * POST: Method to create capability
   * @returns HTTP POST Promise
   */
  public createCapability(payload) {
    return this.http.post(this.baseUrl + "capabilities/register", payload);
  }

  /**
   * POST: Method to update capability
   * @returns HTTP POST Promise
   */
  public updateCapability(payload) {
    return this.http.post(this.baseUrl + "capabilities/update", payload);
  }

  /**
   * DELETE: Method to delete capability
   * @returns HTTP POST Promise
   */
  public deleteCapability(id) {
    return this.http.delete(this.baseUrl + "capabilities/removeByID", { body: { id: id }});
  }

  /**
 * GET: Method to get all roles
 * @returns HTTP GET Promise
 */
  public getRoles() {
    return this.http.get(this.baseUrl + "roles");
  }

  /**
   * GET: Method to get role by id
   * @returns HTTP GET Promise
   */
  public getRoleById(id) {
    return this.http.get(this.baseUrl + "roles/" + id);
  }

  /**
  * POST: Method to create role
  * @returns HTTP POST Promise
  */
  public createRole(payload) {
    return this.http.post(this.baseUrl + "roles/create", payload);
  }

  /**
   * POST: Method to update role
   * @returns HTTP POST Promise
   */
  public updateRole(payload) {
    return this.http.post(this.baseUrl + "roles/update", payload);
  }

  /**
   * DELETE: Method to delete role
   * @returns HTTP DELETE Promise
   */
  public deleteRole(id) {
    return this.http.delete(this.baseUrl + "roles/" + id + "/delete");
  }

  /**
   * GET: Method to get a list of capabilities with a link and type combo
   * @returns HTTP POST Promise
   */
  public getCapabilitiesByTypeId(linkType, linkId) {
    return this.http.get(`${this.baseUrl}${linkType}/${encodeURIComponent(linkId)}/capabilities`);
  }

  /**
   * POST: Method to sync a list of capability ids with a link and type combo
   * @returns HTTP POST Promise
   */
  public syncCapabilityLinks(ids, linkType, linkId) {
    return this.http.post(this.baseUrl + "capabilities/links/sync", {
      capabilities: ids, link_type: linkType, link_id: linkId
    });
  }

  /**
   * GET: Method to get a roles of capabilities with a link and type combo
   * @returns HTTP GET Promise
   */
  public getRolesByTypeId(linkType, linkId) {
    return this.http.get(`${this.baseUrl}${linkType}/${encodeURIComponent(linkId)}/roles`);
  }

  /**
   * POST: Method to sync a list of role ids with a link and type combo
   * @returns HTTP POST Promise
   */
  public syncRoleLinks(ids, linkType, linkId) {
    return this.http.post(this.baseUrl + "roles/links/sync", {
      roles: ids, link_type: linkType, link_id: linkId
    });
  }

  /**
   * GET: Get all access logs 
   * @returns HTTP GET Promise
   */
  public getAccessLogs(filters = {}) {
    return this.http.get(this.baseUrl + "access-logs", { 
      params: filters
    });
  }

  /**
   * GET: Get all access log statistics 
   * @returns HTTP GET Promise
   */
  public getAccessLogStatistics(filters = { date_from: null, date_to: null }) {
    return this.http.get(this.baseUrl + "access-logs/statistics", {
      params: filters
    });
  }


  /**
   * GET: Get for a user#organisation combination
   * @returns HTTP GET Promise
   */
  public getAccessLogsByUser(user, filters = {}) {
    return this.http.get(`${this.baseUrl}${encodeURIComponent(user)}/access-logs`, {
      params: filters
    });
  }

  public removeTeamRole(payload: any) {
    return this.http.post(this.baseUrl + "teamroles/remove", payload);
  }

  public getRolesByTeamcode(code: string) {
    return this.http.get(this.baseUrl + "teamroles/getItemsByTeamcode?teamcode=" + code);
  }

  public register(payload: any) {
    return this.http.post(this.baseUrl + "users/register/", payload);
  }

  public updatePassword(username: any, authmethod: any, newPassword: any, code: any = null) {
    return this.http.post(this.baseUrl + "password/update", {
      username: username,
      authmethod: authmethod,
      newpassword: newPassword,
      code: code,
    });
  }

  public getRequests(params) {
    return this.http.get(this.baseUrl + "requests", {
      params: params,
    });
  }

  public getAccessRequest(id) {
    return this.http.get(this.baseUrl + "requests/account/" + id);
  }

  public sendAccessRequest(payload) {
    return this.http.post(this.baseUrl + "requests/account", payload);
  }

  public sendAccessRequestComplete(payload) {
    return this.http.post(this.baseUrl + "requests/account/complete", payload);
  }
}
