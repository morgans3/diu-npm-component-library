import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DiuComponentLibraryComponent } from "./diu-component-library.component";

describe("DiuComponentLibraryComponent", () => {
  let component: DiuComponentLibraryComponent;
  let fixture: ComponentFixture<DiuComponentLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiuComponentLibraryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiuComponentLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
