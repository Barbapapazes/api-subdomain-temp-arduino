drawGraph()

async function drawGraph() {
    let data = await getData()
    console.log(data)
    if (document.getElementById('progressBar')) {
        document.getElementById('progressBar').parentNode.removeChild(document.getElementById('progressBar'))
        clearInterval(animateMoins)
        clearInterval(animatePlus)
    }
    if (data == undefined)
        return

    // set the date
    data.dateX = data.dateX.map(value => new Date(value).toLocaleString('en-US', { minute: 'numeric', hour: 'numeric', day: 'numeric', month: 'short' }))

    // draw the graph
    const ctx = document.getElementById('chart').getContext('2d')
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.dateX,
            datasets: [{
                label: 'Temperature (°C)',
                data: data.valueY,
                pointRadius: 5,
                pointHitRadius: 7,
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
                backgroundColor: 'none',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            tooltips: {
                mode: 'nearest'
            },
            responsive: false,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        fontColor: 'rgba(166, 166, 166, 0.6)',
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Temperature (°C)",
                    }
                }],
                xAxes: [{
                    minRotation: 90,
                    display: true,
                    ticks: {
                        fontColor: 'rgba(166, 166, 166, 0.6)',
                    }
                }]
            }

        }
    })
    colorGraph()
}

async function getData() {
    const URLparams = new URLSearchParams(window.location.search)
    const host = location.host
    const id = URLparams.get('id')
    document.getElementById('title').textContent = id
    const response = await fetch(`http://api.${host}/temp/one/${id}`)
    document.title += ` ${id}`
    console.log(response)
    if (response.status != 200) {
        document.querySelector('h1').textContent = response.statusText
        return
    }
    const data = await response.json()

    const dateX = []
    const valueY = []
    data.values.forEach(element => {
        dateX.push(element.date)
        valueY.push(element.temp)
    })

    return { dateX, valueY }
}