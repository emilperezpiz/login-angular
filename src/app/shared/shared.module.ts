import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesComponent } from './components/data-tables/data-tables.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../@theme/theme.module';
import { NbInputModule, NbIconModule, NbTreeGridModule, NbCardModule, NbActionsModule, NbTabsetModule, NbPopoverModule, NbRadioModule, NbDatepickerModule, NbButtonModule, NbCheckboxModule, NbDialogModule, NbUserModule, NbSelectModule, NbStepperModule } from '@nebular/theme';
import { FsIconComponent } from '../pages/tables/tree-grid/tree-grid.component';
import { ActionsComponent } from './components/actions/actions.component';
import { PopoversComponent } from '../pages/modal-overlays/popovers/popovers.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { StorageService } from './services/storage.service';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
export let options: Partial<IConfig> | (() => Partial<IConfig>);
import { ImageCropperModule } from 'ngx-image-cropper';
import {CardModule} from 'ngx-card/ngx-card';
import { ModalCardComponent } from './components/modal-card/modal-card.component';
import { NestableModule } from 'ngx-nestable';
import { CKEditorModule } from 'ng2-ckeditor';
import { ContextMenuModule } from 'ngx-contextmenu';

@NgModule({
  providers: [
    StorageService
  ],
  entryComponents: [
    ModalLoginComponent,
    ModalCardComponent
  ],
  declarations: [
    DataTablesComponent,
    FsIconComponent,
    ActionsComponent,
    PopoversComponent,
    ModalLoginComponent,
    ModalCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbActionsModule,
    NbTabsetModule,
    NbPopoverModule,
    NbRadioModule,
    NbDatepickerModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxMaskModule.forRoot(options),
    NbDialogModule.forChild(),
    ImageCropperModule,
    NbUserModule,
    NbSelectModule,
    NbStepperModule,
    CardModule,
    NestableModule,
    CKEditorModule,
    ContextMenuModule.forRoot()
  ],
  exports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbPopoverModule,
    NbActionsModule,
    NbTabsetModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    CommonModule,
    DataTablesComponent,
    ActionsComponent,
    PopoversComponent,
    NbRadioModule,
    NbDatepickerModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxMaskModule,
    NbDialogModule,
    ImageCropperModule,
    NbUserModule,
    NbSelectModule,
    NbStepperModule,
    CardModule,
    NestableModule,
    CKEditorModule,
    ContextMenuModule
  ]
})
export class SharedModule { }
