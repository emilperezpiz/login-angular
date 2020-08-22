import { Component, OnInit } from '@angular/core';
import { DataTableService } from '../../../shared/services/data-table.service';
import { TranslationService } from '../../../shared/services/translation.service';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { UserAux } from '../user.aux';
import { environment } from '../../../../environments/environment';
import { UserService } from '../user.service';
import { StorageService } from '../../../shared/services/storage.service';
import { ErrorManagerService } from '../../../shared/services/error-manager.service';
import { OneColumnLayoutService } from '../../../@theme/layouts/one-column/one-column.layout.service';
import { MessageService } from '../../../shared/services/message.service';


@Component({
  selector: 'ngx-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public uri: string = environment.uri;
  public identifier: string;
  public data: User;
  public aux = new UserAux();
  constructor(
    private router: Router,
    public dataTable: DataTableService,
    private translateService: TranslationService,
    public service: UserService,
    public message: MessageService,
    public storage: StorageService,
    public errorManager: ErrorManagerService,
    public layout: OneColumnLayoutService
  ) {
    router.events.subscribe((event: any) => {
      if (event.snapshot && event.snapshot.data && event.snapshot.data.formParams && event.snapshot.data.formParams.action) {
        const object = event.snapshot.data;
        this.aux.action = object.formParams.action;
        this.aux.breadcrumb = object.breadcrumb;
        const personal = this.storage.getPersonalInfo();
        if (personal && personal.business && personal.business.id) {
          this.identifier = personal.business.id;
        }
      }
    });
  }

  ngOnInit() {
    this.storage.getChangeEmitter()
      .subscribe((item: boolean) => {
        if (item === true) {
          const personal = this.storage.getPersonalInfo();
          if (personal && personal.business && personal.business.id) {
            this.identifier = personal.business.id
          }
          this.refresh();
        }
      });
    this.refresh();
  }

  currentAction(action: string) {
    switch (action) {
      case 'list':
        /**/
        break;
      case 'new':
        this.new();
        break;
      case 'edit':
        this.edit();
        break;
      case 'show':
        this.show();
        break;
      case 'delete':
        this.delete();
        break;
      default:
        return;
    }
  }

  getObject(object: User) {
    this.data = object;
    this.aux.currentId = object.identifier;
  }

  new() {
    this.router.navigate([`${this.uri}/worker/new`]);
  }

  edit() {
    this.router.navigate([`${this.uri}/worker/edit/${this.data.identifier}`]);
  }

  show() {
    this.router.navigate([`${this.uri}/worker/show/${this.data.identifier}`]);
  }

  delete() {
    this.message.confirm("willNotReverse", this.remove, "areYouSure");
  }

  remove = () => {
    this.layout.emitChangeEvent(true);
    this.service.sendDELETE(this.identifier + '/user/' + this.data.identifier + '/delete').subscribe((resp: any) => {
      this.layout.emitChangeEvent(false);
      /*const message = this.translateService.getTranslate('message.deleteSuccess');
      this.message.success(message);*/
      this.message.confirmReturn200("deleteSuccess");
      this.refresh();
    },
      error => {
        this.errorManager.error(error.status, this.storage);
      });
  }

  refresh() {
    if (!this.identifier || !this.storage.getToken()) {
      this.storage.openModalLogin();
      return;
    }
    this.layout.emitChangeEvent(true);
    this.dataTable.createTable([]);
    this.service.sendGET(this.identifier + '/user').subscribe((resp: any) => {
      this.layout.emitChangeEvent(false);
      const response: User[] = resp.body;
      response.forEach((item: User) => {
        delete item.path;
        delete item.business;
        delete item.role;
        item.role = this.auxSetRole(item.role);
      });
      this.dataTable.createTable(response);
    },
      error => {
        this.errorManager.error(error.status, this.storage);
      });
  }

  auxSetRole(role: string) {
    if (role === 'ROLE_WORKER_TEACHER') {
      return this.translateService.getTranslate('label.teacher');
    } else if (role === 'ROLE_WORKER_SECRETARY') {
      return this.translateService.getTranslate('label.secretary');
    }
  }

}
