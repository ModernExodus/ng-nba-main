import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, tap} from 'rxjs';
import {NbaService} from '../nba.service';
import {Game, Stats, Team} from '../data.models';
import { FilterStateService } from '../state/filter-state.service';
import { FilterState } from '../state/filter-state.model';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css']
})
export class TeamStatsComponent implements OnInit, OnDestroy {
  private stateSub!: Subscription;

  @Input()
  team!: Team;

  games$!: Observable<Game[]>;
  stats!: Stats;
  isModalOpen: boolean = false;
  numDaysOfData: string = '12';

  constructor(private nbaService: NbaService, private filterState: FilterStateService) {}

  ngOnInit(): void {
    this.games$ = this.setStats();
    this.stateSub = this.filterState.getFilterState().subscribe(state => {
      this.updateData(state);
    });
  }

  ngOnDestroy(): void {
    this.stateSub.unsubscribe();
  }

  removeTeam(team: Team): void {
    this.nbaService.removeTrackedTeam(team);
  }

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  private setStats(numDays: string = '12'): Observable<Game[]> {
    return this.nbaService.getLastResults(this.team, parseInt(numDays, 10)).pipe(
      tap(games =>  this.stats = this.nbaService.getStatsFromGames(games, this.team))
    );
  }

  private updateData(state: FilterState): void {
    if (state.daysOfData !== this.numDaysOfData) {
      this.numDaysOfData = state.daysOfData;
      this.games$ = this.setStats(state.daysOfData);
    }
  }

}
