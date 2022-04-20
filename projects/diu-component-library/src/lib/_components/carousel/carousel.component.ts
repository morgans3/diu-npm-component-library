import { Component, OnInit } from "@angular/core";
import { cCarouselHandler, iCarouselItem } from "../../_models/componentHandler";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
})
export class CarouselComponent implements OnInit {
  config: any;
  _Handler: cCarouselHandler;
  carouselItems: iCarouselItem[] = [];

  constructor() {}

  ngOnInit() {
    this._Handler = new cCarouselHandler(this.config);
    this.carouselItems = this._Handler.carouselItems;
  }
}
