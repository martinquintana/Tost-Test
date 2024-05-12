import { Component } from '@angular/core';
import { Client } from '../../core/entities/client';
import { ClientService } from '../../core/services/client.service';
import { ApiResponse } from '../../core/entities/api-response'
import { MatTableDataSource } from '@angular/material/table';
import { UpdateClientComponent } from '../update-client/update-client.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent {

  clients: Client[] = [] as Client[];
  displayedColumns: string[] = ['Nombre', 'Apellido', 'Email', 'Botones'];
  // myDataArray =  new MatTableDataSource<Client>(this.clients);
  myDataArray = new MatTableDataSource<Client>(this.clients as Client[]); // Type cast

  matDialogRef: MatDialogRef<UpdateClientComponent> = {} as MatDialogRef<UpdateClientComponent>;

  constructor(
    private clientsServices: ClientService,
    private matDialog: MatDialog,
  ) {

  }

  ngOnInit() {
    this.fetchClients();
  }

  //obtener todos los clientes
  fetchClients() {
    this.clientsServices.getClientList()
      .subscribe((res: ApiResponse<Client>) => {
        this.clients = res.response.data;
        this.myDataArray.data = this.clients; // Update data source
        // console.table(this.myDataArray);
        // console.table(this.clients);
      });
  }

  openDialogUpdateClient(client: Client) {
    console.table(client);
    this.matDialogRef = this.matDialog.open(UpdateClientComponent,
      {
        data: client
      });
    // https://stackoverflow.com/a/54122607
    // Obtener los datos del componente hijo
    this.matDialogRef.componentInstance.onClientUpdated.subscribe(result => {
      console.log('Got the data!', result);
      // this.updateProductFromProducts(result); // actualizamos el usuario
    });
  }
  
  openDeleteClient(clientId: number): void {
    // this.deleteDialog.open(this.dialog, DataType.User, () => this.deleteUser(userId));
    this.clientsServices.deleteClient(clientId)
      .subscribe(rta => {
        console.log(rta);
      });
  }

}
