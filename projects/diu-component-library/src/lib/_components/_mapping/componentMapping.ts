import { DivRowComponent } from "../_layouts/div-row.component";
import { MatCardComponent } from "../matcard/matcard.component";
import { DivColComponent } from "../_layouts/div-col.component";
import { InputComponent } from "../_form/input/input.component";
import { SelectComponent } from "../_form/select/select.component";
import { DateComponent } from "../_form/date/date.component";
import { RadiobuttonComponent } from "../_form/radiobutton/radiobutton.component";
import { ProfileFullComponent } from "../profile-full/profile-full.component";
import { CarouselComponent } from "../carousel/carousel.component";
import { TabsComponent } from "../tabs/tabs.component";
import { FormWithTableComponent } from "../form-with-table/form-with-table.component";
import { ProfileInstallsComponent } from "../profile-full/profile-installs.component";
import { PasswordGeneratorComponent } from "../_form/generate-password/generate-password.component";
import { ProfileTeamsComponent } from "../profile-full/profile-teams.component";
import { DashboardTwitterComponent } from "../dashboard-twitter/dashboard-twitter.component";
import { DashboardPopulationComponent } from "../dashboard-population/dashboard-population.component";
import { AcuteHospitalStatsComponent } from "../dashboard-hospital-stats/dashboard-hospital-stats.component";
import { NewsStandComponent } from "../newsstand/newsstand.component";
import { ApplicationInfoDialogComponent } from "../application-tile/dialoginformation";
import { ApplicationTileComponent } from "../application-tile/application.component";
import { AppstoreComponent } from "../store/store.component";
import { ResponsiblePersonComponent } from "../_form/responsible-person/responsible-person.component";

/**
 * Component Mapping between type and Component Class
 */
export const componentMapper = {
    input: InputComponent,
    select: SelectComponent,
    date: DateComponent,
    radiobutton: RadiobuttonComponent,
    matcard: MatCardComponent,
    divrow: DivRowComponent,
    divcol: DivColComponent,
    profilecard: ProfileFullComponent,
    carousel: CarouselComponent,
    tabs: TabsComponent,
    formwithtable: FormWithTableComponent,
    profileinstalls: ProfileInstallsComponent,
    profileteams: ProfileTeamsComponent,
    passwordGenerator: PasswordGeneratorComponent,
    dashboardtwitter: DashboardTwitterComponent,
    dashboardpopulation: DashboardPopulationComponent,
    acutestats: AcuteHospitalStatsComponent,
    newsstand: NewsStandComponent,
    applicationinformation: ApplicationInfoDialogComponent,
    applicationtile: ApplicationTileComponent,
    store: AppstoreComponent,
    responsibleperson: ResponsiblePersonComponent,
};
