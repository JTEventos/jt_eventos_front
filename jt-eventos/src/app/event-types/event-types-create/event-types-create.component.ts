import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-types-create',
  templateUrl: './event-types-create.component.html',
  styleUrls: ['./event-types-create.component.css', '../../../styles.css']
})
export class EventTypesCreateComponent implements OnInit {
  title = "Cadastro de Tipo de Evento"

  constructor() { }

  ngOnInit(): void {
  }

}
