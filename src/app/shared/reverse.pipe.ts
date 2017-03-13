import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'reverse'})
export class ReversePipe implements PipeTransform {
  transform(list:Array):Array {
    return list instanceof Array ? list.reverse() : null;
  }
}
