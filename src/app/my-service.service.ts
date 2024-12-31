import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  private policiesUrl = `${environment.baseUrl}/api/InsurancePolicies`;  

  constructor(private http: HttpClient) {}

  getPolicies(search: string = ''): Observable<any> {
    let params = new HttpParams();
    if (search) {
      params = params.append('search', search); 
    }

    return this.http.get<any>(this.policiesUrl, { params: params })
      .pipe(
        catchError(this.handleError)  
      );
  }

  getPolicyById(id: number): Observable<any> {
    const url = `${this.policiesUrl}/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)  
      );
  }

  createPolicy(policy: any): Observable<any> {
    return this.http.post<any>(this.policiesUrl, policy)
      .pipe(
        catchError(this.handleError)  
      );
  }

  updatePolicy(policy: any): Observable<any> {
    return this.http.put<any>(this.policiesUrl, policy)
      .pipe(
        catchError(this.handleError)  
      );
  }



  deletePolicy(id: number): Observable<any> {
    const url = `${this.policiesUrl}/${id}`;  
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError)  
      );
  }
  
  getActivePolicies(): Observable<any> {
    const url = `${this.policiesUrl}/active`;  
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)  
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;  
  }
}