var $ = jQuery;

var basePath = drupalSettings.path.baseUrl;
var themePath = drupalSettings.path.themeUrl;

(function ($) {
    var block = $('.parallax');
    var blocks = [];
    block.each(function () {
        blocks.push($(this).attr('flag'));
    });
    var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "300%"}});

    blocks.forEach(function (block, index) {

        var $bg = $(block).find('.parallax__bg');
        var $content = $(block).find('.parallax__content');

        var scene = new ScrollMagic.Scene({
            triggerElement: block
        })
            .setTween($bg, {y: "-70%", ease: Power0.easeNone})
            .addTo(controller);
    });
}(jQuery));

// (function ($) {
//     var block = $('.parallax');
//     var blocks = [];
//     block.each(function () {
//         blocks.push($(this).attr('flag'));
//     });
//
//     var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});
//     // var blocks = [".parallax.parallax--01", ".parallax.parallax--02", ".parallax.parallax--03"];
//
//     blocks.forEach(function (block, index) {
//
//         var $bg = $(block).find('.parallax__bg');
//         var $content = $(block).find('.parallax__content');
//
//         var tl = new TimelineMax();
//         tl
//             .from($bg, 2, {y: '-70%', ease: Power0.easeNone}, 0)
//             .from($content, 1, {autoAlpha: 0, ease: Power0.easeNone}, 0.4)
//         ;
//
//         var scene = new ScrollMagic.Scene({
//             triggerElement: block,
//         })
//             .setTween(tl)
//             .addTo(controller);
//     });
// }(jQuery));

function headerAnimation() {
    var menuColor = $('header.sticky').css('color');
    var pos = menuColor.indexOf('(') + 1;
    menuColor = menuColor.slice(pos, menuColor.lastIndexOf(')'));

    $('.region.region-header').css('background-color', 'rgba(' + menuColor + ' , ' + $(window).scrollTop()/300 + ')');
    if ($(window).scrollTop() > $('.region.region-breadcrumb').innerHeight()-70) {
        $('.region.region-header').css('box-shadow', '0 3px 10px 0 rgba(0, 0, 0, 0.3)');
    } else {
        $('.region.region-header').css('box-shadow', '0 3px 10px 0 rgba(0, 0, 0, 0)');
    }
    if ($(window).scrollTop() > 300) {
        $('#go-to-top').addClass('come-in');
        // $('.region.region-header nav.responsive-menu-block-wrapper ul.horizontal-menu > li.menu-item > a').css('padding', '5px 10px');
        // $('.region.region-header nav.navigation ul.menu > li.menu-item > a').css('padding', '10px');
    } else {
        $('#go-to-top').removeClass('come-in');
        // $('.region.region-header nav.responsive-menu-block-wrapper ul.horizontal-menu > li.menu-item > a').css('padding', '10px 10px');
        // $('.region.region-header nav.navigation ul.menu > li.menu-item > a').css('padding', '20px 10px');
    }
}

function scrollToDiv(element, navHeight){
    var offset = element.offset();
    var offsetTop = offset.top;
    var totalScroll = offsetTop-navHeight;

    $('body,html').animate({
        scrollTop: totalScroll
    }, 700);
}


