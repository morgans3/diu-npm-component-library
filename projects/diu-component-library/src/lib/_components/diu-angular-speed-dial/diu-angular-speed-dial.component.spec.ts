/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { DiuAngularSpeedDialComponent } from "./diu-angular-speed-dial.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "../../_modules/material.module";

describe("DiuAngularSpeedDialComponent", () => {
  let component: DiuAngularSpeedDialComponent;
  let fixture: ComponentFixture<DiuAngularSpeedDialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiuAngularSpeedDialComponent],
      imports: [MaterialModule, RouterModule.forRoot([]), HttpClientModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiuAngularSpeedDialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
