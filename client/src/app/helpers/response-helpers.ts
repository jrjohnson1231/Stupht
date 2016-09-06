import { Response }  from '@angular/http';

import { Observable }  from 'rxjs/Rx';


export function extractData(res: Response) {
  return res.json();
}

export function handleError(error: Response) {
  return Observable.throw(error.json().error);
}