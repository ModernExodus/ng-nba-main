import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockNbaService, MockOptionsListComponent } from '../mocks';
import { NbaService } from '../nba.service';
import { ToOptionsPipe } from '../options-list/pipes/to-options.pipe';
import { FilterStateService } from '../state/filter-state.service';
import { GameStatsComponent } from './game-stats.component';

describe('GameStatsComponent', () => {
  let component: GameStatsComponent;
  let fixture: ComponentFixture<GameStatsComponent>;
  let filterState: FilterStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameStatsComponent, MockOptionsListComponent, ToOptionsPipe],
      providers: [
        FilterStateService,
        { provide: NbaService, useClass: MockNbaService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameStatsComponent);
    component = fixture.componentInstance;
    filterState = TestBed.inject(FilterStateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the division options when filter state changes', () => {
    component.conferenceSelected('West');
    expect(component.divisions.length).toBe(3);
    expect(component.divisions).toEqual(
      [
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
    );
  });

  it('should update the team options when filter state changes', () => {
    component.conferenceSelected('East');

    expect(component.teams.length).toBe(15);
    for (const team of component.teams) {
      expect(team.conference).toBe('East');
    }
  });

  it('should have team options that reflect currently selected conference and division', () => {
    component.conferenceSelected('West');
    component.divisionSelected('Pacific');
    
    expect(component.teams.length).toBe(5);
    for (const team of component.teams) {
      expect(team.conference).toBe('West');
      expect(team.division).toBe('Pacific');
    }
  });
});
