import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { TranslationService } from '../../services/translation.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @Input('aux') aux: any;
  @Output() action = new EventEmitter();
  public uri: string = environment.uri;
  public buttons: any[];
  constructor(
    private router: Router,
    public translateService: TranslationService
  ) { }

  ngOnInit() {
    this.getButtons();
  }

  currentAction(item: any) {
    if (item.active !== true && !this.aux.currentId) {
      return;
    }
    
    this.action.emit(item.action);
  }

  getButtons() {
    switch (this.aux.action) {
      case 'list':
        this.buttons = this.aux.list;
        break;
      case 'new':
        this.buttons = this.aux.new;
        break;
      case 'edit':
        this.buttons = this.aux.edit;
        break;
      case 'show':
        this.buttons = this.aux.show;
        break;
      default:
        this.buttons = this.aux.index;
    }
  }

  goHome() {
    this.router.navigate([this.uri]);
  }

  go(url: string) {
    if (!url || url === '') {
      return;
    }
    this.router.navigate([url]);
  }

}
