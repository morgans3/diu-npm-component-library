/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UserSearchComponent } from "./user-search.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "../../_modules/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("UserSearchComponent", () => {
    let component: UserSearchComponent;
    let fixture: ComponentFixture<UserSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, MaterialModule, HttpClientModule, BrowserAnimationsModule],
            declarations: [UserSearchComponent],
            providers: [],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
