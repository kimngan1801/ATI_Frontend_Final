import ApexCharts from 'apexcharts';

const getMainChartOptions = () => {
	let mainChartColors = {}

	if (document.documentElement.classList.contains('dark')) {
		mainChartColors = {
			borderColor: '#374151',
			labelColor: '#9CA3AF',
			opacityFrom: 0.1,
			opacityTo: 0.3,
		};
	} else {
		mainChartColors = {
			borderColor: '#F3F4F6',
			labelColor: '#6B7280',
			opacityFrom: 0.5,
			opacityTo: 0.1,
		}
	}

	return {
		chart: {
			height: 420,
			type: 'area',
			fontFamily: 'Inter, sans-serif',
			foreColor: mainChartColors.labelColor,
			toolbar: {
				show: false
			},
			stacked: true,
			stackType: '100%'
		},
		fill: {
			type: 'solid',
			opacity: 0.75
		},
		dataLabels: {
			enabled: false
		},
		tooltip: {
			style: {
				fontSize: '14px',
				fontFamily: 'Inter, sans-serif',
			},
			y: {
				formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
					// Tính tổng của positive + negative tại điểm này
					const total = series.reduce((sum, s) => sum + s[dataPointIndex], 0);
					const percentage = ((value / total) * 100).toFixed(1);
					return percentage + '%';
				}
			}
		},
		grid: {
			show: true,
			borderColor: mainChartColors.borderColor,
			strokeDashArray: 0,
			xaxis: {
				lines: {
					show: false
				}
			},
			yaxis: {
				lines: {
					show: true
				}
			},
			padding: {
				left: 35,
				bottom: 15
			}
		},
		series: [
			{
				name: 'Positive',
				data: [65, 58, 62, 73, 68, 59, 52],
				color: '#10B981'
			},
			{
				name: 'Negative',
				data: [35, 42, 38, 27, 32, 41, 48],
				color: '#EF4444'
			}
		],
		stroke: {
			curve: 'smooth',
			width: 1.5,
			colors: ['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)']
		},
		markers: {
			size: 0,
			strokeColors: '#ffffff',
			hover: {
				size: 5,
				sizeOffset: 3
			}
		},
		xaxis: {
			categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
			labels: {
				style: {
					colors: [mainChartColors.labelColor],
					fontSize: '14px',
					fontWeight: 500,
				},
			},
			axisBorder: {
				color: mainChartColors.borderColor,
			},
			axisTicks: {
				color: mainChartColors.borderColor,
			},
			crosshairs: {
				show: true,
				position: 'back',
				stroke: {
					color: mainChartColors.borderColor,
					width: 1,
					dashArray: 10,
				},
			},
		},
		yaxis: {
			min: 0,
			max: 100,
			labels: {
				style: {
					colors: [mainChartColors.labelColor],
					fontSize: '14px',
					fontWeight: 500,
				},
				formatter: function (value) {
					return value.toFixed(0) + '%';
				}
			},
		},
		legend: {
			fontSize: '14px',
			fontWeight: 500,
			fontFamily: 'Inter, sans-serif',
			labels: {
				colors: [mainChartColors.labelColor]
			},
			itemMargin: {
				horizontal: 10
			}
		},
		responsive: [
			{
				breakpoint: 1024,
				options: {
					xaxis: {
						labels: {
							show: false
						}
					}
				}
			}
		]
	};
}

if (document.getElementById('main-chart')) {
	const chart = new ApexCharts(document.getElementById('main-chart'), getMainChartOptions());
	chart.render();

	// init again when toggling dark mode
	document.addEventListener('dark-mode', function () {
		chart.updateOptions(getMainChartOptions());
	});
}

if (document.getElementById('new-products-chart')) {
	const options = {
		colors: ['#1A56DB', '#FDBA8C'],
		series: [
			{
				name: 'Quantity',
				color: '#1A56DB',
				data: [
					{ x: '01 Feb', y: 170 },
					{ x: '02 Feb', y: 180 },
					{ x: '03 Feb', y: 164 },
					{ x: '04 Feb', y: 145 },
					{ x: '05 Feb', y: 194 },
					{ x: '06 Feb', y: 170 },
					{ x: '07 Feb', y: 155 },
				]
			}
		],
		chart: {
			type: 'bar',
			height: '140px',
			fontFamily: 'Inter, sans-serif',
			foreColor: '#4B5563',
			toolbar: {
				show: false
			}
		},
		plotOptions: {
			bar: {
				columnWidth: '90%',
				borderRadius: 3
			}
		},
		tooltip: {
			shared : false,
			intersect: false,
			style: {
				fontSize: '14px',
				fontFamily: 'Inter, sans-serif'
			},
		},
		states: {
			hover: {
				filter: {
					type: 'darken',
					value: 1
				}
			}
		},
		stroke: {
			show: true,
			width: 5,
			colors: ['transparent']
		},
		grid: {
			show: false
		},
		dataLabels: {
			enabled: false
		},
		legend: {
			show: false
		},
		xaxis: {
			floating: false,
			labels: {
				show: false
			},
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			},
		},
		yaxis: {
			show: false
		},
		fill: {
			opacity: 1
		}
	};

	const chart = new ApexCharts(document.getElementById('new-products-chart'), options);
	chart.render();
}

