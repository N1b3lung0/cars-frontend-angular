import { Injectable } from '@angular/core';
import { Car } from '../car/car';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private urlEndPoint = 'http://localhost:8080/cars';

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.urlEndPoint);
  }
}
