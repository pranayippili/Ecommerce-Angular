import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  mobiles: any[] = [];
  laptops: any[] = [];
  allproducts: any[] = [];
  filteredProducts: any[] = [];

  constructor(
    private navigationService: NavigationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.navigationService.getProducts().subscribe((res1) => {
      this.products = res1;

      this.navigationService.getCategoryList().subscribe((res) => {
        this.categories = res;

        for (let i = 0; i < this.products.length; i++) {
          for (let j = 0; j < this.categories.length; j++) {
            if (
              this.products[i].categoryId == this.categories[j].categoryId &&
              this.categories[j].category == 'electronics' &&
              this.categories[j].subCategory == 'mobiles'
            ) {
              let imageobj = {
                img: `assets/Images/mobiles/${this.products[i].productId}/1.jpg`,
              };
              let obj = { ...this.products[i], ...imageobj };
              this.mobiles.push(obj);
              this.allproducts.push(obj);
            }

            if (
              this.products[i].categoryId == this.categories[j].categoryId &&
              this.categories[j].category == 'electronics' &&
              this.categories[j].subCategory == 'laptops'
            ) {
              let imageobj = {
                img: `assets/Images/laptops/${this.products[i].productId}/1.jpg`,
              };
              let obj = { ...this.products[i], ...imageobj };
              this.laptops.push(obj);
              this.allproducts.push(obj);
            }
          }
        }

        // Initially display all products
        this.filteredProducts = this.allproducts;
      });
    });
  }

  // Method to filter products by category
  filterByCategory(category: string): void {
    if (category === 'mobiles') {
      this.filteredProducts = this.mobiles;
    } else if (category === 'laptops') {
      this.filteredProducts = this.laptops;
    } else {
      this.filteredProducts = this.allproducts; // Show all products
    }
  }

  sortByPrice(option: 'default' | 'htl' | 'lth'): void {
    switch (option) {
      case 'htl':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'lth':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }
  }
}
