import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: false,name: 'jsonToMap'})
export class JsonToMapPipe implements PipeTransform {
  transform(json: Record<string, string>) : Array<{key: string, value: string}> {
    let keys = [];
    for (let key in json) {
      keys.push({key: key, value: json[key]});
    }
    return keys;
  }
}
