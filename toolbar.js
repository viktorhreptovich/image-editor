function Toolbar(mainElement) {
    console.log("Init toolbar " + mainElement.id);
    $("head").append("<link rel='stylesheet' type='text/css' href='icons/icons.css'>")
    $(mainElement.toolbar).kendoToolBar({
        items: [
            {
                type: "buttonGroup",
                buttons: [
                    {
                        icon: "image-editor-pointer", togglable: true, group: "shape", selected: true,
                        toggle: function () {
                            selectTool(PointerTool)
                        },
                        overflow: "never"
                    },
                    {
                        icon: "image-editor-pencil", togglable: true, group: "shape",
                        toggle: function () {
                            selectTool(PencilTool)
                        },
                        overflow: "never"
                    },
                    {
                        icon: "image-editor-line", togglable: true, group: "shape",
                        toggle: function () {
                            selectTool(LineTool)
                        },
                        overflow: "never"
                    },
                    {
                        icon: "image-editor-rectangle", togglable: false, group: "shape", enable: false,
                        toggle: function () {

                        },
                        overflow: "never"
                    },
                    {
                        icon: "image-editor-circle", togglable: false, group: "shape", enable: false,
                        toggle: function () {

                        },
                        overflow: "never"
                    },
                    {
                        icon: "image-editor-text", togglable: false, group: "shape", enable: false,
                        toggle: function () {
                        },
                        overflow: "never"
                    }

                ]
            },
            {type: "button", icon: "image-editor-clear", enable: false, overflow: "never"},
            {type: "separator"},
            {
                template: "<input type='color' id='dropdownColor' />",
                overflow: "never"
            },
            {
                template: "<input id='dropdownThickness' style='width:70px'>",
                overflow: "never"
            },

        ],


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
            change: function (e) {
                var dataItem = this.dataItem(e.item);
                mainElement.currentTool.thickness = dataItem.value;
            }
        }
    );

}

