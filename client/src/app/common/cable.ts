import { Observable, Observer, Subject, Subscription }  from 'rxjs/Rx';

/* Cable class
   This class connects to Ruby on Rails' Action Cable
   Once the cable is connected, it will recieve all incoming messages on the channel
   Acts as an observable stream, making it easy to implement with Angular
*/

export class Cable {
  socket: WebSocket;
  identifier: string = "";
  observable: Observable<any>;
  observer: Observer<any>;
  subject: Subject<any>;
  confirmed: boolean = false;


  constructor(url: string, identifier: {}) {
    this.identifier = JSON.stringify(identifier);
    this.socket = new WebSocket(url);

    this.makeObservable();
    this.makeObserver();
    this.subject = Subject.create(this.observer, this.observable);
  }

  // Subscribe to channel and return subscription observable
  subscribe(onData = (data: any) => {}, onError = (errors: any) => {}, callback = () => {}): Subscription {
    return this.subject.subscribe(onData, onError, callback);
  }

  // Process next item in observable stream
  next(data: Object) {
    this.subject.next(data);
  }

  // Handle error helper
  private handleError(error: any) {
    return Observable.throw(error.json().error);
  }

  // Create observable once socket is opened
  private makeObservable() {
    this.observable = Observable.create((observer: Observer<any>) => {
      this.socket.onopen = () => {
        console.log('socket opened!');
        this.subscribeToChannel();
      };

      this.socket.onmessage = (packet) => {
        let data = JSON.parse(packet.data)
        if (data.type == undefined) {
          observer.next(data);
        } else if (data.type = "confirm_subscription") {
          this.confirmed = true;
        } else if (data.type != 'ping') {
          console.log("Recieved from cable:", data);
        }
      }
    })
    .catch(this.handleError)
  }

  // Helper to create observer for subscription
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

  // Helper to subscribe to channel
  private subscribeToChannel() {
    let cmd = {
      command: 'subscribe',
      identifier: this.identifier,
    }

    this.socket.send(JSON.stringify(cmd));
  }

  // Helper to send a message to the channel
  private sendToChannel(data: Object) {
    if (this.confirmed === true) {
      let cmd = {
        command: 'message',
        identifier: this.identifier,
        data: JSON.stringify(data),
      }

      this.socket.send(JSON.stringify(cmd));
    } else {
      setTimeout(() => this.sendToChannel(data), 0);
    }
  }
}