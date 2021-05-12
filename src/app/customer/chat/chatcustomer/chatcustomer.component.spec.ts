import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatcustomerComponent } from './chatcustomer.component';

describe('ChatcustomerComponent', () => {
  let component: ChatcustomerComponent;
  let fixture: ComponentFixture<ChatcustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatcustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
