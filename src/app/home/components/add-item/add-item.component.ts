import { HomeService } from './../../services/home.service';
import { Item } from './../../../core/models/item.schema';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  public readonly title = 'my app';
  itemList: Item[];

  constructor(private _home: HomeService) {}

  ngOnInit() {
    console.log('component initialized');

    this._home.getItems().subscribe(items => {
      console.log(items);

      this.itemList = items;
    });
  }

  addItem(): void {
    let item = new Item();
    item.name = 'Item ' + this.itemList.length;
    this._home.addItem(item).subscribe(items => (this.itemList = items));
  }

  deleteItem(): void {
    const item = this.itemList[this.itemList.length - 1];
    this._home.deleteItem(item).subscribe(items => (this.itemList = items));
  }
}
