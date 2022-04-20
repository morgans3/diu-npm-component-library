import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import jwt_decode from "jwt-decode";

@Component({
  selector: "app-profile-full",
  templateUrl: "./profile-full.component.html",
  styleUrls: ["./profile-full.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileFullComponent implements OnInit {
  /**
   * Initialise Config
   */
  config: any;
  tokenDecoded: any;

  constructor() {
    const token = localStorage.getItem("@@STATE");
    if (token) {
      const jsonToken = JSON.parse(token);
      const myToken = jsonToken.stateauth.token;
      this.tokenDecoded = jwt_decode(myToken);
    }
  }

  ngOnInit() {}
}
