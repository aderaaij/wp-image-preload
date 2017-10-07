=== WP Image Preload ===
Contributors: Arden012
Tags: lazyload, images, optimization, preload
Requires at least: 4.8.2
Tested up to: 4.8.2
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

This is a WordPress 'Lazy Loading' / image preloading plugin to improve the page-load times of your site and decrease bandwith usage on the first call of your post pages. 

== Description ==

This is a WordPress 'Lazy Loading' / image preloading plugin to improve the page-load times of your site and decrease bandwith usage on the first call of your post pages. 

This plugin makes use of the incredible performant [`Intersection Observerver API`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to detect if an element is in (or near) the viewport. This is an 'experimental' technique which is not available in every browser yet, but there's an official polyfill available which you can load by going to `tools -> Image Preload Settings` in the WP Admin menu.

The plugin has no external dependencies, so you can delete that `$jquery`.

Each image is accompanied by a `<noscript>` version so your site will still show images when Javascript is disabled.


== Installation ==

This section describes how to install the plugin and get it working.

e.g.

1. Upload `plugin-name.php` to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Choose if you want to activate the polyfill in the WordPress admin menu