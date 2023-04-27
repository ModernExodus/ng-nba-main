import { EMPTY_OPTION } from "../options-list/dropdown-option.model";

/** represents the state of all the application's filter dropdown values */
export interface FilterState {
    readonly conference: string;
    readonly division: string;
    readonly daysOfData: string;
}

/** the initial state the application should start in on load */
export const INITIAL_FILTER_STATE: FilterState = {
    conference: EMPTY_OPTION.key,
    division: EMPTY_OPTION.key,
    daysOfData: '12'
};