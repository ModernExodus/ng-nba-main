import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsListComponent } from './options-list.component';
import { ToOptionsPipe } from './pipes/to-options.pipe';

/** 
 * A widget module to hold the OptionsListComponent and ToOptionsPipe. This
 * can enable us to completely decouple the OptionsListComponent and
 * ToOptions pipe from the rest of the application and reuse across other
 * apps.
 */
@NgModule({
  declarations: [OptionsListComponent, ToOptionsPipe],
  imports: [CommonModule],
  exports: [OptionsListComponent, ToOptionsPipe],
})
export class OptionsListModule { }
