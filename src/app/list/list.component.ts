import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CardSchema } from '../cardSchema';
import { ListSchema } from '../listSchema';
import { CardStore } from '../cardStore';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() list: ListSchema;
  @Input() cardStore: CardStore;
  displayAddCard = false;
  //heads: any;
  //j:any;
  constructor(private _dataService: DataService) {
    //this._dataService.sharedParam.subscribe(param=>this.heads=param)
    //let h = this.heads;
  }

  ngOnInit() {
  }

  toggleDisplayAddCard() {
    this.displayAddCard = !this.displayAddCard;
  }

  allowDrop($event) {
    $event.preventDefault();
  }

  drop($event) {
    $event.preventDefault();
    const data = $event.dataTransfer.getData('text');

    let target = $event.target;
    const targetClassName = target.className;

    while (target.className !== 'list') {
      target = target.parentNode;
    }
    target = target.querySelector('.cards');

    if (targetClassName === 'card') {
      $event.target.parentNode.insertBefore(document.getElementById(data), $event.target);
    } else if (targetClassName === 'list__title') {
      if (target.children.length) {
        target.insertBefore(document.getElementById(data), target.children[0]);
      } else {
        target.appendChild(document.getElementById(data));
      }
    } else {
      target.appendChild(document.getElementById(data));
    }

  }

  onEnter(value: string) {
    const cardId = this.cardStore.newCard(value);
    this.list.cards.push(cardId);
    console.log("All Cards:", this.cardStore.cards)
  }
}
