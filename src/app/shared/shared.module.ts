import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { HttpService } from './services/http.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ProfileImageNamePipe } from './pipes/profile-image-name.pipe';

@NgModule({
  imports: [
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      TooltipModule.forRoot(),
      NgxBootstrapIconsModule.pick(allIcons),
    ],
    providers:[
        HttpService,
        BsModalService,
    ],
    exports: [
        TooltipModule,
        FormsModule,
        ReactiveFormsModule,
        NgxBootstrapIconsModule,
        ProfileImageNamePipe,
    ],
    declarations: [
        ProfileImageNamePipe,
    ]
})
export class SharedModule {}
