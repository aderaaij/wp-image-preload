# 📷 Image Preload
An Image preloader / Lazy loader plugin to improve page load times. 
Images will be loaded just before they're in the viewport. This uses [`Intersection Observerver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to detect if an element is in the viewport. This is an 'experimental' technique and not yet available in every browser. There's an official polyfill available which is not (yet) included in the plugin. 

The preloading will replace both `src` and `srcset` with `data-src` and `data-srcset` respectively. `src` will be replaced with a 1px gif. When an element is about to scroll into the viewport these are switched back again. 

## 👷🏼‍Installation
Download the `.zip` file. Install. That's it. No configuration yet. 

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


