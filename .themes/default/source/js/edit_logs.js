(function() {
    "use strict";
    var toggleEdit = function(e) {
        var editing = $("#edit_toggle").is(":checked");

        if (!$("#ooc_toggle").is(":checked")) {
            $("#edit_toggle").attr("checked", false);
            return;
        }

        if (editing) {
            $(".ooc,.rp").click(function(e) {
                var line = e.currentTarget;

                // switch styling for selected line
                if ($(line).hasClass('ooc')) {
                    $(line).removeClass("ooc");
                    $(line).addClass("rp");
                }
                else {
                    $(line).removeClass("rp");
                    $(line).addClass("ooc");
                }

                // add highlighting if modified
                if ($(line).hasClass("modified")) {
                    $(line).removeClass("modified");
                }
                else {
                    $(line).addClass("modified");
                }

                var lines = $(line).children("a").attr("line-numbers").split(" ");
                console.log('Offset: ' + lines);
            });

            // disable the click event on the menu, preventing it from 
            // annnoyingly popping in an out of existence
            $("#log").click(function(e) {
                e.originalEvent.passedThroughFixedMenu = true;
            });

            // disable timestamp anchors to avoid accidental clicks
            $(".ooc,.rp").children('a').addClass('disabled');
        }
        else {
            // determine which lines to modify for both rp and ooc
            var lines_to_ooc = $('.ooc.modified').children('a').map(function(i,elem,arr) {
                    return String($(elem).attr('line-numbers')).split(' ');
                });
            var lines_to_rp = $('.rp.modified').children('a').map(function(i,elem,arr) {
                    return String($(elem).attr('line-numbers')).split(' ');
                });

            // grab a link to the original raw logfile and download that
            // then use the above indices as an offset *after the front-matter*
            // to insert "!OOC" and "!RP" respectively

            $(".ooc,.rp").off("click");
            
            // re-enable anchors
            $(".ooc,.rp").children('a').removeClass('disabled');

            // re-enable the menu on tap
            $("#log").off("click");
        }

    };

    $("#edit_toggle").change(toggleEdit);

    /*
     * TODO:
     * 
     * generate new log file with changed made
     * force client to download file: http://jsfiddle.net/48en4zo7/ 
     */
})();
