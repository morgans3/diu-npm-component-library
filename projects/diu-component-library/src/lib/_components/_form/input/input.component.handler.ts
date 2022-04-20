import { dynamicFormInputHandler } from "../dynamic-field/dynamic-form-component.handler";

export class inputComponentHandler extends dynamicFormInputHandler {
  inputTypes = [
    { text: "Text", value: "text" },
    { text: "Email", value: "email" },
    { text: "Password", value: "password" },
    { text: "Phone", value: "phone" },
    { text: "National Insurance", value: "nationalInsurance" },
    { text: "NHS Number", value: "nhsNumber" },
    { text: "Postcode", value: "postcode" },
    { text: "Number", value: "number" },
    { text: "Colour Picker", value: "color" },
  ];

  requiredFields = [
    { placeholder: "Input Type", type: "dropdown", options: this.inputTypes, formControlName: "inputType" },
    { placeholder: "Field Label", type: "text", options: [], formControlName: "label" },
    { placeholder: "Field Name", type: "text", options: [], formControlName: "name" },
    { placeholder: "Additional Information", type: "textarea", options: [], formControlName: "helperText" },
    { placeholder: "Validators", type: "repeaterField", options: this.validatorFields, formControlName: "validators" },
    { placeholder: "Rules", type: "repeaterField", options: this.rulesFields, formControlName: "rules" },
  ];

  constructor(data: any, config: any) {
    super(data, config);
  }
}
