import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { cComponentHandler, fetchChildren } from "../../_models/componentHandler";
import { APIService } from "../../_services/api.service";

/**
 * Mat Card Component Class for Form Inputs
 */
@Component({
  selector: "app-matcard",
  templateUrl: "matcard.component.html",
})
export class MatCardComponent implements OnInit {
  /**
   * Initialise iMatCardConfig
   */
  config: any;
  _Handler: cComponentHandler;

  /**
   * Constructor Function
   */
  constructor(private apiService: APIService, private changeDetection: ChangeDetectorRef) {}

  /**
   * Initialisation Function
   */
  ngOnInit() {
    if (this.config) {
      this._Handler = new cComponentHandler(this.config);
      if (this._Handler.config.children && this._Handler.config.children.length > 0) {
        fetchChildren(this._Handler.config.children, this.apiService).then((result: any) => {
          this._Handler.children = result;
          this.changeDetection.detectChanges();
        });
      }
    }
  }
}
