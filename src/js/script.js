const circuference = 180; // deg
	
const dataset = {
labels: ["Sport Perf Underwear", "Uniform", "Outwear", "Baby Wear", "Others"],
datasets: [
    {
    label: "My First Dataset",
    data: [30, 20, 20, 20, 10],
    backgroundColor: [
        "#D52300",
        "#FF3700", 
        "#FFAE00",
        "#FF8000",
        "#A5ACAE",
    ]
    }
]
};

const centerText = {
    id: 'centerText',
    afterDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data, chartArea: {top, bottom, left, right, width, height} } = chart;
        
        ctx.save();
        
        // Default text when no hover
        if (chart.getActiveElements().length === 0) {
            // Default label text
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = 'Bold 14px DM Sans';
            ctx.fillStyle = '#263238';
            ctx.fillText('Sport Underwear', width / 2 + left, height / 2 + top + 50);
            
            // Default value text
            ctx.font = 'bold 24px DM Sans';
            ctx.fillStyle = '#D52300';
            ctx.fillText('30%', width / 2 + left, height / 2 + top + 25);
        }
        
        // Hover text
        if (chart.getActiveElements().length > 0) {
            const activeElement = chart.getActiveElements()[0];
            const dataIndex = activeElement.index;
            const value = data.datasets[0].data[dataIndex];
            const label = data.labels[dataIndex];
            
            // Konfigurasi teks
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Label teks
            ctx.font = 'Bold 14px DM Sans';
            ctx.fillStyle = '#263238';
            ctx.fillText(label, width / 2 + left, height / 2 + top + 50);
            
            // Value teks
            ctx.font = 'bold 24px DM Sans';
            ctx.fillStyle = data.datasets[0].backgroundColor[dataIndex];
            ctx.fillText(value + '%', width / 2 + left, height / 2 + top + 25);
        }
        
        ctx.restore();
    }
}

const config = {
    type: "doughnut",
    data: dataset,
    options: {   
        reponsive: true,
        maintainAspectRatio: false,
        rotation: (circuference / 2) * -1,
        circumference: circuference,
        cutout: "60%",
        borderWidth: 0,
        borderRadius: function (context, options) {
            const index = context.dataIndex;
            let radius = {};
            if (index == 0) {
                radius.innerStart = 500;
                radius.outerStart = 500;
            }
            if (index === context.dataset.data.length - 1) {
                radius.innerEnd = 500;
                radius.outerEnd = 500;
            }
            return radius;
        },
        plugins: {
            title: false,
            subtitle: false,
            legend: false,
            tooltip: {
                enabled: false
            }
        },
        onHover: (event, chartElement) => {
            event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
        }
    },
    plugins: [centerText]
};

const myChart = new Chart("chart-progress", config);

document.getElementById('currentYear').textContent = new Date().getFullYear();

function isElementInCenter(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementCenter = rect.top + rect.height / 2;
    const screenCenter = windowHeight / 2;
    return Math.abs(elementCenter - screenCenter) < 300;
}

window.addEventListener('scroll', function() {
    const svgJourney = document.getElementById('svg-journey');
    if (!svgJourney) return;

    const rect = svgJourney.getBoundingClientRect();
    const journeyElements = [];

    for (let i = 1; i <= 8; i++) {
        const element = document.querySelector(`.journey-${i}`);
        if (element) {
            journeyElements.push(element);
        }
    }

    if (journeyElements.length === 0) return;

    if (rect.bottom < 0 || rect.top > window.innerHeight) {
        journeyElements.forEach(element => {
            element.classList.remove('fade-right');
        });
    }

    else if (isElementInCenter(svgJourney)) {
        journeyElements.forEach((element, index) => {
            setTimeout(() => element.classList.add('fade-right'), index * 300);
        });
    }
});