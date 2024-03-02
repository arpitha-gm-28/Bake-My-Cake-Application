import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ViewComponent } from './view/view.component';
import { ItemComponent } from './item/item.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { ChipsComponent } from './chips/chips.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OrderViewComponent } from './order-view/order-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CakeRequestsComponent } from './cake-requests/cake-requests.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatTableModule } from '@angular/material/table';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeaderComponent,
    ViewComponent,
    ItemComponent,
    SearchComponent,
    ChipsComponent,
    OrderViewComponent,
    PageNotFoundComponent,
    LoginComponent,
    CakeRequestsComponent,
    SignUpComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatChipsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    MatTooltipModule,
    MatTableModule,
    CarouselModule,
    SlickCarouselModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
