import { Component, OnInit } from '@angular/core';
import { UserAux } from '../user.aux';
import { User } from '../user.model';
import { environment } from '../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslationService } from '../../../shared/services/translation.service';
import { MessageService } from '../../../shared/services/message.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import * as $ from 'jquery';
import { UserService } from '../user.service';
import { ErrorManagerService } from '../../../shared/services/error-manager.service';
import { StorageService } from '../../../shared/services/storage.service';
import { OneColumnLayoutService } from '../../../@theme/layouts/one-column/one-column.layout.service';

@Component({
  selector: 'ngx-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  public uri: string = environment.uri;
  public identifier: string;
  public data: User;
  public aux = new UserAux();
  public invalidEmail: string;
  public invalidCpf: string;
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public personal: any;
  constructor(
    private router: Router,
    private translateService: TranslationService,
    public service: UserService,
    private route: ActivatedRoute,
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
        const personal = JSON.parse(localStorage.getItem('personal_info'));
        if (personal) {
          this.personal = personal;
          this.identifier = personal.business.id;
        }
      }
    });
  }

  ngOnInit() {
    this.data = new User();
    const id = this.route.snapshot.paramMap.get('id');
    if (id && this.aux.action === 'edit') {
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
    } else {
      this.data.gender = "F";
      this.data.role = "ROLE_WORKER_SECRETARY";
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

  onSubmit(f: any) {
    if (f.form.status === 'INVALID') {
      const message = this.translateService.getTranslate('message.requiredFieldNotCompleted');
      this.message.error(message);
      return;
    }
    if ((this.data.password && this.data.passwordConfirm) && (this.data.password !== this.data.passwordConfirm)) {
      const message = this.translateService.getTranslate('message.passwordNotEqualpasswordConfirm');
      this.message.error(message);
      return
    }
    const param = new FormData();
    if (this.data.password) {
      param.append('password', this.data.password);
    }
    if (this.data.passwordConfirm) {
      param.append('passwordConfirm', this.data.passwordConfirm);
    }
    param.append('name', this.data.name);
    param.append('surname', this.data.surname);
    param.append('cpf', this.data.cpf);
    param.append('gender', this.data.gender);
    param.append('birthday', this.data.birthday);
    param.append('email', this.data.email);
    param.append('role', this.data.role);
    param.append('phone', this.data.phone);
    if (this.data.x) {
      param.append('x', this.data.x);
    }
    if (this.data.y) {
      param.append('y', this.data.y);
    }
    if (this.data.height) {
      param.append('height', this.data.height);
    }
    if (this.data.width) {
      param.append('width', this.data.width);
    }
    if (this.data.img) {
      param.append('img', $('input[type=file]')[0].files[0]);
    }

    this.layout.emitChangeEvent(true);
    if (this.aux.action === 'new') {
      this.save(param);
    } else if (this.aux.action === 'edit') {
      this.update(param);
    }

  }

  save(param: FormData) {
    this.service.sendPOST(this.identifier + '/user/new', param).subscribe((resp: any) => {
      if (resp.body) {
        resp = resp.body;
      }
      this.layout.emitChangeEvent(false);
      const message = this.translateService.getTranslate('message.saveSuccess');
      this.message.success(message);
      this.list();
    },
      error => {
        let errorResponse = null;
        if (error.error) {
          errorResponse = error.error;
        }
        this.errorManager.error(error.status, this.storage, errorResponse);
      });
  }

  update(param: FormData) {
    const id = this.data.identifier;
    this.service.sendPOST(this.identifier + '/user/' + id + '/edit', param).subscribe((resp: any) => {
      if (resp.body) {
        resp = resp.body;
      }
      this.layout.emitChangeEvent(false);
      const message = this.translateService.getTranslate('message.saveSuccess');
      this.message.success(message);
      this.list();
    },
      error => {
        let errorResponse = null;
        if (error.error) {
          errorResponse = error.error;
        }
        this.errorManager.error(error.status, this.storage, errorResponse);
      });
  }

  checkEmail() {
    const regMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
    if (!regMail.test(this.data.email)) {
      const message = this.translateService.getTranslate('message.formatEmailIncorrect');
      this.invalidEmail = message;
      this.data.username = null;
      return false;
    }
    this.invalidEmail = "";
    return true;
  }

  validateCpf() {
    const cpf = this.data.cpf;
    const message = this.translateService.getTranslate('message.formatCpfIncorrect');
    this.invalidCpf = message;
    if (cpf) {
      let numbers, digits, sum, i, result, equalDigits;
      equalDigits = 1;
      if (cpf.length < 11) {
        this.invalidCpf = message;
        this.data.cpf = null;
        return;
      }

      for (i = 0; i < cpf.length - 1; i++) {
        if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
          equalDigits = 0;
          break;
        }
      }

      if (!equalDigits) {
        numbers = cpf.substring(0, 9);
        digits = cpf.substring(9);
        sum = 0;
        for (i = 10; i > 1; i--) {
          sum += numbers.charAt(10 - i) * i;
        }

        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (result !== Number(digits.charAt(0))) {
          this.invalidCpf = message;
          this.data.cpf = null;
          return;
        }
        numbers = cpf.substring(0, 10);
        sum = 0;

        for (i = 11; i > 1; i--) {
          sum += numbers.charAt(11 - i) * i;
        }
        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (result !== Number(digits.charAt(1))) {
          this.invalidCpf = message;
          this.data.cpf = null;
          return;
        }

        this.invalidCpf = '';
        return null;
      } else {
        this.invalidCpf
        this.data.cpf = null;
        return;
      }
    }
  }

  selectImage() {
    $('input[type="file"]').trigger('click');
  }

  fileChangeEvent(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type.match(/image\/*/) == null) {
        const message = this.translateService.getTranslate('message.formatImageIncorrect');
        this.message.error(message);
        return;
      }
      this.imageChangedEvent = event;
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    const cropperPosition = event.cropperPosition;
    if (cropperPosition.x1 === 0) {
      this.data.x = '0';
    } else {
      this.data.x = cropperPosition.x1;
    }
    this.data.y = cropperPosition.y1;
    this.data.width = event.width;
    this.data.height = event.height;
  }

  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

}
