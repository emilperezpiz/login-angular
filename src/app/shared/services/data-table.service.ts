import { Injectable } from '@angular/core';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {
  public keys: string[];
  public data: any[];
  public settings: any;
  constructor(private translateService: TranslationService) {
    this.keys = [];
    this.data = [];
  }

  createTable(arr: any[]) {
    this.settings = {
      actions: {
        add: false,
        delete: false,
        edit: false,
        columnTitle: '', // minimize the actions column size
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      }
    };
    this.keys = [];
    this.data = [];
    if (arr.length > 0) {
      let keys = Object.keys(arr[0]);
      this.keys = keys;
      this.settings.columns = new Object();
      this.keys.forEach((key: string) => {
        this.settings.columns[key] = {
          title: this.translateService.getTranslate('label.' + key),
          type: 'string'
        }
      });
      arr.forEach((item: any) => {
        this.data.push(item);
      });
    }
  }
}
