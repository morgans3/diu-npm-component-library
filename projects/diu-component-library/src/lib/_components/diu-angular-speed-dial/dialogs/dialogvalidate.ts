import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MFAAuthService } from "../../../_services/auth.service";

@Component({
  selector: "dialog-validate",
  templateUrl: "dialogvalidate.html",
})
export class ValidateDialogComponent {
  errorMessage: string;
  myForm = new FormGroup({
    authcode: new FormControl(null, Validators.required),
  });

  constructor(public dialogRef: MatDialogRef<ValidateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private authService: MFAAuthService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm() {
    this.errorMessage = null;
    this.authService.validateMFA(this.myForm.controls["authcode"].value).subscribe((data: any) => {
      if (data.status === 200) {
        this.dialogRef.close(data.token);
      } else {
        this.errorMessage = data.message;
      }
    });
  }

  removeMFA() {
    this.authService.unregisterMFA().subscribe((data: any) => {
      if (data && data.status && data.status !== 401) {
        this.dialogRef.close();
      } else {
        this.errorMessage = "Unable to remove MFA method. Please contact support.";
      }
    });
  }
}
