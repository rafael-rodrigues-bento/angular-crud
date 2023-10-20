import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Product, ProdutoService } from "src/app/service/produto.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-update.component.html',
  styleUrls: ['./modal-update.component.scss'],
})

export class ModalUpdateComponent {
  myForm: FormGroup
  constructor(
    private readonly dialogRef: MatDialogRef<ModalUpdateComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly produtoService: ProdutoService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product }
  ) {
    this.myForm = this.formBuilder.group({
      id: [data.product.id, Validators.required],
      name: [data.product.name, Validators.required],
      category: [data.product.category, Validators.required],
      supplier: [data.product.supplier, Validators.required],
      price: [data.product.price, Validators.required]
    })
  }
  editarProduto() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      this.produtoService.updateProduct(formData.id, formData).subscribe(() => {
      this.dialogRef.close();
       });
    }
    else {
      this.toastr.error('Verifique se você preencheu todos os campos')
    }
    }
  }
