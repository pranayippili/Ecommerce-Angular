import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {
  Category,
  Order,
  Payment,
  PaymentMethod,
  Product,
  User,
} from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private baseUserUrl = 'https://localhost:7245/api/Users'; // API base URL for user-related actions
  private categoryUrl = 'https://localhost:7245/api/ProductCategories'; // API URL for categories
  private productUrl = 'https://localhost:7245/api/Products'; // API URL for products
  

  constructor(private http: HttpClient) {}

  // Fetch the category list from the API
  getCategoryList() {
    return this.http.get<any[]>(this.categoryUrl)
      
  }

  // Fetch products based on category and subcategory
  getProducts() {
    return this.http.get<any[]>(this.productUrl) 
        
  }



  // Fetch a product by its ID
  getProduct(id: number) {
    let url = `${this.productUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  // Register a new user
  registerUser(user: User) {
    let url = `${this.baseUserUrl}/register`;
    return this.http.post(url, user, { responseType: 'text' });
  }

  // Login a user using email and password
  loginUser(email: string, password: string) {
    const url = `${this.baseUserUrl}/Login`; // Login API endpoint
    const body = { email, password }; // Payload
    return this.http.post(url, body, { responseType: 'json' });
  }

  // Get the logged-in user from localStorage
  getLoggedInUser() {
    let user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  }

  // Submit a review for a product
  submitReview(userid: number, productid: number, review: string) {
    let obj: any = {
      User: {
        Id: userid,
      },
      Product: {
        Id: productid,
      },
      Value: review,
    };
    let url = `${this.baseUserUrl}/InsertReview`;
    return this.http.post(url, obj, { responseType: 'text' });
  }

  // Get all reviews for a specific product
  getAllReviewsOfProduct(productId: number) {
    let url = `${this.baseUserUrl}/GetProductReviews/${productId}`;
    return this.http.get(url);
  }

  // Add a product to the user's cart
  addToCart(userid: number, productid: number) {
    let url = `${this.baseUserUrl}/InsertCartItem/${userid}/${productid}`;
    return this.http.post(url, null, { responseType: 'text' });
  }

  // Get the active cart for the logged-in user
  getActiveCartOfUser(userid: number) {
    let url = `${this.baseUserUrl}/GetActiveCartOfUser/${userid}`;
    return this.http.get(url);
  }

  // Get all previous carts for the user
  getAllPreviousCarts(userid: number) {
    let url = `${this.baseUserUrl}/GetAllPreviousCartsOfUser/${userid}`;
    return this.http.get(url);
  }

  // Get available payment methods
  getPaymentMethods() {
    let url = `${this.baseUserUrl}/GetPaymentMethods`;
    return this.http.get<PaymentMethod[]>(url);
  }

  // Insert a payment for the current order
  insertPayment(payment: Payment) {
    return this.http.post(`${this.baseUserUrl}/InsertPayment`, payment, {
      responseType: 'text',
    });
  }

  // Insert an order after checkout
  insertOrder(order: Order) {
    return this.http.post(`${this.baseUserUrl}/InsertOrder`, order);
  }
}
