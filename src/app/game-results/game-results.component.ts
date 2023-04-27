import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NbaService } from '../nba.service';
import { Game, Team } from '../data.models';
import { concatMap, Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent implements OnDestroy {
  private paramMapSub: Subscription;

  team?: Team;
  games$?: Observable<Game[]>;
  numDaysOfData: string = '12';

  constructor(private activatedRoute: ActivatedRoute, private nbaService: NbaService) {
    this.paramMapSub = this.activatedRoute.queryParamMap.pipe(
      tap(queryParams => this.numDaysOfData = queryParams.get('numDays') ?? '12'),
      concatMap(() => this.activatedRoute.paramMap)
    ).subscribe(this.loadTeamData.bind(this));
  }

  ngOnDestroy() {
    this.paramMapSub.unsubscribe();
  }

  private loadTeamData(paramMap: ParamMap): void {
    this.team = this.nbaService.getTrackedTeams().find(team => team.abbreviation === paramMap.get("teamAbbr"));
    if (this.team) {
      this.games$ = this.nbaService.getLastResults(this.team, parseInt(this.numDaysOfData, 10));
    }
  }

}
