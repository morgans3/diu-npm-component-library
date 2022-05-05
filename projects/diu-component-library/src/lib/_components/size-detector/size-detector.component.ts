import { Component, ElementRef, AfterViewInit, HostListener } from "@angular/core";
import { ResizeService, SCREEN_SIZE } from "../../_services/resize.service";

@Component({
    selector: "app-size-detector",
    template: `<div
        *ngFor="let s of sizes"
        fxHide
        [fxShow.xs]="s.name === 'xs'"
        [fxShow.sm]="s.name === 'sm'"
        [fxShow.md]="s.name === 'md'"
        [fxShow.lg]="s.name === 'lg'"
        [fxShow.xl]="s.name === 'xl'"
        class="{{ s.css + ' ' + (prefix + s.id) }}"
    ></div>`,
})
export class SizeDetectorComponent implements AfterViewInit {
    currentSize: any;
    prefix = "is-";
    sizes = [
        {
            id: SCREEN_SIZE.XS,
            name: "xs",
            css: `d-block d-sm-none`,
        },
        {
            id: SCREEN_SIZE.SM,
            name: "sm",
            css: `d-none d-sm-block d-md-none`,
        },
        {
            id: SCREEN_SIZE.MD,
            name: "md",
            css: `d-none d-md-block d-lg-none`,
        },
        {
            id: SCREEN_SIZE.LG,
            name: "lg",
            css: `d-none d-lg-block d-xl-none`,
        },
        {
            id: SCREEN_SIZE.XL,
            name: "xl",
            css: `d-none d-xl-block`,
        },
    ];

    constructor(private elementRef: ElementRef, private resizeSvc: ResizeService) {}

    @HostListener("window:resize", [])
    private onResize() {
        this.detectScreenSize();
    }

    ngAfterViewInit() {
        this.detectScreenSize();
    }

    private detectScreenSize() {
        this.currentSize = this.sizes.find((x) => {
            const el = this.elementRef.nativeElement.querySelector(`.${this.prefix}${x.id}`);
            const isVisible = window.getComputedStyle(el).display !== "none";
            return isVisible;
        });

        this.resizeSvc.onResize(this.currentSize.id);
    }
}
