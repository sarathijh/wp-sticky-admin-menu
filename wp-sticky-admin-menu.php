<?php
	
	/*!
	* Plugin Name: WP Sticky Admin Menu
	* Date:        January 9th, 2013
	* Description: Makes the admin navigation menu fixed to the left side of the page.
	* Version:     1.0.0
	* Author:      Sarathi Hansen
	* License:     GPL2
	*/
	
	// Hook into the admin script queue.
	add_action( 'admin_enqueue_scripts', 'sjh_wp_sticky_admin_menu' );
	function sjh_wp_sticky_admin_menu() {
		
		// Enqueue the javascript file.
		// Make sure it comes after jquery and is loaded in the footer!
		wp_enqueue_script( 'wp-sticky-admin-menu', plugins_url('wp-sticky-admin-menu.js', __FILE__), array('jquery'), false, true );
	}
	
	/**
	 * That's it? I want my money back!
	 */
	
?>
