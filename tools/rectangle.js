var Tool = function (element) {

    console.log("Tool created");


    var Point = kendo.geometry.Point;
    //fields
    this.startPoint = new Point(0, 0);
    this.currentPoint = new Point(0, 0);
    //endfields

    this.dragstart = function (e) {
        this.startPoint = this.surfacePoint(e);
    };

    this.drag = function (e) {
        this.currentPoint = this.surfacePoint(e);
        element.surface = kendo.drawing.Surface.create(element.surfaceElement);
        element.surface.draw(this.shape());
    };

    this.dragend = function (e) {
        this.currentPoint = this.surfacePoint(e);
        element.surface = kendo.drawing.Surface.create(element.surfaceElement);
        element.drawing_data.push(this.shape());
        element.drawing_data.forEach(function (drawElement) {
            element.surface.draw(drawElement);
        });

    };

    this.surfacePoint = function (e) {
        e.event.preventDefault();
        var offset = element.surfaceElement.offset();
        var x = e.touch.x.location - offset.left;
        var y = e.touch.y.location - offset.top;
        return new kendo.geometry.Point(x, y);
    };

    this.getDistance = function (point1, point2) {
        return Math.sqrt(Math.pow((point2.x - point1.x), 2) + Math.pow((point2.y - point1.y), 2));
    }
};


//********************* Pointer **************************************************
function Pointer() {
    Tool.apply(this, arguments);
    this.shape = function () {
        return;
    }
}

//********************* Pencil *************************************************
function Pencil(element) {
    Tool.apply(this, arguments);
    console.log("Init 'Pencil'");

    this.shape = function () {
        return new kendo.drawing.Path({
            stroke: {
                color: this.color,
                width: this.thickness
            }
        }).moveTo(this.startPoint.x, this.startPoint.y).lineTo(this.currentPoint.x, this.currentPoint.y).close();
    }

    this.drag = function (e) {
        this.currentPoint = this.surfacePoint(e);
        element.drawing_data.push(this.shape());
        this.startPoint = this.surfacePoint(e);
    }
}

//********************* Line *************************************************
function Line(element) {
    Tool.apply(this, arguments);
    console.log("Init 'Line'");

    this.shape = function () {
        return new kendo.drawing.Path({
            stroke: {
                color: this.color,
                width: this.thickness
            }
        }).moveTo(this.startPoint.x, this.startPoint.y).lineTo(this.currentPoint.x, this.currentPoint.y).close();
    }

}


//********************* Rectangle *************************************************
function Rectangle(element) {
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





