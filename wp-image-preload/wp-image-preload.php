<?php
/**
 * @wordpress-plugin
 * Plugin Name:       WordPress Image Preload
 * Plugin URI:        https://github.com/aderaaij/wp-image-preload
 * Description:       A modern lazyload / image preload plugin based on Intersection Observer. 
 * Version:           1.0.0
 * Author:            Arden.nl
 * Author URI:        https://arden.nl/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       wp-image-preload
 *
 * Based on LazyLoad: https://nl.wordpress.org/plugins/lazy-load/
 * Uses a modified version of Lozad: https://github.com/ApoorvSaxena/lozad.js/
 *
 */

if ( ! class_exists( 'Wp_Image_Preload' ) ) :

class Wp_Image_Preload {

	const version = '0.1';
	protected static $enabled = true;

	static function init() {
		if ( is_admin() )
			return;

		if ( ! apply_filters( 'lazyload_is_enabled', true ) ) {
			self::$enabled = false;
			return;
		}

		add_action( 'wp_enqueue_scripts', array( __CLASS__, 'add_scripts' ) );
		add_action( 'wp_head', array( __CLASS__, 'setup_filters' ), 9999 ); // we don't really want to modify anything in <head> since it's mostly all metadata, e.g. OG tags
	}

	static function setup_filters() {
		add_filter( 'the_content', array( __CLASS__, 'add_image_placeholders' ), 99 ); // run this later, so other content filters have run, including image_add_wh on WP.com
		add_filter( 'post_thumbnail_html', array( __CLASS__, 'add_image_placeholders' ), 11 );
		add_filter( 'get_avatar', array( __CLASS__, 'add_image_placeholders' ), 11 );
	}

	static function add_scripts() {
		if ( get_option( 'load_polyfill' ) == 1 ) {
			wp_enqueue_script( 'intersection-polyfill',  self::get_url( 'assets/js/intersection-observer.js' ), self::version, true );
		}
		wp_enqueue_script( 'image-preload',  self::get_url( 'assets/js/preload.js' ), self::version, true );
	}

	static function add_image_placeholders( $content ) {
		if ( ! self::is_enabled() )
			return $content;

		// Don't lazyload for feeds, previews
		if( is_feed() || is_preview() )
			return $content;

		// Don't lazy-load if the content has already been run through previously
		if ( false !== strpos( $content, 'data-src' ) )
			return $content;
		// This is a pretty simple regex, but it works
		$content = preg_replace_callback( '#<(img)([^>]+?)(>(.*?)</\\1>|[\/]?>)#si', array( __CLASS__, 'process_image' ), $content );

		return $content;
	}

	static function process_image( $matches ) {
		// In case you want to change the placeholder image
		$placeholder_image = apply_filters( 'lazyload_images_placeholder_image', self::get_url( 'assets/images/1x1.trans.gif' ) );

		$old_attributes_str = $matches[2];
		$old_attributes = wp_kses_hair( $old_attributes_str, wp_allowed_protocols() );

		if ( empty( $old_attributes['src'] ) ) {
			return $matches[0];
		}

		$image_src = $old_attributes['src']['value'];
		$image_srcset = $old_attributes['srcset']['value'];

		// Remove src and data-src since we manually add them
		$new_attributes = $old_attributes;
		unset( $new_attributes['src'], $new_attributes['data-src'], $new_attributes['srcset'], $new_attributes['data-srcset'] );

		$new_attributes_str = self::build_attributes_string( $new_attributes );

		return sprintf( '<img src="%1$s" data-src="%2$s" data-srcset="%3$s" %4$s><noscript>%5$s</noscript>', esc_url( $placeholder_image ), esc_url( $image_src ), $image_srcset, $new_attributes_str, $matches[0] );
	}

	private static function build_attributes_string( $attributes ) {
		$string = array();
		foreach ( $attributes as $name => $attribute ) {
			$value = $attribute['value'];
			if ( '' === $value ) {
				$string[] = sprintf( '%s', $name );
			} else {
				$string[] = sprintf( '%s="%s"', $name, esc_attr( $value ) );
			}
		}
		return implode( ' ', $string );
	}

	static function is_enabled() {
		return self::$enabled;
	}

	static function get_url( $path = '' ) {
		return plugins_url( ltrim( $path, '/' ), __FILE__ );
	}
}

function lazyload_images_add_placeholders( $content ) {
	return Wp_Image_Preload::add_image_placeholders( $content );
}

add_action( 'init', array( 'Wp_Image_Preload', 'init' ) );

endif; ?>
<?php
// create custom plugin settings menu
add_action('admin_menu', 'wp_image_preload_menu');

function wp_image_preload_menu() {

	//create new top-level menu
	add_management_page('WP Image Preload settings', 'Image Preload settings', 'administrator', __FILE__, 'wp_image_preload_settings' );

	//call register settings function
	add_action( 'admin_init', 'register_wp_image_preload_settings' );
}


function register_wp_image_preload_settings() {
	//register our settings
	register_setting( 'wp-image-preload-settings-group', 'load_polyfill' );
}

function wp_image_preload_settings() { ?>

<div class="wrap">
<h1>WP Image Preload</h1>

<form method="post" action="options.php">
    <?php settings_fields( 'wp-image-preload-settings-group' ); ?>
    <?php do_settings_sections( 'wp-image-preload-settings-group' ); ?>
    <table class="form-table">
        <tr valign="top">
			<th scope="row">Load Polyfill?</th>
			<td>
				<input name="load_polyfill" type="radio" value="1" <?php checked( '1', get_option( 'load_polyfill' ) ); ?> />
				<label>Yes</label><br/>
				<input name="load_polyfill" type="radio" value="0" <?php checked( '0', get_option( 'load_polyfill' ) ); ?> />
				<label>No</label>
			</td>
        </tr>
    </table>    
    <?php submit_button(); ?>
</form>
</div>
<?php } ?>