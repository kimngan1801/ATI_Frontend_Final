import ApexCharts from 'apexcharts';

// Standard tooltip configuration for all charts
const standardTooltipStyle = {
	fontSize: '14px',
	fontFamily: 'Inter, sans-serif'
};

const standardTooltipTheme = 'light'; // Use light theme for consistency

// Fetch data from mock-data.json
let chartData = null;

async function loadChartData() {
	try {
		const response = await fetch('/mock-data.json');
		if (!response.ok) throw new Error('Failed to load data');
		chartData = await response.json();
		console.log('✅ Loaded chart data from mock-data.json:', chartData);
		return chartData;
	} catch (error) {
		console.error('❌ Error loading mock-data.json:', error);
		// Fallback to hardcoded data
		return {
			mainChart: {
				categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
				positive: [65, 58, 62, 73, 68, 59, 52],
				negative: [35, 42, 38, 27, 32, 41, 48]
			}
		};
	}
}

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
			style: standardTooltipStyle,
			theme: standardTooltipTheme,
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
				data: chartData?.mainChart?.positive || [65, 58, 62, 73, 68, 59, 52],
				color: '#10B981'
			},
			{
				name: 'Negative',
				data: chartData?.mainChart?.negative || [35, 42, 38, 27, 32, 41, 48],
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
			categories: chartData?.mainChart?.categories || ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
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

// Initialize charts after loading data
async function initCharts() {
	await loadChartData();
	
	if (document.getElementById('main-chart')) {
		const chart = new ApexCharts(document.getElementById('main-chart'), getMainChartOptions());
		chart.render();

		// init again when toggling dark mode
		document.addEventListener('dark-mode', function () {
			chart.updateOptions(getMainChartOptions());
		});
	}
}

// Start initialization
if (document.getElementById('main-chart')) {
	initCharts();
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
			style: standardTooltipStyle,
			theme: standardTooltipTheme,
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
	// Load data dynamically from mock-data.json
	loadChartData().then(() => {
		const categoryData = chartData?.salesByCategory || [
			{ name: 'Hỏi giá', data: [342] },
			{ name: 'Hỏi link', data: [268] },
			{ name: 'Hỏi mua', data: [195] },
			{ name: 'Khen ngợi', data: [142] },
			{ name: 'Góp ý nội dung', data: [98] },
			{ name: 'Khác', data: [67] }
		];

		const options = {
			series: categoryData,

			colors: ['#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#007AFF', '#8E8E93', '#AF52DE', '#FF2D55', '#5856D6'],

		chart: {
			type: 'bar',
			height: 520,
			fontFamily: 'SF Pro Display, Inter, sans-serif',
			foreColor: '#374151',
			toolbar: { show: false }
		},

		plotOptions: {
			bar: {
				horizontal: true,
				borderRadius: 10,
				borderRadiusApplication: 'end',
				barHeight: '75%',
				dataLabels: { position: 'top' }
			}
		},

		dataLabels: {
			enabled: false
		},

		stroke: { show: true, width: 3, colors: ['transparent'] },

		tooltip: {
			style: standardTooltipStyle,
			theme: standardTooltipTheme,
			y: {
				formatter: function(value, { seriesIndex }) {
					return `${value} bình luận`;
				},
				title: {
					formatter: function(seriesName, { seriesIndex }) {
						return categoryData[seriesIndex]?.name || 'Unknown';
					}
				}
			}
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
	});
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
			style: standardTooltipStyle,
			theme: standardTooltipTheme,
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
			style: standardTooltipStyle,
			theme: standardTooltipTheme,
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

	// Lấy dữ liệu động từ chartData
	const emotionData = chartData?.trafficEmotions || [12, 8, 6, 4];

	return {
		series: emotionData,
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
			style: standardTooltipStyle,
			theme: standardTooltipTheme,
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
	// Initialize chart after data is loaded
	loadChartData().then(() => {
		const chart = new ApexCharts(document.getElementById('traffic-by-device'), getTrafficChannelsChartOptions());
		chart.render();

		// init again when toggling dark mode
		document.addEventListener('dark-mode', function () {
			chart.updateOptions(getTrafficChannelsChartOptions());
		});
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

	// Load data dynamically from chartData
	const actionableData = chartData?.actionable || [48, 28, 12, 8, 4];
	const actionableLabels = ['Cần trả lời', 'Cần chuyển sale', 'Spam', 'Toxic', 'Không cần xử lý'];

	return {
		series: actionableData,
		labels: actionableLabels,
		colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#A855F7'],
		chart: {
			type: 'donut',
			height: 420,
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
			theme: standardTooltipTheme,
			style: standardTooltipStyle,
			fillSeriesColor: false,
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

	// Lấy dữ liệu động từ chartData
	const sentimentData = chartData?.sentimentBar || [60, 20, 20];
	
	return {
		series: [{
			name: 'Positive',
			data: [sentimentData[0]]
		}, {
			name: 'Neutral',
			data: [sentimentData[1]]
		}, {
			name: 'Negative',
			data: [sentimentData[2]]
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
			theme: standardTooltipTheme,
			style: standardTooltipStyle,
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
	// Initialize chart after data is loaded
	loadChartData().then(() => {
		const actionableChart = new ApexCharts(document.getElementById('actionableChart'), getActionableChartOptions());
		actionableChart.render();

		// init again when toggling dark mode
		document.addEventListener('dark-mode', function () {
			actionableChart.updateOptions(getActionableChartOptions());
		});
	});
}

// Initialize Sentiment Bar Chart
if (document.getElementById('sentiment-bar-chart')) {
	// Initialize chart after data is loaded
	loadChartData().then(() => {
		const sentimentBarChart = new ApexCharts(document.getElementById('sentiment-bar-chart'), getSentimentBarChartOptions());
		sentimentBarChart.render();

		// init again when toggling dark mode
		document.addEventListener('dark-mode', function () {
			sentimentBarChart.updateOptions(getSentimentBarChartOptions());
		});
	});
}

// Load and update Sentiment Legend dynamically
async function loadSentimentLegend() {
	try {
		const data = chartData || await loadChartData();
		const sentimentData = data.sentimentBar || [60, 20, 20];
		
		// Update legend text
		const legendItems = document.querySelectorAll('#sentiment-legend .legend-item');
		if (legendItems.length >= 3) {
			legendItems[0].querySelector('.legend-text').textContent = `Positive (${sentimentData[0]}%)`;
			legendItems[1].querySelector('.legend-text').textContent = `Neutral (${sentimentData[1]}%)`;
			legendItems[2].querySelector('.legend-text').textContent = `Negative (${sentimentData[2]}%)`;
		}
		
		console.log('✅ Sentiment legend updated with data:', sentimentData);
	} catch (error) {
		console.error('❌ Error loading sentiment legend:', error);
	}
}

// Load and update Emotion Cards dynamically (Love, Funny, Angry, Sad)
async function loadEmotionCards() {
	try {
		const data = chartData || await loadChartData();
		const emotionData = data.trafficEmotions || [12, 8, 6, 4];
		const emotionNames = ['Love', 'Funny', 'Angry', 'Sad'];
		
		emotionNames.forEach((name, index) => {
			const card = document.getElementById(`emotion-${name.toLowerCase()}`);
			if (card) {
				const percentElement = card.querySelector('.emotion-percent');
				if (percentElement) {
					percentElement.textContent = `${emotionData[index]}%`;
				}
			}
		});
		
		console.log('✅ Emotion cards updated with data:', emotionData);
	} catch (error) {
		console.error('❌ Error loading emotion cards:', error);
	}
}

// Load and display top comments from mock-data.json
async function loadTopComments() {
	try {
		const data = chartData || await loadChartData();
		// Sort by like count (descending) and take only top 6
		const topComments = data.topComments
			.sort((a, b) => b.count - a.count)
			.slice(0, 6);
		
		const listContainer = document.getElementById('topCommentsList');
		if (!listContainer) return;
		
		listContainer.innerHTML = topComments.map((item, index) => {
			// Use avatar from data, fallback to default images if not available
			const imgSrc = item.avatar || '/images/products/iphone.png';
			
			return `
				<li class="py-3 sm:py-4">
				  <div class="flex items-center justify-between">
					<div class="flex items-center min-w-0">
					  <img class="flex-shrink-0 w-10 h-10 rounded-full object-cover" src="${imgSrc}" alt="${item.user} avatar">
					  <div class="ml-3">
						<p class="font-medium text-gray-900 truncate dark:text-white">
						  ${item.user}
						</p>
						<div class="flex items-center justify-end flex-1 text-sm text-gray-500">
						  <span class="ml-2">${item.comment}</span>
						</div>
					  </div>
					</div>
					<div class="inline-flex items-center gap-2 text-base font-semibold" style="color: #FE2858 !important;">
					  ${item.count.toLocaleString()}
					  <svg width="20" height="20" style="fill: #FE2858 !important; color: #FE2858 !important;" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" style="fill: #FE2858 !important;"></path>
					  </svg>
					</div>
				  </div>
				</li>
			`;
		}).join('');
		
		console.log('✅ Top Comments loaded successfully');
	} catch (error) {
		console.error('❌ Error loading top comments:', error);
	}
}

// Load and update Actionable Legend (Progress Bars)
async function loadActionableLegend() {
	try {
		const data = chartData || await loadChartData();
		const actionableData = data.actionable || [48, 28, 12, 8, 4];
		
		const items = document.querySelectorAll('.actionable-item');
		items.forEach((item, index) => {
			if (index < actionableData.length) {
				const percent = actionableData[index];
				const percentElement = item.querySelector('.actionable-percent');
				const barElement = item.querySelector('.actionable-bar');
				
				if (percentElement) {
					percentElement.textContent = `${percent}%`;
				}
				if (barElement) {
					barElement.style.width = `${percent}%`;
				}
			}
		});
		
		console.log('✅ Actionable legend updated with data:', actionableData);
	} catch (error) {
		console.error('❌ Error loading actionable legend:', error);
	}
}

// Load top comments after chart data is loaded
if (document.getElementById('topCommentsList')) {
	loadTopComments();
}

// Load sentiment legend and emotion cards
if (document.getElementById('sentiment-legend')) {
	loadSentimentLegend();
}
if (document.querySelector('.emotion-card')) {
	loadEmotionCards();
}
if (document.getElementById('actionable-legend')) {
	loadActionableLegend();
}

// Load intents table
async function loadIntentsTable(selectedFilters = null) {
	try {
		const data = chartData || await loadChartData();
		let intents = data.intentsTable || [];
		
		const tableBody = document.getElementById('intentsTableBody');
		if (!tableBody) return;
		
		// Filter intents if selectedFilters is provided
		if (selectedFilters && selectedFilters.length > 0) {
			intents = intents.filter(item => selectedFilters.includes(item.meaning));
		} else {
			// If no filter, limit to 20 comments
			intents = intents.slice(0, 20);
		}
		
		// Badge color mapping - 13 loại intent
		const badgeColors = {
			'hỏi_giá': 'bg-blue-100 text-blue-800 border-blue-100 dark:bg-gray-700 dark:text-blue-400 dark:border-blue-500',
			'hỏi_link': 'bg-cyan-100 text-cyan-800 border-cyan-100 dark:bg-gray-700 dark:text-cyan-400 dark:border-cyan-500',
			'hỏi_mua': 'bg-sky-100 text-sky-800 border-sky-100 dark:bg-gray-700 dark:text-sky-400 dark:border-sky-500',
			'yêu_cầu_follow': 'bg-pink-100 text-pink-800 border-pink-100 dark:bg-gray-700 dark:text-pink-400 dark:border-pink-500',
			'yêu_cầu_người_bán': 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-100 dark:bg-gray-700 dark:text-fuchsia-400 dark:border-fuchsia-500',
			'xin_hướng_dẫn': 'bg-indigo-100 text-indigo-800 border-indigo-100 dark:bg-gray-700 dark:text-indigo-400 dark:border-indigo-500',
			'góp_ý_nội_dung': 'bg-violet-100 text-violet-800 border-violet-100 dark:bg-gray-700 dark:text-violet-400 dark:border-violet-500',
			'hỏi_thời_gian': 'bg-amber-100 text-amber-800 border-amber-100 dark:bg-gray-700 dark:text-amber-400 dark:border-amber-500',
			'khen': 'bg-green-100 text-green-800 border-green-100 dark:bg-gray-700 dark:text-green-400 dark:border-green-500',
			'chê': 'bg-red-100 text-red-800 border-red-100 dark:bg-gray-700 dark:text-red-400 dark:border-red-500',
			'report': 'bg-orange-100 text-orange-800 border-orange-100 dark:bg-gray-700 dark:text-orange-400 dark:border-orange-500',
			'spam': 'bg-purple-100 text-purple-800 border-purple-100 dark:bg-gray-700 dark:text-purple-400 dark:border-purple-500',
			'neutral_chat': 'bg-gray-100 text-gray-800 border-gray-100 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-500'
		};
		
		// Show message if no results
		if (intents.length === 0) {
			tableBody.innerHTML = `
				<tr>
					<td colspan="4" class="p-8 text-center text-gray-500 dark:text-gray-400">
						<div class="flex flex-col items-center gap-2">
							<svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
							</svg>
							<p class="font-medium">No intents found</p>
							<p class="text-sm">Try adjusting your filters</p>
						</div>
					</td>
				</tr>
			`;
		} else {
			tableBody.innerHTML = intents.map((item, index) => {
				const badgeClass = badgeColors[item.meaning] || 'bg-gray-100 text-gray-800 border-gray-100';
				const rowClass = index % 2 === 1 ? 'bg-gray-50 dark:bg-gray-700' : '';
				
				return `
					<tr class="${rowClass}">
						<td class="p-4 text-sm font-normal text-gray-900 dark:text-white" style="width: 15%;">
							<span class="font-semibold">${item.user}</span>
						</td>
						<td class="p-4 text-sm font-normal text-gray-500 dark:text-gray-400" style="width: 15%;">
							${item.date}
						</td>
						<td class="p-4 text-sm font-normal text-gray-900 dark:text-white" style="width: 50%;">
							<div class="font-semibold break-words">${item.comment}</div>
						</td>
						<td class="p-4 text-sm font-normal text-gray-900 dark:text-white" style="width: 20%;">
							<span class="${badgeClass} text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border">${item.meaning}</span>
						</td>
					</tr>
				`;
			}).join('');
		}
		
		console.log('✅ Intents table loaded successfully with filters:', selectedFilters);
	} catch (error) {
		console.error('❌ Error loading intents table:', error);
	}
}

// Load intents table after page loads
if (document.getElementById('intentsTableBody')) {
	// Load without any filters - show all comments initially
	loadIntentsTable(null);
}

// Load intent filter dropdown dynamically
async function loadIntentFilters() {
	try {
		const data = chartData || await loadChartData();
		const intentCounts = data.intentCounts || {};
		
		const dropdownList = document.getElementById('intent-filter-list');
		if (!dropdownList) return;
		
		// Define filter items with their IDs and labels - 13 loại intent
		// All unchecked by default - user must click to filter
		const filters = [
			{ id: 'filter-hoi-gia', label: 'hỏi_giá', displayName: 'Hỏi giá', count: intentCounts['hỏi_giá'] || 0, checked: false },
			{ id: 'filter-hoi-link', label: 'hỏi_link', displayName: 'Hỏi link', count: intentCounts['hỏi_link'] || 0, checked: false },
			{ id: 'filter-hoi-mua', label: 'hỏi_mua', displayName: 'Hỏi mua', count: intentCounts['hỏi_mua'] || 0, checked: false },
			{ id: 'filter-yeu-cau-follow', label: 'yêu_cầu_follow', displayName: 'Yêu cầu follow', count: intentCounts['yêu_cầu_follow'] || 0, checked: false },
			{ id: 'filter-yeu-cau-nguoi-ban', label: 'yêu_cầu_người_bán', displayName: 'Yêu cầu người bán', count: intentCounts['yêu_cầu_người_bán'] || 0, checked: false },
			{ id: 'filter-xin-huong-dan', label: 'xin_hướng_dẫn', displayName: 'Xin hướng dẫn', count: intentCounts['xin_hướng_dẫn'] || 0, checked: false },
			{ id: 'filter-gop-y-noi-dung', label: 'góp_ý_nội_dung', displayName: 'Góp ý nội dung', count: intentCounts['góp_ý_nội_dung'] || 0, checked: false },
			{ id: 'filter-hoi-thoi-gian', label: 'hỏi_thời_gian', displayName: 'Hỏi thời gian', count: intentCounts['hỏi_thời_gian'] || 0, checked: false },
			{ id: 'filter-khen', label: 'khen', displayName: 'Khen', count: intentCounts['khen'] || 0, checked: false },
			{ id: 'filter-che', label: 'chê', displayName: 'Chê', count: intentCounts['chê'] || 0, checked: false },
			{ id: 'filter-report', label: 'report', displayName: 'Report', count: intentCounts['report'] || 0, checked: false },
			{ id: 'filter-spam', label: 'spam', displayName: 'Spam', count: intentCounts['spam'] || 0, checked: false },
			{ id: 'filter-neutral-chat', label: 'neutral_chat', displayName: 'Neutral chat', count: intentCounts['neutral_chat'] || 0, checked: false }
		];
		
		// Generate HTML for filter items
		dropdownList.innerHTML = filters.map(filter => `
			<li class="flex items-center">
				<input id="${filter.id}" type="checkbox" value="${filter.label}" 
					${filter.checked ? 'checked' : ''} 
					class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
				<label for="${filter.id}" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
					${filter.displayName}
				</label>
			</li>
		`).join('');
		
		// Attach event listeners to checkboxes after rendering
		setTimeout(() => {
			attachFilterEventListeners();
		}, 100);
		
		console.log('✅ Intent filters loaded successfully');
	} catch (error) {
		console.error('❌ Error loading intent filters:', error);
	}
}

// Function to get selected filters from checkboxes
function getSelectedFilters() {
	const checkboxes = document.querySelectorAll('#intent-filter-list input[type="checkbox"]');
	const selectedFilters = [];
	
	checkboxes.forEach(checkbox => {
		if (checkbox.checked) {
			selectedFilters.push(checkbox.value);
		}
	});
	
	return selectedFilters;
}

// Function to attach event listeners to filter checkboxes
function attachFilterEventListeners() {
	const checkboxes = document.querySelectorAll('#intent-filter-list input[type="checkbox"]');
	
	checkboxes.forEach(checkbox => {
		checkbox.addEventListener('change', (e) => {
			// If this checkbox is checked, uncheck all others (single choice)
			if (e.target.checked) {
				checkboxes.forEach(cb => {
					if (cb !== e.target) {
						cb.checked = false;
					}
				});
			}
			
			const selectedFilters = getSelectedFilters();
			console.log('📊 Filters changed:', selectedFilters);
			
			// Reload table with selected filters
			// If no filters selected, show all
			loadIntentsTable(selectedFilters.length > 0 ? selectedFilters : null);
		});
	});
	
	console.log('✅ Filter event listeners attached');
}

// Load intent filters after page loads
if (document.getElementById('intent-filter-list')) {
	loadIntentFilters();
}

// Load total comments dynamically
async function loadTotalComments() {
	try {
		const data = chartData || await loadChartData();
		const totalComments = data.totalComments || 0;
		
		// Update all realtime comment badges
		const commentBadges = document.querySelectorAll('.realtime-comments');
		commentBadges.forEach(badge => {
			// Format number with dot separator (e.g., 1.248)
			const formattedNumber = totalComments.toLocaleString('de-DE');
			badge.textContent = `Realtime • ${formattedNumber} bình luận`;
		});
		
		console.log('✅ Total comments updated:', totalComments);
	} catch (error) {
		console.error('❌ Error loading total comments:', error);
	}
}

// Load total comments after page loads
if (document.querySelector('.realtime-comments')) {
	loadTotalComments();
}