if (document.getElementById('sales-by-category')) {
	const options = {
		series: [
			{ name: 'Hỏi giá', data: [342] },
			{ name: 'Hỏi link', data: [268] },
			{ name: 'Hỏi mua', data: [195] },
			{ name: 'Khen ngợi', data: [142] },
			{ name: 'Góp ý nội dung', data: [98] },
			{ name: 'Khác', data: [67] }
		],

		colors: ['#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#007AFF', '#8E8E93'],

		chart: {
			type: 'bar',
			height: 420,
			fontFamily: 'SF Pro Display, Inter, sans-serif',
			foreColor: '#374151',
			toolbar: { show: false }
		},

		plotOptions: {
			bar: {
				horizontal: true,
				borderRadius: 10,
				borderRadiusApplication: 'end',
				dataLabels: { position: 'top' }
			}
		},

		dataLabels: {
			enabled: false
		},

		stroke: { show: true, width: 3, colors: ['transparent'] },

		tooltip: {
			shared: false,
			intersect: true,
			followCursor: true,
			marker: { show: true },
			style: { fontSize: '15px', fontWeight: 'bold' },
			y: {
				formatter: function(value, { seriesIndex }) {
					const names = ['Hỏi giá', 'Hỏi link', 'Hỏi mua', 'Khen ngợi', 'Góp ý nội dung', 'Khác'];
					return `<div class="p-2">
							<div class="font-bold text-lg">${names[seriesIndex]}</div>
							<div class="text-sm">${value} bình luận</div>
						</div>`;
				}
			},
			x: { show: false }
		},

		xaxis: { 
			categories: [''], 
			labels: { 
				show: true,
				style: {
					fontSize: '14px',
					fontWeight: 500
				},
				formatter: function(value) {
					return value;
				}
			}
		},

		yaxis: {
			labels: {
				style: { fontSize: '16px', fontWeight: 600, colors: '#1F2937' },
				formatter: function(value) {
					return value;
				}
			}
		},

		grid: { show: true, borderColor: '#F3F4F6', strokeDashArray: 6 },

		legend: {
			show: true,
			position: 'top',
			horizontalAlign: 'center',
			fontSize: '15px',
			fontWeight: 600,
			markers: { width: 16, height: 16, radius: 8 },
			itemMargin: { horizontal: 20 }
		},

		states: {
			hover: { filter: { type: 'lighten', value: 0.15 } },
			active: { filter: { type: 'darken', value: 0.1 } }
		}
	};

	const chart = new ApexCharts(document.getElementById('sales-by-category'), options);
	chart.render();
}

const getVisitorsChartOptions = () => {
	let visitorsChartColors = {}

	if (document.documentElement.classList.contains('dark')) {
		visitorsChartColors = {
			fillGradientShade: 'dark',
			fillGradientShadeIntensity: 0.45,
		};
	} else {
		visitorsChartColors = {
			fillGradientShade: 'light',
			fillGradientShadeIntensity: 1,
		}
	}

	return {
		series: [{
			name: 'Visitors',
			data: [500, 590, 600, 520, 610, 550, 600]
		}],
		labels: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
		chart: {
			type: 'area',
			height: '305px',
			fontFamily: 'Inter, sans-serif',
			sparkline: {
				enabled: true
			},
			toolbar: {
				show: false
			}
		},
		fill: {
			type: 'gradient',
			gradient: {
				shade: visitorsChartColors.fillGradientShade,
				shadeIntensity: visitorsChartColors.fillGradientShadeIntensity
			},
		},
		plotOptions: {
			area: {
				fillTo: 'end'
			}
		},
		theme: {
			monochrome: {
				enabled: true,
				color: '#1A56DB',
			}
		},
		tooltip: {
			style: {
				fontSize: '14px',
				fontFamily: 'Inter, sans-serif'
			},
		},
	}
}


