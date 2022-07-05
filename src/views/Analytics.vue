<template>
  <div class="analytics">
    <h1 class="analytics__header">Аналитика</h1>
    <article class="analytics__chart-container">
      <div class="analytics__chart" ref="chartdiv"></div>
    </article>
  </div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";

export default {
  name: "Analytics",
  data() {
    return {
      chartTitle: 'Аналитика по визитам',
      chartData: [
        { date: "2020-07-01", visits: 213 },
        { date: "2020-07-02", visits: 249 },
        { date: "2020-07-03", visits: 179 },
        { date: "2020-07-04", visits: 170 },
        { date: "2020-07-05", visits: 184 },
        { date: "2020-07-06", visits: 202 },
        { date: "2020-07-07", visits: 198 },
        { date: "2020-07-08", visits: 168 },
        { date: "2020-07-09", visits: 176 },
        { date: "2020-07-10", visits: 171 },
        { date: "2020-07-11", visits: 190 },
        { date: "2020-07-12", visits: 154 },
        { date: "2020-07-13", visits: 246 },
        { date: "2020-07-14", visits: 250 },
        { date: "2020-07-15", visits: 227 },
        { date: "2020-07-16", visits: 140 },
        { date: "2020-07-17", visits: 170 },
        { date: "2020-07-18", visits: 125 },
        { date: "2020-07-19", visits: 106 },
        { date: "2020-07-20", visits: 207 },
        { date: "2020-07-21", visits: 222 },
        { date: "2020-07-22", visits: 198 },
        { date: "2020-07-23", visits: 204 },
        { date: "2020-07-24", visits: 213 },
        { date: "2020-07-25", visits: 145 },
        { date: "2020-07-26", visits: 166 },
        { date: "2020-07-27", visits: 163 },
        { date: "2020-07-28", visits: 135 },
        { date: "2020-07-29", visits: 45 },
      ],
    };
  },
  computed: {
    chartDataMs() {
      return this.chartData.map(el => {
        return { 
          date: new Date(el.date).getTime(),
          value: el.visits
        }
      });
    }
  },
  mounted() {
    let root = am5.Root.new(this.$refs.chartdiv);
    
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        height: am5.percent(90)
      })
    );
    
    chart.children.unshift(am5.Label.new(root, {
      text: this.chartTitle,
      fontSize: 20,
      fontWeight: "400",
      textAlign: "center",
      x: am5.percent(50),
      centerX: am5.percent(50),
      paddingTop: 0,
    }));

    let data = this.chartDataMs;

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraTooltipPrecision: 1,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeWidth: 2,
          stroke: am5.color('#808080'),
          strokeOpacity: 0.2
        })
      })
    );

    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "day", count: 1 },
        gridIntervals: [
          { timeUnit: "day", count: 2 },
          { timeUnit: "week", count: 1 },
          { timeUnit: "month", count: 1 },
        ],
        renderer: am5xy.AxisRendererX.new(root, {
          strokeWidth: 2,
          stroke: am5.color('#808080'),
          strokeOpacity: 0.2
        })
      })
    );

    let xRenderer = xAxis.get("renderer");
    xRenderer.grid.template.setAll({
      location: 0,
      visible: false
    });
    xRenderer.labels.template.setAll({
      location: 0,
    });

    let yRenderer = yAxis.get("renderer");
    yRenderer.grid.template.setAll({
      visible: false
    });

    let series = chart.series.push(
      am5xy.LineSeries.new(root, { 
        name: this.chartTitle,
        xAxis: xAxis, 
        yAxis: yAxis, 
        valueYField: "value", 
        valueXField: "date",
        locationX: 0,
        tooltip: am5.Tooltip.new(root, {}),
        stroke: am5.color(0x9d42dd),
        fill: am5.color(0x6a0dad),
      }) 
    );
    series.strokes.template.set("strokeWidth", 2);
    series.fills.template.setAll({
      fillOpacity: 0.4,
      visible: true
    });

    let tooltip = am5.Tooltip.new(root, {
      getFillFromSprite: false,
      labelText: "Дата: {valueX.formatDate()}\nВизиты: {valueY}"
    });

    tooltip.get("background").setAll({
      fill: am5.color(0x000000),
      fillOpacity: 0.7,
      stroke: am5.color(0x000000),
      strokeWidth: 2,
    });

    series.set("tooltip", tooltip);

    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationX: 0,
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: am5.color(0x6a0dad)
        })
      });
    });
    

    
    series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}")
    series.data.setAll(data);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomXY",
      xAxis: xAxis
    }));
  },
};
</script>

<style lang='scss' scoped>
.analytics {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 20px 5%;
  margin: 0 auto;
  &__header {
    display: block;
    height: 30px;
    margin-bottom: 20px;
    font-size: 25px;
    text-align: center;
  }
  &__chart {
    width: 100%;
    height: 500px;
    max-height: calc(100vh - 70px);
  }
}

</style>