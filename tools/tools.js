
var Tool = function (element) {

    console.log("Tool created");


    var Point = kendo.geometry.Point;
    //fields
    this.startPoint = new Point(0, 0);
    this.currentPoint = new Point(0, 0);
    this.startdraw = false;
    //endfields

    this.surfacePoint = function (e) {
        e.event.preventDefault();
        var offset = element.surfaceElement.offset();
        var x = e.touch.x.location - offset.left;
        var y = e.touch.y.location - offset.top;
        return new kendo.geometry.Point(x, y);
    };

    this.mousemove = function (e) {
        var offset = element.surfaceElement.offset();
        var x = e.pageX - offset.left;
        var y = e.pageY - Math.round(offset.top);
        this.currentPoint = new Point(x, y);

        if (this.startdraw) {
            element.surface = kendo.drawing.Surface.create(element.surfaceElement);
            element.drawing_data.forEach(function (drawElement) {
                element.surface.draw(drawElement);
            });
            element.surface.draw(this.shape());
        } else {
            var point = this.currentPoint;
            element.drawing_data.forEach(function (drawElement) {
                element.currentTool.containsPoint(drawElement, point);
            });
        }
    }

    this.mousedown = function (e) {
        var t = typeof element.currentTool;
        this.startdraw = true;
        this.startPoint = this.currentPoint;
    }

    this.mouseup = function (e) {
        if (this.startdraw) {
            element.surface = kendo.drawing.Surface.create(element.surfaceElement);
            element.drawing_data.push(this.shape());
            element.drawing_data.forEach(function (drawElement) {
                element.surface.draw(drawElement);
            });
            this.startdraw = false;
        }
    }

    this.getDistance = function (point1, point2) {
        return Math.sqrt(Math.pow((point2.x - point1.x), 2) + Math.pow((point2.y - point1.y), 2));
    }

    this.containsPoint = function (drawElement, point) {


        function inLine(x1, y1, x2, y2, x3, y3) {
            return (x1 - x2) * (y3 - y2) == (x3 - x2) * (y1 - y2);
        }

        if (inLine(
            this.currentPoint.x,
            this.currentPoint.y,
            drawElement.segments[0]._anchor.getX(),
            drawElement.segments[0]._anchor.getY(),
            drawElement.segments[1]._anchor.getX(),
            drawElement.segments[1]._anchor.getY(),
        )) {
            element.surfaceElement.css('cursor', 'move');
        } else {
            element.surfaceElement.css('cursor', 'default');
        }


    }

};


//********************* Pointer **************************************************
function Pointer() {
    this.name = "Pointer"
    Tool.apply(this, arguments);

    this.mousedown = function () {
        this.startdraw = false;
    }

}

//********************* Pencil *************************************************
function Pencil(element) {
    this.name = "Pencil"
    Tool.apply(this, arguments);
    console.log("Init 'Pencil'");
    this.multipath = [];

    this.shape = function () {
        var shape = new kendo.drawing.MultiPath({
            stroke: {
                color: this.color,
                width: this.thickness
            }
        });

        this.multipath.forEach(function (point, index, arr) {
            if (index == 0) {
                shape.moveTo(point);

            } else {
                shape.lineTo(point).moveTo(point);
            }
        });
        return shape.close();
    }

    this.mousedown = function (e) {
        this.startdraw = true;
        this.startPoint = this.currentPoint;
        this.multipath = [];
        this.multipath.push(this.currentPoint);
    }

    this.mousemove = function (e) {
        var offset = element.surfaceElement.offset();
        var x = e.pageX - offset.left;
        var y = e.pageY - Math.round(offset.top);
        this.currentPoint = new kendo.geometry.Point(x, y);

        // if (this.startdraw) {
        //     element.surface = kendo.drawing.Surface.create(element.surfaceElement);
        //     this.multipath.push(this.currentPoint);
        //     element.drawing_data.forEach(function (drawElement) {
        //         element.surface.draw(drawElement);
        //     });
        //     element.surface.draw(this.shape());
        // }
        this.startPoint = this.currentPoint;
    }

}

//********************* Line *************************************************
function Line(element) {
    this.name = "Line"
    Tool.apply(this, arguments);
    console.log("Init 'Line'");


    this.shape = function () {
        return new kendo.drawing.Path({
            stroke: {
                color: this.color,
                width: this.thickness
            },
            tooltip: {
                showOn: function (e) {
                    alert("select");
                }
            }
        }).moveTo(this.startPoint).lineTo(this.currentPoint).close();
    }
}


//********************* Rectangle *************************************************
function Rectangle(element) {
    this.name = "Rectangle"
    Tool.apply(this, arguments);
    console.log("Init 'Rectagle': ");
    console.log(this);
    this.shape = function () {
        var newx = Math.abs((this.currentPoint.x - this.startPoint.x));
        var newy = Math.abs((this.currentPoint.y - this.startPoint.y));
        var startX = (this.currentPoint.x - this.startPoint.x) > 0 ? this.startPoint.x : this.currentPoint.x;
        var startY = (this.currentPoint.y - this.startPoint.y) > 0 ? (this.currentPoint.y - newy) : this.currentPoint.y;
        return new kendo.drawing.Rect(new kendo.geometry.Rect([startX, startY], [newx, newy]), {
            stroke: {
                color: this.color,
                width: this.thickness
            }
        });
    }
}

//********************* Circle *************************************************
function Circle(element) {
    this.name = "Circle"
    Tool.apply(this, arguments);
    console.log("Circle created");
    this.shape = function () {
        var radius = this.getDistance(this.currentPoint, this.startPoint);
        return new kendo.drawing.Circle(new kendo.geometry.Circle([this.startPoint.x, this.startPoint.y], radius), {
            stroke: {
                color: this.color,
                width: this.thickness
            }
        });
    }
}





