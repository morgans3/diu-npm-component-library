import { NgModule } from "@angular/core";
import { MaterialModule } from "./material.module";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { RouterModule } from "@angular/router";
import { DiuAngularHeaderComponent } from "../_components/diu-angular-header/diu-angular-header.component";
import { SystemAlertDialogComponent } from "../_components/diu-angular-header/dialogs/systemalertdialog.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [DiuAngularHeaderComponent, SystemAlertDialogComponent],
    imports: [MaterialModule, PerfectScrollbarModule, RouterModule, CommonModule],
    exports: [DiuAngularHeaderComponent, SystemAlertDialogComponent],
    entryComponents: [SystemAlertDialogComponent],
})
export class DiuHeaderModule {}
