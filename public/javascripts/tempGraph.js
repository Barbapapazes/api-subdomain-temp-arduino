drawGraph()

async function drawGraph() {
    let data = await getData()
    console.log(data)

    // set the date
    data.dateX = data.dateX.map(value => new Date(value).toLocaleString('en-US', { minute: 'numeric', hour: 'numeric', day: 'numeric', month: 'short' }))

    // draw the graph
    const ctx = document.getElementById('chart').getContext('2d')
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.dateX,
            datasets: [{
                label: 'Temperature (°C)',
                data: data.valueY,
                pointStyle: 'rectRounded',
                pointBorderColor: 'rgba(0, 0, 0, 0)',
                pointBackgroundColor: function(context) {
                    const index = context.dataIndex
                    const value = context.dataset.data[index]
                    return value < 0 ? 'rgba(0, 0, 255, 1)' :
                        value < 10 ? 'rgba(0, 128, 255, 1)' :
                        value < 20 ? 'rgba(0, 255, 0, 1)' :
                        value < 30 ? 'rgba(255, 255, 0, 1)' :
                        value < 40 ? 'rgba(255, 128, 0, 1)' : 'rgba(255, 0, 0, 1)'
                },
                borderColor: 'rgba(255, 255, 255, 1)',
                backgroundColor: 'none',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            responsive: false,
            scales: {
                yAxes: [{
                    display: true,
                    gridLines: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        fontColor: 'rgba(255, 255, 255, 0.6)'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Temperature (°C)"
                    }
                }],
                xAxes: [{
                    minRotation: 90,
                    gridLines: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        fontColor: 'rgba(255, 255, 255, 0.6)'
                    }
                }]
            }

        }
    })
}

async function getData() {
    const URLparams = new URLSearchParams(window.location.search)
    const host = location.host
    const id = URLparams.get('id')
    const response = await fetch(`http://api.${host}/temp/${id}`)
    document.title += ` ${id}`
    console.log(response)
    const data = await response.json()
    const dateX = []
    const valueY = []
    data.forEach(element => {
        dateX.push(element.date)
        valueY.push(element.temp)
    })

    return { dateX, valueY }
}