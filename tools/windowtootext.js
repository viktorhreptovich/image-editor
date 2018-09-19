(function ($) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Window,
        drawing = kendo.drawing;


    var ToolText = Widget.extend({
        init: function (element, options) {
            Widget.fn.init.call(this, element, options);
            this._create();
        },
        options: {
            id: "Undefined",
            name: "ToolText",
            width: 0,
            height: 0
        },
        _create: function () {
            var that = this;
            that.id = that.element.attr('id');
            that.options.id = that.element.attr('id');
            that.options.width += "px";
            that.options.height += "px";

            //add js import
            $("head").append("<script src='tooltext.js'></script>")

            that.toolbar = $((kendo.template(that._templates.toolbar))(that.options));
            that.input = $((kendo.template(that._templates.input))(that.options));
            //
            //
            that.element.append(that.toolbar);
            //that.toolbarElement = ToolbarText(that);
            that.element.append(that.input);

            kendo.bind(that.element, that.options);
        },
        _templates: {
            toolbar: "<div id='ToolbarText_#= id #' style='width: #= width #;'></div>",
            input: '<input type="text" style="width: #= width #;"></div>'
        }
    });


    ui.plugin(ToolText);
})(jQuery);
