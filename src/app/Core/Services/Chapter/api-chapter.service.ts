import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiChapterService {

  constructor(private http: HttpClient) { }

  // Get All Chapters
  getChapters(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/auth/getAllChapters`);
  }

  // Create Chapter
  createChapter(data : any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/createChapter`, data);
  }

  // Update Chapter
  updateChapter( id : any , data : any): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/chapter/${id}`, data);
  }

  // Delete Chapter
  deleteChapter(id : any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/chapter/${id}`);
  }

}
