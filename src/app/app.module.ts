import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { AdminComponent } from './Components/Dashboard/admin/admin.component';
import { LayoutComponent } from './Layouts/layout/layout.component';
import { NavbarComponent } from './Layouts/navbar/navbar.component';
import { SidebarComponent } from './Layouts/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgetpassComponent } from './Components/Auth/forgetpass/forgetpass.component';
import { ConfirmpassComponent } from './Components/Auth/confirmpass/confirmpass.component';
import { AuthInterceptor } from './Core/Interceptor/Auth/auth.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerInterceptor } from './Core/Interceptor/Loading/spinner.interceptor';
import { UserComponent } from './Components/Dashboard/user/user.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { UploadVideosComponent } from './Components/Dashboard/upload-videos/upload-videos.component';
import { UploadExamsComponent } from './Components/Dashboard/upload-exams/upload-exams.component';
import { UploadDocumentsComponent } from './Components/Dashboard/upload-documents/upload-documents.component';
import { ChatComponent } from './Components/Dashboard/chat/chat.component';
import { ChapterComponent } from './Components/Dashboard/chapter/chapter.component';
import { LessonComponent } from './Components/Dashboard/lesson/lesson.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    LayoutComponent,
    NavbarComponent,
    SidebarComponent,
    ForgetpassComponent,
    ConfirmpassComponent,
    UserComponent,
    UploadVideosComponent,
    UploadExamsComponent,
    UploadDocumentsComponent,
    ChatComponent,
    ChapterComponent,
    LessonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true},
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
