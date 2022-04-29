/**
 * Table Action Interface
 */
export interface iTableAction {
    /**
     * Action Type
     */
    actiontype: string;
    /**
     * Action Icon
     */
    icon: string;
    /**
     * Action Colour
     */
    colour: string;
}

/**
 * Table Handler Class
 */
export class cTableDataHandler {
    /**
     * Table Action Array
     */
    actions: iTableAction[] = [];
    /**
     * Table Column Header Array
     */
    objTableColumns: { key: string; value: any }[] = [];
    /**
     * Table Columns Array
     */
    arrTableColumns: string[] = [];
    /**
     * Table Data
     */
    tableData: any[] = [];

    /**
     * Class Constructor
     */
    constructor(data: any, columns?: { key: string; value: any }[]) {
        this.tableData = data;
        if (columns) {
            this.setColumns(columns);
            return;
        }
    }

    /**
     * Function to set columns
     */
    setColumns(columns: { key: string; value: any }[]) {
        this.objTableColumns = columns;
        this.arrTableColumns = columns.map((x) => {
            return x.key;
        });
    }
}

/**
 * Form Table Handler
 * base class: Table Handler Class
 */
export class cFormTableDataHandler extends cTableDataHandler {
    // TODO: change to type/interface and comment
    formData: any;
    // TODO: change to type/interface and comment
    defaultValues: any;
    // TODO: change to type/interface and comment
    formValues: any;
    // TODO: change to type/interface and comment
    apiEndpoint: any;

    /**
     * Class Constructor
     */
    constructor(data: any, formInfo: any) {
        super(data);
        this.formData = formInfo;
        this.setFormData();
        this.setColumnData();
    }

    /**
     * Function to setup form
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
                this.actions.push({ actiontype: "delete", icon: "delete", colour: "warn" });
            }
            if (this.formData.isEditable) {
                this.actions.push({ actiontype: "edit", icon: "border_color", colour: "primary" });
            }
            if (this.formData.apiEndpoint) {
                this.apiEndpoint = this.formData.apiEndpoint;
            }
        }
    }

    /**
     * Function to set columns
     */
    setColumnData() {
        let objTableColumns = [];
        let arrTableColumns = [];
        if (this.formValues) {
            this.formValues.forEach((formValue) => {
                if (formValue.showInTable == "yes") {
                    objTableColumns.push({ key: [formValue.name], value: formValue.label });
                    arrTableColumns.push(formValue.name);
                }
            });
        }
        if (this.defaultValues) {
            this.defaultValues.forEach((formValue) => {
                if (formValue.showInTable == "yes") {
                    objTableColumns.push({ key: [formValue.label], value: formValue.label });
                    arrTableColumns.push(formValue.label);
                }
            });
        }
        this.objTableColumns = objTableColumns;
        this.arrTableColumns = arrTableColumns;
        if (this.actions.length > 0) {
            this.arrTableColumns.push("actions");
        }
    }
}
