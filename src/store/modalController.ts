type Modal = {
  id: string;
  component: React.FC;
};

export default class ModalController {
  private flagState: number;
  private modals: Modal[];

  constructor(flagState: number) {
    this.flagState = flagState;
    this.modals = [];
  }

  push(modal: Modal) {
    this.modals.push(modal);
    this.flagState += 1;
  }

  pop() {
    this.modals.pop();
    this.flagState += 1;
  }

  get top() {
    return this.modals[this.modals.length - 1];
  }

  clear() {
    this.modals = [];
    this.flagState += 1;
  }
}
