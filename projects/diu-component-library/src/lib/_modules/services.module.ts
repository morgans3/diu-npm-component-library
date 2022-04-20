import { NgModule } from "@angular/core";
import { APIService } from "../_services/api.service";
import { ApiGService } from "../_services/apig.service";
import { MFAAuthService } from "../_services/auth.service";
import { DynamicApiService } from "../_services/dynapi.service";
import { InterfaceService } from "../_services/interface.service";
import { LabTestService } from "../_services/labtest.service";
import { MessagingService } from "../_services/messaging.service";
import { PatientService } from "../_services/patient.service";
import { PopulationService } from "../_services/population.service";
import { PopulationManagementService } from "../_services/populationmanagement.service";
import { ResultsService } from "../_services/results.service";
import { UserGroupService } from "../_services/usergroup.service";

@NgModule({
  providers: [MFAAuthService, DynamicApiService, InterfaceService, LabTestService, MessagingService, PatientService, PopulationService, PopulationManagementService, ResultsService, UserGroupService, APIService, ApiGService],
})
export class DIUServicesModule {}
