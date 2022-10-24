import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { HttpService } from './services/http.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ProfileImageNamePipe } from './pipes/profile-image-name.pipe';
import { ConfirmDialogComponent } from './components';

@NgModule({
  imports: [
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      TooltipModule.forRoot(),
      TypeaheadModule.forRoot(),
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      NgxBootstrapIconsModule.pick(allIcons),
    ],
    providers:[
        HttpService,
        BsModalService,
    ],
    exports: [
        TooltipModule,
        TypeaheadModule,
        FormsModule,
        ReactiveFormsModule,
        NgxBootstrapIconsModule,
        ProfileImageNamePipe,
        BsDropdownModule,
        ConfirmDialogComponent,
        BsDatepickerModule,
    ],
    declarations: [
        ProfileImageNamePipe,
        ConfirmDialogComponent,
    ]
})
export class SharedModule {}
