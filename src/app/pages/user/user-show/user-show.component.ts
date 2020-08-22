import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { environment } from '../../../../environments/environment';
import { UserAux } from '../user.aux';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslationService } from '../../../shared/services/translation.service';
import { UserService } from '../user.service';
import { MessageService } from '../../../shared/services/message.service';
import { StorageService } from '../../../shared/services/storage.service';
import { ErrorManagerService } from '../../../shared/services/error-manager.service';
import { OneColumnLayoutService } from '../../../@theme/layouts/one-column/one-column.layout.service';

@Component({
  selector: 'ngx-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.scss']
})
export class UserShowComponent implements OnInit {
  public uri: string = environment.uri;
  public identifier: string;
  public data: User;
  public aux = new UserAux();
  constructor(
    private router: Router,
    public service: UserService,
    private route: ActivatedRoute,
    public message: MessageService,
    public storage: StorageService,
    public errorManager: ErrorManagerService,
    private translateService: TranslationService,
    public layout: OneColumnLayoutService
  ) {
    router.events.subscribe((event: any) => {
      if (event.snapshot && event.snapshot.data && event.snapshot.data.formParams && event.snapshot.data.formParams.action) {
        const object = event.snapshot.data;
        this.aux.action = object.formParams.action;
        this.aux.breadcrumb = object.breadcrumb;
        const personal = JSON.parse(localStorage.getItem('personal_info'));
        if (personal) {
          this.identifier = personal.business.id;
        }
      }
    });
  }

  ngOnInit() {
    this.data = new User();
    const id = this.route.snapshot.paramMap.get('id');
    if (id && this.aux.action === 'show') {
      this.aux.currentId = id;
      this.getById(id);
      this.storage.getChangeEmitter()
        .subscribe((item: boolean) => {
          if (item === true) {
            const personal = this.storage.getPersonalInfo();
            if (personal && personal.business && personal.business.id) {
              this.identifier = personal.business.id
            }
            this.getById(id);
          }
        });
    }
  }

  getById(id: string) {
    if (!this.identifier || !this.storage.getToken()) {
      this.storage.openModalLogin();
      return;
    }
    this.layout.emitChangeEvent(true);
    this.service.sendGET(this.identifier + '/user/' + id + '/show').subscribe((resp: any) => {
      this.layout.emitChangeEvent(false);
      const response: User = resp.body;
      this.data = response;
    },
      error => {
        let errorResponse = null;
        if (error.error) {
          errorResponse = error.error;
        }
        this.errorManager.error(error.status, this.storage, errorResponse);
      });
  }

  currentAction(action: string) {
    switch (action) {
      case 'list':
        this.list();
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

  new() {
    this.router.navigate([`${this.uri}/worker/new`]);
  }

  list() {
    this.router.navigate([`${this.uri}/worker`]);
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
      this.list();
    },
      error => {
        this.errorManager.error(error.status, this.storage);
      });
  }

}
