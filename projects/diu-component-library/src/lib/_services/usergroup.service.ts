import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { iNetwork, iNetworkMembers, iOrganisationMembers } from "../_models/organisation.interface";
import { iTeam, iTeamMembers, iTeamRequest } from "../_models/teams.interface";
import { iFullUser } from "../_models/user.interface";
import { BaseService } from "./_baseclass.service";
/**
 * Reference to Browser Window
 */
declare var window: any;

/**
 * User Group API Service Class
 */
@Injectable({
  providedIn: "root",
})
export class UserGroupService extends BaseService {
  /**
   * Team Request Endpoint
   */
  teamrequestUrl;

  /**
   * User Group Service Constructor
   */
  constructor(protected http: HttpClient) {
    super(http);
    const origin = window.location.href;
    this.baseUrl = this.combineURL(origin, "usergroup");
    this.teamrequestUrl = this.baseUrl + "teamrequests/";
  }

  /**
   * POST: Method to register a new Network Member
   */
  public addNetworkMembers(payload: iNetworkMembers) {
    return this.http.post(this.baseUrl + "networkmembers/register/", payload);
  }

  /**
   * GET: Method to retrieve all Network Members
   */
  public getAllNetworkMembers() {
    return this.http.get(this.baseUrl + "networkmembers/getAll");
  }

  /**
   * GET: Method to retrieve all Network Members by a provided code
   */
  public getAllNetworkMembersByCode(code: string) {
    return this.http.get(this.baseUrl + "networkmembers/getNetworkMembersByCode?code=" + code);
  }

  /**
   * GET: Method to retrieve all Network Members by a provided teamcode
   */
  public getAllNetworkMembersByTeamCode(teamcode: string) {
    return this.http.get(this.baseUrl + "networkmembers/getNetworkMembershipsByTeamCode?teamcode=" + teamcode);
  }

  /**
   * PUT: Method to remove a Network Member
   */
  public removeNetworkMembers(id: string) {
    return this.http.put(this.baseUrl + "archive?member_id=" + id, { member_id: id });
  }

  /**
   * GET: Method to retrieve all Networks
   */
  public getNetworks() {
    return this.http.get(this.baseUrl + "networkprofiles/getAll");
  }

  /**
   * GET: Method to retrieve all Networks by a provided code
   */
  public getNetworkByCode(code: string) {
    return this.http.get(this.baseUrl + "networkprofiles/getNetworkByCode?code=" + code);
  }

  /**
   * GET: Method to retrieve all Networks by a partial name for searching
   */
  public getNetworksByPartialNetworkName(partialteam: string) {
    return this.http.get(this.baseUrl + "networkprofiles/getNetworksByPartialNetworkName?partialteam=" + partialteam);
  }

  /**
   * POST: Method to add a Network
   */
  public addNetwork(payload: iNetwork) {
    return this.http.post(this.baseUrl + "networkprofiles/register/", payload);
  }

  /**
   * PUT: Method to update a Network
   */
  public updateNetwork(payload: iNetwork) {
    return this.http.put(this.baseUrl + "networkprofiles/update?profile_id=" + payload.code, payload);
  }

  /**
   * PUT: Method to remove a Network
   */
  public removeNetwork(payload: iNetwork) {
    return this.http.put(this.baseUrl + "networkprofiles/archive?profile_id=" + payload.code, payload);
  }

  /**
   * GET: Method to retrieve all Organisation Members
   */
  public getOrgMembers() {
    return this.http.get(this.baseUrl + "organisationmembers/getAll");
  }

  /**
   * GET: Method to retrieve all Organisation Members by code
   */
  public getOrgMembersByCode(code: string) {
    return this.http.get(this.baseUrl + "organisationmembers/getOrgMembersByCode?code=" + code);
  }

  /**
   * GET: Method to retrieve all Organisation Members by username
   */
  public getOrgMembershipsByUsername(username: string) {
    return this.http.get(this.baseUrl + "organisationmembers/getOrgMembershipsByUsername?username=" + username);
  }

  /**
   * POST: Method to add a new Organisation Members
   */
  public addOrgMember(payload: iOrganisationMembers) {
    return this.http.post(this.baseUrl + "organisationmembers/register/", payload);
  }

  /**
   * PUT: Method to remove an Organisation Members
   */
  public removeOrgMember(payload: iOrganisationMembers) {
    return this.http.put(this.baseUrl + "organisationmembers/archive?member_id=" + payload._id, payload);
  }

  /**
   * GET: Method to retrieve all Role Profiles
   */
  public getRoles() {
    return this.http.get(this.baseUrl + "roleprofiles/getAll");
  }

  /**
   * POST: Method to add a role profile
   */
  public addRole(payload: any) {
    return this.http.post(this.baseUrl + "roleprofiles/register/", payload);
  }

  /**
   * POST: Method to update a role profile
   */
  public updateRole(payload: any) {
    return this.http.post(this.baseUrl + "roleprofiles/update?profile_id=" + payload.id, payload);
  }

  /**
   * POST: Method to remove a role profile
   */
  public removeRole(payload: any) {
    return this.http.post(this.baseUrl + "roleprofiles/archive?profile_id=" + payload.id, payload);
  }
  // SearchTeams

  /**
   * GET: Method to carry out search for teams where the name contains the string;
   */
  public searchTeamsByName(searchterm: string) {
    return this.http.get(this.baseUrl + "searchs/searchTeams?searchterm=" + searchterm);
  }

