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
      response => {
        this.router.navigate(['/cars'])
        Swal.fire('New car', `Car ${ this.car.name } created successfully`, 'success')
      }
    )
  }

  update(): void {
    this.carService.update(this.car).subscribe(
      response => {
        this.router.navigate(['/cars'])
        Swal.fire('Car updated', `Car ${ this.car.name } updated succesfully`, 'success')
      }
    )
  }

}
