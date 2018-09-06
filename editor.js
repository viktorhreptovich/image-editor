// listen for doc ready because this is js bin and my code is not really "in" the HTML
// where I can control it.
$(function () {
    // wrap the widget in a closure. Not necessary in doc ready, but a good practice
    (function ($) {
        var kendo = window.kendo,
            ui = kendo.ui,
            Widget = ui.Widget,
            drawing = kendo.drawing,
            geometry = kendo.geometry;


        var ImageEditor = Widget.extend({
            init: function (element, options) {
                var that = this;
                Widget.fn.init.call(that, element, options);
                that._create();
            },
            options: {
                name: "ImageEditor"
            },
            _create: function () {
                var that = this;
                //add js import
                $("head").append("<script src='toolbar.js'></script>")
                //   $("head").append("<script src='tools/circle.js'></script>")
                //   $("head").append("<script src='tools/rectangle.js'></script>")


                // create dropdowns from templates and append them to DOM
                that.id = {id: that.element[0].id};

                that.toolbar = (kendo.template(that._templates.toolbar))(that.id);
                that.surfaceElement = $(that._templates.surface);


                that.element.append(that.toolbar);
                that.element.append(that.surfaceElement);

                that.surfaceElement.shapes = [];

                that.currentTool = new Circle(that.surfaceElement);

                inittoobar("#Toolbar_" + that.element[0].id, that);
                kendo.bind(that.element, that.options);
            }
            ,
            _templates: {
                toolbar: "<div id='Toolbar_#= id #' style='width: 500px;'></div>",
                surface: "<div id='Surface' data-role='touch' style='width: 500px; height: 500px;border: 1px solid black;cursor: crosshair;'></div>"
            }
        });

        ui.plugin(ImageEditor);
    })(jQuery);
});