class Rectangle{

    constructor(){
        this.geometry = kendo.geometry;
        this.rectangle = kendo.drawing.Rect;
        this.startPoint = new this.geometry.Point(0,0);
        this.endPoint = new this.geometry.Point(0,0);
        this.color = 'black';
        this.thickness = 1;
    }

    getShape(){
        var width = Math.abs((this.endPoint.x - this.startPoint.x));
        var height = Math.abs((this.endPoint.y - this.startPoint.y));
        var startX = (this.endPoint.x - this.startPoint.x) > 0 ? this.startPoint.x : this.endPoint.x;
        var startY = (this.endPoint.y - this.startPoint.y) > 0 ? (this.endPoint.y - height) : this.endPoint.y;

        var rectangle = new this.rectangle(new this.geometry.Rect([startX,startY],[width,height]),{
            stroke: {
                color: this.color,
                width: this.thickness
            }
        });
        return rectangle;
    }

    draw(surface){
        var shape = this.getShape();
        surface.draw(shape);
    }
}