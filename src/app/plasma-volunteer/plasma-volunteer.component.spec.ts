import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlasmaVolunteerComponent } from './plasma-volunteer.component';

describe('PlasmaVolunteerComponent', () => {
  let component: PlasmaVolunteerComponent;
  let fixture: ComponentFixture<PlasmaVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbModule],
      declarations: [ PlasmaVolunteerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlasmaVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
