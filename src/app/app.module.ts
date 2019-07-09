import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { PTBRMatPaginatorIntl } from './paginator-br';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatSelectModule,
  MatTabsModule,
  MatSidenavModule,
  MatPaginatorIntl,
  MatNativeDateModule,
  MatDatepickerModule

} from "@angular/material";
import { TaskPanelComponent } from './task-panel/task-panel.component';
import { MytasksComponent } from './mytasks/mytasks.component';
import { FormTarefaComponent } from './form-tarefa/form-tarefa.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuLateralComponent,
    TaskPanelComponent,
    MytasksComponent,
    FormTarefaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    AppRoutingModule,
    HttpClientModule
  ],

  providers: [
    { provide: MatPaginatorIntl, useClass: PTBRMatPaginatorIntl },
    { provide: MAT_DATE_LOCALE, useValue: 'pt' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
