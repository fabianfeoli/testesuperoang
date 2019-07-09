
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tarefa } from '../models/tarefa';

@Injectable({
  providedIn: 'root'
})

export class TarefasService {
  headerOptions : HttpHeaders;

  serverUrl = "https://testesuperocs.herokuapp.com/api/";

  constructor(private http: HttpClient) {
   }

  listarTarefas() : Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.serverUrl + 'Tarefas').pipe(
      catchError(this.handleError)
    );
  }
  
  obterTarefa(id) : Observable<Tarefa> {
    return this.http.get<Tarefa>(this.serverUrl + 'Tarefas/' + id).pipe(
      catchError(this.handleError)
    );
  }

  addTarefa(tar: Tarefa): Observable<Tarefa> {
    return this.http.post<any>(this.serverUrl + 'Tarefas', tar)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveTarefa(tar: Tarefa) {
    return this.http.put<any>(this.serverUrl + 'Tarefas/' + tar.id, tar)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteTarefa(id: number): Observable<Tarefa> {
    return this.http.delete<Tarefa>(this.serverUrl + 'Tarefas/' + id).pipe(
      catchError(this.handleError)
    );
  }

  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong.

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      if (error.status == 401) {
        localStorage.removeItem('currentUser');
      }
    }

    // return an observable with a user-facing error message
    
    return throwError('Something bad happened. Please try again later.');
  }
}
