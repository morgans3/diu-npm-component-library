import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { APIService } from "../../../_services/api.service";

@Component({
    selector: "dialog-verifiy",
    templateUrl: "dialogverify.html",
})
export class VerifyDialogComponent {
    errorMessage: string;
    tfa: any;
    myForm = new FormGroup({
        authcode: new FormControl(null, Validators.required),
    });

    constructor(
        public dialogRef: MatDialogRef<VerifyDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private apiService: APIService
    ) {
        this.tfa = this.data;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    enableTFA() {
        if (this.myForm.controls["authcode"].value) {
            this.apiService.verifyMFA(this.myForm.controls["authcode"].value, this.tfa.tempSecret).subscribe((data: any) => {
                if (data && data.status === 200) {
                    this.dialogRef.close(data.token);
                } else {
                    this.errorMessage = "Incorrect code - Unable to verify using this code";
                }
            });
        }
    }
}
