import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { iSystemAlerts } from "../../../_models/header.interface";

/**
 * System Alert Modal Component Class
 */
@Component({
  selector: "dialog-systemalert",
  templateUrl: "systemalertdialog.html",
})
export class SystemAlertDialogComponent {
  /**
   * System Alert Modal Component Constructor
   * @param dialogRef Injectable for Angular Material Modal Library
   * @param data Injectable for data passed into the Modal by launching component
   */
  constructor(
    /**
     * Injectable for Angular Material Modal Library
     */
    public dialogRef: MatDialogRef<SystemAlertDialogComponent>,
    /**
     * Injectable for data passed into the Modal by launching component
     */
    @Inject(MAT_DIALOG_DATA) public data: iSystemAlerts
  ) {}

  /**
   * Function called when user closes the Modal
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}
