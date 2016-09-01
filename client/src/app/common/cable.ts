import { Observable, Observer, Subject, Subscription }  from 'rxjs/Rx';

export class Cable {
  socket: WebSocket;
  identifier: string;
  observable: Observable<any>;
  observer: Observer<any>;
  subject: Subject<any>

  constructor(url: string, identifier: {}) {
    this.identifier = JSON.stringify(identifier);
    this.socket = new WebSocket(url);

    this.makeObservable();
    this.makeObserver();
    this.subject = Subject.create(this.observer, this.observable);
  }

  subscribe(onData = (data: any) => {}, onError = (errors: any) => {}, callback = () => {}): Subscription {
    return this.subject.subscribe(onData, onError, callback);
  }

  next(data: Object) {
    this.subject.next(data);
  }

  private handleError(error: any) {
    return Observable.throw(error.json().error);
  }

  private makeObservable() {
    this.observable = Observable.create((observer: Observer<any>) => {
      this.socket.onopen = () => {
        this.subscribeToChannel();
      };

      this.socket.onmessage = (packet) => {
        let data = JSON.parse(packet.data)
        if (data.type == undefined) {
          observer.next(data);
        } else {
          if (data.type != 'ping') {
            console.log('received from cable', data);
          }
        }
      }
    })
    .catch(this.handleError)
  }

  private makeObserver() {
    this.observer = {
        next: (data: Object) => {
          this.sendToChannel(data);
        },
        error: (errors: Object) => {

        },

        complete: () => {

        }
    };
  }

  private subscribeToChannel() {
    let cmd = {
      command: 'subscribe',
      identifier: this.identifier,
    }

    this.socket.send(JSON.stringify(cmd));
  }

  private sendToChannel(data: Object) {
    if (this.socket.readyState === WebSocket.OPEN) {
        let cmd = {
          command: 'message',
          identifier: this.identifier,
          data: JSON.stringify(data),
        }

        this.socket.send(JSON.stringify(cmd));
    }
  }
}