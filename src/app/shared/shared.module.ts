import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { HttpService } from './services/http.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ProfileImageNamePipe } from './pipes/profile-image-name.pipe';

@NgModule({
  imports: [
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      TooltipModule.forRoot(),
      TypeaheadModule.forRoot(),
      BsDropdownModule.forRoot(),
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
    ],
    declarations: [
        ProfileImageNamePipe,
    ]
})
export class SharedModule {}
