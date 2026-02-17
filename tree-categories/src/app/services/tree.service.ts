import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Tree } from '../models/tree.model';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dm5.orbitadigital.es/import/angular-tree-categories/';

  getCategories(): Observable<Tree[]> {
    return this.http.get<Tree[]>(this.apiUrl).pipe(
      catchError(err => {
        const msg = err.error?.message || 'Error en el servidor';
        return throwError(() => new Error(msg));
      })
    );
  }
}