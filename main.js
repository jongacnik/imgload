/**
 * imgload
 * Loads an image src and triggers events
 */

var trigger  = require('etrig')
var Emitter  = require('tiny-emitter')

module.exports = function (src) {

  var events = new Emitter()

  function load () {

    var img = new Image()

    img.addEventListener('load', function () {
      events
        .emit('load', {
          src : src
        })
        .emit('always', {
          src : src,
          result : 'load'
        })
    })

    img.addEventListener('error', function () {
      events
        .emit('error', {
          src : src
        })
        .emit('always', {
          src : src,
          result : 'error'
        })
    })

    img.src = src

    if (img.complete) {
      trigger(img, 'load') // ensure cached image triggers load
    }

    return this

  }

  return {
    start : load,
    on : function (ev, cb) { events.once(ev, cb); return this }
  }

}
