jQuery("#16116436771488225750")
    .imagesLoaded()
    .done(function (instance) {
        setTimeout(function () {
            jQuery("#16116436771488225750").masonry({
                itemSelector: ".element",
                columnWidth: ".element",
                gutter: 0,
                percentPosition: true,
                transitionDuration: 0,
            });

            jQuery("#16116436771488225750")
                .children(".element")
                .children(".gallery_type")
                .each(function () {
                    jQuery(this).addClass("fade-in");
                });

            jQuery(window).trigger("hwparallax.reconfigure");
        }, 500);
    });
if (jQuery("#tg_portfolio_filterable_link").val() != 1) {
    jQuery("#portfolio_wall_filters_16116436771488225750 li a, #portfolio_wall_filters li a").click(function () {
        jQuery(document.body).css({ cursor: "wait" });
        var selector = jQuery(this).attr("data-filter");

        jQuery("#portfolio_wall_filters_16116436771488225750 li a, #portfolio_wall_filters li a").removeClass("active");
        jQuery(this).addClass("active");

        jQuery("#16116436771488225750").addClass("loading");

        jQuery.ajax({
            url: "https://themes.themegoods.com/photography/demo1/wp-admin/admin-ajax.php",
            type: "POST",
            data: "action=photography_portfolio_grid&cat=" + selector + "&items=-1&columns=3&type=grid&layout=wide&current_page_id=3702&tg_security=" + tgAjax.ajax_nonce,
            success: function (html) {
                jQuery("#16116436771488225750").masonry("destroy");
                jQuery("#16116436771488225750").html(html);

                jQuery("#16116436771488225750")
                    .imagesLoaded()
                    .done(function (instance) {
                        setTimeout(function () {
                            jQuery("#16116436771488225750").masonry({
                                itemSelector: ".element",
                                columnWidth: ".element",
                                gutter: 0,
                                percentPosition: true,
                                transitionDuration: 0,
                            });

                            jQuery("#16116436771488225750")
                                .children(".element")
                                .children(".gallery_type")
                                .each(function () {
                                    jQuery(this).addClass("fade-in");
                                });

                            jQuery(window).trigger("hwparallax.reconfigure");
                            jQuery("#16116436771488225750").removeClass("loading");
                            jQuery(document.body).css({ cursor: "default" });

                            jQuery(window).trigger("hwparallax.reconfigure");
                        }, 500);
                    });

                if (jQuery("#tg_lightbox_enable").val() != "") {
                    if (jQuery("#tg_lightbox_plugin").val() == "modulobox") {
                        mobx.destroy();
                        mobx.init();
                    } else {
                        jQuery(document).setLightbox();
                    }
                }
            },
        });

        return false;
    });
}
jQuery(document).ready(function () {
    jQuery(".testimonial_slider_wrapper").flexslider({
        animation: "fade",
        animationLoop: true,
        itemMargin: 0,
        minItems: 1,
        maxItems: 1,
        slideshow: true,
        controlNav: true,
        smoothHeight: false,
        pauseOnHover: true,
        directionNav: false,
        slideshowSpeed: 4000,
        move: 1,
    });
});
jQuery(document).ready(function () {
    jQuery("#blog_grid_wrapper")
        .imagesLoaded()
        .always(function (instance) {
            setTimeout(function () {
                jQuery("#blog_grid_wrapper").masonry({
                    itemSelector: ".post",
                    columnWidth: ".post",
                    gutter: 30,
                    percentPosition: true,
                    transitionDuration: 0,
                });

                jQuery("#blog_grid_wrapper")
                    .children(".post")
                    .each(function () {
                        jQuery(this).addClass("fade-in");
                    });
            }, 500);
        });

    jQuery(".blog_grid_wrapper").each(function () {
        jQuery(".blog_grid_wrapper")
            .imagesLoaded()
            .always(function (instance) {
                setTimeout(function () {
                    jQuery(".blog_grid_wrapper").masonry({
                        itemSelector: ".post",
                        columnWidth: ".post",
                        gutter: 30,
                        percentPosition: true,
                        transitionDuration: 0,
                    });

                    jQuery(".blog_grid_wrapper")
                        .children(".post")
                        .each(function () {
                            jQuery(this).addClass("fade-in");
                        });
                }, 500);
            });
    });
});
jQuery(document).ready(function () {
    jQuery("#footer_photostream").gridrotator({
        rows: 1,
        columns: 8,
        interval: 2000,
        w1024: {
            rows: 1,
            columns: 8,
        },
        w768: {
            rows: 1,
            columns: 6,
        },
        w480: {
            rows: 2,
            columns: 4,
        },
        w320: {
            rows: 2,
            columns: 3,
        },
        w240: {
            rows: 2,
            columns: 2,
        },
    });
});
jQuery(document).ready(function () {
    jQuery(".slider_wrapper").flexslider({
        animation: "slide",
        animationLoop: true,
        itemMargin: 0,
        minItems: 1,
        maxItems: 1,
        controlNav: false,
        smoothHeight: false,
        slideshow: 0,
        animationSpeed: 1000,
        move: 1,
    });
});
