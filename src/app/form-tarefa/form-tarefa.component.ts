import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TarefasService } from '../services/tarefas.service';
import { Tarefa } from '../models/tarefa';

@Component({
  selector: 'app-form-tarefa',
  templateUrl: './form-tarefa.component.html',
  styleUrls: ['./form-tarefa.component.css']
})
export class FormTarefaComponent implements OnInit {

  formAction: string;
  thisForm: FormGroup;
  isLoadingResults = false;
  title: string;
  tarefa: Tarefa;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private tarefasService: TarefasService) {
    this.tarefa = new Tarefa();
    this.formAction = this.route.snapshot.params['action'];
    this.thisForm = this.formBuilder.group({
      titulo: [null, Validators.required],
      descricao: [null, Validators.required],
      situacaoTarefa: [],
      dtDeadline: [null, Validators.required],
      id: []
    });

  }

  ngOnInit() {
    this.thisForm.get('id').disable();

    if (this.formAction == "edit") {
      this.title = "Editar Tarefa";
      this.loadForEdit();
    }

    if (this.formAction == "add") {
      this.title = "Nova Tarefa";
      this.thisForm.get('situacaoTarefa').setValue(1);

    }

    if (this.formAction == "delete") {
      this.title = "Excluir Tarefa?";
      this.loadForEdit();
      this.disableAll();
    }
  }

  loadForEdit() {
    this.isLoadingResults = true;
    let id = this.route.snapshot.params['id'];
    console.log("Loading para edicao ");
    this.tarefasService.obterTarefa(id)
      .subscribe(esp => {
        this.tarefa = esp;
        this.thisForm.get('id').setValue(esp.id);
        this.thisForm.get('titulo').setValue(esp.tituloTarefa);
        this.thisForm.get('descricao').setValue(esp.dsTarefa);
        this.thisForm.get('situacaoTarefa').setValue(esp.statusTarefa);
        this.thisForm.get('dtDeadline').setValue(esp.dtDeadline);

        this.isLoadingResults = false;
      }, err => {
        this.isLoadingResults = false;
        console.log(err);
      });
  }

  disableAll() {
    this.thisForm.disable();
  }

  screen2Class() {
    this.tarefa.id = this.thisForm.get('id').value;
    this.tarefa.tituloTarefa = this.thisForm.get('titulo').value;
    this.tarefa.dsTarefa = this.thisForm.get('descricao').value;
    this.tarefa.statusTarefa = this.thisForm.get('situacaoTarefa').value;
    this.tarefa.dtDeadline = this.thisForm.get('dtDeadline').value;
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    if (this.formAction == "add") {
      this.screen2Class();
      this.tarefasService.addTarefa(this.tarefa)
        .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/mytasks']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
    }
    if (this.formAction == "edit") {
      this.screen2Class();
      this.tarefasService.saveTarefa(this.tarefa)
        .subscribe(res => {
          console.log(res);
          this.isLoadingResults = false;
          this.router.navigate(['/mytasks']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
        );
    }

    if (this.formAction == "delete") {
      this.screen2Class();
      this.tarefasService.deleteTarefa(this.tarefa.id)
        .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/mytasks']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
    }

  }

}