const getSignupsChartOptions = () => {
	let signupsChartColors = {}

	if (document.documentElement.classList.contains('dark')) {
		signupsChartColors = {
			backgroundBarColors: ['#E5E7EB', '#E5E7EB', '#E5E7EB', '#E5E7EB', '#E5E7EB', '#E5E7EB', '#E5E7EB']
		};
	} else {
		signupsChartColors = {
			backgroundBarColors: ['#374151', '#374151', '#374151', '#374151', '#374151', '#374151', '#374151']
		};
	}

	return {
		series: [{
			name: 'Users',
			data: [1334, 2435, 1753, 1328, 1155, 1632, 1336]
		}],
		labels: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
		chart: {
			type: 'bar',
			height: '140px',
			foreColor: '#4B5563',
			fontFamily: 'Inter, sans-serif',
			toolbar: {
				show: false
			}
		},
		theme: {
			monochrome: {
				enabled: true,
				color: '#1A56DB'
			}
		},
		plotOptions: {
			bar: {
				columnWidth: '25%',
				borderRadius: 3,
				colors: {
					backgroundBarColors: signupsChartColors.backgroundBarColors,
					backgroundBarRadius: 3
				},
			},
			dataLabels: {
				hideOverflowingLabels: false
			}
		},
		xaxis: {
			floating: false,
			labels: {
				show: false
			},
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			},
		},
		tooltip: {
			shared: true,
			intersect: false,
			style: {
				fontSize: '14px',
				fontFamily: 'Inter, sans-serif'
			}
		},
		states: {
			hover: {
				filter: {
					type: 'darken',
					value: 0.8
				}
			}
		},
		fill: {
			opacity: 1
		},
		yaxis: {
			show: false
		},
		grid: {
			show: false
		},
		dataLabels: {
			enabled: false
		},
		legend: {
			show: false
		},
	};
}

if (document.getElementById('week-signups-chart')) {
	const chart = new ApexCharts(document.getElementById('week-signups-chart'), getSignupsChartOptions());
	chart.render();

	// init again when toggling dark mode
	document.addEventListener('dark-mode', function () {
		chart.updateOptions(getSignupsChartOptions());
	});
}

const getTrafficChannelsChartOptions = () => {

	let trafficChannelsChartColors = {}

	if (document.documentElement.classList.contains('dark')) {
		trafficChannelsChartColors = {
			strokeColor: '#ffffff'
		};
	} else {
		trafficChannelsChartColors = {
			strokeColor: '#1f2937'
		}
	}

	return {
		series: [12, 8, 6, 4],
		labels: ['Love', 'Funny', 'Angry', 'Sad'],
		colors: ['#EC4899', '#FBBF24', '#F97316', '#3B82F6'],
		chart: {
			type: 'donut',
			height: '350px',   // Giữ nguyên kích thước
			width: '350px',    // Giữ nguyên kích thước
			offsetX: 100,       // Tăng offset sang phải thêm nữa
			offsetY: 10,      // Dịch xuống dưới một chút
			fontFamily: 'Inter, sans-serif',
			toolbar: {
				show: false
			},
			animations: {
				enabled: true,
				speed: 500
			}
		},
		plotOptions: {
			pie: {
				donut: {
					size: '72%',  // Điều chỉnh kích thước vòng tròn donut
					background: 'transparent',
					labels: {
						show: false
					}
				},
				expandOnClick: false,
				customScale: 0.95,   // Điều chỉnh tỷ lệ scale
				offsetX: 0,         // Giữ căn giữa theo chiều ngang
				offsetY: -10        // Đẩy chart lên trên một chút
			}
		},
		stroke: {
			show: true,
			width: 1,
			colors: document.documentElement.classList.contains('dark') ? ['#ffffff'] : ['#1f2937']
		},
		states: {
			hover: {
				filter: {
					type: 'darken',
					value: 0.9
				}
			}
		},
		tooltip: {
			shared: true,
			followCursor: false,
			fillSeriesColor: false,
			inverseOrder: true,
			style: {
				fontSize: '14px',
				fontFamily: 'Inter, sans-serif'
			},
			x: {
				show: true,
				formatter: function (_, { seriesIndex, w }) {
					const label = w.config.labels[seriesIndex];
					return label
				}
			},
			y: {
				formatter: function (value) {
					return value + '%';
				}
			}
		},
		grid: {
			show: false
		},
		dataLabels: {
			enabled: false
		},
		legend: {
			show: false
		},
	};
}

if (document.getElementById('traffic-by-device')) {
	const chart = new ApexCharts(document.getElementById('traffic-by-device'), getTrafficChannelsChartOptions());
	chart.render();

	// init again when toggling dark mode
	document.addEventListener('dark-mode', function () {
		chart.updateOptions(getTrafficChannelsChartOptions());
	});
}

