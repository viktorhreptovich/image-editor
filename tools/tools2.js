var Tool = function (element) {

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
        var offset = element.surfaceElement.offset();
        var x = e.pageX - offset.left;
        var y = e.pageY - Math.round(offset.top);
        this.currentPoint = new Point(x, y);

        if (this.startdraw) {
            element.surface = kendo.drawing.Surface.create(element.surfaceElement);
            element.drawing_data.forEach(function (drawElement) {
                element.surface.draw(drawElement.shape());
            });
            element.currentShape.endPoint = this.currentPoint;
            element.surface.draw(element.currentShape.shape());
        }

    }

    this.mousedown = function (e) {
        this.startPoint = this.currentPoint;
        this.startdraw = true;
        console.log(element.currentTool);

        element.currentShape = new element.currentTool.typeShape(element);
    }

    this.mouseup = function (e) {
        if (this.startdraw) {
            element.currentShape.endPoint = this.currentPoint;
            element.drawing_data.push(element.currentShape);
            this.currentShape = undefined;
            this.startdraw = false;

            element.surface = kendo.drawing.Surface.create(element.surfaceElement);
            console.log(element.drawing_data);
            element.drawing_data.forEach(function (drawElement) {
                element.surface.draw(drawElement.shape());
            });
        }
    }

    this.getDistance = function (point1, point2) {
        return Math.sqrt(Math.pow((point2.x - point1.x), 2) + Math.pow((point2.y - point1.y), 2));
    }

    this.redrow = function () {

        element.surface = kendo.drawing.Surface.create(element.surfaceElement);
        element.drawing_data.forEach(function (drawElement) {
            element.surface.draw(drawElement.shape());
        });

    }

};

//********************* Pointer Tool **************************************************
function PointerTool(element) {
    this.name = "Pointer";
    var Point = kendo.geometry.Point;
    Tool.apply(this, arguments);

    this.mousemove = function (e) {
        var offset = element.surfaceElement.offset();
        var x = e.pageX - offset.left;
        var y = e.pageY - Math.round(offset.top);
        this.currentPoint = new Point(x, y);

        $.each(element.drawing_data, function (index, value) {
            if (value.containsPoint(element.currentTool.currentPoint)) {
                element.findedShape = value;
                return false;
            } else {
                element.findedShape = undefined;
            }
        });
    }

    this.click = function (e) {
        console.log(element.findedShape);
        if (element.findedShape != undefined) {
            element.findedShape.selectShape();
            element.shapeSelect = element.findedShape;
            element.shapeSelected = true;
        }
    }

    this.mousedown = function (e) {
        this.startPoint = this.currentPoint;
    }

    this.mouseup = function (e) {
    }
}

//********************* Pencil Tool **************************************************
function PencilTool(element) {
    this.name = "Pencil";
    this.typeShape = Pencil;
    Tool.apply(this, arguments);


    this.mousemove = function (e) {
        var offset = element.surfaceElement.offset();
        var x = e.pageX - offset.left;
        var y = e.pageY - Math.round(offset.top);
        this.currentPoint = new kendo.geometry.Point(x, y);


        if (this.startdraw) {
            element.currentShape.multipath.push(this.currentPoint);
            element.surface = kendo.drawing.Surface.create(element.surfaceElement);
            element.drawing_data.forEach(function (drawElement) {
                element.surface.draw(drawElement.shape());
            });
            element.surface.draw(element.currentShape.shape());
        }
        //this.startPoint = this.currentPoint;
    }

}

//********************* Line Tool **************************************************
function LineTool(element) {
    this.name = "Line";
    this.typeShape = Line;
    Tool.apply(this, arguments);

}

//********************* Text Tool **************************************************
function TextTool(element) {
    this.name = "Text";
    this.typeShape = Text1;
    Tool.apply(this, arguments);

    this.click = function (e) {
        // console.log("Open window tool text");
        // element.windowToolText.open();
        // element.windowToolText.Tool = this;
    }

    // this.mousedown = function (e) {
    //     this.startPoint = this.currentPoint;
    // }

    // this.mouseup = function (e) {
    // }

}

