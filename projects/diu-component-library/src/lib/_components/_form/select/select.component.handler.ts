import { dynamicFormInputHandler } from "../dynamic-field/dynamic-form-component.handler";

export class selectComponentHandler extends dynamicFormInputHandler {
    requiredFields = [
        { placeholder: "Field Label", type: "text", options: [], formControlName: "label" },
        { placeholder: "Field Name", type: "text", options: [], formControlName: "name" },
        { placeholder: "Additional Information", type: "textarea", options: [], formControlName: "helperText" },
        { placeholder: "List Options", type: "repeaterField", options: this.optionsFields, formControlName: "options" },
        { placeholder: "Validators", type: "repeaterField", options: this.validatorFields, formControlName: "validators" },
        { placeholder: "Rules", type: "repeaterField", options: this.rulesFields, formControlName: "rules" },
    ];

    constructor(data: any, config: any) {
        super(data, config);
        this.setOptions();
    }

    setOptions() {
        if (this["stateOptions"]) {
            let optionData = JSON.parse(localStorage["@@STATE"]);
            // console.log(optionData);
            let arrStateKeys = this["stateOptions"]["stateOptionData"].split(".");
            arrStateKeys.forEach((string) => {
                // console.log(string);
                optionData = optionData[string];
            });
            // console.log(optionData);
            let key = this["stateOptions"]["stateOptionKey"];
            let value = this["stateOptions"]["stateOptionValue"];
            let dataForOptions = Array.from(optionData);
            let counter = 0;
            let newOptions = [];
            dataForOptions.forEach((option) => {
                // console.log(option);
                let data = {
                    optionKey: option[key],
                    optionValue: option[value],
                    ordernumber: counter,
                };
                newOptions.push(data);
                counter++;
            });
            this.options = newOptions;
        }
    }
}
