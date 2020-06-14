import { Injectable } from '@angular/core';
import { Car } from '../car/car';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private urlEndPoint = 'http://localhost:8080/cars';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.urlEndPoint);
  }

  create(car: Car) : Observable<Car> {
    return this.http.post<Car>(this.urlEndPoint, car, { headers: this.httpHeaders })
  }

  getCar(id: number): Observable<Car> {
    return this.http.get<Car>(`${ this.urlEndPoint }/${ id }`, { headers: this.httpHeaders })
  }

  update(car: Car): Observable<Car> {
    return this.http.put<Car>(`${ this.urlEndPoint }/${ car.id }`, car, { headers: this.httpHeaders })
  }

  delete(id: number): Observable<Car> {
    return this.http.delete<Car>(`${ this.urlEndPoint }/${ id }`, { headers: this.httpHeaders })
  }
}
