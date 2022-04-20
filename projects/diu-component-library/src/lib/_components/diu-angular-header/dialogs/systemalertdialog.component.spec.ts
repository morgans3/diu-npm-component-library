import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MaterialModule } from "../../../_modules/material.module";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SystemAlertDialogComponent } from "./systemalertdialog.component";

describe("SystemAlertDialogComponent", () => {
  let component: SystemAlertDialogComponent;
  let fixture: ComponentFixture<SystemAlertDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SystemAlertDialogComponent],
      imports: [MaterialModule],
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
    fixture = TestBed.createComponent(SystemAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
