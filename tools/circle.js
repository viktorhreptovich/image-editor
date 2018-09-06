function Circle(element) {
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    var Circle = draw.Circle;
    var surface = draw.Surface.create(element);

    var startPoint = {x: 0, y: 0};


    var touch =element.kendoTouch({
        dragstart: DragStarting,
        drag: function (e) {
            var point = surfacePoint(e);
            var endPoint = point;
            var radius = getRadius(endPoint, startPoint);
            var circtemp = new Circle(new geom.Circle([point.x, point.y], radius), {
                stroke: {
                    color: "#333",
                    width: 1
                }
            });
            surface = draw.Surface.create(element);
            surface.draw(circtemp);
            element.shapes.forEach(function (drawElement) {
                surface.draw(drawElement);
            });
        },
        dragend: function (e) {
            var point = surfacePoint(e);
            var endPoint = point;
            var radius = getRadius(endPoint, startPoint);
            var circtemp = new Circle(new geom.Circle([point.x, point.y], radius), {
                stroke: {
                    color: "#333",
                    width: 1
                }
            });
            surface = draw.Surface.create(element);

            element.shapes.push(circtemp);

            element.shapes.forEach(function (drawElement) {
                surface.draw(drawElement);
            });
        }
    });

    function DragStarting(e) {

            e.event.preventDefault();
            var point = surfacePoint(e);
            startPoint = point;
            console.log("Event from kendo: " + e.event.type);

    }

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