import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from 'src/app/core/entities/client';

@Injectable({
  providedIn: 'root'
})
export class ClientListService {
  private clients: Client[] = [];
  private clientsSubject: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>(this.clients);

  // Observable streams
  clientList$ = this.clientsSubject.asObservable();
  
  constructor() { }

  // Reemplazar toda la lista de clientes
  setClientList(clients: Client[]): void {
    this.clients = clients;
    this.clientsSubject.next(this.clients);
  }

  // Agregar un nuevo cliente
  addClient(client: Client): void {
    this.clients.push(client);
    this.clientsSubject.next(this.clients);
  }

  // Actualizar un cliente existente
  updateClient(updatedClient: Client): void {
    const index = this.clients.findIndex(client => client.id === updatedClient.id);
    if (index !== -1) {
      this.clients[index] = updatedClient;
      this.clientsSubject.next(this.clients);
    }
  }

  // Eliminar un cliente
  deleteClient(clientId: number): void {
    this.clients = this.clients.filter(client => client.id !== clientId);
    this.clientsSubject.next(this.clients);
  }
}