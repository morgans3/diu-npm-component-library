# DiuComponentLibrary

This Angular Library is to house the dummy components that can be used tied together to make much larger applications.

## Specifications

### Date

#### Usage

The date component uses the mat-datepicker module from the angular material library.

This component can be used individually but is mainly utilised by the dynamic-form module.

The component can be used in 3 ways, as a date-time, date and time input for forms.

#### Selector

app-date

#### Pre-requisites

Material Module

#### Behavior

Outputs a form input for adding dates and/ or times.

#### Config

label: string;

The label for the field

name: string;

The name attribute for the input

inputType: string;

This can be one of 3 options to determine what kind of date/time input should be used

“date”

“datetime”

“time”

helperText: string;

This is a string that will be output as a tooltip for the input.

### Input

#### Usage

This component can be used individually but is mainly utilised by the dynamic-form module.

The component can be used in 8 ways, text, email, password, phone, national insurance, NHS number, postcode, number with the ability to validate the inputs as required.

#### Selector

app-input

#### Pre-requisites

Material Module

#### Behavior

Outputs a form input for adding different types of data

Config

label: string;

The label for the field

name: string;

The name attribute for the input

inputType: string;

This can be one of 8 options to determine what kind of input should be used

text

email

password

phone

nationalInsurance

nhsNumber

postcode

number

helperText: string;

This is a string that will be output as a tooltip for the input.

### Select

#### Usage

This component can be used individually but is mainly utilised by the dynamic-form module.

The component can be used to give a list of options to select from.

#### Selector

app-select

#### Pre-requisites

Material Module

#### Behavior

Outputs a form select for users to select options from

#### Config

label: string;

The label for the field

name: string;

The name attribute for the select

helperText: string;

This is a string that will be output as a tooltip for the input.

options: array;

the array contains a series of objects that populate each option in the select

optionKey

This will be the value attribute on the option

optionValue

This is used as the text to be displayed in the option

sort

This determines the order that the outputs should be arranged

### Dynamic Form

#### Usage

This component is used to output a functioning form based on JSON config passed to the component.

#### Selector

dynamic-form

#### Pre-requisites

Material Module

#### Behavior

Outputs a whole form which can post data to an API to either add or update data from the datasource.

#### Config

@Input() fields: FieldConfig[];

This is an array filled with different field config settings (these can be found above)

@Input() title:Title;

This is used to output a title above the form

@Input() abbreviation:string;

This is a short description of the form and is output above the form

@Input() apiEndpoint:string;

This is where the data from the form should be sent

@Input() displayValidation:boolean;

This is used to determine if a message should be output when validation fails

@Input() formAnswers:any;

This is an object where the keys represent field names and the values are the values of each output

### Dynamic Field

#### Usage

This directive is used to output a the form fields passed to the dynamic-form.

#### Selector

dynamic-field

#### Pre-requisites

Material Module

#### Behavior

Outputs individual form components

#### Config

@Input() field: FieldConfig;

This contains the data required to correctly output the form component from

field.type

field.inputType

@Input() group: FormGroup;

This contains the data required for the from component, the data for each type of available component can be found above in

app-select

app-input

app-date

### Display Table

#### Usage

This component is used to display data from an API. The table also has extra rows available to allow the data to be passed to a form or deleted. The module comes with pagination, sort and filtering of the data available.

#### Usage

This component is used to display data from an API. The table also has extra rows available to allow the data to be passed to a form or deleted. The module comes with pagination, sort and filtering of the data available.

#### Selector

display-table

#### Pre-requisites

MatPaginator
MatSort
MatTableDataSource

#### Behavior

Outputs a table to display data.

#### Config

@Input() tableData: any;

The data that determines which columns to display.

@Input() formValues: any;

The data returned from the API.

@Input() defaultValues: any;

Additional data for columns that aren’t in the original form config.

@Input() deletable: any;

This will output a button that will make an API call to remove data from the data source.

@Input() editable: any;

This will output a button that will send the data to a form where it could be updated.

@Output() updateData = new EventEmitter<any>();

This sends the row data to the parent component which will send the data onto the dynamic-form component to update the formAnswers input.

@Output() deleteData = new EventEmitter<any>();

This sends the row data to a parent component which will make an API call to remove the row from the data source.

# DiuAngularHeader

This Angular Library is to house the Header Components for applications managed by the Digital Intelligence Unit.

