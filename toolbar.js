function Toolbar(mainElement) {
    console.log("Init toolbar " + mainElement.id);
    $("head").append("<link rel='stylesheet' type='text/css' href='icons/icons.css?1.0'>")
    $(mainElement.toolbar).kendoToolBar({
        items: [
            {
                type: "buttonGroup",
                buttons: [
                    {
                        id: "pointer", icon: "image-editor16-pointer", togglable: true, group: "tool", selected: true,
                        toggle: function () {
                            selectTool(PointerTool)
                        },
                        overflow: "never"
                    },
                    {
                        id: "pencil", icon: "image-editor16-pencil", togglable: true, group: "tool",
                        toggle: function () {
                            selectTool(PencilTool)
                        },
                        overflow: "never"
                    },
                    {
                        icon: "image-editor16-line", togglable: true, group: "tool",
                        toggle: function () {
                            selectTool(LineTool)
                        },
                        overflow: "never"
                    },
                    {
                        icon: "image-editor16-rectangle", togglable: false, group: "tool", enable: false,
                        toggle: function () {

                        },
                        overflow: "never"
                    },
                    {
                        icon: "image-editor16-circle", togglable: false, group: "tool", enable: false,
                        toggle: function () {

                        },
                        overflow: "never"
                    },
                    {
                        id: "Text", icon: "image-editor16-text", togglable: true, group: "tool",
                        toggle: function () {

                        },
                        overflow: "never"
                    }

                ]
            },
            {type: "separator"},
            {
                type: "button",
                id: "clear",
                name: "clear",
                icon: "image-editor16-clear",
                overflow: "never",
                enable: false,
                click: clickClear
            },
            {type: "separator"},
            {
                template: "<input type='color' id='dropdownColor' />",
                overflow: "never"
            },
            {
                template: "<input id='dropdownThickness' style='width:auto'>",
                overflow: "never"
            },

        ],
        toggle: function (e) {
            (e.id == 'Text') ? $(mainElement.texttoolbar).show() : $(mainElement.texttoolbar).hide();
        }
    });

    function selectTool(TypeTool) {
        mainElement.currentTool = new TypeTool(mainElement);
        mainElement.currentTool.color = $("#dropdownColor").data("kendoColorPicker").value();
        mainElement.currentTool.thickness = $("#dropdownThickness").data("kendoDropDownList").value();
    };

    $("#dropdownColor").kendoColorPicker({
        palette: "basic",
        value: "black",
        change: function (e) {
            mainElement.currentTool.color = e.value;
        }
    });
    $("#dropdownThickness").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "1px", value: 1},
                {text: "2px", value: 2},
                {text: "3px", value: 3},
                {text: "5px", value: 5},
                {text: "7px", value: 7}
            ],
        template: '<span class="k-icon k-i-image-editor16-#: text #-thickness"></span><span> #: text #</span>',
        valueTemplate: '<span class="k-icon k-i-image-editor16-thickness"></span><span> #: value #</span>',
            change: function (e) {
                var dataItem = this.dataItem(e.item);
                mainElement.currentTool.thickness = dataItem.value;
            }
        }
    );

    this.clickSurface = function (e) {
        $(mainElement.toolbar).data("kendoToolBar").enable("#clear", mainElement.shapeSelected);
        console.log("Enable: " + mainElement.shapeSelected);
    }

    function clickClear() {
        console.log("Start clear")
        mainElement.drawing_data = mainElement.drawing_data.filter(function (value) {
            console.log(value.id + "!=" + mainElement.shapeSelect.id);
            return value.id != mainElement.shapeSelect.id;
        });
        console.log("Finish clear")
        console.log(mainElement.drawing_data);
        mainElement.currentTool.redrow();
    }


    $(mainElement.texttoolbar).kendoToolBar({
        items: [
            {
                template: "<input id='dropdownFont' />",
                overflow: "never"
            },
            {type: "separator"},
            {
                type: "button",
                id: "font",
                name: "font",
                icon: "image-editor16-clear",
                overflow: "never",
                enable: false,
                click: clickClear
            },
            {
                type: "button",
                id: "size",
                name: "size",
                icon: "image-editor16-clear",
                overflow: "never",
                enable: false,
            }
        ],
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

    $(mainElement.texttoolbar).hide();


}

