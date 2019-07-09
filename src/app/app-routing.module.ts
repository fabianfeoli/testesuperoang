import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskPanelComponent } from './task-panel/task-panel.component';
import { MytasksComponent } from './mytasks/mytasks.component';
import { FormTarefaComponent } from './form-tarefa/form-tarefa.component';

const routes: Routes = [
    { path: '', component: TaskPanelComponent },
    { path: 'mytasks', component: MytasksComponent },
    { path: 'formtarefa/:action/:id', component: FormTarefaComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
