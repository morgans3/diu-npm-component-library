import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { iCredentials, iFullUser } from "../_models/user.interface";
import { BaseService } from "./_baseclass.service";
import { map } from "rxjs/operators";
import { iTeam, iTeamMembers, iTeamRequest } from "../_models/teams.interface";
import { iOrganisation } from "../_models/organisation.interface";
import { iApplication, iNewsFeed } from "../_models/installations.interface";
import { iNotifications } from "../_models/header.interface";

/**
 * API Service Class
 */
@Injectable({
    providedIn: "root",
})
export class APIService extends BaseService {
    /**
     * Authentication API Service Constructor
     */
    constructor(protected http: HttpClient, @Inject("environment") environment) {
        super(http, environment);
        const origin = window.location.href;
        this.baseUrl = this.combineURL(origin, "api");
    }

    login(credentials: iCredentials) {
        return this.http.post(this.baseUrl + "users/authenticate", credentials).pipe(map((response: any) => response));
    }

    logout(redirect: string) {
        document.location.href = redirect;
    }

    /**
     * Method to get Payloads by ID
     */
    public getPayloadById(payloadID: string) {
        return this.http.get(this.baseUrl + "atomic/payloads/" + payloadID);
    }

    public getAllPayloads() {
        return this.http.get(this.baseUrl + "atomic/payloads");
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

    public getAllCapabilitiesByTag(tags: string) {
        return this.http.get(this.baseUrl + "capabilities/getByTag?tags=" + tags);
    }

    public getAllCapabilitiesByTagsAnd(tags: string[]) {
        return this.http.get(this.baseUrl + "capabilities/getByTagsAnd?tags=" + tags.toString());
    }

    public getAllCapabilitiesByTagsOr(tags: string[]) {
        return this.http.get(this.baseUrl + "capabilities/getByTagsOr?tags=" + tags.toString());
    }

    public getCapabilitiesByRoleName(roleName: string) {
        return this.http.get(this.baseUrl + "capabilities/getByRoleName?roleName=" + roleName);
    }

    public getAllCapabilitiesByTeamIDs(teamname: string[]) {
        return this.http.get(this.baseUrl + "capabilities/getByTeamIDs?teamname=" + teamname.toString());
    }

    public getAllCapabilitiesWithTeamAndUsername(teamname: string[], username: string) {
        return this.http.post(this.baseUrl + "capabilities/getAllCapabilitiesWithTeamAndUsername", {
            teamname,
            username,
        });
    }

    public getCapabilitiesByTypeAndId(type: string, id: string) {
        return this.http.get(this.baseUrl + type + "/" + id + "/capabilities/");
    }

    public syncCapabilitiesLink(link_id: string, link_type: string, capabilities?: number[]) {
        return this.http.post(this.baseUrl + "capabilities/links/sync", {
            link_id,
            link_type,
            capabilities,
        });
    }

    public createCapabiltiesLink(capability: any) {
        return this.http.post(this.baseUrl + "capabilities/link/create", capability);
    }

    public deleteCapabilitiesLink(capability_id: number, link_id: string, link_type: string) {
        return this.http.delete(this.baseUrl + "capabilities/links/delete", {
            body: { capability_id, link_id, link_type },
        });
    }

    public getAllAccessLogs(date?: string, type?: string, pageKey?: string) {
        let urlparams = "";
        if (date) urlparams += "?date=" + date;
        if (type) urlparams.length ? (urlparams += "&type=" + type) : (urlparams += "?type=" + type);
        if (pageKey) urlparams.length ? (urlparams += "&pageKey=" + pageKey) : (urlparams += "?pageKey=" + pageKey);
        return this.http.get(this.baseUrl + "access-logs" + urlparams);
    }

    public getAllAccessLogsByUser(user: string, date?: string, pageKey?: string) {
        let urlparams = "";
        if (date) urlparams += "?date=" + date;
        if (pageKey) urlparams.length ? (urlparams += "&pageKey=" + pageKey) : (urlparams += "?pageKey=" + pageKey);
        return this.http.get(this.baseUrl + user + "/access-logs" + urlparams);
    }

    public getAllAccessLogsStatistics(date_from?: string, date_to?: string) {
        let urlparams = "";
        if (date_from) urlparams += "?date_from=" + date_from;
        if (date_to) urlparams.length ? (urlparams += "&date_to=" + date_to) : (urlparams += "?date_to=" + date_to);
        return this.http.get(this.baseUrl + "access-logs/statistics" + urlparams);
    }

    public createAccessLog(payload: any) {
        return this.http.post(this.baseUrl + "access-logs/create", payload);
    }

    public searchConfluenceContent(keyword: string) {
        return this.http.get(this.baseUrl + "confluence/content/search?keyword=" + keyword);
    }

    public getConfluenceContent(id: string) {
        return this.http.get(this.baseUrl + "confluence/content/" + id);
    }

    public getAllDocoboAcknowledgements() {
        return this.http.get(this.baseUrl + "docobo/acknowledgements/getAll/");
    }

    public reportDocoboAcknowledgements(payload: any) {
        return this.http.post(this.baseUrl + "docobo/acknowledgements/report/", payload);
    }

    public getDocoboOutboundPatientsByOrg(orgcode: string) {
        return this.http.post(this.baseUrl + "docobooutbound/getpatientsbyorg/", { orgcode });
    }

    public getDocoboOutboundPatientData(patientid: string) {
        return this.http.post(this.baseUrl + "docobooutbound/getpatientdata/", { patientid });
    }

    public getProcessForDocoboOutbound() {
        return this.http.get(this.baseUrl + "docobooutbound/processDocoboInfo/");
    }

    public getOpenSourceByPage(page: string, limit: string) {
        return this.http.post(this.baseUrl + "opensource/getByPage", {
            page,
            limit,
        });
    }

    public addOpenSourceView(payload: { page: string; parent: string }) {
        return this.http.post(this.baseUrl + "opensource/addView", payload);
    }

    public getOrgBoundaries() {
        return this.http.get(this.baseUrl + "orgboundaries/getTopoJSON");
    }

    public getTopoJSON() {
        return this.http.get(this.baseUrl + "pcninformation/getTopoJSON");
    }

    public getPCNInformation() {
        return this.http.get(this.baseUrl + "pcninformation/getData");
    }

    public getHexGeojson() {
        return this.http.get(this.baseUrl + "pcninformation/getHexGeojson");
    }

    public getAllPostcodes() {
        return this.http.get(this.baseUrl + "postcodes/getAll/");
    }

    public checkServiceAccounts(org: string, key: string) {
        return this.http.post(this.baseUrl + "serviceaccounts/check", {
            org,
            key,
        });
    }

    public getTeams() {
        return this.http.get(this.baseUrl + "teams/");
    }

    public registerTeam(payload: iTeam) {
        return this.http.post(this.baseUrl + "teams/create", payload);
    }

    public updateTeam(payload: iTeam) {
        return this.http.put(this.baseUrl + "teams/update", payload);
    }

    public deleteTeam(payload: iTeam) {
        return this.http.delete(this.baseUrl + "teams/" + payload["_id"] + "/delete/", { body: payload });
    }

    public getAllClinicalTrials() {
        return this.http.get(this.baseUrl + "trials/getAll");
    }

    public searchClinicalTrials(search: string, phases: string, min_date: string) {
        return this.http.post(this.baseUrl + "trials/getSearchTop1000", { search, phases, min_date });
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
            token,
        });
    }

    /**
     * POST: Method to retrieve outpatient count
     */
    public outpatientCounts(token: string) {
        return this.http.post(this.baseUrl + "gpinpatients/outpatientcounts", {
            token,
        });
    }

    /**
     * POST: Method to retrieve accident & emergency patient count
     */
    public aeCounts(token: string) {
        return this.http.post(this.baseUrl + "gpinpatients/aecounts", {
            token,
        });
    }

    /**
     * POST: Method to retrieve enhanced care service patient count
     */
    public ecsCounts(token: string) {
        return this.http.post(this.baseUrl + "gpinpatients/ecscounts", {
            token,
        });
    }

    /**
     * POST: Method to retrieve enhanced primary care patient count
     */
    public epcCounts(token: string) {
        return this.http.post(this.baseUrl + "gpinpatients/epccounts", {
            token,
        });
    }

    /**
     * POST: Method to retrieve inpatient GP summary
     */
    public inpatientGPSummary(token: string) {
        return this.http.post(this.baseUrl + "gpinpatients/inpatientgpsummary", {
            token,
        });
    }

    /**
     * POST: Method to retrieve Accident & Emergency GP summary
     */
    public aeGPSummary(token: string) {
        return this.http.post(this.baseUrl + "gpinpatients/aegpsummary", {
            token,
        });
    }

    /**
     * GET: Method to retrieve a patients demographics
     */
    public getPatientDemographics(nhsnumber: string) {
        return this.http.get(this.baseUrl + "demographics/demographicsbynhsnumber?NHSNumber=" + nhsnumber);
    }

    /**
     * POST: Method to validate a patient's NHS number
     */
    public valiateNHSNumber(payload: any) {
        return this.http.post(this.baseUrl + "demographics/valiateNHSNumber/", payload);
    }

    /**
     * POST: Method to retrieve a patients NHS number
     */
    public findNHSNumber(payload: any) {
        return this.http.post(this.baseUrl + "demographics/findMyNHSNumber/", payload);
    }

    /**
     * Function to check if logged in user has MFA setup
     *
     * @returns HTTP GET Promise
     */
    checkMFA() {
        return this.http.get(this.baseUrl + "mfa/checkmfa/");
    }

    /**
     * Function to begin registration of a device for MFA
     *
     * @returns HTTP GET Promise
     */
    registerMFA() {
        return this.http.get(this.baseUrl + "mfa/register/");
    }

    /**
     * Function to register a device for MFA
     *
     * @returns HTTP POST Promise
     */
    verifyMFA(token, tempSecret) {
        return this.http.post(this.baseUrl + "mfa/verify/", {
            token,
            tempSecret,
        });
    }

    /**
     * Function to validate a device already registered for MFA
     *
     * @returns HTTP POST Promise
     */
    validateMFA(token) {
        return this.http.post(this.baseUrl + "mfa/validate/", {
            token,
        });
    }

    /**
     * Function to unregister a device for MFA
     *
     * @returns HTTP GET Promise
     */
    unregisterMFA() {
        return this.http.get(this.baseUrl + "mfa/unregister/");
    }

    /**
     * GET: Method to get all capabilities
     *
     * @returns HTTP GET Promise
     */
    public getCapabilities() {
        return this.http.get(this.baseUrl + "capabilities");
    }

    /**
     * GET: Method to get capability by id
     *
     * @returns HTTP GET Promise
     */
    public getCapabilityById(id) {
        return this.http.get(this.baseUrl + "capabilities/getByID", {
            params: { id },
        });
    }

    /**
     * POST: Method to create capability
     *
     * @returns HTTP POST Promise
     */
    public createCapability(payload) {
        return this.http.post(this.baseUrl + "capabilities/register", payload);
    }

    /**
     * POST: Method to update capability
     *
     * @returns HTTP POST Promise
     */
    public updateCapability(payload) {
        return this.http.post(this.baseUrl + "capabilities/update", payload);
    }

    /**
     * DELETE: Method to delete capability
     *
     * @returns HTTP POST Promise
     */
    public deleteCapability(id) {
        return this.http.delete(this.baseUrl + "capabilities/removeByID", { body: { id } });
    }

    /**
     * GET: Method to get all roles
     *
     * @returns HTTP GET Promise
     */
    public getRoles() {
        return this.http.get(this.baseUrl + "roles");
    }

    /**
     * GET: Method to get role by id
     *
     * @returns HTTP GET Promise
     */
    public getRoleById(id: string) {
        return this.http.get(this.baseUrl + "roles/" + id);
    }

    /**
     * POST: Method to create role
     *
     * @returns HTTP POST Promise
     */
    public createRole(payload) {
        return this.http.post(this.baseUrl + "roles/create", payload);
    }

    /**
     * POST: Method to update role
     *
     * @returns HTTP POST Promise
     */
    public updateRole(payload) {
        return this.http.post(this.baseUrl + "roles/update", payload);
    }

    /**
     * DELETE: Method to delete role
     *
     * @returns HTTP DELETE Promise
     */
    public deleteRole(id: string) {
        return this.http.delete(this.baseUrl + "roles/" + id + "/delete");
    }

    /**
     * GET: Method to get a list of capabilities with a link and type combo
     *
     * @returns HTTP POST Promise
     */
    public getCapabilitiesByTypeId(linkType: string, linkId: string) {
        return this.http.get(`${this.baseUrl}${linkType}/${encodeURIComponent(linkId)}/capabilities`);
    }

    /**
     * POST: Method to sync a list of capability ids with a link and type combo
     *
     * @returns HTTP POST Promise
     */
    public syncCapabilityLinks(ids, linkType, linkId) {
        return this.http.post(this.baseUrl + "capabilities/links/sync", {
            capabilities: ids,
            link_type: linkType,
            link_id: linkId,
        });
    }

    /**
     * GET: Method to get a roles of capabilities with a link and type combo
     *
     * @returns HTTP GET Promise
     */
    public getRolesByTypeId(linkType: string, linkId: string) {
        return this.http.get(`${this.baseUrl}${linkType}/${encodeURIComponent(linkId)}/roles`);
    }

    /**
     * POST: Method to sync a list of role ids with a link and type combo
     *
     * @returns HTTP POST Promise
     */
    public syncRoleLinks(ids, linkType, linkId) {
        return this.http.post(this.baseUrl + "roles/links/sync", {
            roles: ids,
            link_type: linkType,
            link_id: linkId,
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
            username,
            authmethod,
            newpassword: newPassword,
            code,
        });
    }

    public getRequests(params) {
        return this.http.get(this.baseUrl + "requests", {
            params,
        });
    }

    public getAccessRequest(id: string) {
        return this.http.get(this.baseUrl + "requests/account/" + id);
    }

    public sendAccessRequest(payload) {
        return this.http.post(this.baseUrl + "requests/account", payload);
    }

    public sendAccessRequestComplete(payload) {
        return this.http.post(this.baseUrl + "requests/account/complete", payload);
    }

    /**
     * GET: Method to retrieve all Wards
     */
    public getWards() {
        return this.http.get(this.baseUrl + "wards");
    }

    /**
     * GET: Method to retrieve all GP Practices
     */
    public getGPPractices() {
        return this.http.get(this.baseUrl + "gppractices");
    }

    /**
     * GET: Method to retrieve all Grand Index data for Mosaic
     */
    public getGrandIndex() {
        return this.http.get(this.baseUrl + "grandindex/getAll");
    }

    /**
     * POST: Method to retrieve all households within a given isochrone
     */
    public getHouseholdIsochrone(isochrone_bounds: string) {
        return this.http.post(this.baseUrl + "isochrone/getHousesWithinIsochrone", isochrone_bounds);
    }

    /**
     * GET: Method to retrieve all shielding citizens
     */
    public getCitizens(limit = null) {
        return this.http.get(this.baseUrl + "shielding", {
            params: { limit }
        });
    }

    /**
     * POST: Method to retrieve LPRES validation key
     */
    public getLPRESViewerValidationKey(nhsnumber: string) {
        return this.http.post(this.baseUrl + "lpresviewer/getValidationKey", nhsnumber);
    }

    /**
     * POST: Method to validate a one-time token for access
     */
    public validateOTPCode(code: string) {
        return this.http.post(this.baseUrl + "otp/validate", { code });
    }

    /**
     * POST: Method to search guidance from NICE
     */
    public searchNICEEvidence(search_query: string, search_length?: number) {
        return this.http.post(this.baseUrl + "niceevidence/evidencesearch", { search_query, search_length });
    }

    /**
     * GET: Method to retrieve all Outbreak map information
     */
    public getOutbreakGeoJson() {
        return this.http.get(this.baseUrl + "outbreak/mapinfo");
    }

    /**
     * GET: Method to retrieve all patients
     */
    public getPatients(limit: string) {
        return this.http.get(this.baseUrl + "patientlists/?Limit=" + limit);
    }

    /**
     * GET: Method to retrieve all patients from a cohort
     */
    public getPatientsByCohort(limit: string, cohort: string) {
        return this.http.get(this.baseUrl + "patientlists/getPatientsByCohort?limit=" + limit + "&cohort=" + cohort);
    }

    /**
     * GET: Method to retrieve a patients details
     */
    public getPatientDetail(nhsnumber: string) {
        return this.http.get(this.baseUrl + "patientlists/patientdetailsbynhsnumber?NHSNumber=" + nhsnumber);
    }

    /**
     * GET: Method to get all team requests
     */
    public getTeamRequests() {
        return this.http.get(this.baseUrl + "teamrequests/getAll/");
    }

    /**
     * GET: Method to get team requests by id
     */
    public getTeamRequestByID(id: string) {
        return this.http.get(this.baseUrl + "teamrequests/getByID?request_id=" + id);
    }

    /**
     * GET: Method to get team requests by username, this includes all approved and rejected requests
     */
    public getTeamRequestsByUsername(username: string) {
        return this.http.get(this.baseUrl + "teamrequests/getRequestsByUsername?username=" + username);
    }

    /**
     * GET: Method to get team requests by team code, this includes all approved and rejected requests
     */
    public getTeamRequestsByTeamCode(code: string) {
        return this.http.get(this.baseUrl + "teamrequests/getRequestsByTeamCode?code=" + code);
    }

    /**
     * GET: Method to get team requests which don't have an approved date
     */
    public getOutstandingRequests() {
        return this.http.get(this.baseUrl + "teamrequests/getOutstandingRequests");
    }

    /**
     * POST: Method to add a team request to the database
     */
    public addTeamRequest(payload: iTeamRequest) {
        return this.http.post(this.baseUrl + "teamrequests/register/", payload);
    }

    /**
     * PUT: Method to update a team request in the database
     */
    public updateTeamRequest(payload: iTeamRequest) {
        return this.http.put(this.baseUrl + "teamrequests/update?request_id=" + payload["_id"], payload);
    }

    /**
     * PUT: Method to remove a team request from the database
     */
    public archiveTeamRequest(payload: string) {
        return this.http.put(this.baseUrl + "teamrequests/archive?request_id=" + payload, null);
    }

    /**
     * GET: Method to retrieve news feeds
     */
    public getNewsFeeds() {
        return this.http.get(this.baseUrl + "newsfeeds/");
    }

    /**
     * GET: Method to retrieve ward details
     */
    public getWardDetails() {
        return this.http.get(this.baseUrl + "warddetails");
    }

    public archiveTask(payload: any) {
        return this.http.put(this.baseUrl + "tasks/delete", payload);
    }

    // System Alerts
    public getSystemAlerts() {
        return this.http.get(this.baseUrl + "systemalerts/getAll/");
    }
    public getActiveSystemAlerts() {
        return this.http.get(this.baseUrl + "systemalerts/getActive/");
    }
    public updateSystemAlert(payload: any) {
        return this.http.post(this.baseUrl + "systemalerts/update", payload);
    }
    public addSystemAlert(payload: any) {
        return this.http.post(this.baseUrl + "systemalerts/register/", payload);
    }

    public getApps() {
        return this.http.get(this.baseUrl + "apps/");
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
        return this.http.post(this.baseUrl + "newsfeeds/register/", payload);
    }
    public updateNewsFeed(payload: iNewsFeed) {
        return this.http.post(this.baseUrl + "newsfeeds/update", payload);
    }
    public archiveNewsFeed(payload: iNewsFeed) {
        return this.http.post(this.baseUrl + "newsfeeds/delete", payload);
    }

    public getOrganisations() {
        return this.http.get(this.baseUrl + "organisations");
    }

    public addOrganisation(payload: iOrganisation) {
        return this.http.post(this.baseUrl + "organisations/register/", payload);
    }

    public updateOrganisation(payload: iOrganisation) {
        return this.http.post(this.baseUrl + "organisations/update", payload);
    }

    public removeOrganisation(payload: iOrganisation) {
        return this.http.delete(this.baseUrl + "organisations/remove", { body: payload });
    }

    public getPointsOfInterest() {
        return this.http.get(this.baseUrl + "pointsofinterest");
    }

    public getMosiacs() {
        return this.http.get(this.baseUrl + "mosaic");
    }

    public getCodefromPostCode(code: string) {
        return this.http.get(this.baseUrl + "mosaic/getCodefromPostCode?postcode=" + code);
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
        return this.http.get(this.baseUrl + "teammembers");
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
        return this.http.put(this.baseUrl + "teammembers/archive?member_id=" + payload["_id"], payload);
    }

    // TeamProfiles

    /**
     * GET: Method to get all teams from the database
     */
    public getTeamProfiles() {
        return this.http.get(this.baseUrl + "teamprofiles");
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
    public updateTeamProfile(payload: iTeam) {
        return this.http.put(this.baseUrl + "teamprofiles/update?profile_id=" + payload["_id"], payload);
    }

    /**
     * PUT: Method to remove a team from the database
     */
    public removeTeam(payload: iTeam) {
        return this.http.put(this.baseUrl + "teamprofiles/archive?profile_id=" + payload["_id"], payload);
    }

    // UserProfiles

    /**
     * GET: Method to return all user profiles
     */
    public getUserProfiles() {
        return this.http.get(this.baseUrl + "userprofiles");
    }

    /**
     * GET: Method to get profile by username
     */
    public getUserProfileByUsername(username: string) {
        return this.http.get(this.baseUrl + "userprofiles/" + username);
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
        return this.http.put(this.baseUrl + "userprofiles/update?profile_id=" + payload["_id"], payload);
    }

    /**
     * PUT: Method to remove user profile by id
     */
    public removeUserProfiles(payload: iFullUser) {
        return this.http.put(this.baseUrl + "userprofiles/archive?profile_id=" + payload["_id"], payload);
    }

    /**
     * GET: Method to return all users
     */
    public getUsers(filters = {}) {
        return this.http.get(this.baseUrl + "users", { params: filters });
    }

    /**
     * GET: Method to retreieve a user by their id
     */
    public getUser(id: string) {
        return this.http.get(this.baseUrl + `users/${encodeURIComponent(id)}`);
    }

    /**
     * DELETE: Method to delete a user by their id
     */
    public deleteUser(username, organisation) {
        return this.http.delete(this.baseUrl + `users/delete`, {
            body: {
                username,
                organisation,
            },
        });
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

    /**
     * GET: Method to retrieve all notifications
     */
    public getNotifications() {
        return this.http.get(this.baseUrl + "notifications/getAll/");
    }

    /**
     * GET: Method to retrieve a notification by ID
     */
    public getNotificationsByID(id: string) {
        return this.http.get(this.baseUrl + "notifications/getByID?notification_id=" + id);
    }

    /**
     * GET: Method to retrieve all notifications by username
     */
    public getNotificationsByUsername(username: string) {
        return this.http.get(this.baseUrl + "notifications/getNotificationsByUsername?username=" + username);
    }

    /**
     * GET: Method to retrieve all notifications by team code
     */
    public getNotificationsByTeamCode(code: string) {
        return this.http.get(this.baseUrl + "notifications/getNotificationsByTeamCode?code=" + code);
    }

    /**
     * POST: Method to add a notification
     */
    public addNotification(payload: iNotifications) {
        return this.http.post(this.baseUrl + "notifications/register/", payload);
    }

    /**
     * POST: Method to update a notification
     */
    public updateNotification(payload: iNotifications) {
        return this.http.put(this.baseUrl + "notifications/update?notification_id=" + payload["_id"], payload);
    }

    /**
     * GET: Method to generate a one-time token for access
     */
    public generateOTPCode() {
        return this.http.get(this.baseUrl + "otp/generate");
    }

    /**
     * GET: Method to get a list of all Lighter Touch Pathway patients
     */
    public getAllLTPPatients(limit: string) {
        return this.http.get(this.baseUrl + "virtualward/getAll?Limit=" + limit);
    }

    /**
     * POST: Method to register a Lighter Touch Pathway patient
     */
    public registerLTPPatient(payload: any) {
        return this.http.post(this.baseUrl + "virtualward/register", payload);
    }

    /**
     * POST: Method to update a Lighter Touch Pathway patient
     */
    public updateLTPPatient(payload: any) {
        return this.http.post(this.baseUrl + "virtualward/update", payload);
    }

    /**
     * POST: Method to manually send a text message to a Lighter Touch Pathway patient
     */
    public sendManualVWMessage(phone: string, uid: string, nhsnumber: string) {
        const payload = {
            phone,
            uid,
            nhs_number: nhsnumber,
        };
        return this.http.post(this.baseUrl + "virtualward/sendManualMessage", payload);
    }

    /**
     * GET: Method to retrieve details of a Lighter Touch Pathway patient
     */
    public getLTPPatientByID(uid: string) {
        return this.http.get(this.baseUrl + "virtualward/getByID?uid=" + uid);
    }

    /**
     * GET: Method to retrieve the logs of manually sent messages
     */
    public getLTPManualLogs() {
        return this.http.get(this.baseUrl + "virtualward/getManualLogs");
    }

    /**
     * GET: Method to retrieve the logs of automatically sent messages
     */
    public getLTPScriptLogs() {
        return this.http.get(this.baseUrl + "virtualward/getScriptLogs");
    }

    /**
     * GET: Method to retrieve the logs of delivery receipts of messages sent by Gov UK Notifiy service
     */
    public getGovUKReceipts() {
        return this.http.get(this.baseUrl + "virtualward/getAllServiceCountLogs");
    }

    /**
     * POST: Method to generate a password for a new starter
     */
    public generatePassword(payload: any) {
        return this.http.post(this.baseUrl + "password/generate", payload);
    }

    /**
     * POST: Method to validate a password for a new starter
     */
    public verifyPassword(payload: any) {
        return this.http.post(this.baseUrl + "password/verify", payload);
    }

    /**
     * POST: Method to send code
     */
    public sendCode(payload: any) {
        return this.http.post(this.baseUrl + "users/send-code", payload);
    }

    /**
     * POST: Method to verify code
     */
    public verifyCode(payload: any) {
        return this.http.post(this.baseUrl + "users/verify-code", payload);
    }

    // To be deprecated
    public requestResetPasswordCode(username: any, authmethod: any) {
        return this.http.post(this.baseUrl + "password/generate", {
            username,
            authmethod,
        });
    }

    // To be deprecated
    public verifyResetPasswordCode(username: any, authmethod: any, code: any) {
        return this.http.post(this.baseUrl + "password/verify", {
            username,
            authmethod,
            code,
        });
    }

    public sendVerificationCode(username) {
        return this.http.post(this.baseUrl + "users/send-code", {
            email: username,
        });
    }

    public checkVerificationCode(username, code) {
        return this.http.post(this.baseUrl + "users/verify-code", {
            email: username,
            code,
        });
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

    /**
     * GET: Method to retrieve a patients history
     */
    public getPatientHistory(nhsnumber: string) {
        return this.http.get(this.baseUrl + "patienthistory/patienthistorybynhsnumber?NHSNumber=" + nhsnumber);
    }

    /**
     * GET: Method to retrieve a patients council data
     */
    public getDistrictHistory(nhsnumber: string) {
        return this.http.get(this.baseUrl + "patienthistory/districthistorybynhsnumber?NHSNumber=" + nhsnumber);
    }

    /**
     * GET: Method to retrieve virtual ward decisions
     */
    public getVWDecisionPatients(limit: string) {
        return this.http.get(this.baseUrl + "virtualward_decision/getAll?Limit=" + limit);
    }

    /**
     * GET: Method to retrieve all virtual ward decisions that have been actioned
     */
    public getVWDecisionActioned(limit: string) {
        return this.http.get(this.baseUrl + "virtualward_decision/getAllActioned?Limit=" + limit);
    }

    /**
     * POST: Method to retrieve virtual ward decisions by patient and status
     */
    public getVWDecisionPatientsByStatus(status, limit) {
        return this.http.post(this.baseUrl + "virtualward_decision/getAllByStatus", { status, limit });
    }

    /**
     * POST: Method to update virtual ward status (option to pass a reason)
     */
    public updateVWStatus(id, status, reason?) {
        if (reason && reason !== null) {
            return this.http.post(this.baseUrl + "virtualward_decision/updateStatus", {
                id,
                status,
                nonreferral_reason: reason,
            });
        } else {
            return this.http.post(this.baseUrl + "virtualward_decision/updateStatus", { id, status });
        }
    }

    /**
     * POST: Method to update virtual ward contact
     */
    public updateVWContact(id, contact) {
        return this.http.post(this.baseUrl + "virtualward_decision/updateContact", { id, contact });
    }

    /**
     * POST: Method to clear virtual ward contact
     */
    public clearVWContact(id) {
        return this.http.post(this.baseUrl + "virtualward_decision/clearContact", { id });
    }

    /**
     * POST: Method to clear virtual ward notes
     */
    public clearVWNotes(id) {
        return this.http.post(this.baseUrl + "virtualward_decision/clearNotes", { id });
    }

    /**
     * POST: Method to update virtual ward notes
     */
    public updateVWNotes(id, notes) {
        return this.http.post(this.baseUrl + "virtualward_decision/updateNotes", { id, notes });
    }
}
