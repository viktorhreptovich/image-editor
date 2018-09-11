function Circle(element) {
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    var Circle = draw.Circle;
    var surface;

    this.startPoint = {x: 0, y: 0};

    this.dragstart = function (e) {
        e.event.preventDefault();
        var point = surfacePoint(e);
        this.startPoint = point;
    };

    this.drag = function (e) {
        var point = surfacePoint(e);
        var endPoint = point;
        var radius = getRadius(endPoint, this.startPoint);
        var circtemp = new Circle(new geom.Circle([this.startPoint.x, this.startPoint.y], radius), {
            stroke: {
                color: this.color,
                width: this.thickness
            }
        });
        surface = draw.Surface.create(element);
        surface.draw(circtemp);
        element.drawing_data.forEach(function (drawElement) {
            surface.draw(drawElement);
        });
    };

    this.dragend = function (e) {
        var point = surfacePoint(e);
        var endPoint = point;
        var radius = getRadius(endPoint, this.startPoint);
        var circtemp = new Circle(new geom.Circle([this.startPoint.x, this.startPoint.y], radius), {
            stroke: {
                color: this.color,
                width: this.thickness
            }
        });
        surface = draw.Surface.create(element);

        element.drawing_data.push(circtemp);

        element.drawing_data.forEach(function (drawElement) {
            surface.draw(drawElement);
        });
    };


    function surfacePoint(e) {
        e.event.preventDefault();
        var offset = element.offset();
        var x = e.touch.x.location - offset.left;
        var y = e.touch.y.location - offset.top;
        return {
            x: x,
            y: y
        };
    }

    function getRadius(point1, point2) {
        return Math.sqrt(Math.pow((point2.x - point1.x), 2) + Math.pow((point2.y - point1.y), 2));
    }

}