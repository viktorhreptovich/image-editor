function Toolbar(mainElement) {
    console.log("Init toolbar " + mainElement.id);
    $("head").append("<link rel='stylesheet' type='text/css' href='icons/icons.css'>")
    console.log(mainElement.toolbar);
    $(mainElement.toolbar).kendoToolBar({
        items: [
            {
                type: "buttonGroup",
                buttons: [
                    {
                        icon: "image-editor-pointer", togglable: true, group: "shape", selected: true,
                        toggle: function () {
                            selectTool(Pointer)
                        }
                    },
                    {
                        icon: "image-editor-pencil", togglable: true, group: "shape",
                        toggle: function () {
                            selectTool(Pencil)
                        }
                    },
                    {
                        icon: "line", togglable: true, group: "shape",
                        toggle: function () {
                            selectTool(Line)
                        }
                    },
                    {
                        icon: "image-editor-rectangle", togglable: true, group: "shape",
                        toggle: function () {
                            selectTool(Rectangle)
                        }
                    },
                    {
                        icon: "image-editor-circle", togglable: true, group: "shape",
                        toggle: function () {
                            selectTool(Circle)
                        }
                    }
                ]
            },
            {type: "separator"},
            {
                template: "<input type='color' id='dropdownColor' />",
                overflow: "never"
            },
            {
                template: "<input id='dropdownThickness' style='width:100px'>",
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

