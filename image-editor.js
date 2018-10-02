// listen for doc ready because this is js bin and my code is not really "in" the HTML
// where I can control it.
$(function () {
    // wrap the widget in a closure. Not necessary in doc ready, but a good practice
    (function ($) {
        var kendo = window.kendo,
            ui = kendo.ui,
            Widget = ui.Widget;

        var ImageEditor = Widget.extend({
            init: function (element, options) {
                var that = this;
                Widget.fn.init.call(that, element, options);
                that._create();
                that._init_events();
            },
            options: {
                id: "Undefined",
                name: "ImageEditor",
                width: 0,
                height: 0,
                image: ""
            },
            _create: function () {
                var that = this;
                that.id = that.element.attr('id');
                that.options.id = that.element.attr('id');
                that.options.width += "px";
                that.options.height += "px";

                //add js import
                // $("head").append("<script src='toolbar.js'></script>")
                // $("head").append("<script src='tools/tools.js'></script>")
                // $("head").append("<script src='tools/shapes.js'></script>")

                that.elementToolbar = $((kendo.template(that._templates.toolbar))(that.options));
                that.elementSurface = $((kendo.template(that._templates.surface))(that.options));

                that.element.append(that.elementToolbar);
                that.toolbar = new Toolbar(that);
                that.element.append(that.elementSurface);
                that.windowToolText = WindowToolText(that);

                that.redraw = function () {
                    that.surface = kendo.drawing.Surface.create(that.elementSurface);
                    $.each(that.drawing_data, function (index, drawElement){
                        that.surface.draw(drawElement.shape());
                    });
                };

                that.shapesselected = function () {
                    return that.drawing_data.filter(function (value) {
                        return value.selected;
                    }).length > 0;
                };

                that.reset = function () {
                    $.each(that.drawing_data, function (index, shape){
                        shape.selected = false;
                    });
                };

                that.drawing_data = [];
                that.currentTool = new PointerTool(that);

                kendo.bind(that.element, that.options);
            },
            _init_events: function () {
                var that = this;
                $(that.elementSurface).bind("click", function (e) {
                    that.currentTool.click(e);
                });
                $(that.elementSurface).bind("click", function (e) {
                    that.toolbar.clickSurface(e);
                });
                $(that.elementSurface).on("mousemove", function (e) {
                    that.currentTool.mousemove(e);
                });
                $(that.elementSurface).on("mousedown", function (e) {
                    that.currentTool.mousedown(e);
                });
                $(that.elementSurface).on("mouseup", function (e) {
                    that.currentTool.mouseup(e);
                });
            }
            ,
            _templates: {
                toolbar: "<div id='Toolbar_#= id #' style='width: #= width #;'></div>",
                surface: '<div id="Surface_#= id #" style="width: #= width #; height: #= height #;border: 1px solid gray; ' +
                'background: url(#= image #); background-size: #: width # #: height #; ">' +
                '<div id="WindowToolText_#= id #" style="width: #= width #;"></div></div>'
            }
        });


        ui.plugin(ImageEditor);
    })(jQuery);
});

function WindowToolText(imageEditor) {
    return $("#WindowToolText_" + imageEditor.id).kendoWindowToolText({
        width: imageEditor.options.width, visible: false, mainelement: imageEditor
    }).data("kendoWindowToolText");
}