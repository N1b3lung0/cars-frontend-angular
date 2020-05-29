import { Component, OnInit } from '@angular/core';
import { Car } from '../car/car';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public car: Car = new Car();

  constructor() { }

  ngOnInit(): void {
  }

  public create(): void {

  }

}
