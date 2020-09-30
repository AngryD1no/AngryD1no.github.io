class track {
  constructor(inside,outside) {
    this.inside = inside;
    this.walls = [];
    this.checkpoints = [];
    this.outside = outside;
    for (var i = 0; i < inside.length-1; i++) {
      this.walls[i] = new Boundary(inside[i],inside[i+1]);
    }
    this.walls[inside.length-1] = new Boundary(inside[inside.length-1],inside[0]);
    for (var i = 0; i < outside.length-1; i++) {
      this.walls[i+inside.length] = new Boundary(outside[i],outside[i+1]);
    }
    this.walls[outside.length+inside.length-1] = new Boundary(outside[outside.length-1],outside[0]);
    for (var i = 0; i < this.inside.length; i++) {
      this.checkpoints[i] = new Boundary(inside[i],outside[i]);
    }
  }
  show(){
    stroke(0);
    strokeWeight(5);
    for (var i = 0; i < this.walls.length; i++) {
      this.walls[i].show();
    }
    fill(100);
    beginShape();
    for (var i = 0; i < this.outside.length; i++) {
      vertex(this.outside[i].x,this.outside[i].y);
    }
    endShape(CLOSE);
    fill(50,200,50);
    beginShape();
    for (var i = 0; i < this.inside.length; i++) {
      vertex(this.inside[i].x,this.inside[i].y);
    }
    endShape(CLOSE);
    stroke(255);
    strokeWeight(1);
    // for (var i = 0; i < this.checkpoints.length; i++) {
    //   this.checkpoints[i].show();
    // }
  }
}
