function Rectangle(element) {
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    var Rect = draw.Rect;
    var surface;

    this.startPoint = {x: 0, y: 0};

    this.dragstart = function (e) {
        e.event.preventDefault();
        var point = surfacePoint(e);
        this.startPoint = point;
    };

    this.drag = function (e) {
        var point = surfacePoint(e);
        var newx = Math.abs((point.x - this.startPoint.x));
        var newy = Math.abs((point.y - this.startPoint.y));
        var startX = (point.x - this.startPoint.x) > 0 ? this.startPoint.x : point.x;
        var startY = (point.y - this.startPoint.y) > 0 ? (point.y - newy) : point.y;

        var circtemp = new Rect(new geom.Rect([startX, startY], [newx, newy]), {
            stroke: {
                color: this.color,
                width: this.thickness
            }
        });
        // surface = draw.Surface.create(element);
        element.surface.draw(circtemp);
        // element.shapes.forEach(function (drawElement) {
        //     surface.draw(drawElement);
        // });
    };

    this.dragend = function (e) {
        var point = surfacePoint(e);
        var newx = Math.abs((point.x - this.startPoint.x));
        var newy = Math.abs((point.y - this.startPoint.y));
        var startX = (point.x - this.startPoint.x) > 0 ? this.startPoint.x : point.x;
        var startY = (point.y - this.startPoint.y) > 0 ? (point.y - newy) : point.y;

        var circtemp = new Rect(new geom.Rect([startX, startY], [newx, newy]), {
            stroke: {
                color: this.color,
                width: this.thickness
            }
        });
        // surface = draw.Surface.create(element);

        element.shapes.push(circtemp);

        // element.shapes.forEach(function (drawElement) {
        //     surface.draw(drawElement);
        // });
    };


    function surfacePoint(e) {
        e.event.preventDefault();
        var offset = element.surfaceElement.offset();
        var x = e.touch.x.location - offset.left;
        var y = e.touch.y.location - offset.top;
        return {
            x: x,
            y: y
        };
    }
}