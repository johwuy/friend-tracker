import { Injectable, signal } from '@angular/core';

export interface ToolbarAction {
  icon: string;
  tooltip: string;
  callback: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class ToolbarSerivce {
  private readonly toolbarActionsSignal = signal<ToolbarAction[]>([]);
  readonly toolbarActions = this.toolbarActionsSignal.asReadonly();

  constructor() { }

  setActions(actions: ToolbarAction[]) {
    this.toolbarActionsSignal.set(actions);
  }

  clearActions() {
    this.toolbarActionsSignal.set([]);
  }
}
