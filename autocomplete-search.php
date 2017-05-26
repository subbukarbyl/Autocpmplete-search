<?php 
function add_scripts() {
	wp_enqueue_script( 'jquery-ui-autocomplete' );
	wp_register_style( 'jquery-ui-styles','http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css' );
	wp_enqueue_style( 'jquery-ui-styles' );
	wp_register_script( 'mysite', get_template_directory_uri() . '/js/mysite.js?defer', array( 'jquery', 'jquery-ui-autocomplete' ), $in_footer = true );
	wp_localize_script( 'mysite', 'MyAutocomplete', array( 'url' => admin_url( 'admin-ajax.php' ) ) );
	wp_enqueue_script( 'mysite' );
}
function my_search() {
	global $wpdb;
	$suggestions = array();
	$term = strtolower( $_GET['term'] );
    $query = "SELECT * FROM $wpdb->terms
		INNER JOIN $wpdb->term_taxonomy ON $wpdb->term_taxonomy.term_id = $wpdb->terms.term_id
		AND $wpdb->term_taxonomy.taxonomy IN ('product_cat','product_brand')
		ORDER By $wpdb->terms.name";
    foreach ($wpdb->get_results($query) as $row) {
		$suggestion = array();
		$suggestion['label'] = html_entity_decode($row->name);
		$suggestion['url'] = html_entity_decode(get_term_link($row));
		$suggestions[] = $suggestion;
    }
	$response = json_encode( $suggestions );
	echo $response;
    die();
}
add_action( 'wp_enqueue_scripts', 'add_scripts' );
add_action( 'wp_ajax_my_search', 'my_search' );
add_action( 'wp_ajax_nopriv_my_search', 'my_search' );

?>