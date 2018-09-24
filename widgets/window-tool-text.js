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
                title: "INSERT TEXT",
                //visible:false
                color: "black",
                font: "Arial",
                size: "12"
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


                var viewModel = kendo.observable({
                    text: "",
                    fontfamily: 'Arial, Helvetica, sans-serif',
                    fontsize: '12px',
                    textcolor: 'black',
                    font: function () {
                        return this.fontsize + ' ' + this.fontfamily;
                    },
                    onChangeText: function (e) {
                        that.options.mainelement.currentTool.text = viewModel.text;
                        that.options.mainelement.currentTool.color = viewModel.textcolor;
                        that.options.mainelement.currentTool.font = viewModel.font();
                        that.options.mainelement.currentTool.apply();
                    }
                });
                kendo.bind(this.element, viewModel);
            },
            _templates: {
                toolbar: '<div id="Toolbar_#: id #" style="width: 99%;"></div>',

                textarea: '<input id="Editor_#: id #" type="text" class="k-textbox" style="width: 99%;" ' +
                'data-value-update="keyup" data-bind="value:text, style:{font-family:fontfamily,font-size:fontsize,color:fontcolor}, events:{keyup:onChangeText}" >' +
                '</input>',

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
                template: '<input id="dropdownFonts_' + element.id + '" data-bind="value:fontfamily"/>'
            },
            {
                template: '<input id="comboboxFontSize_' + element.id + '" style="width: 5em" data-bind="value:fontsize"/>',
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
                template: '<input type="color" id="dropdownColor_' + element.id + '" data-bind="value:textcolor"/>'
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
            ],
        change: function (e) {
            var dataItem = this.dataItem(e.item);
            element.options.font = dataItem.value;
        }
        }
    );

    var $comboboxFontSize = $("#comboboxFontSize_" + element.id)

    $comboboxFontSize.kendoComboBox({
        clearButton: false,
            dataTextField: "value",
            dataValueField: "value",
            value: 12,
            dataSource: [
                {text: "8", value: "8px"}, {text: "9", value: "9px"}, {text: "10", value: "10px"}, {
                    text: "11",
                    value: "11px"
                },
                {text: "12", value: "12px"}, {text: "14", value: "14px"}, {text: "16", value: "16px"}, {
                    text: "18",
                    value: "18px"
                },
                {text: "20", value: "20px"}, {text: "22", value: "22px"}, {text: "24", value: "24px"}, {
                    text: "26",
                    value: "26px"
                },
                {text: "28", value: "28px"}, {text: "36", value: "36px"}, {text: "48", value: "48px"}, {
                    text: "72",
                    value: "72px"
                }
            ]
        }
    );

    $("#dropdownColor_" + element.id).kendoColorPicker({
        palette: "basic",
        value: "black"
    });

    $("#Apply_" + element.id).kendoButton({
        icon: "check-outline",
        click: function (e) {
            element.options.mainelement.currentTool.color = viewModel.textcolor;
            element.options.mainelement.currentTool.font = viewModel.font();
            element.options.mainelement.currentTool.apply();
            element.close();

        }
    });

    $("#Cancel_" + element.id).kendoButton({
        icon: "cancel",
        click: function (e) {
            element.close();
        }
    });

}


