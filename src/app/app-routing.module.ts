import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './dashboard/main/main.component';
import { WorkComponent } from './dashboard/work/work.component';
import { LoginRegisterContainerComponent } from './login-register-container/login-register-container.component';
import { UserDetailFormComponent } from './user-detail-form/user-detail-form.component';
import { HomeComponent } from './home/home.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { PlasmaVolunteerComponent } from './plasma-volunteer/plasma-volunteer.component';
import { OverviewComponent } from './business-detail/overview/overview.component';
import { ReviewComponent } from './business-detail/review/review.component';
import { OrderOnlineComponent } from './business-detail/order-online/order-online.component';
import { UserLoginRegisterComponent } from './user-login-register/user-login-register.component';
import { EmployeeDetailsComponent } from './dashboard/employee-details/employee-details.component';
import { ReviewFormComponent } from './review-form/review-form.component';
import { InventoryComponent } from './dashboard/inventory/inventory.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AuthGuard } from './auth.guard';
import { CheckoutComponent } from './business-detail/checkout/checkout.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { OrderComponent } from './dashboard/order/order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [
  { path: 'review', component: ReviewFormComponent },
  {path:'donate-plasma' ,component:PlasmaVolunteerComponent},
  {path:'userHistory' ,component:UserHistoryComponent},
  {path:'home',component:HomeComponent},
  {path:'checkout/:id',component:CheckoutComponent},
  {path:'shop/:id',component:BusinessDetailComponent, children: [
    {path:'reviewForm',component:ReviewFormComponent},
    {path: '',component: OverviewComponent},
    {path: 'orderonline',component:OrderOnlineComponent},
    {path:'review',component: ReviewComponent}
  ]},
  {path: 'join',component: LoginRegisterContainerComponent},
  {path: 'orderDetail/:orderId',component: OrderDetailComponent},
  {path:'userLogin',component:UserLoginRegisterComponent},
  { path: 'user-detail', component: UserDetailFormComponent },
  { path: ':id/dashboard', component: DashboardComponent , children: [
    { path: '', component: MainComponent },
    { path: 'inventory', component: InventoryComponent },
    { path: 'work' ,component:WorkComponent},
    { path: 'employee' ,component:EmployeeDetailsComponent},
    { path: 'profile', component: ProfileComponent },
    { path: 'order', component: OrderComponent },
  ]},
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
