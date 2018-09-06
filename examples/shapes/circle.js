class Circle{

    constructor(){
        this.geometry = kendo.geometry;
        this.circle = kendo.drawing.Circle;
        this.startPoint = new this.geometry.Point(0,0);
        this.endPoint = new this.geometry.Point(0,0);
        this.color = 'black';
        this.thickness = 1;
    }

    getShape(){
        var radius = this.getRadius(this.endPoint,this.startPoint);
        var circle = new this.circle(new this.geometry.Circle(this.endPoint,radius),{
            stroke: {
                color: this.color,
                width: this.thickness
            }
        });
        return circle;
    }

    draw(surface){
        var shape = this.getShape();
        surface.draw(shape);
    }

    getRadius(point1,point2){
        return Math.sqrt( Math.pow((point2.x-point1.x), 2) + Math.pow((point2.y-point1.y), 2) );
    }
}

