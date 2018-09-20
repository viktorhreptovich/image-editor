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
            this.textarea = $((kendo.template(this._templates.textarea))(this.options));
            this.element.append(this.editor);
            this.element.append(this.textarea);

            var that = this;
            this.toolbarElement = WindowToolTextToolbar(that);


            kendo.bind(this.element, this.options);
        },
        _templates: {
            editor: '<div id="Toolbar_#: id #" style="width: 99%;"></div>',
            textarea: '<textarea id="Editor_#: id #" class="k-textbox" style="width: 99%;height: 99%"></textarea>'
        }
    });


    ui.plugin(WindowToolText);
})(jQuery);


function WindowToolTextToolbar(element) {

    element.editor.kendoToolBar({
        items: [
            {
                template: '<input id="dropdownFonts_' + element.id + '"/>',
                overflow: "never"
            },
            {
                template: '<input id="comboboxFontSize_' + element.id + '"/>',
                overflow: "never"
            },
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
        }
    );

    var $comboboxFontSize = $("#comboboxFontSize_" + element.id)

    $comboboxFontSize.kendoMaskedTextBox({
        mask: "00",
        promptChar: "__" //specify prompt char as empty char
    });

    $comboboxFontSize.kendoComboBox({
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
    // $comboboxFontSize.on('click',function (e) {
    //     alert('asdfasd');
    //     console.log(e);
    // })
    //
    // $comboboxFontSize.on('keydown',function (e) {
    //     alert('asdfasd');
    //     console.log(e);
    // })
}