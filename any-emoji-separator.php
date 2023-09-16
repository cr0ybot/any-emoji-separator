<?php
/**
 * Plugin Name:       Any Emoji Separator
 * Description:       Add any emoji to the core separator block.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Cory Hughart
 * Author URI:        https://cr0ybot.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       any-emoji-separator
 *
 * @package           any-emoji-separator
 */

namespace cr0ybot\AnyEmojiSeparator;

/**
 * Enable loading separate stylesheets for blocks.
 */
add_filter( 'should_load_separate_core_block_assets', '__return_true' );

/**
 * Enqueue front-end styles & scripts.
 */
function enqueue_assets() {
	$asset = require \plugin_dir_path( __FILE__ ) . 'dist/index.asset.php';

	/**
	 * Note: wp_enqueue_block_style() can be called directly outside of a hook, but it works fine here.
	 */
	\wp_enqueue_block_style(
		'core/separator',
		array(
			'handle' => 'any-emoji-separator-block',
			'src'    => \plugin_dir_url( __FILE__ ) . 'dist/style.css',
			'path'   => \plugin_dir_path( __FILE__ ) . 'dist/style.css',
			'ver'    => $asset['version'],
		),
	);
}
add_action( 'init', __NAMESPACE__ . '\\enqueue_assets' );

/**
 * Enqueue editor assets.
 */
function editor_assets() {
	$asset = require \plugin_dir_path( __FILE__ ) . 'dist/index.asset.php';

	/**
	 * Enqueue editor script.
	 */
	\wp_enqueue_script(
		'any-emoji-separator',
		\plugin_dir_url( __FILE__ ) . 'dist/index.js',
		$asset['dependencies'],
		$asset['version'],
	);

	/**
	 * Enqueue editor UI styles (separate from front-end block styles).
	 */
	\wp_enqueue_style(
		'any-emoji-separator',
		\plugin_dir_url( __FILE__ ) . 'dist/editor.css',
		array(),
		$asset['version'],
	);
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\editor_assets' );
