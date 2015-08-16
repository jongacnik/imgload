# imgload

imgload gives control over single image loading in the browser. Image can be rendered as an image or set as the background image of an element. Callbacks/events are fired when image loading begins, and once image has loaded/failed.

**For loading sets of images, use this module's big brother: [Mad Basic Loader](https://www.npmjs.com/package/mbl).**

## Getting Started

imgload is meant to be consumed in a [CommonJS](http://www.commonjs.org/), [Browserify](http://browserify.org/) environment (though you can also use a pre-bundled version, more below):

	npm install imgload

## Usage

**Example HTML**

	<img data-src="image.jpg">

**Javascript**

	// require
	var imgload = require('imgload')

	// setup
	var loadme = imgload(document.querySelector('[data-src]'))

	// start!
	loadme.start()

### Options

You can get more specific if you want (the following are defaults):

	var imgload = imgload(image, {
      sourceAttr : 'data-src' // attribute containing image source
      mode       : 'src', // load mode (details below)
      begin      : function ($e) { }, // called on load begin
      error      : function ($e) { }, // called on image error
      load       : function ($e) { }  // called on image load
	})

### Events

Events are also triggered along with the callbacks. Bind to events like so:

	loadme.on('begin', function(data) {
		// triggered on load begin
	})

	loadme.on('error', function(data) {
		// triggered on image error
	})

	loadme.on('load', function() {
		// triggered on image load
	})

## What happens to the DOM

Example HTML from above:

	<img data-src="image.jpg">

after imgload completes (assuming success) DOM becomes:

	<img data-src="image.jpg" src="image.jpg" data-imgload-complete>

## Load Mode ( src | background | load )

Mode | Behavior
--- | ---
`src` | source of the loaded image is set as the `src` attribute
`background` | source of the loaded image is set as the `background-image` style attribute
`load` | no DOM changes, but callbacks/events fired

This setting is handy for responsive images using `background-size: cover;`

	<span data-src="image.jpg"></span>

after imgload completes (assuming success) with `mode: background` DOM becomes:

	<span
		data-src="image.jpg"
		style="background-image:url('image.jpg');"
		data-imgload-complete
	></span>

The mode can also be changed on an element basis by adding an attribute to the element:

	<img
		data-src="image.jpg"
		data-imgload-mode="src|background|load"
	>

## Bundled Version

If you don't want to mess with a build process you can also include the pre-bundled version found in `dist/imgload.bundled.js` in your project which exposes `imgload()` globally.

## Todo

- Tests
