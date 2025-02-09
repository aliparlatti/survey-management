import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export abstract class HttpBaseService<T> {
  private http= inject(HttpClient)
  protected constructor(
    private modelBaseUrl: string
  ) {}

  get<T>(urlSuffix?: string, params?: { [key: string]: any }): Observable<T> {
    return this.http.get<T>(this.modelBaseUrl + (urlSuffix ? urlSuffix : ''), { params });
  }

  post<T>(body: T, urlSuffix?: string): Observable<T> {
    return this.http.post<T>(this.modelBaseUrl + (urlSuffix ? urlSuffix : ''), body);
  }

  patch<T>(id: number, body: Partial<T>, urlSuffix?: string): Observable<T> {
    const url = this.modelBaseUrl + (urlSuffix ? urlSuffix : '') + (id ? `/${id}`: '');
    return this.http.patch<T>(url, body);
  }

  delete<T>(id: number, urlSuffix?: string): Observable<T> {
    const url = this.modelBaseUrl + (urlSuffix ? urlSuffix : '') + (id ? `/${id}`: '');
    return this.http.delete<T>(url);
  }
}
