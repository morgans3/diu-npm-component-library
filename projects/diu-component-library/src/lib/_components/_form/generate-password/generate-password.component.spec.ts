/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "../../../_modules/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PasswordGeneratorComponent } from "./generate-password.component";

describe("PasswordGeneratorComponent", () => {
    let component: PasswordGeneratorComponent;
    let fixture: ComponentFixture<PasswordGeneratorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, MaterialModule, HttpClientModule, BrowserAnimationsModule],
            declarations: [PasswordGeneratorComponent],
            providers: [],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordGeneratorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
