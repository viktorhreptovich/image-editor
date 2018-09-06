function inittoobar(idToolbar, mainElement) {
    $(idToolbar).kendoToolBar({
        items: [
            {
                type: "buttonGroup",
                buttons: [
                    {icon: "pencil", text: "Pen", togglable: true, group: "shape"},
                    {icon: "line", text: "Line", togglable: true, group: "shape"},
                    {
                        icon: "checkbox", text: "Rectange", togglable: true, group: "shape", toggle: function () {
                            mainElement.currentTool = new Rectangle(mainElement.surfaceElement);

                        }
                    },
                    {
                        icon: "radiobutton", text: "Recicle", togglable: true, group: "shape", toggle: function () {
                            mainElement.currentTool = new Circle(mainElement.surfaceElement);
                        }
                    }
                ]
            }
        ]
    });
}

