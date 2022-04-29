/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "../../_modules/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ImageGalleryDialog } from "./image-gallery.component";
import { APIService } from "../../_services/api.service";

describe("ImageGalleryDialog", () => {
    let component: ImageGalleryDialog;
    let fixture: ComponentFixture<ImageGalleryDialog>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, MaterialModule, HttpClientModule, BrowserAnimationsModule],
            declarations: [ImageGalleryDialog],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                {
                    provide: MatDialogRef,
                    useValue: {},
                },
                APIService,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImageGalleryDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
