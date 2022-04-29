import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { GalleryItem, ImageItem } from "ng-gallery";

@Component({
    selector: "app-screenshots",
    templateUrl: "./screenshots.component.html",
})
export class ScreenshotsComponent implements OnInit, OnChanges {
    @Input() images: string[];
    _album: GalleryItem[] = [];

    constructor() {}

    ngOnInit() {
        this.loadImagesToAlbum();
    }

    ngOnChanges() {
        this.loadImagesToAlbum();
    }

    loadImagesToAlbum() {
        if (this.images.length > 0 && this._album.length === 0) {
            this.images.forEach((i) => {
                const img = new ImageItem({
                    src: "/assets/images/screens/" + i,
                    thumb: "/assets/images/screens/" + i,
                });
                this._album.push(img);
            });
        }
    }
}
