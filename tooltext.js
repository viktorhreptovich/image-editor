function ToolbarText(mainElement) {
    console.log("Init toolbar text" + mainElement.id);

    $("head").append("<link rel='stylesheet' type='text/css' href='icons/icons.css?1.0'>");
    $("head").append("<script src='autocomplete.js'></script>")

    //$(mainElement.tooltextwindow).kendoClienteText();

    var w = $(mainElement.tooltextwindow).kendoToolText({
        width: mainElement.options.width,
        // draggable: {
        //     containment: id
        // },
        actions: ["Close"]
    });
    // alert(w.data("kendoWindow"));
    //     w.data("kendoToolText").open();
    //
    // $(mainElement.tooltextwindow).append("<div id='TextToolBar'></div>");
    //
    // $("#TextToolBar").kendoToolBar({
    //     items: [
    //         {template: "<input id='dropdownFont' />",overflow: "never"},
    //         {type: "separator"},
    //         {
    //             type: "button",
    //             id: "font",
    //             name: "font",
    //             icon: "image-editor16-clear",
    //             overflow: "never",
    //             enable: false
    //         },
    //         {
    //             type: "button",
    //             id: "size",
    //             name: "size",
    //             icon: "image-editor16-clear",
    //             overflow: "never",
    //             enable: false
    //         }
    //     ]
    // });
    // $("#dropdownFont").kendoDropDownList({
    //         dataTextField: "text",
    //         dataValueField: "value",
    //         dataSource: [
    //             {text: "Arial", value: "Arial"},
    //             {text: "Arial Black", value: "Arial Black"},
    //             {text: "Bookman", value: "Bookman"},
    //             {text: "Comic Sans MS", value: "Comic Sans MS"},
    //             {text: "Courier", value: "Courier"},
    //             {text: "Courier New", value: "Courier New"},
    //             {text: "Garamond", value: "Garamond"},
    //             {text: "Georgia", value: "Georgia"},
    //             {text: "Helvetica", value: "Helvetica"},
    //             {text: "Impact", value: "Impact"},
    //             {text: "Palatino", value: "Palatino"},
    //             {text: "Times", value: "Times"},
    //             {text: "Times New Roman", value: "Times New Roman"},
    //             {text: "Trebuchet MS", value: "Trebuchet MS"},
    //             {text: "Verdana", value: "Verdana"}
    //         ],
    //     }
    // );
}