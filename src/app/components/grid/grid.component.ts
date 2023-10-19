import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { Product, ProdutoService } from "src/app/service/produto.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnDestroy {
    constructor(private readonly produtoService: ProdutoService) {}

    displayedColumns: string[] = ['name', 'category', 'supplier', 'price','delete'];
    dataSource: Product[] = [];
    dataSubscription!: Subscription;

    deleteProduct(element: Product) {
      const op = window.confirm('Deseja Excluir o produto realmente ?')
      if (op) {
        this.produtoService.deleteProduct(element.id).subscribe(() => {
          this.dataSource = this.dataSource.filter(item => item.id !== element.id)
        })
      }
    }

    ngOnInit() {
      this.dataSubscription = this.produtoService.getAllProducts().subscribe((data) => {
          this.dataSource = data;
      });
  }
  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

}