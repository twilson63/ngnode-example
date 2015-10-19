// express
var http = require('http')
var HttpHashRouter = require('http-hash-router')
var ecstatic = require('ecstatic')

var router = HttpHashRouter()

var jsonBody = require('body/json')
var sendJSON = require('send-data/json')

var PouchDB = require('pouchdb')

var db = PouchDB('http://admin:admin@localhost:5984/messages')
var _ = require('underscore')


router.set('/api/channels/:channel_id/posts', {
  GET: function (req, res, opts) {
    db.query(function (doc) {
      if (doc.type === 'post') {
        // emit (key, value)
        emit(doc.channel_id, null)
      }
    }, {
      key: opts.params.channel_id,
      include_docs: true
    })
      .then(function (result) {
        //sendJSON(req, res, [{_id: '1', body: 'Hello World'}])
        sendJSON(req, res, _(result.rows).pluck('doc'))
      })
  },
  POST: function (req, res, opts) {
    jsonBody(req, res, function (err, body) {
      body.type = 'post'
      body.channel_id = opts.params.channel_id

      db.post(body).then(function (result) {
        sendJSON(req, res, result)
      })
    })
  },
  PUT: function (req, res) {
    jsonBody(req, res, function (err, body) {
      db.put(body).then(function (result) {
        sendJSON(req, res, result)
      })
    })
  }
})

router.set('/api/channels', {
  GET: function (req, res) {
    db.query('channels/list', {
      group_level: 1
    })
      .then(function (result) {
        // { rows: [{ key: , value: , doc: }], }
        sendJSON(req, res, _(result.rows).map(function (r) {
          console.log(r)
          return {
            _id: r.key,
            name: r.key,
            posts: r.value
          }
        }))
      })
  },
  POST: function (req, res) {
    jsonBody(req, res, function (err, body) {
      body.type = 'channel'
      db.put(body, body.name).then(function (result) {
        sendJSON(req, res, result)
      })
    })
  }
})

var palmetto = require('@twilson63/palmetto-couchdb')
var ee = palmetto({
  endpoint: 'http://localhost:5984',
  app: 'msg_flow'
})

router.set('/api', {
  POST: function (req, res) {
    jsonBody(req, res, function (err, body) {
      var timeoutHasRun = false
      var to = setTimeout(function () {
        timeoutHasRun = true
        sendError(req, res, 'Timeout for Event: ' + body.subject)
      }, 2000)

      ee.emit('send', body)

      ee.once(body.from, function (response) {
        clearTimeout(to)
        sendJSON(req, res, response)
      })
    })
  }
})

router.set('/', function (req, res) {
  req.url = '/index.html'
  ecstatic('www')(req, res)
})

router.set('/*', ecstatic('www'))

var server = http.createServer(function (req, res) {
  router(req, res, {}, onError)

  function onError (err) {
    res.end('ERROR')
    console.log(err)
  }
})

var port = process.env.PORT || 3000
server.listen(port)
console.log('Server listening on ' + port)
console.log('press CTRL-C to stop server')