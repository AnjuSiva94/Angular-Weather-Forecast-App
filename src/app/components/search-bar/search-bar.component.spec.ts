import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';

fdescribe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call emit on search', () => {
    spyOn(component.search, "emit");
    component.city.set("abc");
    component.searchCity();

    expect(component.search.emit).toHaveBeenCalledWith('abc');

  })

  it('should not call emit on search when search city is empty', () => {
    spyOn(component.search, "emit")
    component.city.set(" ");
    component.searchCity();

    expect(component.search.emit).not.toHaveBeenCalledWith(" ");
  })

  it('should emit when enter key is pressed', () => {
    spyOn(component.search, "emit")
    const input = fixture.nativeElement.querySelector('input')
    input.value = 'abc';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }))



    expect(component.search.emit).toHaveBeenCalledWith('abc')
  })

  it('button click emit search city', () => {
    spyOn(component.search, "emit");
    component.city.set("abc");
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('button');
    btn.click();



    expect(component.search.emit).toHaveBeenCalledWith("abc");

  })

});
