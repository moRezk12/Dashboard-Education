import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiLessonService {

  constructor(private http: HttpClient) { }

  // Get All Lessons
  getLessons(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/auth/getAllLessons`);
  }

  // Create Lesson
  createLesson(data : any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/createLesson`, data);
  }


  createLessonResource(data : any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/uploadLessonResource`, data);
  }

  // Update Lesson
  updateLesson( id : any , data : any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/createExam${id}`, data);
  }

  // Delete Lesson
  deleteLesson(id : any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/auth/createExam${id}`);
  }


}
