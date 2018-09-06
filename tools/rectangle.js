function Rectangle(element) {
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    var Rect = draw.Rect;
    var surface = draw.Surface.create(element);

    var startPoint = {x: 0, y: 0};
    element.kendoTouch = null;
    element.kendoTouch({
        dragstart: function (e) {
            e.event.preventDefault();
            var point = surfacePoint(e);
            startPoint = point;
        },
        drag: function (e) {
            var point = surfacePoint(e);
            var newx = Math.abs((point.x - startPoint.x));
            var newy = Math.abs((point.y - startPoint.y));
            var startX = (point.x - startPoint.x) > 0 ? startPoint.x : point.x;
            var startY = (point.y - startPoint.y) > 0 ? (point.y - newy) : point.y;

            var circtemp = new Rect(new geom.Rect([startX, startY], [newx, newy]), {
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
            var newx = Math.abs((point.x - startPoint.x));
            var newy = Math.abs((point.y - startPoint.y));
            var startX = (point.x - startPoint.x) > 0 ? startPoint.x : point.x;
            var startY = (point.y - startPoint.y) > 0 ? (point.y - newy) : point.y;

            var circtemp = new Rect(new geom.Rect([startX, startY], [newx, newy]), {
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
}