// ----------------------------- Gallery -----------------------------
function makeGalley() {
    var Shuffle = window.Shuffle;
    var element = document.querySelector('.my-shuffle-container');
    var sizer = element.querySelector('.my-sizer-element');

    shuffleInstance = new Shuffle(element, {
        itemSelector: '.picture-item',
        buffer: 1, // Useful for percentage based heights when they might not always be exactly the same (in pixels).
        columnThreshold: 0.01, // Reading the width of elements isn't precise enough and can cause columns to jump between values.
        columnWidth: 0, // A static number or function that returns a number which tells the plugin how wide the columns are (in pixels).
        delimeter: null, // If your group is not json, and is comma delimeted, you could set delimeter to ','.
        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)', // CSS easing function to use.
        filterMode: Shuffle.FilterMode.ANY, // When using an array with filter(), the element passes the test if any of its groups are in the array. With "all", the element only passes if all groups are in the array.
        group: Shuffle.ALL_ITEMS, // Initial filter group.
        gutterWidth: 0, // A static number or function that tells the plugin how wide the gutters between columns are (in pixels).
        initialSort: null, // Shuffle can be initialized with a sort object. It is the same object given to the sort method.
        isCentered: false, // Attempt to center grid items in each row.
        roundTransforms: true, // Whether to round pixel values used in translate(x, y). This usually avoids blurriness.
        sizer: null, // Element or selector string. Use an element to determine the size of columns and gutters.
        speed: 250, // Transition/animation speed (milliseconds).
        staggerAmount: 15, // Transition delay offset for each item in milliseconds.
        staggerAmountMax: 150, // Maximum stagger delay in milliseconds.
        throttleTime: 300, // How often shuffle can be called on resize (in milliseconds).
        useTransforms: true,
    });
}

function filterGallery(galleryName, galleryTab) {
    if($(galleryTab).parent().hasClass('active')) {
        $(galleryTab).parent().removeClass('active');
        shuffleInstance.filter();
        $(galleryTab).parents('.ui.menu').find('.item:first-child').addClass('active');
    } else {
        $(galleryTab).parents('.ui.menu').find('.item').removeClass('active');
        $(galleryTab).parent().addClass('active');
        doGalleryFilter(galleryName);
    }
}

function doGalleryFilter(galleryName) {
    shuffleInstance.filter(galleryName);
}

function showGalleryModal(imageDom) {
    $('.ui.modal.gallery').find('.content').empty();
    $(imageDom).find('figure').clone().appendTo($('.ui.modal.gallery').find('.content'));
    $('.ui.modal.gallery').modal('show');
}

// ----------------------------- Product Filter -----------------------------
function makeProductFilter() {
    var Shuffle = window.Shuffle;
    var element = document.querySelector('.my-shuffle-container');
    var sizer = element.querySelector('.my-sizer-element');

    shuffleInstance = new Shuffle(element, {
        itemSelector: '.picture-item',
        buffer: 1, // Useful for percentage based heights when they might not always be exactly the same (in pixels).
        columnThreshold: 0.01, // Reading the width of elements isn't precise enough and can cause columns to jump between values.
        columnWidth: 0, // A static number or function that returns a number which tells the plugin how wide the columns are (in pixels).
        delimeter: null, // If your group is not json, and is comma delimeted, you could set delimeter to ','.
        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)', // CSS easing function to use.
        filterMode: Shuffle.FilterMode.ALL, // When using an array with filter(), the element passes the test if any of its groups are in the array. With "all", the element only passes if all groups are in the array.
        group: Shuffle.ALL_ITEMS, // Initial filter group.
        gutterWidth: 0, // A static number or function that tells the plugin how wide the gutters between columns are (in pixels).
        initialSort: null, // Shuffle can be initialized with a sort object. It is the same object given to the sort method.
        isCentered: false, // Attempt to center grid items in each row.
        roundTransforms: true, // Whether to round pixel values used in translate(x, y). This usually avoids blurriness.
        sizer: null, // Element or selector string. Use an element to determine the size of columns and gutters.
        speed: 250, // Transition/animation speed (milliseconds).
        staggerAmount: 15, // Transition delay offset for each item in milliseconds.
        staggerAmountMax: 150, // Maximum stagger delay in milliseconds.
        throttleTime: 300, // How often shuffle can be called on resize (in milliseconds).
        useTransforms: true,
    });
}



