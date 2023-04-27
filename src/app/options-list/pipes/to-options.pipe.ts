import { Pipe, PipeTransform } from '@angular/core';
import { DropdownOption, EMPTY_OPTION } from '../dropdown-option.model';

/** 
 * A pipe capable of converting standard objects consisting of keys and values to a list of
 * DropdownOption. The pipe is basic and only works on objects to a max depth of 1. It could be
 * expanded to support nested objects, though.
 * 
 * @example
 * const person = {
 *  firstName: 'John',
 *  lastName: 'Washburn',
 *  age: 27
 * };
 * 
 * pipe.transform([person], 'lastName', 'firstName') -> [{
 *  key: 'Washburn',
 *  value: 'John'
 * }];
 */
@Pipe({
  name: 'toOptions'
})
export class ToOptionsPipe implements PipeTransform {

  transform(values: any[] | null, keyProperty: string, valueProperty: string): DropdownOption[] {
    if (!keyProperty || !valueProperty) {
      throw new Error('The names of the properties to map to keys and values are required');
    }
    if (values) {
      return values.map(value => {
        return this.toDropdownOption(value, keyProperty, valueProperty);
      });
    }
    return [];
  }

  private toDropdownOption(value: any, keyProp: string, valueProp: string): DropdownOption {
    if (value[keyProp] && value[valueProp]) {
      return {
        key: value[keyProp],
        value: value[valueProp]
      };
    }
    return EMPTY_OPTION;
  }

}
