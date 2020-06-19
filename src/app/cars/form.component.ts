import { Component, OnInit } from '@angular/core';
import { Car } from '../car/car';
import { CarService } from './car.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public car: Car = new Car();
  public errors: string[];

  constructor(private carService: CarService, 
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadCar();
  }

  loadCar(): void {
    this.activatedRoute.params.subscribe( params => {
      let id = params['id']
      if (id) {
        this.carService.getCar(id).subscribe( car => this.car = car )
      }
    })
  }

  create(): void {
    this.carService.create(this.car).subscribe(
      json => {
        this.router.navigate(['/cars'])
        Swal.fire(`${ json.car.name }`, `${ json.message }`, 'success')
      },
      err => this.errors = err.error.errors as string[]
    )
  }

  update(): void {
    this.carService.update(this.car).subscribe(
      json => {
        this.router.navigate(['/cars'])
        Swal.fire(`${ json.car.name }`, `${ json.message }`, 'success')
      },
      err => this.errors = err.error.errors as string[]
    )
  }

}