# Components

## Header Bar (lib-diu-angular-header)

Example use:

```
<lib-diu-angular-header [strAppName]="appName" [strHome]="home" [alerts]="myAlerts" [messages]="myMessages" [tasks]="myTasks" [token]="tokenDecoded" (endSession)="logout($event) (changeSidebar)="toggleSidebar($event)"></lib-diu-angular-header>
```

Includes:

### Logout Button

Outputs a boolean when the Logout button is selected. The event name is `endSession` and can be handled by calling the component like so:

`(endSession)="logout($event)"`

Where `logout` is a function that will end the User's current session and return them to the Login page.

### Display Account

Default displays "Guest". Shows Display name of logged in user when a JWT is passed in as Input like so:

`[token]="tokenDecoded"`

Where tokenDecoded is a JWt that has been decoded using a library such as angular2-jwt:

```
import { JwtHelper } from "angular2-jwt";
...
const token = this.store.selectSnapshot(AuthState.getToken);
const jwtHelper = new JwtHelper();
this.tokenDecoded = jwtHelper.decodeToken(token);
```

### Display Messages

Shows the top ten messages passed through as an array using the following input:

`[messages]="myMessages"`

Where myMessages is an array of `iNotifications` which has the following structure:

```
export interface iNotifications {
  _id: string;
  username?: string;
  teamcode?: string;
  method: string;
  type: string;
  sentdate: Date;
  acknowledgeddate?: Date;
  sender: string;
  header: string;
  message: string;
  link?: string;
  importance: string;
  archive: boolean;
}
```

### Display Tasks

Shows the top ten tasks passed through as an array using the following input:

`[tasks]="myTasks"`

Where myTasks is an array of `iTasks` which has the following structure:

```
export interface iTasks {
  _id: string;
  username?: string;
  teamcode?: string;
  iscompleted: boolean;
  completedby?: string;
  enddate?: Date;
  sentdate: Date;
  acknowledgeddate?: Date;
  sender: string;
  header: string;
  message: string;
  link?: string;
  importance: string;
  archive: boolean;
  invite?: string;
  app_id?: string;
}
```

### Display Alerts

Shows the top ten active alerts passed through as an array using the following input:

`[alerts]="myAlerts"`

Where myAlerts is an array of `iSystemAlerts` which has the following structure:

```
export interface iSystemAlerts {
  _id: string;
  name: string;
  message: string;
  startdate: Date;
  enddate: Date;
  status: string;
  icon: string;
  author?: string;
  archive: boolean;
}
```

### Application Name

Shows the name of the application, passed through as a string called `strAppName`

### Home Link

Provides a link to the main page of the application, passed through as a string called `strHome`. This page should reference a url where you wish the user to navigate to if they click the Application name.

### Toggle Sidebar

Outputs a boolean when the toggle sidebar button selected. The event name is `changeSidebar` and can be handled by calling the component like so:

`(changeSidebar)="toggleSidebar($event)"`

Where `toggleSidebar` is a function that will minimize or expand the Side Menu.

# DiuAngularNavigation

This Angular Library is to house the Navigation Components for applications managed by the Digital Intelligence Unit.

# Components

## Navigation Menu (lib-diu-angular-navigation)

Shows the left-side Navigation Menu of links, input using the following:

`[menuItems]="showMenuItems"`

Where `shownMenuItems` is of type `Menu` with the following exported structure:

```
export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
  isAdmin?: boolean;
}
```

The side menu also includes the Digital Intelligence Logo and Site logo, collapsable using the boolean `isMinisidebar`.

Example use:

```
<lib-diu-angular-navigation [isMinisidebar]="false" [menuItems]="showMenuItems"></lib-diu-angular-navigation>
```

## Speed Dial Menu (lib-diu-angular-speed-dial)

Speed Dial Component for improved mobile and responsive browser navigation.

Requires a valid DIU JWT to manage MFA functions. Passed through to component using:

`[token]="jwtToken"`

Subscribing to the output event `newMFAToken` will pass back an upgraded JWT when the user successfully completes Multi-factor authentication.

Subscribing to the output event `errorMessage` will inform you when an error has occured in any of the Speed Dial's functions.

Example use:

```
<lib-diu-angular-speed-dial [token]="jwtToken" (errorMessage)="showErrors($event)" (newMFAToken)="updateToken($event)"></lib-diu-angular-speed-dial>
```
