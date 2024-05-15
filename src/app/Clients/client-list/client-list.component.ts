import { Component } from '@angular/core';
import { Client } from '../../core/entities/client';
import { ClientService } from '../../core/services/client.service';
import { ApiResponse } from '../../core/entities/api-response'
import { MatTableDataSource } from '@angular/material/table';
import { UpdateClientComponent } from '../update-client/update-client.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenericResponse } from 'src/app/core/entities/response';
import { ClientListService } from 'src/app/core/services/clientList.service';
import { CreateClientComponent } from '../create-client/create-client.component';

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
  MatDialogRefCrateClient: MatDialogRef<CreateClientComponent> = {} as MatDialogRef<CreateClientComponent>;
  constructor(
    private clientService: ClientService,
    private matDialog: MatDialog,
    private dialog: MatDialog,
    private clientListService: ClientListService,
  ) { }

  ngOnInit() {
    this.subscribeToClientUpdates();
    this.fetchClientsFromService();
  }

  // Suscribirse a las actualizaciones de la lista de clientes
  subscribeToClientUpdates() {
    this.clientListService.clientList$.subscribe(clients => {
      this.myClientsArray.data = clients;
    });
  }

  fetchClientsFromService() {
    this.clientService.getClientList().subscribe((res: ApiResponse<GenericResponse<Client>>) => {
      this.clientListService.setClientList(res.response.data);
    }
    )
  }

  //obtener todos los clientes
  fetchClients() {
    this.clientService.getClientList()
      .subscribe((res: ApiResponse<GenericResponse<Client>>) => {
        this.clients = res.response.data;
        this.myClientsArray.data = this.clients; // Update data source
      });
  }

  openDialogUpdateClient(client: Client) {
    this.matDialogRef = this.matDialog.open(UpdateClientComponent, { data: client });
    // Obtener los datos del componente hijo
    this.matDialogRef.componentInstance.onClientUpdated.subscribe(clientRes => {
      this.clientListService.updateClient(clientRes);
    });
  }

  openDeleteClient(clientId: number): void {
    this.clientService.deleteClient(clientId).subscribe(() => {
      this.clientListService.deleteClient(clientId);
    });
  }

  openDialogCreateClient() {
    this.MatDialogRefCrateClient = this.matDialog.open(CreateClientComponent);
    // Obtener los datos del componente hijo
    this.MatDialogRefCrateClient.componentInstance.onClientCreate.subscribe(clientRes => {
      this.clientListService.addClient(clientRes);
    });
  }
}
