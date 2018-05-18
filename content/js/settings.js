/** VARIABLES */

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var isFirefox = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);

var debug = false;

/** SETTINGS */

function write_ls(key, value) {
    if (isChrome == true) {
        localStorage[key] = value;
    } else if (isFirefox == true) {
        window.localStorage.setItem(key, value)
    }

    if (debug) {
        console.info('Writing ' + value + ' to ' + key + '.')
    }
}

function read_ls(key) {

    if (isChrome == true) {
        var resp = localStorage[key]
    } else if (isFirefox == true) {
        var resp = window.localStorage.getItem([key]);
    }

    if (debug) {
        console.info('Reading ' + resp + ' from ' + key + '.')
    }

    return resp
}

/** LOAD **/

function draw_template(json, search) {
    $('#extension_list').empty()
    $('.sidebar-extensions-list').empty()

    var json_keys = Object.keys(json).reverse();
    for (var item in json_keys) {
        item = json_keys[item]

        if (search != null){
            var search = search
            if (!json[item]['name'].toLowerCase().startsWith(search.toLowerCase())) {
                delete json[item]
                continue;
            }
        }

        $('.sidebar-extensions-list').append(
            '<a class="' + item + '" href="#' + item + '"><li id="' + item + '">' + json[item]['name'] + '</li></a>'
        )

        var selected = ""

        if (read_ls('extflix_' + item) == 'true') {
            var selected = "checked"
        }

        var template = [
            '<article>',
            '<main>',
            '<header>',
            '<h1 id="' + item + '">' + json[item]['name'] + '</h1>',
            '<h2>By ' + json[item]['author'] + '</h2>',
            '</header>',
            '<p>' + json[item]['description'] + '</p>',
            '<div class="row">',
            '<input type="checkbox" id="' + item.replace('_', '-') + '" name="' + item.replace('_', '-') + '" class="switch-input" ' + selected + '>',
            '<label for="' + item.replace('_', '-') + '" class="switch-label">Option ',
            '<span class="toggle--on" > Enabled </span>',
            '<span class="toggle--off" > Disabled </span>',
            '</label> ',
            '</div>',
            '</main>',
            '<aside><img src="../content/img/preview/' + item + '.png"></aside>',
            '</article>'
        ].join("\n");

        $('#extension_list').append(template);
    }

    var lengther = Object.keys(json);
    if (lengther.length == 0) {
        $('#extension_list').append('<h2>No Results Found!</h2>');
    }
}

$(document).ready(function () {

    $.getJSON("../scripts.json", function (json) {

        draw_template(json, null)

        /** HASHCHANGE (PT. 1) **/

        var hash = window.location.hash.substr(1);

        $('html, body').animate({
            scrollTop: ($('h1#' + hash).offset().top - 100)
        }, 0);

        $('#search').text('')

        /** CHECKBOXES **/

        var checkboxes = document.querySelectorAll('input[type=checkbox]');

        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].addEventListener('change', function () {
                var name = this.name.toString()
                if (this.checked) {
                    console.log(name + ' is now checked.');
                    write_ls(('extflix_' + name).replace('-', '_'), 'true');
                } else {
                    console.log(name + ' is now unchecked.');
                    write_ls(('extflix_' + name).replace('-', '_'), 'false');
                }
            });
        }
    });

});



/** HASHCHANGE (PT. 2) **/

$(window).on('hashchange', function (e) {
    var hash = window.location.hash.substr(1);

    $('html, body').animate({
        scrollTop: ($('h1#' + hash).offset().top - 100)
    }, 0);
});

/** SEARCH **/

$('input#search').on('input', function () {
    var search = $('input#search').val()
    $.getJSON("../scripts.json", function (json) {
        if (search == "") {
            draw_template(json, null)
        } else {
            draw_template(json, search)
        }
        
    });
});

/** SCROLLSPY **/

$(window).scroll(function () {
    var x = $(document).scrollTop();
    $("h1").each(function (index) {
        var z = $(this).attr("id");
        if (x > ($(this).offset().top - 400)) {
            $('a.' + z + ' li').addClass("selected")
        } else {
            $('a.' + z + ' li').removeClass("selected")
        }
    })
})
