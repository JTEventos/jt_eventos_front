import { Pipe, PipeTransform } from '@angular/core';
import { EventType } from 'src/app/classes/event-types/event-type';

@Pipe({
  name: 'eventTypeLookup',
  pure: false
})
export class EventTypeLookupPipe implements PipeTransform {

  transform(eventTypes: EventType[], text?: string): EventType[] {
    const term = text?.toLowerCase() ? text : ''.toLowerCase();
    return eventTypes.filter((data) =>
      data.description.toLowerCase().includes(term)
    );
  }
}
