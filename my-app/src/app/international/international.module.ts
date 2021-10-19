import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nModule } from '../i18n/i18n.module';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { InternationalComponent } from './international.component';


@NgModule({
  declarations: [InternationalComponent],
  imports: [
    CommonModule,
    I18nModule,
  ],
  providers: []
  // exports: [I18nModule]
})

export class InternationalModule { }
