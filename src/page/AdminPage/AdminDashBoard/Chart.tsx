import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
interface ChartProps {
	name: string;
	data: number[];
	category: string[];
	title: string;
}
const revertDate = (date: string) => {
	const arr = date.split("-");
	return arr.reverse().join("-");
};
const ApexChart = ({ name, data, category, title }: ChartProps) => {
	const options: ApexOptions = {
		series: [
			{
				name: name,
				data: data,
			},
		],
		chart: {
			id: "chart",
			height: 350,
			type: "bar",
		},
		plotOptions: {
			bar: {
				borderRadius: 10,
				dataLabels: {
					position: "top",
				},
			},
		},
		dataLabels: {
			enabled: true,
			formatter: function (val: any) {
				return val;
			},
			offsetY: -20,
			style: {
				fontSize: "12px",
				colors: ["#304758"],
			},
		},
		xaxis: {
			categories: category.map((item) => revertDate(item)),
			position: "top",
			axisBorder: {
				show: true,
			},
			labels: {
				show: true,
				rotate: -45,
				rotateAlways: false,
				hideOverlappingLabels: true,
				showDuplicates: false,
				trim: false,
				minHeight: undefined,
				maxHeight: 120,
				style: {
					colors: [],
					fontSize: "12px",
					fontFamily: "Helvetica, Arial, sans-serif",
					fontWeight: 700,
					cssClass: "apexcharts-xaxis-label",
				},
				offsetX: 0,
				offsetY: 0,
				format: undefined,
				formatter: undefined,
				datetimeUTC: true,
				datetimeFormatter: {
					year: "yyyy",
					month: "MMM 'yy",
					day: "dd MMM",
					hour: "HH:mm",
				},
			},
			axisTicks: {
				show: true,
			},
			crosshairs: {
				fill: {
					type: "gradient",
					gradient: {
						colorFrom: "#D8E3F0",
						colorTo: "#BED1E6",
						stops: [0, 100],
						opacityFrom: 0.4,
						opacityTo: 0.5,
					},
				},
			},
			tooltip: {
				enabled: true,
			},
		},
		yaxis: {
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
			labels: {
				show: false,
				formatter: function (val: any) {
					return val;
				},
			},
		},
		title: {
			text: title,
			floating: true,
			offsetY: 330,
			align: "center",
			style: {
				color: "#444",
			},
		},
	};
	return (
		<div id="chart">
			<ReactApexChart
				options={options}
				series={options.series}
				type="bar"
				height={350}
			/>
		</div>
	);
};

export default React.memo(ApexChart);
