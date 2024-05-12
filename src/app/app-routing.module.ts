import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClientComponent } from './Clients/create-client/create-client.component';
import { ClientListComponent } from './Clients/client-list/client-list.component';
import { UpdateClientComponent } from './Clients/update-client/update-client.component';

const routes: Routes = [
  { path: '', component: ClientListComponent }, // Home route (Client List)
  { path: 'create-client', component: CreateClientComponent },
  { path: 'update-client/:id', component: UpdateClientComponent } // Dynamic route for updating clients
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
