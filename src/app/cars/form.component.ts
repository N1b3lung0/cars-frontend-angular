import { Component, OnInit } from '@angular/core';
import { Car } from '../car/car';
import { CarService } from './car.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { Region } from '../car/region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public car: Car = new Car();
  public regions: Region[];
  public errors: string[];
  public selectedPhoto: File;
  public progress = 0;

  constructor(private carService: CarService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadCar();
    this.loadRegion();
  }

  loadCar(): void {
    this.activatedRoute.params.subscribe( params => {
      const id = params.id;
      if (id) {
        this.carService.getCar(id).subscribe( car => this.car = car );
      }
    });
  }

  create(): void {
    this.carService.create(this.car).subscribe(
      json => {
        this.router.navigate(['/cars']);
        Swal.fire(`${ json.car.name }`, `${ json.message }`, 'success');
      },
      err => this.errors = err.error.errors as string[]
    );
  }

  update(): void {
    this.carService.update(this.car).subscribe(
      json => {
        this.router.navigate(['/cars']);
        Swal.fire(`${ json.car.name }`, `${ json.message }`, 'success');
      },
      err => this.errors = err.error.errors as string[]
    );
  }

  selectPhoto(event: { target: { files: File[]; }; }) {
    this.selectedPhoto = event.target.files[0];
    this.progress = 0;
    if (this.selectedPhoto.type.indexOf('image') < 0) {
      Swal.fire('Error', 'Please, select a correct file. It must be an image', 'error');
      this.selectedPhoto = null;
    }
  }

  uploadPhoto() {
    this.carService.uploadPhoto(this.selectedPhoto, this.car.id).subscribe( event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round((event.loaded / event.total) * 100);
      } else if (event.type === HttpEventType.Response) {
        const response: any = event.body;
        this.car = response.car as Car;
        Swal.fire('Photo uploaded', response.message, 'success');
      }
    });
  }

  loadRegion() {
    this.carService.getRegions().subscribe( regions => this.regions = regions);
  }

  compareRegion(region1: Region, region2: Region): boolean {
    return (region1 === null || region2 === null || region1 === undefined || region2 === undefined) ? false : region1.id === region2.id;
  }

}
