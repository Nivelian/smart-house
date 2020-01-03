var config = [{
  name: "Temperature",
  unit: "*C",
  type: "line",
}, {
  name: "Humidity",
  unit: "%",
  type: "area",
}];

var setData;

window.onload = () => {
  ['mousemove', 'touchmove', 'touchstart'].forEach(event =>
    document.getElementById('container').addEventListener(
      event, e => Highcharts.charts.forEach(x => {
        point = x.series[0].searchPoint(x.pointer.normalize(e), true);
        point && point.highlight(e)
      })
    ));
  Highcharts.Pointer.prototype.reset = () => undefined;
  Highcharts.Point.prototype.highlight = function (event) {
    this.onMouseOver();
    this.series.chart.tooltip.refresh(this);
    this.series.chart.xAxis[0].drawCrosshair(this.series.chart.pointer.normalize(event), this);
  };

  function syncExtremes(e) {
    e.trigger !== 'syncExtremes' && Highcharts.charts.forEach(chart =>
      chart !== this.chart && chart.xAxis[0].setExtremes &&
      chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {trigger: 'syncExtremes'}));
  }

  config.forEach((x, i) => {
    let chartDiv = document.createElement('div');
    chartDiv.className = 'chart';
    container.appendChild(chartDiv);

    Highcharts.chart(chartDiv, {
      chart: {marginLeft: 40, spacingTop: 20, spacingBottom: 20, zoomType: 'x'},
      title: {text: x.name, align: 'left', margin: 0, x: 30},
      credits: {enabled: false},
      legend: {enabled: false},
      xAxis: {crosshair: true, events: {setExtremes: syncExtremes}, type: 'datetime'},
      yAxis: {title: {text: null}},
      tooltip: {
        positioner: function () {return {x: this.chart.chartWidth - this.label.width, y: 10}},
        borderWidth: 0,
        backgroundColor: 'none',
        pointFormat: '{point.y}',
        headerFormat: '',
        shadow: false,
        style: {fontSize: '18px'},
      },
      series: [{
        data: [],
        name: x.name,
        type: x.type,
        color: Highcharts.getOptions().colors[i],
        fillOpacity: 0.3,
        tooltip: {valueSuffix: ' ' + x.unit}
      }],
      time: {useUTC: false}
    });
  });

  setData = data => data.forEach((x, i) => Highcharts.charts[i].series[0].setData(x))
}
