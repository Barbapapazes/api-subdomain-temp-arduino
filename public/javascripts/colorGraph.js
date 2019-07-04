// Change the stat of the button and the theme of the page
switchBtn.addEventListener('click', colorGraph)

function colorGraph() {
    let color
        // see the them
    if (body.className == "dark") color = '255'
    else color = '0'

    // change color from all the chart
    chart.data.datasets[0].borderColor = `rgba(${color}, ${color}, ${color}, 1)`
    chart.options.scales.yAxes[0].gridLines.color = `rgba(${color}, ${color}, ${color}, 0.2)`
    chart.options.scales.yAxes[0].gridLines.zeroLineColor = `rgba(${color}, ${color}, ${color}, 0.3)`
    chart.options.scales.yAxes[0].scaleLabel.fontColor = `rgba(${color}, ${color}, ${color}, 0.6)`
    chart.options.scales.xAxes[0].gridLines.color = `rgba(${color}, ${color}, ${color}, 0.2)`
    chart.options.scales.xAxes[0].gridLines.zeroLineColor = `rgba(${color}, ${color}, ${color}, 0.3)`
    chart.options.scales.xAxes[0].scaleLabel.fontColor = `rgba(${color}, ${color}, ${color}, 0.6)`

    chart.update()
}