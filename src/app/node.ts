import * as uuid from 'uuid';
import { Element } from './element';

export class Node{
  UUID: uuid;
  Elements: Element[];
  Highlighted: boolean;
}
