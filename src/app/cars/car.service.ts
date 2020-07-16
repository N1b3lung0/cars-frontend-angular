import { Injectable } from '@angular/core';
import { Car } from '../car/car';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Region } from '../car/region';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private urlEndPoint = 'http://localhost:8080/cars';

  constructor(private http: HttpClient, private router: Router) {}

  getCars(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page);
  }

  create(car: Car): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, car).pipe( catchError( e => {
      if (e.status === 400) {
        return throwError(e);
      }
      return throwError(e);
    }));
  }

  getCar(id: number): Observable<Car> {
    return this.http.get<Car>(`${ this.urlEndPoint }/${ id }`).pipe( catchError( e => {
      if (e.status !== 401) {
        this.router.navigate(['/cars']);
      }
      return throwError(e);
    }));
  }

  update(car: Car): Observable<any> {
    return this.http.put<any>(`${ this.urlEndPoint }/${ car.id }`, car).pipe( catchError( e => {
      if (e.status === 400) {
        return throwError(e);
      }
      return throwError(e);
    }));
  }

  delete(id: number): Observable<Car> {
    return this.http.delete<Car>(`${ this.urlEndPoint }/${ id }`).pipe( catchError( e => {
      return throwError(e);
    }));
  }

  uploadPhoto(file: File, id): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });
    return this.http.request(req);
  }

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regions');
  }
}
