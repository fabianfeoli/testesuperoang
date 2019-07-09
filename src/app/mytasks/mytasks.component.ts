import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { TarefasService } from '../services/tarefas.service';
import { Tarefa } from '../models/tarefa';


@Component({
  selector: 'app-mytasks',
  templateUrl: './mytasks.component.html',
  styleUrls: ['./mytasks.component.css']
})
export class MytasksComponent implements OnInit {

  title = 'Especialidades';
  error: string;

  displayedColumns: string[] = ['id', 'tituloTarefa', 'dtCriacaoTarefa', 'statusTarefa', 'actions'];
  dataSource: MatTableDataSource<Tarefa>;
  isLoadingResults = true;

  constructor(private tarefasService: TarefasService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.load();
  }

  load() {
    this.dataSource = new MatTableDataSource<Tarefa>();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.tarefasService.listarTarefas()
      .subscribe(res => {
        this.dataSource.data = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  setupFilter(column: string) {
    this.dataSource.filterPredicate = (d: Tarefa, filter: string) => {
      const textToSearch = d[column] && d[column].toLowerCase() || '';
      return textToSearch.indexOf(filter) !== -1;
    };
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dsStatusTarefa(id): string {
    switch (id) {
      case 1: {
        return "Criada";
      }
      case 2: {
        return "Em andamento";
      }
      case 3: {
        return "Pausada";
      }
      case 4: {
        return "Concluída";
      }
      case 5: {
        return "Excluída";
      }
      case 6: {
        return "Cancelada";
      }
      default: {
        return "";
      }
    }
  }
}
