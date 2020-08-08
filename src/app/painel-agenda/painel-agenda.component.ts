import { Agenda } from './../models/agenda.model';
import { AgendaService } from './../services/agenda.service';
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-painel-agenda',
  templateUrl: './painel-agenda.component.html',
  styleUrls: ['./painel-agenda.component.css']
})
export class PainelAgendaComponent implements OnInit {
  ag: Agenda = { id: 0, telefone: '', nome: '' }
  agenda = [];
  operacao: boolean = true;
  messages: Message[] = [];


  constructor(private service: AgendaService) { }

  ngOnInit(): void {
    this.getAgenda()
    this.messages = [];
  }


  inserirOuAtualizar() {
    if (this.operacao) {
      this.addToAgenda();
    } else {
      this.updateOnAgenda();
      this.operacao = true;
    }
  }


  getAgenda() {
    this.service.getAgenda().subscribe(res => this.agenda = <any>res)
  }

  deleteFromAgenda(id) {
    debugger
    this.service.deleteAgenda(id).subscribe(() =>
      suc => {
        this.showMessages('success');
        this.getAgenda();
      }, err => {
        this.showMessages('error');
      })
  }

  addToAgenda() {
    this.service.addAgenda(this.ag).subscribe((suc) => { 
      this.getAgenda();
      this.showMessages('success');
     }, (error) =>{
      this.showMessages('error');

    })
  }

  updateOnAgenda() {
    this.service.updateAgenda(this.ag).subscribe((suc) => { 
      this.getAgenda();
      this.showMessages('updated');
     }, (error) =>{
      this.showMessages('error');

    })
  }

  showMessages = (type) => {
    this.clearMessages();
    const msg = {
      success: { severity: 'success', summary: 'Adicionado com Sucesso', detail: '' },
      error: { severity: 'error', summary: 'Ocorreu um erro. Tente Novamente', detail: '' },
      updated: { severity: 'success', summary: 'Adicionado com Sucesso', detail: '' },
    }
    return this.messages.push(msg[type])
  }

  clearMessages() {
    this.messages = [];
  }

}

