import { Component, Input } from '@angular/core';
import { Client } from '../../core/entities/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {

  @Input() client: any = {} as any;


}
