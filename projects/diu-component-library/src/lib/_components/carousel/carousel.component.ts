import { Component, OnInit } from "@angular/core";
import { cCarouselHandler, iCarouselItem } from "../../_models/componentHandler";

@Component({
    selector: "app-carousel",
    templateUrl: "./carousel.component.html",
})
export class CarouselComponent implements OnInit {
    config: any;
    Handler: cCarouselHandler;
    carouselItems: iCarouselItem[] = [];

    constructor() {}

    ngOnInit() {
        this.Handler = new cCarouselHandler(this.config);
        this.carouselItems = this.Handler.carouselItems;
    }
}
