import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./_baseclass.service";
/**
 * Reference to Browser Window
 */
declare var window: any;

/**
 * Patient Service Class
 */
@Injectable({
  providedIn: "root",
})
export class PatientService extends BaseService {
  /**
   * Patient Service Constructor
   */
  constructor(protected http: HttpClient) {
    super(http);
    const origin = window.location.href;
    this.baseUrl = this.combineURL(origin, "patient");
  }

  /**
   * GET: Method to retrieve all patients
   */
  public getPatients(limit: string) {
    return this.http.get(this.baseUrl + "patientlists/getPatients?Limit=" + limit);
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
   * GET: Method to retrieve virtual ward decisions
   */
  public getVWDecisionPatients(limit) {
    return this.http.get(this.baseUrl + "virtualward_decision/getAll?Limit=" + limit);
  }

  /**
   * GET: Method to retrieve all virtual ward decisions that have been actioned
   */
  public getVWDecisionActioned(limit) {
    return this.http.get(this.baseUrl + "virtualward_decision/getAllActioned?Limit=" + limit);
  }

  /**
   * POST: Method to retrieve virtual ward decisions by patient and status
   */
  public getVWDecisionPatientsByStatus(status, limit) {
    return this.http.post(this.baseUrl + "virtualward_decision/getAllByStatus", { status: status, limit: limit });
  }

  /**
   * POST: Method to update virtual ward status (option to pass a reason)
   */
  public updateVWStatus(id, status, reason?) {
    if (reason && reason !== null) {
      return this.http.post(this.baseUrl + "virtualward_decision/updateStatus", { id: id, status: status, nonreferral_reason: reason });
    } else {
      return this.http.post(this.baseUrl + "virtualward_decision/updateStatus", { id: id, status: status });
    }
  }

  /**
   * POST: Method to update virtual ward contact
   */
  public updateVWContact(id, contact) {
    return this.http.post(this.baseUrl + "virtualward_decision/updateContact", { id: id, contact: contact });
  }

  /**
   * POST: Method to clear virtual ward contact
   */
  public clearVWContact(id) {
    return this.http.post(this.baseUrl + "virtualward_decision/clearContact", { id: id });
  }

  /**
   * POST: Method to clear virtual ward notes
   */
  public clearVWNotes(id) {
    return this.http.post(this.baseUrl + "virtualward_decision/clearNotes", { id: id });
  }

  /**
   * POST: Method to update virtual ward notes
   */
  public updateVWNotes(id, notes) {
    return this.http.post(this.baseUrl + "virtualward_decision/updateNotes", { id: id, notes: notes });
  }

  /**
   * GET: Method to retrieve all citizens (limit available)
   */
  public getCitizens(limit) {
    return this.http.get(this.baseUrl + "shielding/getCitizens?Limit=" + limit);
  }
}
