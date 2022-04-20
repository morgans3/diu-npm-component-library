import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { iEventActions } from "../_models/eventactions";

@Injectable()
export class BrokerService {
  private messageSubject = new BehaviorSubject<iEventActions>({
    id: "default",
    action: "none",
  });
  currentMessage = this.messageSubject.asObservable();

  constructor() {}

  sendMessage(message: iEventActions) {
    this.messageSubject.next(message);
  }
}
