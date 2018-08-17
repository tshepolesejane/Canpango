import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Beer } from '../beer';
import { Category } from '../category';

import { BeerService } from '../beer.service';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {
  beers: Beer[];
  categories: Category[] = [];
  beerForm: FormGroup;

  constructor(
    private BeerService: BeerService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getBeers();
    this.getCategories();
    this.createForm();
  }

  createForm(): void{
    this.beerForm = this.fb.group({
      name: ['', Validators.required],
      ibu: ['', Validators.required],
      calories: ['', Validators.required],
      abv: ['', Validators.required,  Validators.minLength(2)],
      style: ['', Validators.required],
      brewery_location: ['', Validators.required],
      category: ['', Validators.required]
      });
  }

  getBeers(): void {
    const categoryId = +this.route.snapshot.paramMap.get('url');
    this.BeerService.getBeers()
    .subscribe(beers => {
      this.beers = beers.filter(beer =>  
        Number (beer.category.substring(beer.category.indexOf('category') + 9, beer.category.length -1))  == categoryId
      )   
    });
  }

  getCategories(): void {
    this.BeerService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  add(): void {
    console.log(this.beerForm.value);

    if(this.beerForm.valid) {
      this.BeerService.addBeer(this.beerForm.value as Beer)
        .subscribe();
        alert('Beer added!! :-)')
    }

  }

  delete(beer: Beer): void {
    this.BeerService.deleteBeer(beer)
    .subscribe();
    this.getBeers();
  }

  goBack(): void {
    this.location.back();
  }

}
