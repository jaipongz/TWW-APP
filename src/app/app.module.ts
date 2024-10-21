import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordSubComponent } from './forgot-password-sub/forgot-password-sub.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { SwiperModule } from 'swiper/angular'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


const appRoutes: Routes = [
  {path: '' , component: BannerComponent },
  {path: 'login' , component: LoginComponent },
  {path: 'register' , component: RegisterComponent },
  {path: 'banner' , component: BannerComponent },
  {path: 'forgot-password' , component: ForgotPasswordComponent },
  {path: 'forgot-password-sub' , component: ForgotPasswordSubComponent },
  

]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    BannerComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ForgotPasswordSubComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    FontAwesomeModule,
    // SwiperModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
