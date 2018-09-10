function inittoobar(idToolbar, mainElement) {
    this.curColorRectangle = 'black';
    this.curThicknessRectangle = 1;

    this.curColorCircle = 'black';
    this.curThicknessCicle = 1;

    $(idToolbar).kendoToolBar({
        items: [
            {
                type: "buttonGroup",
                buttons: [
                    {
                        icon: "pan", togglable: true, group: "shape", selected: true,
                        toggle: function () {
                            mainElement.currentTool = new Pointer(mainElement.surfaceElement);
                        }
                    },
                    {
                        icon: "pencil", togglable: true, group: "shape", toggle: function () {
                            mainElement.currentTool = new Pencil(mainElement.surfaceElement);
                            mainElement.currentTool.color = $("#dropdownColor").data("kendoColorPicker").value();
                            mainElement.currentTool.thickness = $("#dropdownThickness").data("kendoDropDownList").value();
                        }
                    },
                    {
                        icon: "line", togglable: true, group: "shape", toggle: function () {
                            mainElement.currentTool = new Line(mainElement.surfaceElement);
                            mainElement.currentTool.color = $("#dropdownColor").data("kendoColorPicker").value();
                            mainElement.currentTool.thickness = $("#dropdownThickness").data("kendoDropDownList").value();
                        }
                    },
                    {
                        icon: "checkbox", togglable: true, group: "shape", toggle: function () {
                            mainElement.currentTool = new Rectangle(mainElement);
                            mainElement.currentTool.color = $("#dropdownColor").data("kendoColorPicker").value();
                            mainElement.currentTool.thickness = $("#dropdownThickness").data("kendoDropDownList").value();
                        }
                    },
                    {
                        icon: "radiobutton", togglable: true, group: "shape", toggle: function () {
                            mainElement.currentTool = new Circle(mainElement.surfaceElement);
                            mainElement.currentTool.color = $("#dropdownColor").data("kendoColorPicker").value();
                            mainElement.currentTool.thickness = $("#dropdownThickness").data("kendoDropDownList").value();
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

        ]
    });

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