$(document).ready(function () {
    // var breadcrumbParallax = $('.parallax-mirror');
    // $('.parallax-mirror').remove();
    // $('.mm-page.mm-slideout').prepend(breadcrumbParallax);

    paceOptions = {
        ajax: false
    };
    Pace.on('done', function() {
        setTimeout(function() {
            jQuery('.mask-all').css('z-index', '-10');
        }, 1000);
    });

    headerAnimation();

    var rtl;
    rtl = $('html').attr('dir') === 'rtl';

    var logoWidth = $('#block-custom-branding').width();
    var menu = $('.region.region-header nav.responsive-menu-block-wrapper ul.horizontal-menu');
    var menuItems = $('.region.region-header nav.responsive-menu-block-wrapper ul.horizontal-menu > li.menu-item');
    var menuChildCount = Math.round($(menu).find('li.menu-item').length/2);
    $.each(menuItems, function (index, value) {
        if ($(value).hasClass('item-left')) {
            $('.region.region-header nav.responsive-menu-block-wrapper ul.horizontal-menu.left-menu').append(value);
        } else if ($(value).hasClass('item-right')) {
            $('.region.region-header nav.responsive-menu-block-wrapper ul.horizontal-menu.right-menu').append(value);
        }
    });
    $('.region.region-header nav.responsive-menu-block-wrapper ul.horizontal-menu.original-menu').remove();
    var leftMenu = $('.region.region-header nav.responsive-menu-block-wrapper ul.horizontal-menu.left-menu');
    var rightMenu = $('.region.region-header nav.responsive-menu-block-wrapper ul.horizontal-menu.right-menu');

    if (rtl) {
        $(leftMenu).css('margin-right', -$(leftMenu).width()-logoWidth/1.3);
        $(rightMenu).css('margin-right', logoWidth/1.3);
    } else {
        $(leftMenu).css('margin-left', -$(leftMenu).width()-logoWidth/1.3);
        $(rightMenu).css('margin-left', logoWidth/1.3);
    }


    $(function () {
        $('.slide-show .view-content').slick({
            rtl: rtl,
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 3000000,
            arrows: true,
            adaptiveHeight: true
        });
        return $('.region-slideshow .view-content .slide-slider').css('display', 'block');
    });

    $(function () {
        $('#popularproducts .view-content').slick({
            rtl: rtl,
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: false,
            variableWidth: true,
            arrows: true
        });
        return $('#popularproducts .view-content .popular-products-row').css('display', 'block');
    });

    $(function () {
        $('#hotproducts .view-content').slick({
            rtl: rtl,
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: false,
            arrows: true
        });
        return $('#hotproducts .view-content .hot-products-row').css('display', 'block');
    });

    $('.footer-container .prizes-section .view-content').slick({
        rtl: rtl,
        dots: false,
        infinite: true,
        arrows: false,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: 1000,
    });

    $('.menu.tab-menu .item').tab();

    $('.ui.checkbox').checkbox();

    $('.ui.sticky').sticky();

    setTimeout(function () {
        $('.footer-container a[title], #contact-us-page .social-links a[title]').popup();
    }, 1000);

    $('#extra-links .action').click(function () {
        // var contentHeight = $('#extra-links .content .extra-links-row').length * $('#extra-links .content .extra-links-row').height() + 10 + 'px';
        $(this).toggleClass('open');
        $('#extra-links .content').toggleClass('open');
        // $('#extra-links .content').css('height', '0');
        // $('#extra-links .content.open').css('height', contentHeight);
        // $('#extra-links .content').fadeToggle('fast');
    });

    $('#go-to-top').each(function(){
        $(this).click(function(){
            $('html,body').animate({ scrollTop: 0 }, 'slow');
            return false;
        });
    });

    var header = $('.region.region-header');

    $(header).find('div.header-search-icon').click(function () {
        if(rtl) {
            $(header).find('input[type=search]').attr('placeholder', 'جستجو ...');
        } else {
            $(header).find('input[type=search]').attr('placeholder', 'Search ...');
        }
        $(header).find('div.block.block-search').fadeIn('fast');
        $('#overlay').fadeIn('fast');
    });
    $(header).find('div.header-close-icon').click(function () {
        $(header).find('div.block.block-search').fadeOut('fast');
        $('#overlay').fadeOut('fast');
    });

    var frontMenuLinks = $('.region.region-header #block-frontmenu ul.menu li.menu-item');
    frontMenuLinks.each(function () {
        $(this).click(function () {
            var element = $($(this).find('a').attr('href'));
            var navHeight = $('.region.region-header').innerHeight();
            scrollToDiv(element, navHeight);
            return false;
        });
    });

    $('.product-full .gallery .slider-for').slick({
        rtl: rtl,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.product-full .gallery .slider-nav').slick({
        rtl: rtl,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        arrows: false,
        dots: false,
        centerMode: true,
        focusOnSelect: true
    });



    // ----------------------------- Google Map -----------------------------

    if ($('#google-map').length > 0) {
        if ($('#google-map.full-width').length > 0) {
            $('#google-map').css('width', $(window).innerWidth());
            if (rtl) {
                $('#google-map').css('margin-right', -$('.ui.container.layout-content').offset().left);
            } else {
                $('#google-map').css('margin-left', -$('.ui.container.layout-content').offset().left);
            }
        }


        var markers = [];
        var elements = $('#google-map').parent().find('.google-map-item');
        $.each(elements, function () {
            markers.push({
                'title': $(this).attr('title'),
                'priority': $(this).attr('priority'),
                'lat': $(this).attr('lat'),
                'lng': $(this).attr('lng'),
                'body': $(this).attr('body'),
                'image': $(this).attr('image')
            });
        });

        var mapCanvas = document.getElementById('google-map');
        for (i = 0; i < markers.length; i++) {
            if (markers[i].priority == 1) {
                var myCenter = new google.maps.LatLng(markers[i].lat, markers[i].lng);
            }
        }
        var mapProp = {
            center: myCenter,
            zoom: 5,
            panControl: false,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false,
            rotateControl: true,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(mapCanvas, mapProp);
        var infowindow = new google.maps.InfoWindow();
        var marker, i;
        var bounds = new google.maps.LatLngBounds();

        for (i = 0; i < markers.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(markers[i].lat, markers[i].lng),
                animation: google.maps.Animation.BOUNCE,
                icon: {
                    url: basePath + themePath + '/app/images/mapLocation.png',
                    scaledSize: new google.maps.Size(30, 38),
                    // origin: new google.maps.Point(0, 0),
                    // anchor: new google.maps.Point(15, 45)
                },
                map: map
            });

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent('<h4 class="item-title">'+ markers[i].title +'</h4>' + '<div class="item-body">' + markers[i].body + '</div>' + '<div class="item-image"><img src="' + markers[i].image + '" /></div>');
                    infowindow.open(map, marker);
                }
            })(marker, i));

            bounds.extend(new google.maps.LatLng(markers[i].lat, markers[i].lng));
        }
        if (markers.length > 1) map.fitBounds(bounds); else map.setZoom(13);
    }

    // ----------------------------- Honors -----------------------------
    var honors = $('#about-us-page .honors-section');
    if ($(honors).length > 0) {
        $(honors).find('.full-container').css('width', $(window).innerWidth());
        if (rtl) {
            $(honors).find('.full-container').css('margin-right', -$('.ui.container.layout-content').offset().left);
        } else {
            $(honors).find('.full-container').css('margin-left', -$('.ui.container.layout-content').offset().left);
        }

        $(honors).find('.view-display-id-honors .view-content').slick({
            rtl: rtl,
            arrows: true,
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
        });

    }

    // ----------------------------- Gallery -----------------------------
    if ($('#site-gallery').length > 0) {
        makeGalley();
    }

    // ----------------------------- Products -----------------------------
    if ($('#products-page').length > 0) {
        var productsDom = $('#products-page');

        makeProductFilter();

        $('.product-card.card .image').dimmer({
            on: 'hover'
        });

        $('#products-page').find('#title-filter-input').keyup(function (a) {
            var text = $(a.currentTarget).val();
            shuffleInstance.filter(function (element) {
                return element.getAttribute('data-title').toLowerCase().indexOf(text) > -1;
            });
        });

        $(productsDom).find('#filter-section .ui.checkbox').checkbox({
            onChange: function () {
                var filters = [];
                $.each($(productsDom).find('#filter-section .ui.checkbox'), function () {
                    if ($(this).hasClass('checked')) {
                        filters.push($(this).find('input[type=checkbox]').attr('filter-data'));
                    }
                });
                shuffleInstance.filter(filters);
            }
        });
    }

    if($('#products.products-container').length > 0) {

        var root = $('#products.products-container');
        setTimeout(function () {
            // if ($(window).innerWidth() <= 768) {
            //     $(root).find('.view-grouping').css('width', '100%');
            // } else {
            //     $(root).find('.view-grouping').css('width', 90/$(root).find('.view-grouping').length+'%');
            // }
            $(root).css('height', $(root).find('.view-grouping.active .view-grouping-content').height() + $(root).find('.view-content').height() + 200);
            $(root).find('.view-grouping-content').css('top', $(root).find('.view-content').height() + 50);

        }, 10);
        $(root).find('.view-content .view-grouping:first-child').addClass('active');
        $(root).find('.view-content .view-grouping .view-grouping-header').click(function () {
            $(this).parents('.view-content').find('.view-grouping').removeClass('active');
            $(this).parent().addClass('active');
            $(root).css('height', $(root).find('.view-grouping.active .view-grouping-content').height() + $(root).find('.view-content').height() + 200);
        });
    }


    // ----------------------------- Services -----------------------------
    if($('.static-pages-container').length > 0) {
        $('a[href=online-tracking]').click(function () {
            $('.ui.modal.tracking-online').modal({
                closable : false,
                blurring: true
            }).modal('show');

            $('form#tracking-online-form').form({
                    fields: {
                        trackingnumber : ['maxLength[6]', 'empty']
                    }
                });
            return false;
        });

        $('form#tracking-online-form').submit(function () {
            console.log($('form#tracking-online-form').find('input#tracking-number').val());
            return false;
        });
    }

});

