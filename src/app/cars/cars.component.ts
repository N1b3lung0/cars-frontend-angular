import { Component, OnInit } from '@angular/core';
import { Car } from '../car/car';
import { CarService } from './car.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: Car[];
  paginator: any;

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      (!page) ? page = 0 : null
      this.carService.getCars(page).subscribe(
        response => {
          this.cars = response.content as Car[]
          this.paginator = response;
        });
      })
  }

  delete(car: Car): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.carService.delete(car.id).subscribe(
          response => {
            this.cars = this.cars.filter( e => e !== car)
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        )
      }
    })
  }

}
