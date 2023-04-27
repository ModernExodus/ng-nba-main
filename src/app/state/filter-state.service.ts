import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { INITIAL_FILTER_STATE, FilterState } from './filter-state.model';

@Injectable({
  providedIn: 'root'
})
export class FilterStateService {
  private filterState: BehaviorSubject<FilterState>;

  constructor() {
    this.filterState = new BehaviorSubject<FilterState>(INITIAL_FILTER_STATE);
  }

  nextFilterState(nextState: Partial<FilterState>): void {
    this.filterState.next({
      ...this.filterState.getValue(),
      ...nextState
    });
  }

  getFilterState(): Observable<FilterState> {
    return this.filterState.asObservable();
  }
}
