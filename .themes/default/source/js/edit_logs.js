(function() {
    "use strict";
    var toggleEdit = function(e) {
        var editing = $("#edit_toggle").is(":checked");

        if (editing) {
            // prepend a checkbox to each 
            //$(".ooc,.rp").prepend(editPostOOC);
            $(".ooc,.rp").click(function(e) {
                var c = e.currentTarget;
                var ooc = $(c).hasClass('ooc');

                // switch styling for selected line
                if (ooc) {
                    $(c).removeClass("ooc");
                    $(c).addClass("rp");
                }
                else {
                    $(c).removeClass("rp");
                    $(c).addClass("ooc");
                }

                // add highlighting if modified
                if ($(c).hasClass("modified")) {
                    $(c).removeClass("modified");
                }
                else {
                    $(c).addClass("modified");
                }

                var lines = $(c).children("a").attr("line-numbers").split(" ");
                console.log('Offset: ' + lines);
            });
        }
        else {
            $(".ooc,.rp").click(function(e){});
        }

    };

    $("#edit_toggle").change(toggleEdit);

    /*
     * TODO:
     * 
     * tap line to change between OOC/RP
     * disable timestamp anchors: http://jsfiddle.net/diegounanue/9sqLf/
     * keep track of those changed from original
     * highlight lines changed
     * generate new log file with changed made
     * force client to download file: http://jsfiddle.net/48en4zo7/ 
     */
})();
