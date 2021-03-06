import {Component, ElementRef, OnInit, ViewChild, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Tree} from '../tree';
import {Node} from '../node';
import { UiComponent } from '../ui/ui.component';
import * as uuid from 'uuid';

@Component({
  selector: 'app-tree-display',
  templateUrl: './tree-display.component.html',
  styleUrls: ['./tree-display.component.css']
})

/**
 * This class is responsible for transforming the b-tree from the JSON-Format to a visual representation in HTML using the HTML canvas.
 */
export class TreeDisplayComponent implements OnInit, OnChanges {


  @ViewChild('canvas', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;

  @Input() childTree: Tree;
  @Input() highlighted: uuid;

  private bTree: Tree;
  canvasWidth: number;
  canvasHeight: number;
  private firstElementsInRow: Node[] = [];
  private numberNodesInRow: number[] = [];
  private nodeXPositionLookupTable: number[] = [];
  private nodeYPositionLookupTable: number[] = [];
  private ctx: CanvasRenderingContext2D;

  constructor( private data: UiComponent) {
  }

  /**
   * On change of the tree the tree gets transformed to a Tree-Object, the canvas gets initialized and the draw-method gets called.
   * @param changes: The changes Interface that fetches if the childTree-attribute did change.
   */
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if ( this.childTree !=  null ) {
      this.bTree = this.childTree;
      await this.initCanvas();
      await this.setTreeMetrics();
      await this.drawTree();
    }
  }

  async ngOnInit(): Promise<void> {}

  /**
   * This method initializes the canvas based on the number of elements in the tree.
   */
  private async initCanvas(): Promise<void> {
    this.canvasHeight = this.bTree.Height * 130;
    this.canvasWidth = this.bTree.NumberLeaves * (this.bTree.Order - 1) * 40 + 100;

    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.stroke();
  }

  /**
   * This method draws the actual representation of the tree.
   * First, it iterates threw the arrays that describe the dimensions of the tree, and creates a rectangle for every node.
   * Into this rectangle will be written the elements of the node, additionally the positions of the rectangle get saved.
   *
   * After all rectangles have been created, the edges will be drawn, based on the position of the elements, and the nodes where
   * they are pointing to. Therefore, the method iterates over all nodes and elements of the nodes and draws a line if a left or
   * right reference is there. The positions to draw the lines to are taken out of the node position lookup tables.
   */
  private async drawTree(): Promise<void> {
    if (this.bTree.Nodes != null) {
      let nodeIndex = 0;
      const width = (this.bTree.Order - 1) * 32;
      for (let i = 0; i < this.bTree.Height; i++) {
        for (let j = 0; j < this.numberNodesInRow[i]; j++) {
          const x = (j * width) + (j + 1) * (((this.canvasWidth) - width * this.numberNodesInRow[i]) / (this.numberNodesInRow[i] + 1));
          const y = i * 130 + 50;
          if (this.highlighted === this.bTree.Nodes[nodeIndex].UUID) {
            this.ctx.fillStyle = '#42d232';
          } else {
            this.ctx.fillStyle = '#369';
          }

          this.ctx.fillRect(x, y, width, 30);

          this.nodeXPositionLookupTable[nodeIndex] = x;
          this.nodeYPositionLookupTable[nodeIndex] = y;

          this.ctx.fillStyle = 'white';
          this.ctx.font = '25px helvetica';
          for (let k = 0; k < this.bTree.Nodes[nodeIndex].Elements.length; k++) {
            this.ctx.fillText(String(this.bTree.Nodes[nodeIndex].Elements[k].Value), x + 5 + k * 30, y + 23, 25);
          }
          ++nodeIndex;
        }
      }
      this.ctx.fillStyle = 'black';
      for (let i = 0; i < this.bTree.Nodes.length; i++) {
        for (let k = 0; k < this.bTree.Nodes[i].Elements.length; k++) {
          if (this.bTree.Nodes[i].Elements[k].Left != null) {
            this.ctx.moveTo(this.nodeXPositionLookupTable[i] + 5 + k * 30, this.nodeYPositionLookupTable[i] + 30);
            const endNodeIndex = this.bTree.Nodes.findIndex(n => n.UUID === this.bTree.Nodes[i].Elements[k].Left);
            this.ctx.lineTo(this.nodeXPositionLookupTable[endNodeIndex] + width / 2, this.nodeYPositionLookupTable[endNodeIndex]);
          }
          if (this.bTree.Nodes[i].Elements[k].Right != null) {
            this.ctx.moveTo(this.nodeXPositionLookupTable[i] + 35 + k * 30, this.nodeYPositionLookupTable[i] + 30);
            const endNodeIndex = this.bTree.Nodes.findIndex(n => n.UUID === this.bTree.Nodes[i].Elements[k].Right);
            this.ctx.lineTo(this.nodeXPositionLookupTable[endNodeIndex] + width / 2, this.nodeYPositionLookupTable[endNodeIndex]);
          }
        }
      }
      this.ctx.stroke();
    }
  }


  /**
   * This method extracts the first element of each row and counts the elements per row, to use this metrics for drawing the tree.
   */
  private async setTreeMetrics(): Promise<void> {
    this.resetTreeMetrics();

    let i = 0; // RowIterator
    let j = 1; // NodeIterator
    let k = 1;
    if (this.bTree.Nodes != null) {
      if (this.bTree.Nodes.length > 0) {
        // Adding the root
        this.firstElementsInRow[0] = this.bTree.Nodes[0];

        if (this.bTree.Nodes.length > 1) {
          while (this.bTree.Nodes[j - 1].Elements[0].Left != null) {
            // Start new row
            if (this.firstElementsInRow[i].Elements[0].Left === this.bTree.Nodes[j].UUID) {
              this.firstElementsInRow.push(this.bTree.Nodes[j]);
              this.numberNodesInRow[i] = k;
              ++i;
              k = 0;
            }
            ++j;
            ++k;
          }
          this.numberNodesInRow.push(this.bTree.NumberLeaves);
        } else {
          this.numberNodesInRow.push(1);
        }
      }
    }
  }

  private resetTreeMetrics(): void {
    this.numberNodesInRow = [];
    this.firstElementsInRow = [];
  }
}


