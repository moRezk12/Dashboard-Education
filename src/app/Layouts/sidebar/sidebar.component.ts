import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private _router:Router){}

  links = [
    { url: '/admin', name: 'الادمن' },
    { url: '/user', name: 'المستخدم' },
    { url: '/chapter', name: 'الشباتير' },
    { url: '/lesson', name: 'الدروس' },
    { url: '/uploadVideos', name: 'رفع فيديو و شرح الدرس' },
    { url: '/uploadExams', name: 'اضافة امتحان' },
    // { url: '/uploadDocuments', name: 'Upload Documents' },
    { url: '/chat', name: 'الشات' },
  ]

  Logout() {
    // localStorage.removeItem('token');
    localStorage.clear();
    this._router.navigate(['/login']);
  }

}
