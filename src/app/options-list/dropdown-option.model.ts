/** 
 * represents a single option in a select dropdown;
 * the value is what is displayed, and the key is 
 * the value set if the option is selected
 */
export type DropdownOption = {
    key: string;
    value: string;
};

/** any object that has at least a key and value property */
export type DropdownOptionLike = {
    [property in keyof DropdownOption]: DropdownOption[property];
} & { [key: string | symbol | number]: any; };

export const EMPTY_OPTION: DropdownOption = {
    key: 'default',
    value: 'Select'
};