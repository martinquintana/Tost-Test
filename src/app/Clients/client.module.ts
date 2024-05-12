import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ClientsRoutingModule } from './clients-routing.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    
  ]
})
export class ClientModule { }