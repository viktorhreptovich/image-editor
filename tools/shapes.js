(function ($) {
    $.uuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
})(jQuery);

function Shape(imageEditor) {
    this.id = $.uuid();
    this.startPoint = imageEditor.currentTool.startPoint;
    this.endPoint = imageEditor.currentTool.currentPoint;
    this.color = imageEditor.currentTool.color;
    this.thickness = imageEditor.currentTool.thickness;

    this.containsPoint = function (point) {
        var temp = this.shape();
        temp.stroke().width = 10;
        var contains = temp.containsPoint(point);
        console.log(contains);
        if (contains) {
            imageEditor.elementSurface.css('cursor', 'move');
            return true;
        } else {
            imageEditor.elementSurface.css('cursor', 'default');
            return false;
        }
    }
}


//********************* Pencil *************************************************
function Pencil(imageEditor) {
    Shape.apply(this, arguments);

    this.multipath = [];
    this.multipath.push(imageEditor.currentTool.startPoint);

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
        imageEditor.surface.draw(rec1);
        imageEditor.surface.draw(rec2);
    }
}

//********************* Line *************************************************
function Line(imageEditor) {
    Shape.apply(this, arguments);

    this.shape = function () {
        return new kendo.drawing.Path({
            stroke: {
                color: this.color,
                width: this.thickness
            }

        }).moveTo(this.startPoint).lineTo(this.endPoint).close();
    }


    // this.containsPoint = function (point) {
    //
    //
    //     function inLine(x, y, x1, y1, x2, y2) {
    //
    //         var xin1 = ((x1 - 1)) < x && (x < (x2 + 1));
    //         var xin2 = ((x2 - 1)) < x && (x < (x1 + 1));
    //         var yin1 = ((y1 - 1)) < y && (y < (y2 + 1));
    //         var yin2 = ((y2 - 1)) < y && (y < (y1 + 1));
    //         return (xin1 || xin2) && (yin1 || yin2) && Math.abs(dz(x, y, x1, y1, x2, y2)) < 1000;
    //     }
    //
    //     function dz(x, y, x1, y1, x2, y2) {
    //         return ((x - x1) * (y2 - y1) - (y - y1) * (x2 - x1));
    //     }
    //
    //     if (inLine(
    //         point.x,
    //         point.y,
    //         this.startPoint.x,
    //         this.startPoint.y,
    //         this.endPoint.x,
    //         this.endPoint.y
    //     )) {
    //
    //         imageEditor.elementSurface.css('cursor', 'move');
    //         return true;
    //     } else {
    //         imageEditor.elementSurface.css('cursor', 'default');
    //         return false;
    //     }
    // }

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
        imageEditor.surface.draw(rec1);
        imageEditor.surface.draw(rec2);
    }

}

//********************* Rectangle *************************************************
function Rectangle(imageEditor) {
    Shape.apply(this, arguments);

    this.shape = function () {
        var newx = Math.abs((this.endPoint.x - this.startPoint.x));
        var newy = Math.abs((this.endPoint.y - this.startPoint.y));
        var startX = (this.endPoint.x - this.startPoint.x) > 0 ? this.startPoint.x : this.endPoint.x;
        var startY = (this.endPoint.y - this.startPoint.y) > 0 ? (this.endPoint.y - newy) : this.endPoint.y;
        return new kendo.drawing.Rect(new kendo.geometry.Rect([startX, startY], [newx, newy]), {
            stroke: {
                color: this.color,
                width: this.thickness
            }
        });
    }

    this.selectShape = function () {
        var group = new kendo.drawing.Group;
        var sideSelect = Number(this.thickness) + 5;
        var dzSideSelect = sideSelect / 2;
        var startPointSelect1 = new kendo.geometry.Point(this.startPoint.x - dzSideSelect, this.startPoint.y - dzSideSelect);
        var rec1 = new kendo.drawing.Rect(new kendo.geometry.Rect(startPointSelect1, [sideSelect, sideSelect]), {
            stroke: {
                color: "blue",
                width: 1
            }
        });
        var startPointSelect2 = new kendo.geometry.Point(this.startPoint.x - dzSideSelect, this.endPoint.y - dzSideSelect);
        var rec2 = new kendo.drawing.Rect(new kendo.geometry.Rect(startPointSelect2, [sideSelect, sideSelect]), {
            stroke: {
                color: "blue",
                width: 1
            }
        });
        var startPointSelect3 = new kendo.geometry.Point(this.endPoint.x - dzSideSelect, this.startPoint.y - dzSideSelect);
        var rec3 = new kendo.drawing.Rect(new kendo.geometry.Rect(startPointSelect3, [sideSelect, sideSelect]), {
            stroke: {
                color: "blue",
                width: 1
            }
        });
        var startPointSelect4 = new kendo.geometry.Point(this.endPoint.x - dzSideSelect, this.endPoint.y - dzSideSelect);
        var rec4 = new kendo.drawing.Rect(new kendo.geometry.Rect(startPointSelect4, [sideSelect, sideSelect]), {
            stroke: {
                color: "blue",
                width: 1
            }
        });
        group.append(rec1, rec2, rec3, rec4)
        imageEditor.surface.draw(group);
    }
}

