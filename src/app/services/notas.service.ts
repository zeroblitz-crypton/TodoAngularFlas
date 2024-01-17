import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private apiUrl = 'http://localhost:5000/api/todolist';
  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getTaskById(taskId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${taskId}`);
  }

  addTask(taskDescription: string, isComplete: boolean): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { task_description: taskDescription, is_complete: isComplete });
  }

  updateTask(taskId: number, taskDescription: string, isComplete: boolean): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${taskId}`, { task_description: taskDescription, is_complete: isComplete });
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${taskId}`);
  }

  changeTaskStatus(taskId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/change-status/${taskId}`, {});
  }

  getTaskStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }
}
