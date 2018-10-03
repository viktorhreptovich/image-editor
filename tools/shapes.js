var Group = kendo.drawing.Group;
var MultiPath = kendo.drawing.MultiPath;
var Path = kendo.drawing.Path;
var Rect = kendo.drawing.Rect;
var DrawCircle = kendo.drawing.Circle;
var Point = kendo.geometry.Point;
var GeomRect = kendo.geometry.Rect;
var GeomCircle = kendo.geometry.Circle;
var DrawText = kendo.drawing.Text;
var strokeSelect = {stroke: {color: "blue", width: 1}};

function selection(points, thickness) {
    var sideSelect = Number(thickness) + 5;
    var dzSideSelect = sideSelect / 2;
    var group = new Group();
    $.each(points, function (index, point) {
        var rect = new Rect(new GeomRect([point.x - dzSideSelect, point.y - dzSideSelect], [sideSelect, sideSelect]), strokeSelect);
        group.append(rect);
    });
    return group;
};

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

function Shape(imageEditor) {
    this.id = uuid();
    this.startPoint = imageEditor.currentTool.startPoint;
    this.endPoint = imageEditor.currentTool.currentPoint;
    this.color = imageEditor.currentTool.color;
    this.thickness = imageEditor.currentTool.thickness;
    this.selected = false;

    this.containsPoint = function (point) {
        //get the shape from group
        var tempShape = this.shape().children[0];
        if (tempShape.stroke()) tempShape.stroke().width = 10;
        var contains = tempShape.containsPoint(point);
        var cursor = contains ? 'move' : 'default';
        imageEditor.elementSurface.css('cursor', cursor);
        return contains;
    }

    this.strokeShape = function () {
        return {stroke: {color: this.color, width: this.thickness}};
    }

    this.moveShape = function (offset) {
        this.startPoint = new Point(this.startPoint.x - offset.x, this.startPoint.y - offset.y);
        this.endPoint = new Point(this.endPoint.x - offset.x, this.endPoint.y - offset.y);
    }
}

//********************* Pencil *************************************************
function Pencil(imageEditor) {
    Shape.apply(this, arguments);
    this.multipath = [];
    this.multipath.push(imageEditor.currentTool.startPoint);

    this.shape = function () {
        var shape = new MultiPath(this.strokeShape());
        $.each(this.multipath, function (index, point) {
            (index == 0) ? shape.moveTo(point) : shape.lineTo(point).moveTo(point)
        });
        var group = new Group().append(shape);
        if (this.selected) {
            var pointSelect1 = new Point(this.startPoint.x, this.startPoint.y);
            var pointSelect2 = new Point(this.endPoint.x, this.endPoint.y);
            group.append(selection([pointSelect1, pointSelect2], this.thickness));
        }
        return group;
    }

    this.moveShape = function (offset) {
        this.startPoint = new Point(this.startPoint.x - offset.x, this.startPoint.y - offset.y);
        this.endPoint = new Point(this.endPoint.x - offset.x, this.endPoint.y - offset.y);
        var movemultipath = [];
        $.each(this.multipath, function (index, point) {
            movemultipath.push(new Point(point.x - offset.x, point.y - offset.y));
        });
        this.multipath = movemultipath;
    }
}

//********************* Line *************************************************
function Line(imageEditor) {
    Shape.apply(this, arguments);

    this.shape = function () {
        var shape = new Path(this.strokeShape()).moveTo(this.startPoint).lineTo(this.endPoint).close();
        var group = new Group().append(shape);
        if (this.selected) {
            var pointSelect1 = new Point(this.startPoint.x, this.startPoint.y);
            var pointSelect2 = new Point(this.endPoint.x, this.endPoint.y);
            group.append(selection([pointSelect1, pointSelect2], this.thickness));
        }
        return group;
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
        var shape = new Rect(new GeomRect([startX, startY], [newx, newy]), this.strokeShape());
        var group = new Group().append(shape);
        if (this.selected) {
            var pointSelect1 = new kendo.geometry.Point(this.startPoint.x, this.startPoint.y);
            var pointSelect2 = new kendo.geometry.Point(this.startPoint.x, this.endPoint.y);
            var pointSelect3 = new kendo.geometry.Point(this.endPoint.x, this.startPoint.y);
            var pointSelect4 = new kendo.geometry.Point(this.endPoint.x, this.endPoint.y);
            group.append(selection([pointSelect1, pointSelect2, pointSelect3, pointSelect4], this.thickness));
        }
        return group;
    }
}

//********************* Circle *************************************************
function Circle(imageEditor) {
    Shape.apply(this, arguments);

    this.shape = function () {
        var radius = this.getDistance(this.endPoint, this.startPoint);
        var shape = new DrawCircle(new GeomCircle([this.startPoint.x, this.startPoint.y], radius), this.strokeShape());
        var group = new Group().append(shape);
        if (this.selected) {
            var pointSelect1 = new Point(this.startPoint.x + radius, this.startPoint.y);
            var pointSelect2 = new Point(this.startPoint.x - radius, this.startPoint.y);
            var pointSelect3 = new Point(this.startPoint.x, this.startPoint.y + radius);
            var pointSelect4 = new Point(this.startPoint.x, this.startPoint.y - radius);
            group.append(selection([pointSelect1, pointSelect2, pointSelect3, pointSelect4], this.thickness));
        }
        return group;
    }

    this.getDistance = function (point1, point2) {
        return Math.sqrt(Math.pow((point2.x - point1.x), 2) + Math.pow((point2.y - point1.y), 2));
    }
}

//********************* Text *************************************************
function Text(imageEditor) {
    Shape.apply(this, arguments);
    this.font = imageEditor.currentTool.font;
    this.text = imageEditor.currentTool.text ? imageEditor.currentTool.text : "Enter text";

    this.shape = function () {
        var shape = new DrawText(this.text, this.startPoint, {fill: {color: this.color}, cursor: 'move', font: this.font,});
        var group = new Group().append(shape);
        if (this.selected) {
            group.append(new Rect(shape.bbox(), strokeSelect));
        }
        return group;
    }

    this.tempShape = function () {
        var group = new Group;
        var temptext = new DrawText(this.text, this.startPoint, {fill: {color: this.color}, cursor: 'move', font: this.font});
        var temprect = new Rect(temptext.bbox(), {stroke: {color: 'black', width: 1, dashType: 'dot'}});
        group.append(temptext, temprect);
        return group;
    }
}