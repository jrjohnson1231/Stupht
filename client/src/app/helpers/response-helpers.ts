import { Response }  from '@angular/http';

import { Observable }  from 'rxjs/Rx';


export function extractData(res: Response) {
  console.log('extracting data', res.json());
  return res.json();
}

export function handleError(error: any) {
  return Observable.throw(error.json().error);
}