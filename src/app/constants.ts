import { DropdownOption } from './options-list/dropdown-option.model';

export type Division = {
    key: string;
    value: string;
};

export type Conference = {
    key: string;
    value: string;
    divisions: Division[];
};

export const CONFERENCES: Conference[] = [
    {
        key: 'West',
        value: 'Western Conference',
        divisions: [
            {
                key: 'Northwest',
                value: 'Northwest Division'
            },
            {
                key: 'Pacific',
                value: 'Pacific Division'
            },
            {
                key: 'Southwest',
                value: 'Southwest Division'
            }
        ]
    },
    {
        key: 'East',
        value: 'Eastern Conference',
        divisions: [
            {
                key: 'Atlantic',
                value: 'Atlantic Division'
            },
            {
                key: 'Central',
                value: 'Central Division'
            },
            {
                key: 'Southeast',
                value: 'Southeast Division'
            }
        ]
    }
];

export const DAYS_OF_DATA_OPTIONS: DropdownOption[] = [
    {
        key: '6',
        value: '6'
    },
    {
        key: '12',
        value: '12'
    },
    {
        key: '20',
        value: '20'
    }
];