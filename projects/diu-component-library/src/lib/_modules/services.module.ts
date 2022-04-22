import { NgModule } from "@angular/core";
import { APIService } from "../_services/api.service";
import { ApiGService } from "../_services/apig.service";
import { PopulationService } from "../_services/population.service";
import { PopulationManagementService } from "../_services/populationmanagement.service";

@NgModule({
  providers: [PopulationService, PopulationManagementService, APIService, ApiGService],
})
export class DIUServicesModule {}
