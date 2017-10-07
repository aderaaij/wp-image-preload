# 📷 WordPress Image Preload

This is a WordPress 'Lazy Loading' / image preloading plugin to imrpove the page-load times of your site and decrease bandwith usage on the first call of your post pages. 

This plugin makes use of the incredible performant [`Intersection Observerver API`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to detect if an element is in (or near) the viewport. This is an 'experimental' technique which is not available in every browser yet, but there's an official polyfill available which you can load by going to `tools -> Image Preload Settings` in the WP Admin menu.

The plugin has no external dependencies, so you can delete that `$jquery`.

Each image is accompanied by a `<noscript>` version so your site will still show images when Javascript is disabled.

## 👷🏼‍ Installation
* Download / clone repository
* Inside the repository you will find a `wp-image-preload.zip`. Install this as a plugin or extract it in your WordPress plugins folder.

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

## Develop / Build
To develop or build the plugin, do a `yarn install` in the root. The following scripts are included:
* `dev`: Transpiles the scrips
* `build`: Transpiles and minifies scripts
* `clean`: Delets the `wp-image-preload/assets/js` folder
* `zip`: Zips the entire `wp-image-preload` folder
* `complete`: Runs `clean`, `build` and `zip` sequentially and gives a production ready `wp-images-preload.zip` plugin file.

## 👌🏼 Credits
The PHP in this plugin is a modification on [WordPress LazyLoad plugin](https://nl.wordpress.org/plugins/lazy-load/), released under the GPL v2 license. 
The lazyloading script is an adaption of [Lozad.js](https://github.com/ApoorvSaxena/lozad.js) by [Apoorv Saxena](https://apoorv.pro/), released under the MIT license. 

## 📎 Licensing
I have no idea. GPL v2? MIT? What's the standard if you include GPL and MIT software in your release? Feel free to make a pull request on the subject (or anything else)

## 👩‍🏭 TODO
* Add option to add custom classes before and after load in WP Admin
* Add option to customise the offset in WP Admin
* fix license


