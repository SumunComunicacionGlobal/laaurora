<?php

// Agrega un filtro para el bloque de consulta de WordPress
// que muestra los posts relacionados en la página de un post y los filtra por categorías
add_filter('render_block_data', function ($parsed_block) {
    if (
        is_single() &&
        isset($parsed_block['blockName']) &&
        $parsed_block['blockName'] === 'core/query' &&
        isset($parsed_block['attrs']['className']) &&
        strpos($parsed_block['attrs']['className'], 'is-style-is-related-posts') !== false
    ) {
        $category_ids = wp_get_post_categories(get_the_ID());

        if (!empty($category_ids)) {
            $parsed_block['attrs']['query']['categoryIds'] = $category_ids;
            $parsed_block['attrs']['query']['exclude'] = [get_the_ID()];
            $parsed_block['attrs']['query']['sticky'] = '';
            $parsed_block['attrs']['query']['perPage'] = 6;
        }
    }

    return $parsed_block;
});

// Si el campo 'custom_title_h1' está vacío, se reemplaza por el título del post
add_filter( 'meta_field_block_get_block_content', function ( $content, $attributes, $block, $post_id ) {
    $field_name = $attributes['fieldName'] ?? '';

    if ( $field_name === 'custom_title_h1' ) {
        // Obtener el valor ACF manualmente
        $acf_value = get_field( $field_name, $post_id );

        if ( !empty( $acf_value ) ) {
            return esc_html( $acf_value );
        }

        // Si está vacío, usar el título del post
        return esc_html( get_the_title( $post_id ) );
    }

    return $content;
}, 10, 4 );

// Solo en plantillas de página (opcional, elimina si quieres en todo el sitio)
add_filter('render_block_core/post-excerpt', function ($excerpt, $block) {
    if (is_page()) {
        global $post;
        if (empty($post->post_excerpt)) {
            return '';
        }
    }
    return $excerpt;
}, 10, 2);