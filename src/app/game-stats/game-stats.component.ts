import { Component, OnDestroy } from '@angular/core';
import { Team } from '../data.models';
import { concatMap, Subscription, tap } from 'rxjs';
import { NbaService } from '../nba.service';
import { DropdownOption, EMPTY_OPTION } from '../options-list/dropdown-option.model';
import { Conference, CONFERENCES, DAYS_OF_DATA_OPTIONS, Division } from '../constants';
import { FilterStateService } from '../state/filter-state.service';
import { FilterState } from '../state/filter-state.model';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css']
})
export class GameStatsComponent implements OnDestroy {
  private filterStateSub: Subscription;
  private allTeams: Team[] = [];

  conferences: Conference[];
  divisions: Division[];
  teams: Team[] = [];
  numDaysOfData: DropdownOption[];

  // used to restore state upon navigating back to GameStats component
  initialConference: string = '';
  initialDivision: string = '';
  initialDaysOfData: string = '';

  constructor(protected nbaService: NbaService, protected filterState: FilterStateService) {
    this.conferences = CONFERENCES;
    this.divisions = CONFERENCES.flatMap(conf => conf.divisions);
    this.numDaysOfData = DAYS_OF_DATA_OPTIONS;

    const teams$ = nbaService.getAllTeams().pipe(tap(data => {
      this.allTeams = data;
      this.teams = data;
    }));

    this.filterStateSub = teams$.pipe(concatMap(() => this.filterState.getFilterState())).subscribe(state => {
      this.divisions = this.getUpdatedDivisionOptions(state);
      this.teams = this.getUpdatedTeams(state, this.allTeams);
      this.populateInitialSelections(state);
    });
  }

  ngOnDestroy(): void {
    this.filterStateSub.unsubscribe();
  }

  trackTeam(teamId: string): void {
    let team = this.allTeams.find(team => team.id == Number(teamId));
    if (team)
      this.nbaService.addTrackedTeam(team);
  }

  conferenceSelected(conference: string): void {
    this.filterState.nextFilterState({
      conference: conference
    });
  }

  divisionSelected(division: string): void {
    this.filterState.nextFilterState({
      division: division
    });
  }

  daysOfDataSelected(days: string): void {
    this.filterState.nextFilterState({
      daysOfData: days
    });
  }

  private getUpdatedDivisionOptions(state: FilterState): DropdownOption[] {
    if (state.conference !== EMPTY_OPTION.key) {
      return CONFERENCES.filter(conf => conf.key === state.conference).flatMap(conf => conf.divisions);
    }
    return CONFERENCES.flatMap(conf => conf.divisions);
  }

  private getUpdatedTeams(state: FilterState, allTeams: Team[]): Team[] {
    let teams: Team[] = allTeams;
    if (state.conference !== EMPTY_OPTION.key) {
      teams = teams.filter(team => team.conference === state.conference);
    }
    if (state.division !== EMPTY_OPTION.key) {
      teams = teams.filter(team => team.division === state.division);
    }
    return teams;
  }

  private populateInitialSelections(state: FilterState): void {
    this.initialConference ||= state.conference;
    this.initialDivision ||= state.division;
    this.initialDaysOfData ||= state.daysOfData;
  }
}
