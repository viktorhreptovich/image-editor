(function ($) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Window,
        drawing = kendo.drawing;


    var WindowToolText = Widget.extend({
        init: function (element, options) {
            Widget.fn.init.call(this, element, options);
            this._create();
        },
        options: {
            id: "Undefined",
            name: "WindowToolText",
            width: 0,
            height: 0,
            title: "INSERT TEXT"
        },
        _create: function () {
            this.id = this.element.attr('id');
            this.options.id = this.element.attr('id');
            this.options.width += "px";
            this.options.height += "px";


            this.editor = $((kendo.template(this._templates.editor))(this.options));
            this.element.append(this.editor);

            this.toolbarElement = WindowToolTextToolbar(this);


            kendo.bind(this.element, this.options);
        },
        _templates: {
            editor: '<textarea id="Editor_#= id #" rows="3"style="width: 99%;height: 200px"></textarea>',
        }
    });


    ui.plugin(WindowToolText);
})(jQuery);

function WindowToolTextToolbar(element) {

    console.log(kendo.ui.Editor.prototype.options);
    $(element.editor).kendoEditor({
        tools: [
            {
                name: "fontName",
                items: [
                    kendo.ui.Editor.prototype.options.fontName
                ]
            },
            {
                name: "fontSize",
                items: [].concat(
                    kendo.ui.Editor.prototype.options.fontSize[0],
                    [{text: "16px", value: "16px"}]
                )
            },
            {
                name: "formatting",
                items: [].concat(
                    kendo.ui.editor.FormattingTool.prototype.options.items[0],
                    [{text: "Fieldset", value: "fieldset"}]
                )
            },
            {
                name: "customTemplate",
                template: $("#backgroundColor-template").html()
            },
            {
                name: "custom",
                tooltip: "Insert a horizontal rule",
                exec: function (e) {
                    var editor = $(this).data("kendoEditor");
                    editor.exec("inserthtml", {value: "<hr />"});
                }
            }
        ]
    });
    $("#dropdownFont").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "Arial", value: "Arial"},
                {text: "Arial Black", value: "Arial Black"},
                {text: "Bookman", value: "Bookman"},
                {text: "Comic Sans MS", value: "Comic Sans MS"},
                {text: "Courier", value: "Courier"},
                {text: "Courier New", value: "Courier New"},
                {text: "Garamond", value: "Garamond"},
                {text: "Georgia", value: "Georgia"},
                {text: "Helvetica", value: "Helvetica"},
                {text: "Impact", value: "Impact"},
                {text: "Palatino", value: "Palatino"},
                {text: "Times", value: "Times"},
                {text: "Times New Roman", value: "Times New Roman"},
                {text: "Trebuchet MS", value: "Trebuchet MS"},
                {text: "Verdana", value: "Verdana"}
            ],
        }
    );
}