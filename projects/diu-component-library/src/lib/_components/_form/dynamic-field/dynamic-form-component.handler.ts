import { dynamicContentHandler } from "../../../_models/dynamic-component.hander";

/**
 * This class extends the dynamic content handler and handles functions and data specific to form inputs
 */
export class dynamicFormInputHandler extends dynamicContentHandler {
    /**
     * Trigger Types are required for conditional logic amongst form inputs
     */
    triggerTypes = [
        { text: "NULL", value: "Is Blank" },
        { text: "NOT NULL", value: "Is not Blank" },
        { text: "=", value: "Equals" },
        { text: "!=", value: "Does not equal" },
        { text: ">", value: "Greater than" },
        { text: "<", value: "Less than" },
    ];

    /**
     * Action Types are required for conditional logic amongst form inputs
     */
    actionTypes = [
        { text: "Visible", value: "Visible" },
        { text: "Disable", value: "Disable" },
        { text: "Auto", value: "Auto-Fill" },
    ];

    /**
     * Validation fields are different types of validation available to form inputs
     */
    validatorFields = [
        {
            placeholder: "Type",
            type: "dropdown",
            options: [
                { text: "Required", value: "required" },
                { text: "Pattern", value: "pattern" },
            ],
            formControlName: "name",
        },
        {
            placeholder: "Pattern",
            type: "dropdown",
            options: [
                { text: "Text Only", value: "^[a-zA-Z]+$" },
                { text: "Email", value: "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$" },
            ],
            formControlName: "validatorpattern",
        },
    ];

    /**
     * Option Fields are the inputs required for options (options are individual entries for dropdown/ checkboxes/ radio buttons)
     */
    optionsFields = [
        { placeholder: "Option Key", type: "text", options: [], formControlName: "optionKey" },
        { placeholder: "Option Value", type: "text", options: [], formControlName: "optionValue" },
        { placeholder: "Order Number", type: "number", options: [], formControlName: "ordernumber" },
    ];

    /**
     * Rules Fields are the fields required to set up conditional logic between form inputs
     */
    rulesFields = [
        { placeholder: "Type", type: "text", options: [], formControlName: "type" },
        { placeholder: "Value", type: "text", options: [], formControlName: "value" },
        { placeholder: "Type", type: "dropdown", options: this.actionTypes, formControlName: "action" },
        { placeholder: "Action Value", type: "text", options: [], formControlName: "actionValue" },
    ];

    /**
     * label is required for FieldConfig, this is used to output a text label for the input
     */
    label;

    /**
     * type is required for FieldConfig, this will determine what type of input is used (checkbox/ dropdown/ input/ etc)
     */
    type;

    /**
     * inputType is required for FieldConfig, this will be used to change the type of input (number/ text/ email/ etc)
     */
    inputType;

    /**
     * name is required for FieldConfig, this will be the input name
     */
    name;

    /**
     * helpertext is required for FieldConfig, this will be used to output a tooltip
     */
    helperText;
    showInTable;
    validators;

    /**
     * options is an array that is used to add options to dropdowns/ radio buttons/ checkboxes
     */
    options;

    /**
     * rules is an array that is used to control conditional logic
     */
    rules;

    /**
     * Constructor function
     * @param data
     * @param config
     */
    constructor(data: any, config: any) {
        super(data, config);
        this.setVariables();
    }

    /**
     * This will update the variables of this class with data being passed to the component
     */
    setVariables() {
        if (this.data && this.data.name) {
            Object.keys(this.data).forEach((key) => {
                this[key] = this.data[key];
            });
        }
    }
}
