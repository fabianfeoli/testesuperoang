import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly.js";

@Component({
  selector: 'app-task-panel',
  templateUrl: './task-panel.component.html',
  styleUrls: ['./task-panel.component.css']
})
export class TaskPanelComponent implements OnInit {

  loaded: boolean = false;
  visualizacaoAtual: number = 0;
  dados: any[];

  constructor(private zone: NgZone) { }

  ngOnInit() {
    this.graph();
  }

  graph() {
    this.zone.runOutsideAngular(() => {


      /* Chart code */
      // Themes begin
      am4core.useTheme(am4themes_kelly);
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart instance
      let chart = am4core.create("chartdiv2", am4charts.PieChart);

      // Add data
      chart.data = [{
        "Tarefa": "Criadas",
        "Quant": 10
      }, {
        "Tarefa": "Concluídas",
        "Quant": 22
      }, {
        "Tarefa": "Alteradas",
        "Quant": 1
      }, {
        "Tarefa": "Pausadas",
        "Quant": 2
      }, {
        "Tarefa": "Excluídas",
        "Quant": 3
      }, {
        "Tarefa": "Canceladas",
        "Quant": 1
      },
      {
        "Tarefa": "Em andamento",
        "Quant": 2
      }];


      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "Quant";
      pieSeries.dataFields.category = "Tarefa";
      pieSeries.innerRadius = am4core.percent(50);
      pieSeries.ticks.template.disabled = true;
      pieSeries.labels.template.disabled = true;

      let rgm = new am4core.RadialGradientModifier();
      rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, - 0.5);
      pieSeries.slices.template.fillModifier = rgm;
      pieSeries.slices.template.strokeModifier = rgm;
      pieSeries.slices.template.strokeOpacity = 0.4;
      pieSeries.slices.template.strokeWidth = 0;

      chart.legend = new am4charts.Legend();
      chart.legend.position = "bottom";
      this.loaded = true;
    });

  }


}