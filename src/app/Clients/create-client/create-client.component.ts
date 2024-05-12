import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/core/entities/client';
import { ClientService } from 'src/app/core/services/client.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent {

  createClientForm: FormGroup;
  submitted = false;
  client: Client = {} as Client;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
  ) {
    this.createClientForm = this.fb.group({
      firstname: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
      lastname: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
      address: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
      photo: ['', Validators.required], // Local file
      caption: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
    });
  }

  addClient() {
    // console.log("estoy dentro de addProduct");
    this.submitted = true;

    /*si es invalido termina la ejecucion del modulo
    //y no se ejecuta el console.log, ni el servicio
    es una validacion*/
    // if (this.createClientForm.invalid) {
    //   console.log("no pasa la verificacion");
    //   return;
    // }

    const CLIENT: Client = {
      id: this.client.id,
      firstname: this.createClientForm.value.firstname,
      lastname: this.createClientForm.value.lastname,
      email: this.createClientForm.value.email,
      address: this.createClientForm.value.address,
      photo: this.createClientForm.value.photo,
      caption: this.createClientForm.value.caption,
      created_at: this.client.created_at,
      updated_at: this.client.updated_at,
      deleted: 0,
    }
    this.clientService.createClient(CLIENT)
      .subscribe(client => {
        // console.log("estoy dentro de createproduct");
        console.table(client);
        // this.dialogRef.close(product);
        // this.router.navigate(['/users']);
      });
  }
}
