'use babel';

import IdeStandardjsView from './ide-standardjs-view';
import { CompositeDisposable } from 'atom';

export default {

  ideStandardjsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ideStandardjsView = new IdeStandardjsView(state.ideStandardjsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ideStandardjsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ide-standardjs:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ideStandardjsView.destroy();
  },

  serialize() {
    return {
      ideStandardjsViewState: this.ideStandardjsView.serialize()
    };
  },

  toggle() {
    console.log('IdeStandardjs was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
