import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { cComponentHandler, cFormWithTableHander } from "../../_models/componentHandler";
import { cFormTableDataHandler } from "../../_models/table.handler";
import { DynamicApiService } from "../../_services/dynapi.service";
import { FormTableDataHandler } from "../api-table-data-handler/api-table-data.handler";

@Component({
  selector: "form-with-table",
  templateUrl: "./form-with-table.component.html",
  styles: [],
})
/**
 * This class is a parent class for handling behaviour between both forms and display tables
 */
export class FormWithTableComponent implements OnInit {
  /**
   * config is the data reuired for the handler
   */
  config: any;

  /**
   * this is the data handler class for form with table
   */
  _Handler: cFormWithTableHander;

  /**
   * Form data passed through to the parent to be passed to either the dynamic-form or display-table component
   */
  @Input() formData?: any;

  /**
   * If formData isn't passed directly then the ID of the form data in the database is passed so the data can be loaded
   */
  @Input() formDataID?: any;

  /**
   * FormAnswers are the already answered questions from the form.
   */
  @Input() formAnswers: any;

  /**
   * The data handler for tables attached to forms
   */
  tableDataHandler: FormTableDataHandler;

  /**
   * This variable is used to determine if this is an existing submission that's being updated or a new submission to be registered
   */
  submissionData: any;

  /**
   * Updates the default values for data when the data is being updated, this is used to ensure the missing values from the form can be posted when updated as the API won't accept a payload without all of the values in place
   */
  arrDefaultValues: any;

  /**
   * tableData is the configeration that can be passed through to display table to ensure the right columns and actions are in place
   */
  tableData:any;

  /**
   * tableUrl is updated to contain the API endpoint to get tableData from
   */
  tableUrl: string;

  /**
   * This is updated to determine what class to wrap around the feedbackMessage (error, success, etc)
   */
  feedbackStatus: string;

  /**
   * This is updated to put a message onto the page when API calls have been made to register, update or delete data
   */
  feedbackMessage: string;

  /**
   * Function constructor funciton
   * @param selectionService - This service is used to communicate with the API
   */
  constructor(private selectionService: DynamicApiService) {}

  /**
   * This function is ran when the component has been initialized
   */
  ngOnInit() {
    this._Handler = new cFormWithTableHander(this.config);
    // if there's no preloaded data and a form ID provided
    if (!this._Handler.formData && this._Handler.formDataID) {
      //use the form ID to get form config from db
      this.selectionService.getPayloadById(this._Handler.formDataID).subscribe((data: any) => {
        //if the data has been returned
        if (data && data.length > 0) {
          //form data is stored under the key config
          this._Handler.formData = JSON.parse(data[0].config);
          this.selectionService.getPayloadById(this._Handler.tableDataID).subscribe((response: any) => {
            this.tableData = JSON.parse(response[0].config);
            // console.log(this.tableData);
            this.configureTable();
          });
        }
      });
    }
    if (this._Handler.formData) {
      this.configureTable();
    }
  }

  /**
   * This function is used to get the data for the handler from the API
   */
  configureTable() {
    this.tableUrl = this._Handler.formData.apiEndpoint + "getAll/";
    this.selectionService.genericGetAPICall(this.tableUrl).subscribe((data) => {
      this.tableDataHandler = new FormTableDataHandler(data, this._Handler.formData,this.tableData);
    });
  }

  /**
   * 
   * @returns the class to be wrapped around the feedback message
   */
  feedbackClass() {
    if (this.feedbackStatus == "success") {
      return "successMessage";
    } else {
      return "errorMessage";
    }
  }

  /**
   * This function is used to send data to be registered or updated 
   * @param formSubmissionData 
   */
  formSubmission(formSubmissionData) {
    // console.log(formSubmissionData);
    let strRegisterEndpoint = this._Handler.formData.apiEndpoint + "register/";
    if (this.submissionData) {
      strRegisterEndpoint = this._Handler.formData.apiEndpoint + "update/";
    }

    const payload = formSubmissionData;
    Object.keys(payload).forEach((key) => {
      payload[key] = this.returnDefaultValue(payload[key]);
    });
    if (this.tableDataHandler.defaultValues) {
      this.tableDataHandler.defaultValues.forEach((defaultValue, index) => {
        // console.log(defaultValue);
        // console.log(this.arrDefaultValues[index]);
        if (defaultValue.value && defaultValue.label) {
          payload[defaultValue.label] = this.returnDefaultValue(defaultValue.value);
        }
      });
    }
    // console.log(payload);
    this.selectionService.genericPostAPICall(strRegisterEndpoint, payload).subscribe((data) => {
      // console.log(data);
      //TODO: add success/ fail message
      if (data["success"]) {
        this.feedbackStatus = "success";
        if (this.submissionData) {
          this.feedbackMessage = "You have updated your submission";
          // this.submissionData.config = JSON.stringify(formSubmissionData);
          // console.log(this);
        } else {
          this.feedbackMessage = "You have registered a new submission";
        }
        this.configureTable();
      } else {
        this.feedbackStatus = "fail";
        if (this.submissionData) {
          this.feedbackMessage = "You have not updated your submission";
        } else {
          this.feedbackMessage = "You have not registered a new submission";
        }
      }
    });
  }

  /**
   * This is used to dynamically call a function from this class
   * @param data - this is an object passed that contains data for a function and the name of the function to be called
   */
  runPassedFunction(data){
    this[data.passedFunction](data.data);
  }

  /**
   * This is used to put a row of data from the table into the dynamic-form component
   * @param formData - When the table action for update is ran this is the row data
   */
  updateFormAnswers(formData) {
    // console.log(formData);
    this.submissionData = formData;
  }

  /**
   * This is used to dynamically change the form information
   * @param formData - This is the data for the form that determines what's going to be displayed 
   */
  updateFormData(formData) {
    this.formData = formData;
    this.configureTable();
  }

  /**
   * This is used to remove data from the databse via the API
   * @param formData - When the table action for delete is ran this is the row data
   */
  deleteFormData(formData) {
    let strDeleteEndpoint = this._Handler.formData.apiEndpoint + "delete/";
    this.selectionService.genericPostAPICall(strDeleteEndpoint, formData).subscribe((data) => {
      //   console.log(data);
      if (data["success"]) {
        this.feedbackStatus = "success";
        this.feedbackMessage = "You have deleted the submission";
        this.configureTable();
      } else {
        this.feedbackStatus = "fail";
        this.feedbackMessage = "You have failed to delete the submission";
      }
    });
    // console.log(formData);
  }

  /**
   * This is used to update the API endpoint if data changes
   * @param data - the new API endpoint
   */
  updateEndpoint(data) {
    this._Handler.formData.apiEndpoint = data;
  }

  /**
   * This function is used to update the default values array
   * @param data - This is an array containing default value information
   */
  updateDefaultValues(data) {
    this.arrDefaultValues = data;
    // console.log(this);
  }

  /**
   * This is used to turn string data into a boolean
   * @param value - form data passed through
   * @returns - the updated form data
   */
  returnDefaultValue(value) {
    if (value == "true") {
      return true;
    }
    if (value == "false") {
      return false;
    }
    // if(!isNaN(value) && typeof value == 'string'){
    //   return parseFloat(value);
    // }
    return value;
  }
}
