import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

export enum SCREEN_SIZE {
    XS,
    SM,
    MD,
    LG,
    XL,
}

@Injectable()
export class ResizeService {
    private resizeSubject: Subject<SCREEN_SIZE>;

    constructor() {
        this.resizeSubject = new Subject();
    }

    get onResize$(): Observable<SCREEN_SIZE> {
        return this.resizeSubject.asObservable().pipe(distinctUntilChanged());
    }

    onResize(size: SCREEN_SIZE) {
        this.resizeSubject.next(size);
    }
}
