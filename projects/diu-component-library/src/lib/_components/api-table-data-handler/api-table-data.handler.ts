/**
 * TableDataHandler contains the minimum amount of data required for display-table component to run
 */
export class TableDataHandler {
    deletable: any;
    editable: any;
    objTableColumns;
    arrTableColumns;
    tableData;
    actions: object[] = [];
    constructor(data: any) {
        this.tableData = data;
    }
}

/**
 * FormTableDataHandler extends TableDataHandler and is used to set the data returned by the form-with-table component
 */
export class FormTableDataHandler extends TableDataHandler {
    /**
     * formData is data from the form thats going to be displayed, includes information like API endpoint
     */
    formData: any;

    /**
     * Default values are stored for new form entries, the API won't accept registers/ updates if all of the columns aren't present
     */
    defaultValues: any;

    /**
     * Form Values are the columns from the form that are going to be in the form and updatable
     */
    formValues: any;

    /**
     * apiEndpoint is taken from formData and contains a URL for an API for where the updated/ deleted values can be sent to be processed
     */
    apiEndpoint: any;

    /**
     * tableConfig is the data sent by the table data handler,
     * table config can be used instead of formData to determine what data should appear in the form
     */
    tableConfig: any;

    /**
     * Constructor function
     *
     * @param data - the data to be displayed in rows
     * @param formInfo - formData comes from this passed variable
     * @param tableConfig - tableConfig comes from this variable
     */
    constructor(data: any, formInfo: any, tableConfig: any) {
        super(data);
        this.formData = formInfo;
        this.setFormData();
        this.tableConfig = tableConfig;
        if (this.tableConfig) {
            this.setColumnDataFromTable();
        } else {
            this.setColumnData();
        }
    }

    /**
     * this function sets the variables on the handler based on passed formData
     */
    setFormData() {
        if (this.formData) {
            if (this.formData.questions) {
                this.formValues = this.formData.questions;
            }
            if (this.formData.defaultValues) {
                this.defaultValues = this.formData.defaultValues;
            }
            if (this.formData.isDeletable) {
                this.deletable = this.formData.isDeletable;
            }
            if (this.formData.isEditable) {
                this.editable = this.formData.isEditable;
            }
            if (this.formData.deletable) {
                this.deletable = this.formData.deletable;
            }
            if (this.formData.editable) {
                this.editable = this.formData.editable;
            }
            if (this.formData.apiEndpoint) {
                this.apiEndpoint = this.formData.apiEndpoint;
            }
        }
    }

    /**
     * This sets the columns to be dislpayed based on formData thats been passed to the handler
     */
    setColumnData() {
        if (!this.objTableColumns && !this.arrTableColumns) {
            const objTableColumns = {};
            const arrTableColumns = [];
            if (this.formValues) {
                this.formValues.forEach((formValue) => {
                    if (formValue.showInTable === "yes") {
                        objTableColumns[formValue.name] = formValue.label;
                        arrTableColumns.push(formValue.name);
                    }
                });
            }
            if (this.defaultValues) {
                this.defaultValues.forEach((formValue) => {
                    if (formValue.showInTable === "yes") {
                        objTableColumns[formValue.label] = formValue.label;
                        arrTableColumns.push(formValue.label);
                    }
                });
            }
            this.objTableColumns = objTableColumns;
            this.arrTableColumns = arrTableColumns;
        }
        this.setActions();
    }

    /**
     * This function sets the handler data from table config that's passed
     */
    setColumnDataFromTable() {
        Object.keys(this.tableConfig).forEach((key) => {
            this[key] = this.tableConfig[key];
        });
        this.setActions();
    }

    /**
     * This function will create the array required for differnt actions that could be taken by the form
     */
    setActions() {
        if (this.editable === "yes") {
            const editable = {
                icon: "border_color",
                action: "updateFormAnswers",
                colour: "primary",
            };
            this.actions.push(editable);
            if (!this.arrTableColumns.includes("actions")) {
                this.arrTableColumns.push("actions");
            }
        }
        if (this.deletable === "yes") {
            const deletable = {
                icon: "delete",
                action: "deleteFormData",
                colour: "warn",
            };
            this.actions.push(deletable);
            if (!this.arrTableColumns.includes("actions")) {
                this.arrTableColumns.push("actions");
            }
        }
    }
}
