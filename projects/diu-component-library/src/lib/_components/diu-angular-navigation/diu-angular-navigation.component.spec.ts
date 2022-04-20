/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { DiuAngularNavigationComponent } from "./diu-angular-navigation.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../../_modules/material.module";

describe("DiuAngularNavigationComponent", () => {
  let component: DiuAngularNavigationComponent;
  let fixture: ComponentFixture<DiuAngularNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiuAngularNavigationComponent],
      imports: [MaterialModule, RouterModule, HttpClientModule, FormsModule, ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiuAngularNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
