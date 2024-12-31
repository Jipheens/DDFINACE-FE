import { Component, OnInit, ViewChild } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexFill,
  ApexGrid,
  ApexResponsive,
} from "ng-apexcharts";
import { TokenStorageService } from "src/app/core/service/token-storage.service";

export type chartOptions = {
  series: ApexAxisChartSeries;
  radialseries: ApexNonAxisChartSeries;
  series2: ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  grid: ApexGrid;
  stroke: ApexStroke;
  legend: ApexLegend;
  colors: string[];
  responsive: ApexResponsive[];
  labels: string[];
};

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.sass"],
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public barChartOptions: Partial<chartOptions>;
  public radialChartOptions: Partial<chartOptions>;
  public gaugeChartOptions: Partial<chartOptions>;
  public stackBarChart: Partial<chartOptions>;
  constructor(private tokenStorageService: TokenStorageService) {}



currentUser: any;
  ngOnInit() {
    this.currentUser =this.tokenStorageService.getUser().username;
    this.chart1();
    this.chart2();

  }
  private chart1() {
    this.barChartOptions = {
      series: [
        {
          name: "Number of Orders",
          data: [120, 150, 100, 180, 90, 200],
        },
        {
          name: "Purchase Orders",
          data: [80, 100, 70, 120, 60, 150],
        },
        {
          name: "insurance",
          data: [50, 60, 40, 70, 30, 80],
        },
        {
          name: "Policys",
          data: [30, 40, 25, 45, 20, 50],
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%",
        // **Dark green theme with better contrast:**
        foreColor: "#3C4A59",
      },
      // **Color palette using dark green as base and accessible, harmonious colors:**
      colors: [
        "#3C4A59", // Dark green base
        "#F08080", // Light coral (complementary, accessible contrast)
        "#99CCFF", // Sky blue (light, accessible contrast)
        "#FFA500", // Orange (medium, accessible contrast)
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "35%",
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      xaxis: {
        categories: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "bottom",
        offsetX: 0,
        offsetY: 0,
      },
      tooltip: {
        theme: "dark",
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
  

private chart2() {
    this.radialChartOptions = {
        radialseries: [44, 55, 67],
        chart: {
            height: 290,
            type: "radialBar",
        },
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        fontSize: "22px",
                    },
                    value: {
                        fontSize: "16px",
                    },
                    total: {
                        show: true,
                        label: "Total",
                        formatter: function (w) {
                            return "52%";
                        },
                    },
                },
            },
        },
        labels: ["RFQs", "RFPs", "POs"],
        colors: ["#2E7D32", "#388E3C", "#43A047"], // Dark green colors for each label
    };
}


}
