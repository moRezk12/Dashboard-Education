import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExamsForOneLessonService {

  constructor(private http : HttpClient) { }

  // Get Exams For One Lesson
  getExamsForOneLesson(id : any): Observable<any>{
    return this.http.get(`${environment.apiUrl}auth/getExamQuestions/${id}`);
  }

  // Create Exams For One Lesson
  createExamsForOneLesson(data : any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/auth/createExam`, data);
  }

  // Update Exams For One Lesson
  updateExamsForOneLesson(id : any , data : any): Observable<any>{
    return this.http.patch(`${environment.apiUrl}/chapter/${id}`, data);
  }

  // Delete Exams For One Lesson
  deleteExamsForOneLesson(id : any): Observable<any>{
    return this.http.delete(`${environment.apiUrl}/chapter/${id}`);
  }



}

