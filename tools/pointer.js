function Pointer(element) {
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
        element.shapes.forEach(function (drawElement) {
            surface.draw(drawElement);
        });
    };

    this.dragend = function (e) {
        var point = surfacePoint(e);
        element.shapes.forEach(function (drawElement) {
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
}