import { Component, OnInit } from '@angular/core';
import { BeerService } from '../beer.service';
import { Category } from '../category';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  categories: Category[] = [];

  constructor(private BeerService: BeerService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.BeerService.getCategories()
      .subscribe(categories => this.categories = categories);
  }
}
