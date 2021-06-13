import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button'
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AppComponent } from './app.component';
import { LoginRegisterContainerComponent } from './login-register-container/login-register-container.component';
import { UserDetailFormComponent } from './user-detail-form/user-detail-form.component';
import { ProgressBarComponent } from './user-detail-form/progress-bar/progress-bar.component';
import { UserDetailComponent } from './user-detail-form/user-detail/user-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './dashboard/main/main.component';
import { WorkComponent } from './dashboard/work/work.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CardsComponent } from './cards/cards.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { CovidDetailComponent } from './user-detail-form/covid-detail/covid-detail.component';
import { FinalComponent } from './user-detail-form/final/final.component';
import { HttpClientModule } from '@angular/common/http';
import { ReviewFormComponent } from './review-form/review-form.component';
//import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { PlasmaVolunteerComponent } from './plasma-volunteer/plasma-volunteer.component';
import { UserLoginRegisterComponent } from './user-login-register/user-login-register.component';
import { OverviewComponent } from './business-detail/overview/overview.component';
import { ReviewComponent } from './business-detail/review/review.component';
import { OrderOnlineComponent } from './business-detail/order-online/order-online.component';
import { EmployeeDetailsComponent } from './dashboard/employee-details/employee-details.component';
import { InventoryComponent } from './dashboard/inventory/inventory.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import {MatTableModule} from '@angular/material/table';
import { CheckoutComponent } from './business-detail/checkout/checkout.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { OrderComponent } from './dashboard/order/order.component';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { OrderDetailComponent } from './order-detail/order-detail.component';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { MatNativeDateModule } from '@angular/material/core';



// const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterContainerComponent,
    UserDetailFormComponent,
    ProgressBarComponent,
    UserDetailComponent,
    DashboardComponent,
    MainComponent,
    WorkComponent,
    NavbarComponent,
    HomeComponent,
    CardsComponent,
    SearchComponent,
    FooterComponent,
    BusinessDetailComponent,
    CovidDetailComponent,
    FinalComponent,
    ReviewFormComponent,
    CardComponent,
    PlasmaVolunteerComponent,
    UserLoginRegisterComponent,
    OverviewComponent,
    ReviewComponent,
    OrderOnlineComponent,
    EmployeeDetailsComponent,
    InventoryComponent,
    ProfileComponent,
    OrderComponent,
    OrderDetailComponent,
    CheckoutComponent,
    UserHistoryComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatSlideToggleModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'dgjouil2j'}),
    MatCardModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatCardModule,
    MatTableModule,
    // MatInputModule,
  //  AutocompleteLibModule,
  MatNativeDateModule,
  MatDatepickerModule,
  // MatDatepickerModule,
  BrowserAnimationsModule,
  NgCircleProgressModule.forRoot({}),
    FormsModule,
    MatFormFieldModule,MatButtonModule,MatInputModule,MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
