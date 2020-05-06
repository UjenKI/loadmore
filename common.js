$(window).on('load', function () {

    // init Isotope
    var $container = $('.isotope').isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows',
    });

    // filter functions
    var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function () {
            var number = $(this).find('.number').text();
            return parseInt(number, 10) > 50;
        },
        // show if name ends with -ium
        ium: function () {
            var name = $(this).find('.name').text();
            return name.match(/ium$/);
        }
    };

    // bind filter button click
    $('#filters').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[filterValue] || filterValue;
        $container.isotope({
            filter: filterValue
        });
    });

    // bind sort button click
    $('#sorts').on('click', 'button', function () {
        var sortByValue = $(this).attr('data-sort-by');
        $container.isotope({
            sortBy: sortByValue
        });
    });

    // change is-checked class on buttons
    $('.button-group').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function () {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });

    //****************************
    // Isotope Load more button
    //****************************
    var initShow = 4; //number of items loaded on init & onclick load more button
    var counter = initShow; //counter for load more button
    var iso = $container.data('isotope'); // get Isotope instance

    loadMore(initShow); //execute function onload

    function loadMore(toShow) {
        $container.find(".hidden").removeClass("hidden");

        var hiddenElems = iso.filteredItems.slice(toShow, iso.filteredItems.length).map(function (item) {
            return item.element;
        });
        $(hiddenElems).addClass('hidden');
        $container.isotope('layout');

        //when no more to load, hide show more button
        if (hiddenElems.length == 0) {
            jQuery("#load-more").hide();
        } else {
            jQuery("#load-more").show();
        };

    }

    //append load more button
    $container.after('<button id="load-more">About Selfie Booth Rentals</button>');

    //when load more button clicked
    $("#load-more").click(function () {
        if ($('#filters').data('clicked')) {
            //when filter button clicked, set initial value for counter
            counter = initShow;
            $('#filters').data('clicked', false);
        } else {
            counter = counter;
        };

        counter = counter + initShow;

        loadMore(counter);
    });

    //when filter button clicked
    $("#filters").click(function () {
        $(this).data('clicked', true);

        loadMore(initShow);
    });

    $('.selected-option').each(function (i) {
        $(this).on('click', function (e) {
            e.preventDefault();
            $('.selected-option').eq(i).toggleClass('rotate');
        });
    });
    // ===================================
    $('.faux-select ul li').click(function () {
        $('.faux-select ul li').removeClass('active');
        $(this).addClass('active');

        var sel = $(this).attr('data-filter');
        $('.isotope').isotope({
            filter: sel
        });
        // return false;
    });

    $('.faux-select').click(function () {
        $(this).toggleClass('open');
        $('.options', this).toggleClass('open');


    });

    $('.options li').click(function () {
        var selection = $(this).text();
        var dataValue = $(this).attr('data-value');
        $('.selected-option span').text(selection);
        $('.faux-select').attr('data-selected-value', dataValue);
    });

});
// $(window).load(function () {
//     $('.faux-select ul li').click(function () {
//         $('.faux-select ul li').removeClass('active');
//         $(this).addClass('active');

//         var sel = $(this).attr('data-filter');
//         $('.isotope').isotope({
//             filter: sel
//         });
//         // return false;
//     });

//     $('.faux-select').click(function () {
//         $(this).toggleClass('open');
//         $('.options', this).toggleClass('open');


//     });

//     $('.options li').click(function () {
//         var selection = $(this).text();
//         var dataValue = $(this).attr('data-value');
//         $('.selected-option span').text(selection);
//         $('.faux-select').attr('data-selected-value', dataValue);
//     });
// });