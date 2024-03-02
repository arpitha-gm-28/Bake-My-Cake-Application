import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewComponent } from './view/view.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CakeRequestsComponent } from './cake-requests/cake-requests.component';
import { AuthGuard } from './services/auth.guard';
import { CanDeactivateGuard } from './services/can-deactivate.guard';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: "", component: ViewComponent },
  { path: "view", component: ViewComponent},
  { path: "order/:id", component: OrderViewComponent, canActivate: [AuthGuard], canDeactivate:[CanDeactivateGuard]},
  { path: "order", component: OrderViewComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, canDeactivate:[CanDeactivateGuard]},
  { path: 'sign-up', component: SignUpComponent, canDeactivate:[CanDeactivateGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'cake-requests', component: CakeRequestsComponent, canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
