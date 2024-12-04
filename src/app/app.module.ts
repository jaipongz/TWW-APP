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
import { LitsComponent } from './lits/lits.component';
import { EditNovelComponent } from './edit-novel/edit-novel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateNovelComponent } from './create-novel/create-novel.component';
import { NovelDetailComponent } from './novel-detail/novel-detail.component';
import { NovelService } from './services/novel.service';
import { NovelPageComponent } from './novel-page/novel-page.component';
import { CommentComponent } from './comment/comment.component';
import { CoinRechargeComponent } from './coin-recharge/coin-recharge.component';
import { NotificationSettingsComponent } from './notification-settings/notification-settings.component';
import { PopupComponent } from './popup/popup.component';
import { PopupService } from './services/popup.service';
import { NovelFormComponent } from './novel-form/novel-form.component';
import { UploadimageComponent } from './uploadimage/uploadimage.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { LockpageComponent } from './lockpage/lockpage.component';
import { CeateNovelEpComponent } from './ceate-novel-ep/ceate-novel-ep.component';
import { SubjectComponent } from './subject/subject.component';
import { CategoryNovelComponent } from './category-novel/category-novel.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { TextEditorComponent } from './text-editor/text-editor.component';



const appRoutes: Routes = [
  {path: '' , component: CeateNovelEpComponent },
  {path: 'login' , component: LoginComponent },
  {path: 'register' , component: RegisterComponent },
  {path: 'banner' , component: BannerComponent },
  {path: 'forgot-password' , component: ForgotPasswordComponent },
  {path: 'forgot-password-sub' , component: ForgotPasswordSubComponent },
  {path: 'edit-novel', component: EditNovelComponent },
  {path: 'create-novel', component: CreateNovelComponent },
  {path: 'profile-detail', component: ProfileDetailComponent },
  {path: 'novel-detail', component: NovelDetailComponent },
  {path: 'subject', component: SubjectComponent },
  {path: 'createEp', component: CeateNovelEpComponent },
  
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
    ForgotPasswordSubComponent,
    LitsComponent,
    EditNovelComponent,
    CreateNovelComponent,
    NovelDetailComponent,
    NovelPageComponent,
    CommentComponent,
    CoinRechargeComponent,
    NotificationSettingsComponent,
    PopupComponent,
    NovelFormComponent,
    UploadimageComponent,
    ProfileDetailComponent,
    LockpageComponent,
    CeateNovelEpComponent,
    SubjectComponent,
    CategoryNovelComponent,
    TextEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    FontAwesomeModule,
    AngularEditorModule,
    // SwiperModule,
    RouterModule.forRoot(appRoutes),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),

  ],
  providers: [
    NovelService,
    PopupService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
