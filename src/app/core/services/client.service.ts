import { Inject, Injectable } from '@angular/core';
import { Client } from '../entities/client';
import { HttpClient } from '@angular/common/http';
import { TOTS_CORE_PROVIDER, TotsBaseHttpService, TotsCoreConfig } from '@tots/core';
import { Observable, catchError } from 'rxjs';
import { ApiResponse } from '../entities/api-response';


@Injectable({
  providedIn: 'root'
})
export class ClientService extends TotsBaseHttpService<Client> {

  private baseUrl = 'https://agency-coda.uc.r.appspot.com';

  constructor(
    @Inject(TOTS_CORE_PROVIDER) protected override config: TotsCoreConfig,
    protected override http: HttpClient,

  ) {
    super(config, http);
    this.basePathUrl = 'client';
  }

  getClientList(): Observable<ApiResponse <Client>> {
    const url = `${this.baseUrl}/client/list`;

    return this.http.post<ApiResponse <Client>>(url, {});
  }
  
  // createClient(): Observable<ApiResponse <Client>> {
  //   return this.http.post<ApiResponse <Client>>(`${this.baseUrl}/client/save`, {});
  // }

  createClient(client: Client): Observable<Client> {
    const url = `${this.baseUrl}/client/save`;
    const body = {
      firstname: client.firstname,
      lastname: client.lastname,
      email: client.email,
      address: client.address,
      photo: client.photo,
      caption: client.caption
    };

    return this.http.post<Client>(url, body);
  }

  updateClient(id: number, clientUpdates: Partial<Client>): Observable<Client> {
    // Implement logic to update the client using the provided ID and clientUpdates object
    const url = `${this.baseUrl}/client/save`;

    const body = {
      firstname: clientUpdates.firstname,
      lastname: clientUpdates.lastname,
      email: clientUpdates.email,
      address: clientUpdates.address,
      photo: clientUpdates.photo,
      caption: clientUpdates.caption
    };

    // Example using HTTP (replace with your actual implementation)
    return this.http.post<Client>(url, body);
  } 

   /**
   * elimina un cliente.
   * @param clientId Identificador del client.
   * @returns {Observable<Client>} El cliente eliminado.
   */
   deleteClient(clientId: number) {
    const url = `${this.baseUrl}/client/remove`;

    return this.http.delete<Client>(`${url}/${clientId}`);
  }

}