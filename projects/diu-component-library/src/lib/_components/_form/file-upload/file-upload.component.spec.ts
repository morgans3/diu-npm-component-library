/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "../../../_modules/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FileUploadComponent } from "./file-upload.component";
import { ImageGalleryDialogComponent } from "../../image-gallery/image-gallery.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ImageUploaderModule } from "ngx-image-uploader-next";

describe("FileUploadComponent", () => {
    let component: FileUploadComponent;
    let fixture: ComponentFixture<FileUploadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, MaterialModule, HttpClientModule, BrowserAnimationsModule, ImageUploaderModule],
            declarations: [FileUploadComponent, ImageGalleryDialogComponent],
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
        fixture = TestBed.createComponent(FileUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
