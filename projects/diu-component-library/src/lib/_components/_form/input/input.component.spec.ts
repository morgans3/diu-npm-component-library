/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { InputComponent } from "./input.component";
import { MaterialModule } from "../../../_modules/material.module";

import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("InputComponent", () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
            declarations: [InputComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
    // const TestCases = [
    //   { name: "EmailValidTest", inputType: "email", testvalue: "sm@ms.com", status: "VALID" },
    //   { name: "EmailInvalidTest", inputType: "email", testvalue: "sm", status: "INVALID" },
    //   { name: "TextValidTest", inputType: "text", testvalue: "sm@ms.com", status: "VALID" },
    //   { name: "PostcodeValidTest", inputType: "postcode", testvalue: "FY77NA", status: "VALID" },
    //   { name: "PostcodeInvalidTest", inputType: "postcode", testvalue: "randomString", status: "INVALID" },
    //   { name: "PasswordValidTest", inputType: "password", testvalue: "Aabbbb!90", status: "VALID" },
    //   { name: "PasswordInvalidTest", inputType: "password", testvalue: "randomString", status: "INVALID" },
    //   { name: "PhoneValidTest", inputType: "phone", testvalue: "07861452810", status: "VALID" },
    //   { name: "PhoneInvalidTest", inputType: "phone", testvalue: "randomString", status: "INVALID" },
    //   { name: "NationalInsuranceValidTest", inputType: "nationalInsurance", testvalue: "JS025547D", status: "VALID" },
    //   { name: "NationalInsuranceInvalidTest", inputType: "nationalInsurance", testvalue: "randomString", status: "INVALID" },
    //   { name: "NHSNumberValidTest", inputType: "nhsNumber", testvalue: "6140 486 904", status: "VALID" },
    //   { name: "NHSNumberInvalidTest", inputType: "nhsNumber", testvalue: "randomString", status: "INVALID" },
    // ];

    // TestCases.forEach((test) => {
    //   it("should display input correctly for type: " + test.name, () => {
    //     // Act
    //     component.field = {
    //       type: "input",
    //       helperText: "Test helperText",
    //       name: "testname",
    //       label: "Test Label",
    //       inputType: test.inputType,
    //       validators: [],
    //     };
    //     component.group = new FormGroup({
    //       testname: new FormControl(null, []),
    //     });
    //     fixture.detectChanges();

    //     // Arrange
    //     const htmlElement: HTMLElement = fixture.nativeElement;
    //     const input = htmlElement.querySelector("input")!;
    //     input.value = test.testvalue;

    //     // Assert
    //     // expect(component.field.label).toBe("Test Label"); NOT WORKING SINCE UPDATE TO 12.1.12 ???
    //     // expect(input.placeholder).toBe("Test Label"); NOT WORKING SINCE UPDATE TO 12.1.12 ???
    //     expect(input.value).toBe(test.testvalue);
    //   });

    //   it("Testing validation on input", () => {
    //     // Act
    //     component.field = {
    //       type: "input",
    //       helperText: "Test helperText",
    //       name: "testname",
    //       label: "Test Label",
    //       inputType: test.inputType,
    //       validators: [],
    //     };
    //     component.group = new FormGroup({
    //       testname: new FormControl(null, []),
    //     });
    //     fixture.detectChanges();
    //     component.setValidation(component.field.validators);
    //     fixture.detectChanges();
    //     // Arrange
    //     const htmlElement: HTMLElement = fixture.nativeElement;
    //     const input = htmlElement.querySelector("input")!; // get Validation msg instead
    //     input.value = test.testvalue;
    //     input.dispatchEvent(new Event("input"));
    //     fixture.detectChanges();

    //     // Set expected outcomes
    //     expect(component.group.status).toBe(test.status);
    //   });
    // });
});
