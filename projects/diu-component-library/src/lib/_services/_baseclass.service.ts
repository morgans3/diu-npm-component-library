import { HttpClient } from "@angular/common/http";

export class BaseService {
    /**
     * API Subdomain
     */
    baseUrl = "";
    devURL = "nhs-bi-platform.co.uk";

    constructor(protected http: HttpClient, env?: any) {
        if (env) this.devURL = env.websiteURL || "nhs-bi-platform.co.uk";
    }

    /**
     * Method for adding Subdomain to current Browser Location
     */
    public combineURL(origin: string, subdomain: string) {
        return `http${this.devURL.includes("localhost") ? "" : "s"}://${subdomain}.${this.devURL}/`;
    }

    /**
     * Method to check that API is online
     */
    public checkendpoint() {
        return this.http.get(this.baseUrl, { responseType: "text" });
    }
}
