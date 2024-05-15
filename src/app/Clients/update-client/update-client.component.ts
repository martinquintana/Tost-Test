import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/entities/api-response';
import { Client } from 'src/app/core/entities/client';
import { ClientService } from 'src/app/core/services/client.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss']
})
export class UpdateClientComponent {

  @Output() onClientUpdated: EventEmitter<Client>;

  updateClientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<UpdateClientComponent>,
    @Inject(MAT_DIALOG_DATA) private client: Client,
  ) {
    this.updateClientForm = this.fb.group({
      firstname: [client.firstname, Validators.compose([Validators.required, Validators.maxLength(45)])],
      lastname: [client.lastname, Validators.compose([Validators.required, Validators.maxLength(45)])],
      email: [client.email, Validators.compose([Validators.required, Validators.maxLength(45)])],
      address: [client.address, Validators.compose([Validators.required, Validators.maxLength(45)])],
      photo: [client.photo, Validators.required], // Local file
      caption: [client.caption, Validators.compose([Validators.required, Validators.maxLength(45)])],
    });
    this.onClientUpdated = new EventEmitter();
  }

  updateClient() {
    const CLIENT: Partial<Client> = {
      id: this.client.id,
      firstname: this.updateClientForm.value.firstname,
      lastname: this.updateClientForm.value.lastname,
      email: this.updateClientForm.value.email,
      address: this.updateClientForm.value.address,
      photo: this.updateClientForm.value.photo,
      caption: this.updateClientForm.value.caption,
    }
    this.clientService.updateClient(this.client.id, CLIENT)
      .subscribe(client => {
        this.onClientUpdated.emit(client.response);
        this.dialogRef.close(client.response);
      });
  }

}