  // SearchUsers

  /**
   * GET: Method to carry out search for Staff profiles searching multiple fields with the search term
   */
  public searchUserProfiles(searchterm: string) {
    return this.http.get(this.baseUrl + "searchusers/searchUserProfiles?searchterm=" + searchterm);
  }

  /**
   * GET: Method to carry out search for Staff profiles searching multiple fields with the search term from a specific organisation
   */
  public searchOrgUserProfiles(searchterm: string, organisation: string) {
    return this.http.get(this.baseUrl + "searchusers/searchOrgUserProfiles?searchterm=" + searchterm + "&organisation=" + organisation);
  }

  // TeamMembers

  /**
   * GET: Method to get all teams from the database
   */
  public getTeamMembers() {
    return this.http.get(this.baseUrl + "teammembers/getAll");
  }

  /**
   * GET: Method to get all teams that match the code provided from the database
   */
  public getTeamMembersByCode(code: string) {
    return this.http.get(this.baseUrl + "teammembers/getTeamMembersByCode?code=" + code);
  }

  /**
   * GET: Method to get all teams that the user is associated with from the database
   */
  public getTeamMembershipsByUsername(username: string) {
    return this.http.get(this.baseUrl + "teammembers/getTeamMembershipsByUsername?username=" + username);
  }

  /**
   * POST: Method to add a team member to the database
   */
  public addTeamMember(payload: iTeamMembers) {
    return this.http.post(this.baseUrl + "teammembers/register/", payload);
  }

  /**
   * PUT: Method to remove a team member from the database
   */
  public removeTeamMember(payload: iTeamMembers) {
    return this.http.put(this.baseUrl + "teammembers/archive?member_id=" + payload._id, payload);
  }

  // TeamProfiles

  /**
   * GET: Method to get all teams from the database
   */
  public getTeams() {
    return this.http.get(this.baseUrl + "teamprofiles/getAll");
  }

  /**
   * POST: Method to add a team to the database
   */
  public addTeam(payload: iTeam) {
    return this.http.post(this.baseUrl + "teamprofiles/register/", payload);
  }

  /**
   * PUT: Method to update a team in the database
   */
  public updateTeam(payload: iTeam) {
    return this.http.put(this.baseUrl + "teamprofiles/update?profile_id=" + payload._id, payload);
  }

  /**
   * PUT: Method to remove a team from the database
   */
  public removeTeam(payload: iTeam) {
    return this.http.put(this.baseUrl + "teamprofiles/archive?profile_id=" + payload._id, payload);
  }

  // Requests

  /**
   * POST: Method to add a team request to the database
   */
  public addTeamRequest(payload: iTeamRequest) {
    return this.http.post(this.teamrequestUrl + "register/", payload);
  }

  /**
   * PUT: Method to update a team request in the database
   */
  public updateTeamRequest(payload: iTeamRequest) {
    return this.http.put(this.teamrequestUrl + "update?request_id=" + payload._id, payload);
  }

  /**
   * PUT: Method to remove a team request from the database
   */
  public archiveTeamRequest(payload: string) {
    return this.http.put(this.teamrequestUrl + "archive?request_id=" + payload, null);
  }

  /**
   * GET: Method to get all team requests
   */
  public getTeamRequests() {
    return this.http.get(this.teamrequestUrl + "getAll/");
  }

  /**
   * GET: Method to get team requests by id
   */
  public getTeamRequestByID(id: string) {
    return this.http.get(this.teamrequestUrl + "getByID?request_id=" + id);
  }

  /**
   * GET: Method to get team requests by username, this includes all approved and rejected requests
   */
  public getTeamRequestsByUsername(username: string) {
    return this.http.get(this.teamrequestUrl + "getRequestsByUsername?username=" + username);
  }

  /**
   * GET: Method to get team requests by team code, this includes all approved and rejected requests
   */
  public getTeamRequestsByTeamCode(code: string) {
    return this.http.get(this.teamrequestUrl + "getRequestsByTeamCode?code=" + code);
  }

  /**
   * GET: Method to get team requests which don't have an approved date
   */
  public getOutstandingRequests() {
    return this.http.get(this.teamrequestUrl + "getOutstandingRequests");
  }

  // UserProfiles

  /**
   * GET: Method to return all user profiles
   */
  public getUserProfiles() {
    return this.http.get(this.baseUrl + "userprofiles/getAll");
  }

  /**
   * GET: Method to get profile by username
   */
  public getUserProfileByUsername(username: string) {
    return this.http.get(this.baseUrl + "userprofiles/getUserProfileByUsername?username=" + username);
  }

  /**
   * POST: Method to add a new user profile
   */
  public addUserProfile(payload: any) {
    return this.http.post(this.baseUrl + "userprofiles/register/", payload);
  }

  /**
   * PUT: Method to update user profile by ID + updated profile JSON object
   */
  public updateUserProfiles(payload: iFullUser) {
    return this.http.put(this.baseUrl + "userprofiles/update?profile_id=" + payload._id, payload);
  }

  /**
   * PUT: Method to remove user profile by id
   */
  public removeUserProfiles(payload: iFullUser) {
    return this.http.put(this.baseUrl + "userprofiles/archive?profile_id=" + payload._id, payload);
  }
}
