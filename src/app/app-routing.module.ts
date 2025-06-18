import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Auth/login/login.component';
import { LayoutComponent } from './Layouts/layout/layout.component';
import { AdminComponent } from './Components/Dashboard/admin/admin.component';
import { ForgetpassComponent } from './Components/Auth/forgetpass/forgetpass.component';
import { ConfirmpassComponent } from './Components/Auth/confirmpass/confirmpass.component';
import { authGuard } from './Core/Guards/auth.guard';
import { UserComponent } from './Components/Dashboard/user/user.component';
import { UploadDocumentsComponent } from './Components/Dashboard/upload-documents/upload-documents.component';
import { UploadExamsComponent } from './Components/Dashboard/upload-exams/upload-exams.component';
import { UploadVideosComponent } from './Components/Dashboard/upload-videos/upload-videos.component';
import { ChatComponent } from './Components/Dashboard/chat/chat.component';
import { ChapterComponent } from './Components/Dashboard/chapter/chapter.component';
import { LessonComponent } from './Components/Dashboard/lesson/lesson.component';


const routes: Routes = [

  {path : '', redirectTo : 'login', pathMatch : 'full'},
  {path : 'login' , component : LoginComponent},
  {path : 'forgetpass' , component : ForgetpassComponent},
  {path : 'confirmpass' , component : ConfirmpassComponent},

  {path : '' , component : LayoutComponent,
  children : [
      {path : '' , redirectTo : 'admin', pathMatch : 'full'},
      {path : 'admin' , component : AdminComponent , canActivate : [authGuard]},
      {path : 'user' , component : UserComponent , canActivate : [authGuard]},
      {path : 'uploadVideos' , component :  UploadVideosComponent, canActivate : [authGuard]},
      {path : 'uploadExams' , component : UploadExamsComponent , canActivate : [authGuard]},
      {path : 'uploadDocuments' , component : UploadDocumentsComponent , canActivate : [authGuard]},
      {path : 'chat' , component : ChatComponent , canActivate : [authGuard]},
      {path : 'chapter' , component : ChapterComponent , canActivate : [authGuard]},
      {path : 'lesson' , component : LessonComponent , canActivate : [authGuard]},
    ],

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
