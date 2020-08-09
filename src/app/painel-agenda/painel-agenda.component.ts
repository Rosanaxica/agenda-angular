import { Agenda } from './../models/agenda.model';
import { AgendaService } from './../services/agenda.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-painel-agenda',
  templateUrl: './painel-agenda.component.html',
  styleUrls: ['./painel-agenda.component.css']
})
export class PainelAgendaComponent implements OnInit {
  ag: Agenda = { id: 0, telefone: '', nome: '', email: '' }
  agenda = [];
  operacao: boolean = true;
  messages: Message[] = [];
  data = {};

  @ViewChild('dt') table: Table;
  complete: number;
  incomplete: number;


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
    this.service.getAgenda().subscribe(res => {
      this.agenda = <any>res;
      this.checkIfRegisterIsComplete();
    })

  }

  deleteFromAgenda(id) {

    this.service.deleteAgenda(id).subscribe((data) => {
      this.showMessages('success');
      this.getAgenda();
      this.clearFields();
      setTimeout(() => this.clearMessages(), 5000)
    }, err => {
      this.showMessages('error');
      setTimeout(() => this.clearMessages(), 5000)
    })
  }

  addToAgenda() {
    this.service.addAgenda(this.ag).subscribe((data) => {
      this.getAgenda();
      this.showMessages('success');
      setTimeout(() => this.clearMessages(), 5000);
      this.clearFields();
    }, (error) => {
      this.showMessages('error');
      setTimeout(() => this.clearMessages(), 5000)

    })
  }
  setFieldsToEdit(ag) {
    this.operacao = false;
    this.ag = { id: ag.id, nome: ag.nome, telefone: ag.telefone, email: ag.email };

  }

  updateOnAgenda() {
    this.service.updateAgenda(this.ag).subscribe((data) => {
      this.clearFields();
      this.getAgenda();
      this.showMessages('success');
    }, (error) => {
      this.showMessages('error');
      setTimeout(() => this.clearMessages(), 5000)

    })
  }

  showMessages = (type) => {
    this.clearMessages();
    const msg = {
      success: { severity: 'success', summary: 'Operação efetuada com sucesso', detail: '' },
      error: { severity: 'error', summary: 'Ocorreu um erro. Tente Novamente', detail: '' },

    }
    return this.messages.push(msg[type])

  }

  clearMessages() {

    this.messages = [];
  }


  checkIfRegisterIsComplete() {
    this.complete = 0;
    this.incomplete = 0;
    this.agenda ? this.agenda.forEach((contato) => {
      if (contato.nome != '' && contato.telefone != '' && (contato.email && contato.email !== '')) {
        this.complete++;
      }
      this.incomplete = this.agenda.length - this.complete;
    }) : this.agenda
    console.log(this.complete, this.incomplete)
    this.mountChart(this.complete, this.incomplete)
    
  }
  clearFields() {
    this.ag = { id: 0, telefone: '', nome: '', email: '' }

  }

  mountChart(complete, incomplete){
    this.data = {
      labels: ['Cadastro Completo', 'Cadastro Incompleto'],
      datasets: [
        {
          data: [complete, incomplete],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",

          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",

          ]
        }]
    };


  }
}