$(window).scroll(function () {
    headerAnimation();

    var frontMenuLinks = $('.region.region-header #block-frontmenu ul.menu li.menu-item');
    frontMenuLinks.each(function() {
        var element = $($(this).find('a').attr('href'));
        var topScroll = $('body,html').scrollTop() + 300;
        if (topScroll < $($(frontMenuLinks[0]).find('a').attr('href')).offset().top || topScroll >= $($(frontMenuLinks[frontMenuLinks.length-1]).find('a').attr('href')).offset().top + $(element).height()) {
            $(this).parents('ul.menu').find('li.menu-item').removeClass('active');
        } else if (topScroll >= $(element).offset().top && topScroll < $(element).offset().top + $(element).height()) {
            $(this).parents('ul.menu').find('li.menu-item').removeClass('active');
            $(this).addClass('active');
        }
    });
});

$(window).resize(function () {
    var rtl;
    rtl = $('html').attr('dir') === 'rtl';

    if($('#products.products-container').length > 0) {
        var root = $('#products.products-container');
        
        // if ($(window).innerWidth() <= 768) {
        //     $(root).find('.view-grouping').css('width', '100%');
        // } else {
        //     $(root).find('.view-grouping').css('width', 90/$(root).find('.view-grouping').length+'%');
        // }

        $(root).css('height', $(root).find('.view-grouping.active .view-grouping-content').height() + $(root).find('.view-content').height() + 200);
        $(root).find('.view-grouping-content').css('top', $(root).find('.view-content').height() + 50);

    }

    if ($('#google-map').length > 0) {
        if ($('#google-map.full-width').length > 0) {
            $('#google-map').css('width', $(window).innerWidth());
            if (rtl) {
                $('#google-map').css('margin-right', -$('.ui.container.layout-content').offset().left);
            } else {
                $('#google-map').css('margin-left', -$('.ui.container.layout-content').offset().left);
            }
        }
    }

    var honors = $('#about-us-page .honors-section');
    if ($(honors).length > 0) {
        $(honors).find('.full-container').css('width', $(window).innerWidth());
        if (rtl) {
            $(honors).find('.full-container').css('margin-right', -$('.ui.container.layout-content').offset().left);
        } else {
            $(honors).find('.full-container').css('margin-left', -$('.ui.container.layout-content').offset().left);
        }

    }
});

