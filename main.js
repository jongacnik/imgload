/**
 * imgload
 * Loads an image, manipulates dom, fires callbacks & triggers events
 */

var extend   = require('extend')
var trigger  = require('etrig')
var sanitize = require('sanitize-elements')
var Emitter  = require('tiny-emitter')

module.exports = function ($image, opts) {

  var events = new Emitter()

  var options = extend({
    sourceAttr : 'data-src',
    mode       : 'src', // src, background, load/false
    begin      : function ($e) { }, // called on load begin
    error      : function ($e) { }, // called on image error
    load       : function ($e) { }  // called on image load
  }, opts)

  var init = function () {
    if ($image = sanitize($image, true)) {
      $image = $image[0] // ONE image
    } else {
      console.warn('no image here!')
      return
    }
    begin($image)
    loadImg($image)
    return this
  }

  var loadImg = function ($e) {

    var src = $e.getAttribute(options.sourceAttr)
    var img = new Image()
    var loaded = false

    img.addEventListener('load', function () {
      if (!loaded) {
        loaded = true
        var mode = $e.getAttribute('data-imgload-mode') || options.mode
        if (mode === 'load') {
          // do nothing to dom
        } else if (mode === 'background') {
          $e.style.backgroundImage = "url('" + src + "')"
          $e.setAttribute('data-imgload-complete', '')
        } else {
          $e.setAttribute('src', src)
          $e.setAttribute('data-imgload-complete', '')
        }
        load($e)
      }
    })

    img.addEventListener('error', function () {
      if (!loaded) {
        loaded = true
        error($e)
      }
    })

    img.src = src

    if (img.complete) {
      trigger(img, 'load') // ensure cached image triggers load
    }

  }

  var load = function ($e) {
    options.load($e)
    events.emit('load', {
      element : $e
    })
    return this
  }

  var error = function ($e) {
    options.error($e)
    events.emit('error', {
      element : $e
    })
    return this
  }

  var begin = function ($e) {
    options.begin($e)
    events.emit('begin', {
      element : $e
    })
    return this
  }

  return {
    start : init,
    on : function(ev, cb){ events.on(ev, cb); return this }
  }

}
