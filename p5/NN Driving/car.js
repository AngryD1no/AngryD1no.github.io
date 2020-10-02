class car {
  constructor(brain, position, direction) {
    this.brain = brain;
    this.pos = position;
    this.vel = 0;
    this.fitness = 0;
    this.angle = direction;
    this.length = 20;
    this.width = 10;
    this.driving = true;
    this.steering = 0;
    this.acc = 0;
    this.score = 0;
    this.input = [];
    this.rays = [];
    this.output = [];
    this.new_pos;
  }
  show(){
    rectMode(CENTER,CENTER);
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.angle);
    strokeWeight(0);
    fill(200,0,0);
    rect(0,0,20,10)
    image(img,-10,-5,20,10);
    pop();
  }
  update(){
    if (this.driving) {
      for (var i = 0; i < 5; i++) {
        this.rays[i] = new Ray(this.pos.x,this.pos.y,p5.Vector.fromAngle(this.angle+4*i/4 - 2));
        this.input[i] = this.rays[i].cast(track1);
      }

      if (this.rays[2].cast_checkpoints(track1,this.score) < this.width){
        this.score++;
      }


      for (var i = 0; i < this.input.length-2; i++) {
        if(this.input[i] < this.vel || this.input[i] < this.width){
          this.driving = false;
        }
        this.input[i] = map(this.input[i],0,1000,0,1);
        this.fitness += this.score * this.input[i] * this.vel;
      }


      //this.input[5] = (this.score % track1.checkpoints.length)/track1.checkpoints.length;
      this.input[5] = map(this.vel,-4,4,0,1);

      this.output = this.brain.feedforward(this.input);
      this.acc = map(this.output[0],0,1,-0.15,0.2);
      this.steering = map(this.output[1],0,1,-0.5,0.5)

      if (this.steering != 0) {
        this.turning_radius = this.length / tan(this.steering)+10*this.vel;
        this.angular_velocity = this.vel / this.turning_radius;
      }else {
        this.angular_velocity = 0;
      }


      this.vel += this.acc;
      this.vel *= 0.97;
      if (this.vel > 8) {
        this.vel = 8;
      }else if (this.vel < -8) {
		  this.vel = -8
	  }
	  
      this.new_pos = p5.Vector.add(p5.Vector.fromAngle(this.angle,this.vel),this.pos);
      this.pos = this.new_pos;

      this.angle += this.angular_velocity;
    }



  }
}
