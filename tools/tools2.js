function Tool(imageEditor) {

    console.log("Tool created:" + this.name);
    var Point = kendo.geometry.Point;

    //fields
    this.startPoint = new Point(0, 0);
    this.currentPoint = new Point(0, 0);
    this.startdraw = false;
    //endfields

    this.click = function (e) {

    }

    this.mousemove = function (e) {
        var offset = imageEditor.elementSurface.offset();
        var x = e.pageX - Math.round(offset.left);
        var y = e.pageY - Math.round(offset.top);
        this.currentPoint = new Point(x, y);

        if (this.startdraw) {
            imageEditor.surface = kendo.drawing.Surface.create(imageEditor.elementSurface);
            imageEditor.drawing_data.forEach(function (drawElement) {
                imageEditor.surface.draw(drawElement.shape());
            });
            imageEditor.currentShape.endPoint = this.currentPoint;
            imageEditor.surface.draw(imageEditor.currentShape.shape());
        }

    }

    this.mousedown = function (e) {
        this.startPoint = this.currentPoint;
        this.startdraw = true;
        imageEditor.currentShape = new imageEditor.currentTool.typeShape(imageEditor);
    }

    this.mouseup = function (e) {
        if (this.startdraw) {
            imageEditor.currentShape.endPoint = this.currentPoint;
            imageEditor.drawing_data.push(imageEditor.currentShape);
            this.currentShape = undefined;
            this.startdraw = false;

            imageEditor.surface = kendo.drawing.Surface.create(imageEditor.elementSurface);
            console.log(imageEditor.drawing_data);
            imageEditor.drawing_data.forEach(function (drawElement) {
                imageEditor.surface.draw(drawElement.shape());
            });
        }
    }

    this.getDistance = function (point1, point2) {
        return Math.sqrt(Math.pow((point2.x - point1.x), 2) + Math.pow((point2.y - point1.y), 2));
    }

    this.redrow = function () {

        imageEditor.surface = kendo.drawing.Surface.create(imageEditor.elementSurface);
        imageEditor.drawing_data.forEach(function (drawElement) {
            imageEditor.surface.draw(drawElement.shape());
        });

    }

};

//********************* Pointer Tool **************************************************
function PointerTool(imageEditor) {
    this.name = "Pointer";
    var Point = kendo.geometry.Point;
    Tool.apply(this, arguments);

    this.mousemove = function (e) {
        var offset = imageEditor.elementSurface.offset();
        var x = e.pageX - offset.left;
        var y = e.pageY - Math.round(offset.top);
        this.currentPoint = new Point(x, y);

        $.each(imageEditor.drawing_data, function (index, value) {
            if (value.containsPoint(imageEditor.currentTool.currentPoint)) {
                imageEditor.findedShape = value;
                return false;
            } else {
                imageEditor.findedShape = undefined;
            }
        });
    }

    this.click = function (e) {
        console.log(imageEditor.findedShape);
        if (imageEditor.findedShape != undefined) {
            imageEditor.findedShape.selectShape();
            imageEditor.shapeSelect = imageEditor.findedShape;
            imageEditor.shapeSelected = true;
        }
    }

    this.mousedown = function (e) {
        this.startPoint = this.currentPoint;
    }

    this.mouseup = function (e) {
    }
}

//********************* Pencil Tool **************************************************
function PencilTool(imageEditor) {
    this.name = "Pencil";
    this.typeShape = Pencil;
    Tool.apply(this, arguments);


    this.mousemove = function (e) {
        var offset = imageEditor.elementSurface.offset();
        var x = e.pageX - offset.left;
        var y = e.pageY - Math.round(offset.top);
        this.currentPoint = new kendo.geometry.Point(x, y);


        if (this.startdraw) {
            imageEditor.currentShape.multipath.push(this.currentPoint);
            imageEditor.surface = kendo.drawing.Surface.create(imageEditor.elementSurface);
            imageEditor.drawing_data.forEach(function (drawElement) {
                imageEditor.surface.draw(drawElement.shape());
            });
            imageEditor.surface.draw(imageEditor.currentShape.shape());
        }
        //this.startPoint = this.currentPoint;
    }

}

//********************* Line Tool **************************************************
function LineTool(imageEditor) {
    this.name = "Line";
    this.typeShape = Line;
    Tool.apply(this, arguments);

}

//********************* Text Tool **************************************************
function TextTool(imageEditor) {
    this.name = "Text";
    this.typeShape = Text;
    Tool.apply(this, arguments);

    this.click = function (e) {
        console.log("Open window tool text");
        imageEditor.windowToolText.open();
        imageEditor.windowToolText.Tool = this;
        console.log(imageEditor.currentTool);
        imageEditor.currentShape = new imageEditor.currentTool.typeShape(imageEditor);

        imageEditor.surface = kendo.drawing.Surface.create(imageEditor.elementSurface);
        imageEditor.drawing_data.forEach(function (drawElement) {
            imageEditor.surface.draw(drawElement.shape());
        });
        imageEditor.currentShape.endPoint = this.currentPoint;
        imageEditor.surface.draw(imageEditor.currentShape.shape());
    }

    this.apply = function () {
        imageEditor.currentShape.endPoint = this.currentPoint;
        // element.drawing_data.push(element.currentShape);
        imageEditor.currentShape = new imageEditor.currentTool.typeShape(imageEditor);

        // element.surface = kendo.drawing.Surface.create(element.elementSurface);
        // console.log(element.drawing_data);
        // element.drawing_data.forEach(function (drawElement) {
        //     element.surface.draw(drawElement.shape());
        // });
        imageEditor.surface = kendo.drawing.Surface.create(imageEditor.elementSurface);
        imageEditor.drawing_data.forEach(function (drawElement) {
            imageEditor.surface.draw(drawElement.shape());
        });
        imageEditor.currentShape.endPoint = this.currentPoint;
        imageEditor.surface.draw(imageEditor.currentShape.shape());
    }

    this.mousedown = function (e) {
    }

    this.mouseup = function (e) {
    }

}

