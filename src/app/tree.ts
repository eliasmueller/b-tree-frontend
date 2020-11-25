import { Node } from './node';
import * as uuid from 'uuid';

export class Tree {
  Order: number;
  Height: number;
  NumberLeaves: number;
  Highlighted: uuid;
  Nodes: Node[];
}
