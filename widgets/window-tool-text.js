$(function () {
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
                title: "INSERT TEXT"
                //visible:false
            },
            _create: function () {

                this.id = this.element.attr('id');
                this.options.id = this.element.attr('id');
                this.options.width += "px";
                this.options.height += "px";


                this.toolbar = $((kendo.template(this._templates.toolbar))(this.options));
                this.textarea = $((kendo.template(this._templates.textarea))(this.options));
                this.dialog = $((kendo.template(this._templates.dialog))(this.options));
                this.element.append(this.toolbar);
                this.element.append(this.textarea);
                this.element.append(this.dialog);

                var that = this;
                this.toolbarElement = WindowToolTextToolbar(that);


                kendo.bind(this.element, this.options);
            },
            _templates: {
                toolbar: '<div id="Toolbar_#: id #" style="width: 99%;"></div>',
                textarea: '<textarea id="Editor_#: id #" class="k-textbox" style="width: 99%;height: 99%"></textarea>',
                dialog: '<div id="Dialog_#: id #" style="margin-top:1em;float: right">' +
                '<button id="Apply_#: id #">APPLY</button><button type="button" id="Cancel_#: id #">CANCEL</button> ' +
                '</div>'
            }
        });

        ui.plugin(WindowToolText);
    })(jQuery);
});

function WindowToolTextToolbar(element) {

    element.toolbar.kendoToolBar({
        items: [
            {
                template: '<input id="dropdownFonts_' + element.id + '"/>'
            },
            {
                template: '<input id="comboboxFontSize_' + element.id + '" style="width: 5em"/>',
                overflow: "never"
            },
            {
                type: "buttonGroup",
                buttons: [
                    {icon: "bold", togglable: true},
                    {icon: "italic", togglable: true},
                    {icon: "underline", togglable: true}
                ]
            },
            {
                template: '<input type="color" id="dropdownColor_' + element.id + '"/>'
            }

        ]
    });

    $("#dropdownFonts_" + element.id).kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "Arial", value: "Arial, Helvetica, sans-serif"},
                {text: "Arial Black", value: "'Arial Black', Gadget, sans-serif"},
                {text: "Comic Sans MS", value: "'Comic Sans MS', cursive, sans-serif"},
                {text: "Courier New", value: "'Courier New', Courier, monospace"},
                {text: "Impact", value: "Impact, Charcoal, sans-serif"},
                {text: "Lucida Console", value: "'Lucida Console',Monaco,monospace"},
                {text: "Tahoma", value: "Tahoma,Geneva,sans-serif"},
                {text: "Times New Roman", value: "'Times New Roman',Times,serif"},
                {text: "Trebuchet MS", value: "'Trebuchet MS',Helvetica,sans-serif"},
                {text: "Verdana", value: "Verdana,Geneva,sans-serif"}
            ]
        }
    );

    var $comboboxFontSize = $("#comboboxFontSize_" + element.id)

    $comboboxFontSize.kendoComboBox({
        clearButton: false,
            dataTextField: "value",
            dataValueField: "value",
            value: 12,
            dataSource: [
                {value: "8"},
                {value: "9"},
                {value: "10"},
                {value: "11"},
                {value: "12"},
                {value: "14"},
                {value: "16"},
                {value: "18"},
                {value: "20"},
                {value: "22"},
                {value: "24"},
                {value: "26"},
                {value: "28"},
                {value: "36"},
                {value: "48"},
                {value: "72"}
            ]
        }
    );

    $("#dropdownColor_" + element.id).kendoColorPicker({
        palette: "basic",
        value: "black",
        change: function (e) {
            mainElement.currentTool.color = e.value;
        }
    });

    $("#Apply_" + element.id).kendoButton({
        icon: "check-outline"
    });

    $("#Cancel_" + element.id).kendoButton({
        icon: "cancel",
        click: function (e) {
            element.close();
        }
    });

}