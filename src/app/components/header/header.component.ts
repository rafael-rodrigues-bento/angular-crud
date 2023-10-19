import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public dialog: MatDialog) {}

  openModal() {
    this.dialog.open(ModalComponent);
  }
}
