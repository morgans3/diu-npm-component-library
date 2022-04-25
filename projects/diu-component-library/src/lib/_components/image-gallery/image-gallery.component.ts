import { Component, ViewEncapsulation, OnInit, Output, EventEmitter } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { iImages } from "../../_models/images.interface";
import { APIService } from "../../_services/api.service";

/**
 * Image Gallery Modal Component
 */
@Component({
  selector: "image-gallery",
  templateUrl: "./image-gallery.component.html",
  styleUrls: ["./image-gallery.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ImageGalleryDialog implements OnInit {
  /**
   * Declaration for stored image meta data
   */
  storedImages: iImages[];
  /**
   * DIU Image API Endpoint
   */
  imageEndpoint = "https://images.nexusintelligencenwnhs.co.uk/imageuploader/"; // TODO: Change to dyanmic link not fixed url

  /**
   * Image Gallery Modal Constructor
   */
  constructor(
    /**
     * Service to handle API calls
     */
    private apiService: APIService,
    /**
     * Mat Dialog Library to handle component actions
     */
    public dialogRef: MatDialogRef<ImageGalleryDialog>
  ) {}

  /**
   * Angular lifecycle hook event called when the component is first constructed
   */
  ngOnInit() {
    this.getAllImages();
  }

  /**
   * Function to retrieve the list of available Images
   */
  getAllImages() {
    this.apiService.genericGetAPICall(this.imageEndpoint + "getall/").subscribe((data: iImages[]) => {
      this.storedImages = data;
    });
  }

  /**
   * Function to select Image
   */
  updateSelectedImage(data: iImages) {
    this.dialogRef.close(data);
  }

  /**
   * Function to remove an Image
   */
  deleteSelectedImage(imageData) {
    this.apiService.genericPostAPICall(this.imageEndpoint + "delete/", imageData).subscribe((data: any) => {
      if (data && data.success) {
        this.storedImages.splice(
          this.storedImages.findIndex((x) => (x = imageData)),
          1
        );
      }
    });
  }
}
