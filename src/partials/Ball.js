import { SVG_NS } from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ping = new Audio('public/sounds/pong-03.wav');

    // centre ball on board initially
    this.reset();
  }

  reset() {
    this.x = this.boardWidth/2;
    this.y = this.boardHeight/2;

    // generate a random number between -5 and 5, that's not 0
    this.vy = 0;

    while(this.vy === 0 ) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }

    // a number between -5 and 5, based on the vy
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }

  paddleCollision(paddle1, paddle2) {
    // if moving towards the right...
    if (this.vx > 0) {
    // check for collision on paddle2

    let paddle = paddle2.coordinates(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    let [leftX, rightX, topY, bottomY] = paddle;

    if ( 
      this.x + this.radius >= leftX // the right edge of the ball is >= the left edge of paddle
      && this.x + this.radius <= rightX // && the right edge of the ball <= right edge of paddle
      && this.y >= topY // && the ball Y is >= the top edge of the paddle
      && this.y <= bottomY // && the ball is <= the bottom edge of the paddle

    ) {
      this.vx = -this.vx;
      this.ping.play();
    }

    } else {
    // else check for collision on paddle1
    let paddle = paddle1.coordinates(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    let [leftX, rightX, topY, bottomY] = paddle;
    
    if (
      this.x - this.radius <= rightX // left edge of ball is <= right edge of the paddle
      && this.x - this.radius >= leftX // && left edge of ball is >= left edge of the paddle
      && this.y >= topY // && ball Y >= paddle top
      && this. y <= bottomY // && ball Y <= paddle bottom

    ) {
     this.vx = -this.vx;
     this.ping.play();
      }
    }
  }

  goal(paddle) {
    paddle.score++;
    if ((paddle.x > 493) && (paddle.score === 10)) {
      alert('Right Paddle Wins!')
      document.location.reload();
    } else if ((paddle.x < 493) && (paddle.score === 10)) {
      alert('Left Paddle Wins!')
      document.location.reload();
    } else {
    this.reset();
    }
  }

  render(svg, paddle1, paddle2) {
    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();
    this.paddleCollision(paddle1, paddle2);

    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'fill', '#ffffff');
    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y);
    
    svg.appendChild(circle);

    // detect goal
    const rightGoal = this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;

    if (rightGoal) {
      this.goal(paddle1);
      this.direction = 1;

    } else if (leftGoal) {
      this.goal(paddle2);
      this.direction = -1;
    }
  }
}