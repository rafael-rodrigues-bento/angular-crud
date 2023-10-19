import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ProdutoService } from "src/app/service/produto.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  myForm: FormGroup;

  constructor(
    private readonly dialogRef: MatDialogRef<ModalComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly produtoService: ProdutoService,
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      supplier: ['', Validators.required],
      price: ['', Validators.required],
    })
  }
  cadastrarProduto() {
    const formData = this.myForm.value
    const dado_atualizado = this.produtoService.addProduct(formData).subscribe(() => {
      this.dialogRef.close()

    })
    return dado_atualizado
  }
}
