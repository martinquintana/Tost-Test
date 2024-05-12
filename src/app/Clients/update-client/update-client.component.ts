import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  submitted = false;
  // client: Client = {} as Client;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<UpdateClientComponent>,
    @Inject(MAT_DIALOG_DATA) private client: Client,
  ) {
    this.updateClientForm = this.fb.group({
      firstname: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
      lastname: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
      address: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
      photo: ['', Validators.required], // Local file
      caption: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
    });

    this.onClientUpdated = new EventEmitter();

  }

  updateClient() {
    // console.log("estoy dentro de addProduct");
    this.submitted = true;

    /*si es invalido termina la ejecucion del modulo
    //y no se ejecuta el console.log, ni el servicio
    es una validacion*/
    // if (this.createClientForm.invalid) {
    //   console.log("no pasa la verificacion");
    //   return;
    // }

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
        // console.log("estoy dentro de createproduct");
        console.table(client);
        this.dialogRef.close(client);
        // this.dialogRef.close(product);
        // this.router.navigate(['/users']);
        this.onClientUpdated.emit(client);
      });
  }
  
}
