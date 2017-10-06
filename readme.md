# 📷 Image Preload
** Warning: This plugin is not yet production ready and contains a bug with srcset that makes images download twice. To be fixed soon **
A WordPress Image Preload / LazyLoading plugin to improve page-load times and decrease bandwith usage on first call of the page. 
Images will be loaded just before they're in the viewport. This plugin makes use of the [`Intersection Observerver API`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to detect if an element is in the viewport. This is an 'experimental' technique and not yet available in every browser. There's an official polyfill available which you can load by going to `tools->Image Preload Settings` in the WP Admin menu. Other than that, the Intersection Observer API has no dependencies whatsoever. Feel free to delete that `$jquery`.

The preloading will replace both `src` and `srcset` with `data-src` and `data-srcset` respectively. `src` will be replaced with a 1px gif as placeholder. When an element is about to scroll into the viewport the `data` and normal attributes are switched back. 

Each image is accompanied by a `<noscript>` version so your site will still show images when Javascript is disabled.

## 👷🏼‍Installation
Download the `.zip` file. Install. Maybe choose if you want that polyfill or not. 

## 💅🏼 Styling / Animation
You can select the images in css with `img[data-src]`. When the images are loaded, a [data-loaded=true] is added which you can use to add a transition. For example:

```
img[data-src] {
	opacity: 0;
	transition: opacity 0.3s;
}

img[data-loaded=true] {
	opacity: 1;
}
```

## 👌🏼 Credits
This plugin is a straight up modification of the [WordPress LazyLoad plugin](https://nl.wordpress.org/plugins/lazy-load/), released under the GPL v2 license. 
The lazyloading script is an adaption of [Lozad.js](https://github.com/ApoorvSaxena/lozad.js) by [Apoorv Saxena](https://apoorv.pro/), released under the MIT license. 

## 📎 Licensing
I have no idea. GPL v2? MIT? What's the standard if you include GPL and MIT software in your release? Feel free to make a pull request on the subject (or anything else)

## 👩‍🏭 TODO
* Add build tool to lint, minify and transpile the script
* Add option to add custom classes before and after load
* Add option to customise the offset
* fix license


