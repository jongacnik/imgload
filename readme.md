# imgload

imgload loads an image src and fires events (properly fires even if image is cached!).

**For radical image loading, use the module built with imgload: [Mad Basic Loader](https://www.npmjs.com/package/mbl).**

## Getting Started

imgload is meant to be consumed in a [CommonJS](http://www.commonjs.org/), [Browserify](http://browserify.org/) environment (though you can also use a pre-bundled version, more below):

	npm i imgload

## Usage

	// require
	var imgload = require('imgload')

	// setup
	var loadme = imgload('image.jpg')

	// start!
	loadme.start()

### Events

Events are fired. Bind to events like so:

	loadme.on('error', function(data) {
		// triggered on image error
	})

	loadme.on('load', function(data) {
		// triggered on image load
	})

	loadme.on('always', function(data) {
		// triggered on image load
	})

The `on` method returns `this` for chainability:

	loadme
		.on('error', beep)
		.on('load', bop)
		.on('always', boop)

## Bundled Version

If you don't want to mess with a build process you can also include the pre-bundled version found in `dist/imgload.bundled.js` in your project which exposes `imgload()` globally.

## Todo

- Tests
