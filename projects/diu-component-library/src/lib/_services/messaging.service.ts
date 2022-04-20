import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { iNotifications } from "../_models/header.interface";
import { BaseService } from "./_baseclass.service";
/**
 * Reference to Browser Window
 */
declare var window: any;

/**
 * Messaging Management Service Class
 */
@Injectable({
  providedIn: "root",
})
export class MessagingService extends BaseService {
  /**
   * Messaging Service Constructor
   */
  constructor(protected http: HttpClient) {
    super(http);
    const origin = window.location.href;
    this.baseUrl = this.combineURL(origin, "messaging");
  }

  /**
   * GET: Method to retrieve all notifications
   */
  public get() {
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
  public add(payload: iNotifications) {
    return this.http.post(this.baseUrl + "notifications/register/", payload);
  }

  /**
   * POST: Method to update a notification
   */
  public update(payload: iNotifications) {
    return this.http.put(this.baseUrl + "notifications/update?notification_id=" + payload._id, payload);
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
      phone: phone,
      uid: uid,
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

  //To be deprecated
  public requestResetPasswordCode(username: any, authmethod: any) {
    return this.http.post(this.baseUrl + "password/generate", {
      username: username,
      authmethod: authmethod,
    });
  }

  //To be deprecated
  public verifyResetPasswordCode(username: any, authmethod: any, code: any) {
    return this.http.post(this.baseUrl + "password/verify", {
      username: username,
      authmethod: authmethod,
      code: code,
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
      code: code,
    });
  }
}
