import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientListComponent } from "./client-list/client-list.component";
import { CreateClientComponent } from "./create-client/create-client.component";

const routes: Routes = [
   
  ];
  
  @NgModule({
    declarations: [],
    imports: [
      RouterModule.forChild(routes),
    ],
    exports: [
      RouterModule
    ]
  })
  export class ClientsRoutingModule { }