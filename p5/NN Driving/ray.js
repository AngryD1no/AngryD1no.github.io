class Ray {
  constructor(x,y,dir) {
    this.pos = createVector(x,y);
    this.dir = dir;
  }
  cast(track){
    let dist = width + height;
    for (var i = 0; i < track.walls.length; i++) {
      let wall = track.walls[i];

      let x1 = wall.a.x;
      let y1 = wall.a.y;
      let x2 = wall.b.x;
      let y2 = wall.b.y;

      let x3 = this.pos.x;
      let y3 = this.pos.y;
      let x4 = this.pos.x + this.dir.x;
      let y4 = this.pos.y + this.dir.y;



      let den = (x1-x2) * (y3 - y4) - (y1-y2) * (x3-x4);

      if (den != 0) {
        let t = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4)) / den;
        let u = -((x1-x2)*(y1-y3)-(y1-y2)*(x1-x3)) / den;

        if (t > 0 && t<1 && u>0) {
          let pt = createVector();
          pt.x = x1 + t * (x2 - x1);
          pt.y = y1 + t * (y2-y1);
          if (pt.dist(this.pos) < dist) {
            dist = pt.dist(this.pos);
          }
        }
      }

    }
    return dist;
  }
  cast_checkpoints(track,score){
    let cp = score % track.checkpoints.length;
    let wall = track.checkpoints[cp];

    let x1 = wall.a.x;
    let y1 = wall.a.y;
    let x2 = wall.b.x;
    let y2 = wall.b.y;

    let x3 = this.pos.x;
    let y3 = this.pos.y;
    let x4 = this.pos.x + this.dir.x;
    let y4 = this.pos.y + this.dir.y;



    let den = (x1-x2) * (y3 - y4) - (y1-y2) * (x3-x4);

    if (den != 0) {
      let t = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4)) / den;
      let u = -((x1-x2)*(y1-y3)-(y1-y2)*(x1-x3)) / den;

      if (t > 0 && t<1 && u>0) {
        let pt = createVector();
        pt.x = x1 + t * (x2 - x1);
        pt.y = y1 + t * (y2-y1);
        return pt.dist(this.pos)
      }
    }
  }
}
