import { Injectable } from '@angular/core';
import { Car } from '../car/car';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private urlEndPoint = 'http://localhost:8080/cars';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getCars(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page);
  }

  create(car: Car) : Observable<any> {
    return this.http.post<any>(this.urlEndPoint, car, { headers: this.httpHeaders }).pipe( catchError( e => {
      if (e.status == 400) {
        return throwError(e);
      }
      Swal.fire(e.error.message, e.error.error, 'error');
      return throwError(e);
    }))
  }

  getCar(id: number): Observable<Car> {
    return this.http.get<Car>(`${ this.urlEndPoint }/${ id }`, { headers: this.httpHeaders }).pipe( catchError( e => {
      this.router.navigate(['/cars']);
      Swal.fire("Error trying to edit", e.error.message, 'error')
      return throwError(e);
    }))
  }

  update(car: Car): Observable<any> {
    return this.http.put<any>(`${ this.urlEndPoint }/${ car.id }`, car, { headers: this.httpHeaders }).pipe( catchError( e => {
      if (e.status == 400) {
        return throwError(e);
      }
      Swal.fire(e.error.message, e.error.error, 'error');
      return throwError(e);
    }))
  }

  delete(id: number): Observable<Car> {
    return this.http.delete<Car>(`${ this.urlEndPoint }/${ id }`, { headers: this.httpHeaders }).pipe( catchError( e => {
      Swal.fire(e.error.message, e.error.error, 'error');
      return throwError(e);
    }))
  }

  uploadPhoto(file: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    })
    return this.http.request(req);
  }
}
