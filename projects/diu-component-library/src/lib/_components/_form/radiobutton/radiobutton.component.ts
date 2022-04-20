import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { iFieldConfig, iOptions, iValidator } from "../../../_models/field.interface";

/**
 * Radiobutton Component Class
 */
@Component({
  selector: "app-radiobutton",
  styles: [".mat-radio-label { padding-right: 10px !important; }"],
  templateUrl: "radiobutton.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class RadiobuttonComponent implements OnInit {
  /**
   * Initialise Angular FieldConfig
   */
  field: iFieldConfig;
  /**
   * Initialise Form Group
   */
  group: FormGroup;

  /**
   * Radiobutton Component Constructor
   */
  constructor() {}

  /**
   * Radiobutton Component Initialiser function
   */
  ngOnInit() {
    if (this.field.options) {
      this.field.options = this.sortItems(this.field.options);
    }
    if (this.field && this.field.validators && this.field.validators.length > 0) {
      this.setValidation(this.field.validators);
    }
  }

  /**
   * Function to sort values in Radiobutton list
   */
  sortItems(input: iOptions[]) {
    if (!input) return input;
    if (input.length <= 1) return input;
    return input.sort((a, b) => (a.ordernumber > b.ordernumber ? 1 : -1));
  }

  /**
   * Function to set Validation in Radiobutton list
   */
  setValidation(validators: iValidator[]) {
    // 1. Initialise an empty array
    let arrValidation = [];
    // 2. Loop through the validators and add to the array
    validators.forEach((validator: iValidator) => {
      switch (validator.name) {
        case "pattern":
          arrValidation.push(Validators.pattern(validator.validatorpattern)); // might change this later on
          break;
        case "required":
          arrValidation.push(Validators.required);
          break;
      }
    });

    let currValue = null;
    let attributeSelector = '[ng-reflect-name="' + this.field.name + '"] .mat-radio-checked';
    const domElem = <HTMLInputElement>document.querySelector(attributeSelector);
    if (domElem && domElem.getAttribute("ng-reflect-value")) {
      currValue = domElem.getAttribute("ng-reflect-value");
    }
    this.group.setControl(this.field.name, new FormControl(currValue, arrValidation));
  }

  /**
   * Function to check Validation in Radiobutton list
   */
  checkValidation() {
    let objCurrentGroup = this.group.get(this.field.name);
    let blnValid = false;
    if (objCurrentGroup.hasError("required") && objCurrentGroup.touched) {
      blnValid = true;
    }
    return blnValid;
  }
}
