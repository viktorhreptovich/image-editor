var Point = kendo.geometry.Point;

function getCurrentPoint(e, elementEditor) {
    var offset = elementEditor.elementSurface.offset();
    var x = e.pageX - offset.left;
    var y = e.pageY - Math.round(offset.top);
    return new Point(x, y);
}

function Tool(imageEditor) {
    console.log("Tool created:" + this.name);
    if (imageEditor.shapesselected()) {
        imageEditor.reset();
        imageEditor.redraw();
    }
    //fields
    this.startPoint = new Point(0, 0);
    this.currentPoint = new Point(0, 0);
    this.startdraw = false;
    this.startdragged = false;
    //endfields

    this.mousemove = function (e) {
        this.currentPoint = getCurrentPoint(e, imageEditor);
        if (this.startdraw) {
            imageEditor.redraw();
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
            imageEditor.currentShape = undefined;
            this.startdraw = false;
            imageEditor.redraw();
        }
    }
};

//********************* Pointer Tool **************************************************
function PointerTool(imageEditor) {
    this.name = "Pointer";
    Tool.apply(this, arguments);

    this.mousemove = function (e) {
        this.currentPoint = getCurrentPoint(e, imageEditor);
        if (this.startdragged) {
            imageEditor.findedShape.moveShape(
                {
                    x: (this.offsetdragged.x - this.currentPoint.x),
                    y: (this.offsetdragged.y - this.currentPoint.y)
                }
            );
            this.offsetdragged = this.currentPoint;
            imageEditor.redraw();
        } else {
            imageEditor.findedShape = undefined;
            $.each(imageEditor.drawing_data, function (index, value) {
                if (value.containsPoint(imageEditor.currentTool.currentPoint)) {
                    imageEditor.findedShape = value;
                    return false;
                }
            });
        }
    }

    this.click = function (e) {
        if (imageEditor.findedShape != undefined) {
            imageEditor.findedShape.selected = !imageEditor.findedShape.selected;
        }
        imageEditor.redraw();
    }

    this.mousedown = function (e) {
        this.startPoint = this.currentPoint;
        if (imageEditor.findedShape != undefined) {
            this.startdragged = true;
            this.offsetdragged = this.currentPoint;
        }
    }

    this.mouseup = function (e) {
        this.startdragged = false;
    }
}

//********************* Pencil Tool **************************************************
function PencilTool(imageEditor) {
    this.name = "Pencil";
    this.typeShape = Pencil;
    Tool.apply(this, arguments);

    this.mousemove = function (e) {
        this.currentPoint = getCurrentPoint(e, imageEditor);
        if (this.startdraw) {
            imageEditor.currentShape.multipath.push(this.currentPoint);
            imageEditor.redraw();
            imageEditor.surface.draw(imageEditor.currentShape.shape());
        }
    }

}

//********************* Line Tool **************************************************
function LineTool(imageEditor) {
    this.name = "Line";
    this.typeShape = Line;
    Tool.apply(this, arguments);
}

//********************* Rectangle Tool **************************************************
function RectangleTool(imageEditor) {
    this.name = "Rectangle";
    this.typeShape = Rectangle;
    Tool.apply(this, arguments);
}

//********************* Circle Tool **************************************************
function CircleTool(imageEditor) {
    this.name = "Circle";
    this.typeShape = Circle;
    Tool.apply(this, arguments);
}

//********************* Text Tool **************************************************
function TextTool(imageEditor) {
    this.name = "Text";
    this.typeShape = Text;
    Tool.apply(this, arguments);
    this.startdraw = false;
    this.draggable = false;
    this.startdragged = false;

    this.click = function (e) {
        if (!this.startdraw) {
            this.startPoint = this.currentPoint;
            imageEditor.windowToolText.open();
            imageEditor.windowToolText.Tool = this;
            console.log(imageEditor.currentTool);
            imageEditor.currentShape = new imageEditor.currentTool.typeShape(imageEditor);

            imageEditor.surface = kendo.drawing.Surface.create(imageEditor.elementSurface);
            imageEditor.drawing_data.forEach(function (drawElement) {
                imageEditor.surface.draw(drawElement.shape());
            });
            imageEditor.currentShape.endPoint = this.currentPoint;
            imageEditor.surface.draw(imageEditor.currentShape.tempShape());
            this.startdraw = true;
        }
    }

    this.mousemove = function (e) {
        this.currentPoint = getCurrentPoint(e, imageEditor);
        if (this.startdraw && imageEditor.currentShape.tempShape().containsPoint(this.currentPoint)) {
            this.draggable = true;
            return false;
        } else {
            this.draggable = false;
        }
        if (this.startdraw && this.startdragged) {
            this.startPoint = this.currentPoint;
            this.tempdraw();
        }
    }


    this.apply = function () {
        imageEditor.currentShape.endPoint = this.currentPoint;
        imageEditor.currentShape = new imageEditor.currentTool.typeShape(imageEditor);
        imageEditor.drawing_data.push(imageEditor.currentShape);
        imageEditor.currentShape = undefined;
        this.text = undefined;
        imageEditor.redraw();
        this.startdraw = false;
    }

    this.cancel = function () {
        imageEditor.currentShape = undefined;
        this.text = undefined;
        imageEditor.redraw();
        this.startdraw = false;
    }

    this.mousedown = function (e) {
        if (this.draggable) {
            this.startdragged = true;
        }
    }

    this.mouseup = function (e) {
        this.startdragged = false;
    }


    this.tempdraw = function () {
        imageEditor.currentShape = new imageEditor.currentTool.typeShape(imageEditor);
        imageEditor.redraw();
        imageEditor.surface.draw(imageEditor.currentShape.tempShape());
    }
}