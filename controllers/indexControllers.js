exports.index = (req, res, next) => {
    res.render('index', { title: 'Express' })
}

exports.tempAll = (req, res, next) => {
    res.render('tempAll', {
        title: 'Graph'
    })
}