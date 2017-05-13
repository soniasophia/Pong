import { SVG_NS, KEYS, SCORE, PADDLES, BALL } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
	
		this.gameElement = document.getElementById(element);

		this.board = new Board(this.width, this.height);

		this.paddle1 = new Paddle(this.height, PADDLES.paddleWidth, PADDLES.paddleHeight, PADDLES.padding, (this.height-PADDLES.paddleHeight)/2, KEYS.a, KEYS.z);

		this.paddle2 = new Paddle(this.height, PADDLES.paddleWidth, PADDLES.paddleHeight, (this.width-PADDLES.paddleWidth-PADDLES.padding), (this.height-PADDLES.paddleHeight)/2, KEYS.up, KEYS.down);

		this.ball = new Ball(BALL.radius, this.width, this.height);
		
		this.paddle1score = new Score(this.width/2 - SCORE.distance-15, SCORE.topDistance, SCORE.size);
		this.paddle2score = new Score(this.width/2 + SCORE.distance, SCORE.topDistance, SCORE.size);

		document.addEventListener('keydown', event => {
			if(event.key === KEYS.spaceBar) {
				this.pause = !this.pause;
			}
		})
	}

	render() {
		if (this.pause) {
			return;
		}

		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);

		this.gameElement.appendChild(svg);

		this.board.render(svg);
		this.paddle1.render(svg);
		this.paddle2.render(svg);
		this.ball.render(svg, this.paddle1, this.paddle2);
		this.paddle1score.render(svg, this.paddle1.score);
		this.paddle2score.render(svg, this.paddle2.score);
	}
}