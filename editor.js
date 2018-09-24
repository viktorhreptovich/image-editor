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
                that._init_events();
            },
            options: {
                id: "Undefined",
                name: "ImageEditor",
                width: 0,
                height: 0,
                imageurl: ""
            },
            _create: function () {

                var that = this;
                that.id = that.element.attr('id');
                that.options.id = that.element.attr('id');
                that.options.width += "px";
                that.options.height += "px";

                //add js import
                // $("head").append("<script src='toolbar.js'></script>")
                // $("head").append("<script src='tools/tools2.js'></script>")
                // $("head").append("<script src='tools/shapes.js'></script>")


                that.toolbar = $((kendo.template(that._templates.toolbar))(that.options));
                that.surfaceElement = $((kendo.template(that._templates.surface))(that.options));

                //
                that.element.append(that.toolbar);
                that.toolbarElement = new Toolbar(that);
                that.element.append(that.surfaceElement);
                that.windowToolText = GetWindowToolText(that);


                that.drawing_data = [];
                that.currentTool = new PointerTool(that);
                that.shapeSelected = false;

                kendo.bind(that.element, that.options);
            },
            _init_events: function () {
                var that = this;
                $(that.surfaceElement).bind("click", function (e) {
                    that.currentTool.click(e);
                });
                $(that.surfaceElement).bind("click", function (e) {

                    that.toolbarElement.clickSurface(e);
                });
                $(that.surfaceElement).on("mousemove", function (e) {
                    that.currentTool.mousemove(e);
                });
                $(that.surfaceElement).on("mousedown", function (e) {
                    that.currentTool.mousedown(e);
                    console.log("Mouse down");
                });
                $(that.surfaceElement).on("mouseup", function (e) {
                    that.currentTool.mouseup(e);
                    console.log("Mouse up");
                });
            }
            ,
            _templates: {
                toolbar: "<div id='Toolbar_#= id #' style='width: #= width #;'></div>",
                surface: '<div id="Surface_#= id #" style="width: #= width #; height: #= height #;border: 1px solid gray;">' +
                '<div id="WindowToolText_#= id #" style="width: #= width #;"></div>' +
                '</div>'
            }
        });


        ui.plugin(ImageEditor);
    })(jQuery);
});

function GetWindowToolText(editor) {
    var $windowToolText = $("#WindowToolText_" + editor.id);
    $windowToolText.kendoWindowToolText({
        width: 600,
        visible: false,
        mainelement: editor
    });
    return $windowToolText.data("kendoWindowToolText");
}