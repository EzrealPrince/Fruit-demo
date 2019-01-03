// const HttpProxy = require('http-proxy')
// const httpProxy = new HttpProxy()

const config = require('../config')
// const proxyTable = config.dev.proxyTable

const apis = require('./apis')
module.exports = function (app) {
    app.use('/api', function (req, res, next) {
        var reqPath = req.path.replace(/\/+$/,'')
        var findApiKey = Object.keys(apis).find(pathKey => new RegExp(`^${pathKey}/`,'i').test(reqPath)) || ''
        var findApi = apis[findApiKey] || null
        if (findApi) {
            var findActionKey = Object.keys(findApi).find(pathKey => pathKey.toLocaleLowerCase() === reqPath.toLocaleLowerCase().replace(findApiKey.toLocaleLowerCase(), '')) || ''
            if (findActionKey && findApi[findActionKey]) {
                return findApi[findActionKey]({ ...req }).then(resData => {
                    res.set({
                        'mock-s': 'mock'
                    })
                    res.json(resData)
                    // res.send(JSON.stringify(resData))
                    next()
                }).catch(({msg}) => {
                    res.status(400).json({ requestPath: req.path, message: msg || 'Bad Request' })
                    // res.send(JSON.stringify(err))
                    next()
                })
            }
        }
        return res.status(404).json({ requestPath: req.path, message: '404 not found' }).end();
    })
}