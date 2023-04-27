import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DropdownOptionLike, EMPTY_OPTION } from './dropdown-option.model';

@Component({
  selector: 'app-options-list',
  templateUrl: './options-list.component.html',
  styleUrls: ['./options-list.component.css']
})
export class OptionsListComponent implements OnChanges, AfterViewInit {

  @ViewChild('select')
  private selectElement!: ElementRef;

  @Input()
  value: string = ''; // an initial value

  @Output()
  valueChange: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  options!: DropdownOptionLike[]; // all possible options

  @Input()
  optional: boolean = false; // whether a selection is optional

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && !changes['value'].isFirstChange()) {
      this.selectValueIfPresent();
    }
    if (changes['options']) {
      if (this.optional) {
        this.options = [EMPTY_OPTION, ...this.options];
      }
      if (!changes['options'].isFirstChange() && this.options.length > 0 && !this.isValuePresent()) {
        // default to the first option if current value is not an option
        this.valueChanged(this.options[0].key);
      }
    }
  }

  // if value was passed as @Input param, then set select dropdown value to it if it's an option
  ngAfterViewInit(): void {
    this.selectValueIfPresent();
  }

  valueChanged(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
  }

  // whether or not the currently selected value exists
  // in a new list of options
  private isValuePresent(): boolean {
    return this.options.map(option => option.key).includes(this.value);
  }

  // if a value is set and options are available, select the value
  // from the list of options
  private selectValueIfPresent(): void {
    if (this.value && this.options.length > 0) {
      const matchingOption = this.options.find(option => option.key === this.value);
      if (matchingOption) {
        (this.selectElement.nativeElement as HTMLSelectElement).value = matchingOption.key;
        this.valueChanged(matchingOption.key);
      }
    }
  }
}