//********************* Circle *************************************************
function Circle(imageEditor) {
    Shape.apply(this, arguments);

    this.shape = function () {
        var radius = this.getDistance(this.endPoint, this.startPoint);
        return new kendo.drawing.Circle(new kendo.geometry.Circle([this.startPoint.x, this.startPoint.y], radius), {
            stroke: {
                color: this.color,
                width: this.thickness
            }
        });
    }

    this.getDistance = function (point1, point2) {
        return Math.sqrt(Math.pow((point2.x - point1.x), 2) + Math.pow((point2.y - point1.y), 2));
    }

    this.selectShape = function () {
        var group = new kendo.drawing.Group;
        var sideSelect = Number(this.thickness) + 5;
        var radius = this.getDistance(this.endPoint, this.startPoint);
        var dzSideSelect = sideSelect / 2;
        var startPointSelect1 = new kendo.geometry.Point(this.startPoint.x - dzSideSelect + radius, this.startPoint.y - dzSideSelect);
        var rec1 = new kendo.drawing.Rect(new kendo.geometry.Rect(startPointSelect1, [sideSelect, sideSelect]), {
            stroke: {
                color: "blue",
                width: 1
            }
        });
        var startPointSelect2 = new kendo.geometry.Point(this.startPoint.x - dzSideSelect - radius, this.startPoint.y - dzSideSelect);
        var rec2 = new kendo.drawing.Rect(new kendo.geometry.Rect(startPointSelect2, [sideSelect, sideSelect]), {
            stroke: {
                color: "blue",
                width: 1
            }
        });
        var startPointSelect3 = new kendo.geometry.Point(this.startPoint.x - dzSideSelect, this.startPoint.y - dzSideSelect + radius);
        var rec3 = new kendo.drawing.Rect(new kendo.geometry.Rect(startPointSelect3, [sideSelect, sideSelect]), {
            stroke: {
                color: "blue",
                width: 1
            }
        });
        var startPointSelect4 = new kendo.geometry.Point(this.startPoint.x - dzSideSelect, this.startPoint.y - dzSideSelect - radius);
        var rec4 = new kendo.drawing.Rect(new kendo.geometry.Rect(startPointSelect4, [sideSelect, sideSelect]), {
            stroke: {
                color: "blue",
                width: 1
            }
        });
        group.append(rec1, rec2, rec3, rec4)
        imageEditor.surface.draw(group);
    }
}

//********************* Text *************************************************
function Text(imageEditor) {
    Shape.apply(this, arguments);
    this.font = imageEditor.currentTool.font;
    this.text = imageEditor.currentTool.text ? imageEditor.currentTool.text : "Enter text";

    this.shape = function () {
        return new kendo.drawing.Text(this.text, this.startPoint, {
            fill: {
                color: this.color
            },
            cursor: 'move',
            font: this.font
        });
    }

    this.selectShape = function () {
        // var group = new kendo.drawing.Group;
        var temptext = new kendo.drawing.Text(this.text, this.startPoint, {
            fill: {
                color: this.color
            },
            cursor: 'move',
            font: this.font
        });
        var tempbox = temptext.bbox();
        var temprect = new kendo.drawing.Rect(tempbox, {
            stroke: {
                color: 'blue',
                width: 1
            }
        });
        // group.append(temptext);
        // group.append(temprect);
        imageEditor.surface.draw(temprect);
    }

    this.tempShape = function () {
        var group = new kendo.drawing.Group;
        var temptext = new kendo.drawing.Text(this.text, this.startPoint, {
            fill: {
                color: this.color
            },
            cursor: 'move',
            font: this.font
        });
        var tempbox = temptext.bbox();
        var temprect = new kendo.drawing.Rect(tempbox, {
            stroke: {
                color: 'black',
                width: 1,
                dashType: 'dot'
            }
        });
        group.append(temptext);
        group.append(temprect);
        return group;
    }

    this.containsPoint = function (point) {
        var contains = this.shape().containsPoint(point);
        if (contains) {
            return true;
        } else {
            return false;
        }
    }
}

