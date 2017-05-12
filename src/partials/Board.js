import { SVG_NS } from '../settings';

export default class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.fillColor = '#353535';
    this.lineColor = '#ffffff';

  }

  render(svg) {
    let rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'x', '0');
    rect.setAttributeNS(null, 'y', '0');
    rect.setAttributeNS(null, 'fill', this.fillColor);
    svg.appendChild(rect);

    let line = document.createElementNS(SVG_NS, 'line');
    line.setAttributeNS(null, 'x1', this.width/2);
    line.setAttributeNS(null, 'x2', this.width/2);
    line.setAttributeNS(null, 'y1', '0');
    line.setAttributeNS(null, 'y2', this.height);
    line.setAttributeNS(null, 'stroke', this.lineColor);
    line.setAttributeNS(null, 'stroke-width', '4');
    line.setAttributeNS(null, 'stroke-dasharray', '20, 14');
    
    svg.appendChild(line);
  }
}