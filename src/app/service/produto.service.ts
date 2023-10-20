import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from "rxjs";

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

  newProductAdded = new EventEmitter<Product>();
  newProductUpdated = new EventEmitter<Product>()

  constructor(
    private readonly http: HttpClient) { }
    getAllProducts(): Observable<Product[]>{
      return this.http.get<Product[]>(this.API)
    }

    addProduct(product: Product): Observable<Product> {
      return this.http.post<Product>(this.API, product).pipe(
        tap(newProduct => {
          this.newProductAdded.emit(newProduct)
        })
      )
    }

    deleteProduct(productId: number) {
        const url = `${this.API}/${productId}`
        return this.http.delete(url)
    }

    updateProduct(productId: number, productData: Product): Observable<Product> {
        const url = `${this.API}/${productId}`
        return this.http.put<Product>(url, productData).pipe(
          tap(updatedProduct => {
            this.newProductUpdated.emit(updatedProduct)
          })
        )
    }
  }
