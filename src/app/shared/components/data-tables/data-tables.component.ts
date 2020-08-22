import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataTableService } from '../../services/data-table.service';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.scss']
})
export class DataTablesComponent implements OnInit {
  @Input('title') title: string;
  public titleTable: string;
  public settings = this.dataTable.settings;
  public source: LocalDataSource = new LocalDataSource();
  @Output() outputDatatable = new EventEmitter();

  constructor(
    public dataTable: DataTableService,
    private service: SmartTableData
  ) {
    this.source.load(this.dataTable.data);
  }

  ngOnInit() {
    if (this.title) {
      this.titleTable = 'title.' + this.title;
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onUserRowSelect(event): void {
    if (event.data) {
      this.outputDatatable.emit(event.data);
    }
  }

}