// Actionable Half Donut Chart
const getActionableChartOptions = () => {
	let chartColors = {
		borderColor: '#F3F4F6',
		labelColor: '#6B7280',
		bgColor: '#FFFFFF'
	};

	if (document.documentElement.classList.contains('dark')) {
		chartColors = {
			borderColor: '#F3F4F6',
			labelColor: '#9CA3AF',
			bgColor: 'transparent'
		};
	}

	return {
		series: [48, 28, 12, 8, 4],
		labels: ['Cần trả lời', 'Cần chuyển sale', 'Spam', 'Toxic', 'Không cần xử lý'],
		colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#A855F7'],
		chart: {
			type: 'donut',
			height: 280,
			fontFamily: 'Inter, sans-serif',
			background: chartColors.bgColor,
			toolbar: {
				show: false
			}
		},
		plotOptions: {
			pie: {
				startAngle: -90,
				endAngle: 90,
				offsetY: 10,
				donut: {
					size: '75%',
					labels: {
						show: false
					}
				}
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			width: 3,
			colors: [chartColors.borderColor]
		},
		legend: {
			show: false
		},
		tooltip: {
			enabled: true,
			theme: 'dark',
			style: {
				fontSize: '12px',
				fontFamily: 'Inter, sans-serif',
			},
			custom: function({ series, seriesIndex, w }) {
				const labels = ['Cần trả lời', 'Cần chuyển sale', 'Spam', 'Toxic', 'Không cần xử lý'];
				return `<div class="px-3 py-2 bg-gray-900 text-white rounded-lg shadow-2xl border border-gray-700">
							<div class="font-bold text-sm mb-1">${labels[seriesIndex]}</div>
							<div class="text-2xl font-black">${series[seriesIndex]}%</div>
						</div>`;
			}
		},
		responsive: [{
			breakpoint: 640,
			options: {
				chart: {
					height: 240
				}
			}
		}]
	};
};

// Sentiment Distribution Bar Chart
const getSentimentBarChartOptions = () => {
	let chartColors = {}

	if (document.documentElement.classList.contains('dark')) {
		chartColors = {
			borderColor: '#374151',
			labelColor: '#9CA3AF',
			gridColor: '#374151'
		};
	} else {
		chartColors = {
			borderColor: '#F3F4F6',
			labelColor: '#6B7280',
			gridColor: '#E5E7EB'
		}
	}

	return {
		series: [{
			name: 'Positive',
			data: [60]
		}, {
			name: 'Neutral',
			data: [20]
		}, {
			name: 'Negative',
			data: [20]
		}],
		chart: {
			type: 'bar',
			height: 100,
			stacked: true,
			stackType: '100%',
			toolbar: {
				show: false
			},
			fontFamily: 'Inter, sans-serif',
		},
		plotOptions: {
			bar: {
				horizontal: true,
				barHeight: '60%',
				borderRadius: 8,
				dataLabels: {
					total: {
						enabled: false
					}
				}
			},
		},
		colors: ['#10B981', '#3B82F6', '#EF4444'],
		dataLabels: {
			enabled: true,
			textAnchor: 'middle',
			style: {
				fontSize: '14px',
				fontWeight: 600,
				colors: ['#ffffff']
			},
			formatter: function (val, opts) {
				return val.toFixed(0) + '%';
			},
			dropShadow: {
				enabled: false
			}
		},
		stroke: {
			width: 1,
			colors: ['#fff']
		},
		xaxis: {
			categories: ['Sentiment'],
			labels: {
				show: false
			},
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			}
		},
		yaxis: {
			labels: {
				show: false
			}
		},
		grid: {
			show: false
		},
		legend: {
			show: false
		},
		tooltip: {
			enabled: true,
			theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
			style: {
				fontSize: '14px',
				fontFamily: 'Inter, sans-serif',
			},
			y: {
				formatter: function (val) {
					return val.toFixed(1) + '%';
				},
				title: {
					formatter: function (seriesName) {
						return seriesName + ': ';
					}
				}
			},
			marker: {
				show: true
			}
		}
	};
};

if (document.getElementById('actionableChart')) {
	const actionableChart = new ApexCharts(document.getElementById('actionableChart'), getActionableChartOptions());
	actionableChart.render();

	// init again when toggling dark mode
	document.addEventListener('dark-mode', function () {
		actionableChart.updateOptions(getActionableChartOptions());
	});
}

// Initialize Sentiment Bar Chart
if (document.getElementById('sentiment-bar-chart')) {
	const sentimentBarChart = new ApexCharts(document.getElementById('sentiment-bar-chart'), getSentimentBarChartOptions());
	sentimentBarChart.render();

	// init again when toggling dark mode
	document.addEventListener('dark-mode', function () {
		sentimentBarChart.updateOptions(getSentimentBarChartOptions());
	});
}
