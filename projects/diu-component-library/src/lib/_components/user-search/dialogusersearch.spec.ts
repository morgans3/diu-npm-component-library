/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "../../_modules/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UserSearchDialogComponent } from "./dialogusersearch";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserSearchComponent } from "./user-search.component";

describe("UserSearchDialogComponent", () => {
    let component: UserSearchDialogComponent;
    let fixture: ComponentFixture<UserSearchDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, MaterialModule, HttpClientModule, BrowserAnimationsModule],
            declarations: [UserSearchDialogComponent, UserSearchComponent],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                {
                    provide: MatDialogRef,
                    useValue: {},
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserSearchDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
