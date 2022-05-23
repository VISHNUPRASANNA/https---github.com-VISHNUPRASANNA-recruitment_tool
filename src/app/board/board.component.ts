import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from 'app/data.service';
import { CardSchema } from '../cardSchema';
import { CardStore } from '../cardStore';
import { ListSchema } from '../listSchema';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  cardStore: CardStore;
  lists: ListSchema[];
  searchText: string;

  constructor(private _dataService: DataService) {

   }

  makeMockData() {

    this.cardStore = new CardStore();

    const lists: ListSchema[] = [
      {
        name: 'Opens',
        cards: []
      },
      {
        name: 'Contacted',
        cards: []
      },
      {
        name: 'Written Test',
        cards: []
      },
      {
        name: 'Technical Round',
        cards: []
      },
      {
        name: 'Culture Fit Round',
        cards: []
      }
    ];

    this.lists = lists;
    this._dataService.changeParam(this.lists)
  }

  ngOnInit() {
    this.makeMockData();  this.search();
  }

  searchKey(data: string) {
    this.searchText = data;
    this.search();
  }

  search() {
    console.log("from Board",this.cardStore.cards)

  }

}
