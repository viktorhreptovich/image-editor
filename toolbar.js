function Toolbar(imageEditor) {
    $("head").append("<link rel='stylesheet' type='text/css' href='icons/icons.css?1.0'>");
    $(imageEditor.elementToolbar).kendoToolBar({
        items: [
            {
                type: "buttonGroup",
                buttons: [
                    {id: "PointerTool", icon: "image-editor16-pointer", togglable: true, group: "tool", selected: true},
                    {id: "PencilTool", icon: "image-editor16-pencil", togglable: true, group: "tool"},
                    {id: "LineTool", icon: "image-editor16-line", togglable: true, group: "tool"},
                    {id: "RectangleTool", icon: "image-editor16-rectangle", togglable: true, group: "tool"},
                    {id: "CircleTool", icon: "image-editor16-circle", togglable: true, group: "tool"},
                    {id: "TextTool", icon: "image-editor16-text", togglable: true, group: "tool"}
                ],
                overflow: "never"
            },
            {type: "separator", overflow: "never"},
            {type: "button", id: "clear", icon: "image-editor16-clear", overflow: "never", click: clickClear},
            {type: "separator", overflow: "never"},
            {template: "<input type='color' id='dropdownColor' />", overflow: "never"},
            {template: "<input id='dropdownThickness' style='width:auto'>", overflow: "never"}
        ],
        toggle: function (e) {
            var TypeTool = window[e.id];
            imageEditor.currentTool = new TypeTool(imageEditor);
            imageEditor.currentTool.color = $("#dropdownColor").data("kendoColorPicker").value();
            imageEditor.currentTool.thickness = $("#dropdownThickness").data("kendoDropDownList").value();
        }
    });

    $("#dropdownColor").kendoColorPicker({
        palette: "basic", value: "black",
        change: function (e) {
            imageEditor.currentTool.color = e.value;
        }
    });
    $("#dropdownThickness").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "1px", value: 1}, {text: "2px", value: 2}, {text: "3px", value: 3},
                {text: "5px", value: 5},
                {text: "7px", value: 7}
            ],
            template: '<span class="k-icon k-i-image-editor16-#: text #-thickness"></span><span> #: text #</span>',
            valueTemplate: '<span class="k-icon k-i-image-editor16-thickness"></span><span> #: value #</span>',
            change: function (e) {
                var dataItem = this.dataItem(e.item);
                imageEditor.currentTool.thickness = dataItem.value;
            }
        }
    );

    this.clickSurface = function (e) {
        $(imageEditor.elementToolbar).data("kendoToolBar").enable("#clear", imageEditor.shapesselected());
    }

    function clickClear() {
        imageEditor.drawing_data = imageEditor.drawing_data.filter(function (value) {
            return !value.selected;
        });
        imageEditor.redraw();
    }
}