import { Component, OnInit } from '@angular/core';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { OneColumnLayoutService } from './one-column.layout.service';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  templateUrl: './one-column.layout.html'
})
export class OneColumnLayoutComponent implements OnInit {
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  constructor(
    public oneColumnLayoutService: OneColumnLayoutService
  ) { }

  ngOnInit() {
    this.oneColumnLayoutService.getChangeEmitter()
      .subscribe((item: boolean) => {
        if (item) {
          this.loading = true;
        } else {
          this.loading = false;
        }
      });
  }
}
