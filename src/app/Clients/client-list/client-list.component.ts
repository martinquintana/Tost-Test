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
  // myClientsArray =  new MatTableDataSource<Client>(this.clients);
  myClientsArray = new MatTableDataSource<Client>(this.clients as Client[]); // Type cast

  matDialogRef: MatDialogRef<UpdateClientComponent> = {} as MatDialogRef<UpdateClientComponent>;

  constructor(
    private clientsServices: ClientService,
    private matDialog: MatDialog,
  ) {

  }

  ngOnInit() {
    this.fetchClients();
    this.subscribeToClientUpdates();
  }

  /**
 *esto no esta funcionando.
 */
  // subscribeToClientUpdates() {
  //   this.clientsServices.getClientUpdatedObservable().subscribe(updatedClient => {
  //     let i: number = 0;
  //     console.log('updatedClient: ', updatedClient);
  //     console.log("clientid: " + updatedClient.id);
  //     while (i < this.clients.length) {
  //       if (this.clients[i].id === updatedClient.id) {
  //         console.log("estoy adentro del while.")
  //         this.clients[i] = updatedClient;
  //         this.myClientsArray = new MatTableDataSource(this.clients);
  //       }
  //       i++;
  //     }
  //   });
  // }


  //obtener todos los clientes
  fetchClients() {
    this.clientsServices.getClientList()
      .subscribe((res: ApiResponse<Client>) => {
        this.clients = res.response.data;
        this.myClientsArray.data = this.clients; // Update data source
        // console.table(this.myClientsArray);
        // console.table(this.clients);
      });
  }



  openDialogUpdateClient(client: Client) {
    // console.table(client);
    this.matDialogRef = this.matDialog.open(UpdateClientComponent, { data: client });

    // Obtener los datos del componente hijo
    this.matDialogRef.componentInstance.onClientUpdated.subscribe(clientRes => {
      console.log('Got the data!', clientRes);
      console.log('clientRes: ', clientRes.id)
      this.updateClientFromClients(clientRes, clientRes.id);
    });
  }

  /**
 * Actualiza un cliente del arreglo clients.
 */
  updateClientFromClients(client: Client, clientId: number) {
    console.log("estoy en updateClientFromClients");
    let i: number = 0;
    console.log('client: ', client);
    console.log("clientid: " + clientId);
    while (i < this.clients.length) {
      if (this.clients[i].id === clientId) {
        console.log("estoy adentro del while.")
        this.clients[i] = client;
        this.myClientsArray = new MatTableDataSource(this.clients);
      }
      i++;
    }
  }

  openDeleteClient(clientId: number): void {
    // this.deleteDialog.open(this.dialog, DataType.User, () => this.deleteUser(userId));
    this.clientsServices.deleteClient(clientId)
      .subscribe(rta => {
        console.log(rta);
      });
  }
}
