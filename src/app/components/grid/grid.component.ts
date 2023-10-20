import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { Product, ProdutoService } from "src/app/service/produto.service";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ModalUpdateComponent } from "../modal-update/modal-update.component";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnDestroy {

    constructor(
    private readonly produtoService: ProdutoService,
    private toastr: ToastrService,
    public dialog: MatDialog
    ) {}

    displayedColumns: string[] = ['id', 'name', 'category', 'supplier', 'price','edit','delete'];
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

    updateProduct(element: Product) {
      this.dialog.open(ModalUpdateComponent, {
        data: { product: element },
      });
      this.refreshTable()
    }

    ngOnInit() {
      this.dataSubscription = this.produtoService.getAllProducts().subscribe((data) => {
          this.dataSource = data;
          this.refreshTable();
      });
      this.produtoService.newProductAdded.subscribe((newProduct) => {
        this.dataSource.push(newProduct);
        this.refreshTable();
      })
      this.produtoService.newProductUpdated.subscribe((updatedProduct) => {
        const index = this.dataSource.findIndex(item => item.id === updatedProduct.id);
         if (index !== -1) {
          this.dataSource[index] = updatedProduct;
          this.refreshTable();
        }
      })

    }
  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  private refreshTable() {
    this.dataSource = [...this.dataSource];
  }
}
