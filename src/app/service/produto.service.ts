import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

export interface Product {
  id: number;
  name: string;
  category: string;
  supplier: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly API = "http://localhost:3000/products"

  constructor(
    private readonly http: HttpClient) { }
    getAllProducts(): Observable<Product[]>{
      return this.http.get<Product[]>(this.API)
    }

    addProduct(product: Product): Observable<Product> {
      return this.http.post<Product>(this.API, product)
    }

    deleteProduct(productId: number) {
        const url = `${this.API}/${productId}`
        return this.http.delete(url)
    }
  }
