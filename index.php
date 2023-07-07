<!DOCTYPE html>
<html>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<title><?php wp_title( '|', true, 'right' ); ?></title>
		<link rel="stylesheet" href="style.css" type="text/css" />
	</head>
	<body>
		
        <?php
        get_header();

        if ( have_posts() ) :
            while ( have_posts() ) : the_post(); ?>
            
       
            <h2><?php the_title( )?></h2>
            <?php  the_post_thumbnail();?>
           <h3><?php the_excerpt()?></h3>
            
           <p><?php the_category()?></p>
       
           

           <?php
            endwhile;
        else :
            _e( 'Sorry, no posts matched your criteria.', 'textdomain' );
        endif;

        get_sidebar();
        get_footer();
        ?>
	</body>

</html>