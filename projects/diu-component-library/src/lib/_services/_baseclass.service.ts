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
        const domain = origin.split("//")[1].split("/")[0].replace("www", "");
        if (domain.includes("localhost")) {
            return "https://" + subdomain + "." + this.devURL + "/";
        } else if (domain.includes("dev") || domain.includes("demo")) {
            return "https://" + subdomain + "." + domain + "/";
        }
        return "https://" + subdomain + domain + "/";
    }

    /**
     * Method to check that API is online
     */
    public checkendpoint() {
        return this.http.get(this.baseUrl, { responseType: "text" });
    }
}
