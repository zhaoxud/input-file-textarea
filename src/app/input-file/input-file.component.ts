import {Component, EventEmitter, OnInit} from '@angular/core';
import {read} from "fs";

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css']
})
export class InputFileComponent implements OnInit {
  keyName: string = 'key';
  valueName: string = 'value';
  file: any;
  textareaContent: string;
  items: Map<string, string> = new Map();
  newPairs: any[];

  constructor() { }

  ngOnInit() {
    if (!this.newPairs) {
      this.newPairs = [];
      this.addPair();
    }
  }

  onFileChange(event, key) {
    const reader = new FileReader();
    reader.readAsText(event.srcElement.files[0]);
    const me = this;
    reader.onload = function () {
      me.newPairs[key].value = reader.result;
    };
  }

  onClear() {
    this.file = null;
    this.textareaContent = null;
  }

  addPair(): void {
    const pair = {};
    pair[this.keyName] = '';
    pair[this.valueName] = '';
    this.newPairs.push(pair);
  }

  remove(key) {
    const index = this.indexOfKey(this.newPairs, key);
    if (index > 0) {
      this.newPairs.splice(index, 1);
    }
  }

  indexOfKey(array, key) {
    let index = -1;
    array.forEach((current, i) => {
      if (current[this.keyName] === key) {
        index = i;
        return false;
      }
    });
    return index;
  }

  save() {
    console.log(this.newPairs);
    console.log('key', this.newPairs[0].key);
    console.log('value', this.newPairs[0].value);
    console.log('---------------');
    for (const item of this.newPairs) {
      this.items.set(item.key, item.value);
    }
    console.log(this.items);
  }
}
