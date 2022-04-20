import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from "@angular/core";
import { iNewsFeed } from "../../_models/installations.interface";
import { DynamicApiService } from "../../_services/dynapi.service";
import { ResizeService } from "../../_services/resize.service";
declare var window: any;

@Component({
  selector: "app-dashboard-twitter",
  templateUrl: "./dashboard-twitter.component.html",
})
export class DashboardTwitterComponent implements OnInit, AfterViewChecked {
  twitterfeeds: iNewsFeed[] = [];
  visible = false;
  cols = 3;
  displayed = 0;
  isIE = /msie\s|trident\//i.test(window.navigator.userAgent);

  constructor(private applicationService: DynamicApiService, private resizeSvc: ResizeService, private cdRef: ChangeDetectorRef) {
    this.resizeSvc.onResize$.subscribe((x) => {
      this.cols = x;
    });
  }

  ngOnInit() {
    this.applicationService.getNewsFeeds().subscribe((data: iNewsFeed[]) => {
      this.visible = true;
      this.twitterfeeds = data.filter((x) => x.type === "Twitter").sort((a, b) => parseInt(b.priority) - parseInt(a.priority));
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  decreaseDisplayed() {
    this.displayed--;
  }
  increaseDisplayed() {
    this.displayed++;
  }

  elementOutOfRange(index: number, size: number): boolean {
    const x = this.displayed;
    const z = this.displayed + size - 1;
    if (index >= x && index <= z) {
      return false;
    }
    return true;
  }

  getRightState(): boolean {
    if (this.twitterfeeds) {
      if (this.displayed > this.twitterfeeds.length - 2 - this.cols) {
        return true;
      }
    }
    return false;
  }
}
