import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { cComponentHandler, fetchChildren } from "../../_models/componentHandler";
import { DynamicApiService } from "../../_services/dynapi.service";
/**
 * Div Row Component Class
 */
@Component({
  selector: "app-divrow",
  template: `
    <ng-template #myComponentTemplate>
      <div>
        <ng-content></ng-content>
      </div>
      <div fxLayout="row wrap" *ngIf="_Handler">
        <ng-container *ngFor="let child of _Handler.children" dynamicComponent [config]="child.config"></ng-container>
      </div>
    </ng-template>
    <ng-container *ngTemplateOutlet="myComponentTemplate"></ng-container>
  `,
})
export class DivRowComponent implements OnInit {
  /**
   * Initialise Config
   */
  config: any;
  _Handler: cComponentHandler;

  /**
   * Constructor Function
   */
  constructor(private dynapiService: DynamicApiService, private changeDetection: ChangeDetectorRef) {}

  /**
   * Initialisation Function
   */
  ngOnInit() {
    this._Handler = new cComponentHandler(this.config);
    if (this._Handler.config.children && this._Handler.config.children.length > 0) {
      fetchChildren(this._Handler.config.children, this.dynapiService).then((result: any) => {
        this._Handler.children = result;
        this.changeDetection.detectChanges();
      });
    }
  }
}
