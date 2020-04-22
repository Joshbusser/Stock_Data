
window.onload = function () {

var dataPoints = [];

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2", // "light1", "light2", "dark1", "dark2"
	exportEnabled: true,
	title: {
		text: "GILD Stock Price in 2020",
		horizontalAlign: "Left"
	},
	subtitles: [{
		text: "Daily Averages",
		horizontalAlign: "Left"
	}],
	axisX: {
		interval: 1,
		intervalType: "month",
		valueFormatString: "MMM",
		gridDashType: "dot",
		gridThickness: 2
	},
	axisY: {
		interval: 5,
		includeZero: false,
		prefix: "$"
		
	},
	toolTip: {
		content: "Date: {x}<br /><strong>Price:</strong><br />Open: {y[0]}, Close: {y[3]}<br />High: {y[1]}, Low: {y[2]}"
	},
	data: [{
		type: "candlestick",
		yValueFormatString: "$##00.00",
		dataPoints: dataPoints
	}]
});

$.get("https://raw.githubusercontent.com/Joshbusser/Stock_Data/master/GILD.csv", getDataPointsFromCSV);

// $.get("https://canvasjs.com/data/gallery/javascript/netflix-stock-price.csv"

// $('#load_data').click(function(){
// 	$.ajax({
// 		url:"GILD.csv",
// 		dataType:"text",
// 		success:function(data)
// 	})
// })

function getDataPointsFromCSV(csv) {
	var csvLines = points = [];
	csvLines = csv.split(/[\r?\n|\r|\n]+/);
	for (var i = 0; i < csvLines.length; i++) {
		if (csvLines[i].length > 0) {
			points = csvLines[i].split(",");
			dataPoints.push({
				x: new Date(
					parseInt(points[0].split("/")[2]),
					parseInt(points[0].split("/")[0]),
					parseInt(points[0].split("/")[1])
				),
				y: [
					parseFloat(points[1]),
					parseFloat(points[2]),
					parseFloat(points[3]),
					parseFloat(points[4])
				]
			});
		}
	}
	chart.render();
}

}