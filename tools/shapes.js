(function ($) {
    $.uuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
})(jQuery);

//********************* Pencil *************************************************
function Pencil(element) {
    this.id = $.uuid();
    this.color = element.currentTool.color;
    this.thickness = element.currentTool.thickness;
    this.multipath = [];
    this.multipath.push(element.currentTool.startPoint);

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
}

//********************* Line *************************************************
function Line(element) {
    this.id = $.uuid();
    this.startPoint = element.currentTool.startPoint;
    this.endPoint = element.currentTool.currentPoint;
    this.color = element.currentTool.color;
    this.thickness = element.currentTool.thickness;

    this.shape = function () {
        return new kendo.drawing.Path({
            stroke: {
                color: this.color,
                width: this.thickness
            }

        }).moveTo(this.startPoint).lineTo(this.endPoint).close();
    }


    this.containsPoint = function (point) {


        function inLine(x, y, x1, y1, x2, y2) {

            var xin1 = ((x1 - 1)) < x && (x < (x2 + 1));
            var xin2 = ((x2 - 1)) < x && (x < (x1 + 1));
            var yin1 = ((y1 - 1)) < y && (y < (y2 + 1));
            var yin2 = ((y2 - 1)) < y && (y < (y1 + 1));
            return (xin1 || xin2) && (yin1 || yin2) && Math.abs(dz(x, y, x1, y1, x2, y2)) < 1000;
        }

        function dz(x, y, x1, y1, x2, y2) {
            return ((x - x1) * (y2 - y1) - (y - y1) * (x2 - x1));
        }

        if (inLine(
            point.x,
            point.y,
            this.startPoint.x,
            this.startPoint.y,
            this.endPoint.x,
            this.endPoint.y
        )) {

            element.surfaceElement.css('cursor', 'move');
            return true;
        } else {
            element.surfaceElement.css('cursor', 'default');
            return false;
        }
    }

    this.selectShape = function () {
        var sideSelect = Number(this.thickness) + 5;
        var dzSideSelect = sideSelect / 2;
        var startPointSelect1 = new kendo.geometry.Point(this.startPoint.x - dzSideSelect, this.startPoint.y - dzSideSelect);
        var rec1 = new kendo.drawing.Rect(new kendo.geometry.Rect(startPointSelect1, [sideSelect, sideSelect]), {
            stroke: {
                color: "blue",
                width: 1
            }
        });
        var startPointSelect2 = new kendo.geometry.Point(this.endPoint.x - dzSideSelect, this.endPoint.y - dzSideSelect);
        var rec2 = new kendo.drawing.Rect(new kendo.geometry.Rect(startPointSelect2, [sideSelect, sideSelect]), {
            stroke: {
                color: "blue",
                width: 1
            }
        });
        element.surface.draw(rec1);
        element.surface.draw(rec2);
    }

}

//********************* Text *************************************************
function Text(element) {
    this.id = $.uuid();
    this.startPoint = element.currentTool.startPoint;
    this.endPoint = element.currentTool.currentPoint;
    this.color = element.currentTool.color;
    this.thickness = element.currentTool.thickness;
    this.font = element.currentTool.font;
    this.text = element.currentTool.text ? element.currentTool.text : "Enter text";

    this.shape = function () {
        return new kendo.drawing.Text(this.text, this.endPoint, {
            fill: {
                color: this.color
            },
            font: this.font
        });
    }
}

