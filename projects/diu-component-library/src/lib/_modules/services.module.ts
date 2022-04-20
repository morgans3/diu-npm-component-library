import { NgModule } from "@angular/core";
import { MFAAuthService } from "../_services/auth.service";
import { DynamicApiService } from "../_services/dynapi.service";
import { InterfaceService } from "../_services/interface.service";
import { LabTestService } from "../_services/labtest.service";
import { MessagingService } from "../_services/messaging.service";
import { PatientService } from "../_services/patient.service";
import { PopulationService } from "../_services/population.service";
import { PopulationManagementService } from "../_services/populationmanagement.service";
import { ResultsService } from "../_services/results.service";
import { SQLApiService } from "../_services/sqlapi.service";
import { UserGroupService } from "../_services/usergroup.service";

@NgModule({
  providers: [MFAAuthService, DynamicApiService, InterfaceService, LabTestService, MessagingService, PatientService, PopulationService, PopulationManagementService, ResultsService, SQLApiService, UserGroupService],
})
export class DIUServicesModule {}
