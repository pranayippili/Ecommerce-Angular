import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/models';
import { UtilityService } from '../services/utility.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() view: 'grid' | 'list' | 'currcartitem' | 'prevcartitem' = 'grid'; // Controls the current view type
  @Input() product: Product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    quantity: 0,
    productCategory: {
      id: 1,
      category: '',
      subCategory: '',
    },
    offer: {
      id: 1,
      title: '',
      discount: 0,
    },
    imageName: '',
    category: '',
    subCategory: ''
  };

  constructor(public utilityService: UtilityService,private navservice:NavigationService) {}

  ngOnInit(): void {
    
  }
   
  // Handles the click event to open product details
  openProductDetails(productId: number): void {
    // Navigate to product details page or handle product click
    console.log('Product clicked:', productId);
    // Logic to navigate or handle opening product details can be added here
    
  }

  // Helper method to return the product image URL
  getImageUrl(product: Product): string {
    return `https://example.com/images/${product.imageName}`; // Adjust the URL to match your image hosting
  }
}
