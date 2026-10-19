import { mount, unmount } from 'svelte';
import Editor from './Editor.svelte';
import theme from './theme.css?inline';
import type { Hass, PanelInfo } from './adapter';

class EversoloPeqPanel extends HTMLElement {
  private instance?: ReturnType<typeof mount>;
  private currentHass?: Hass;
  private currentPanel?: PanelInfo;
  private resetting = false;
  private root = this.attachShadow({ mode: 'open' });
  set hass(value: Hass) { this.currentHass = value; this.start(); }
  set panel(value: PanelInfo) {
    const changed = this.currentPanel?.config.entry_id !== value.config.entry_id;
    this.currentPanel = value;
    if (changed && this.instance) this.reset();
    else this.start();
  }
  connectedCallback() { this.start(); }
  disconnectedCallback() {
    this.reset();
  }
  private reset() {
    const instance = this.instance;
    this.instance = undefined;
    this.resetting = true;
    void (instance ? unmount(instance) : Promise.resolve()).then(() => {
      this.root.replaceChildren();
      this.resetting = false;
      this.start();
    });
  }
  private start() {
    if (this.resetting || !this.isConnected || this.instance || !this.currentHass || !this.currentPanel) return;
    const style = document.createElement('style');
    style.textContent = theme;
    this.root.append(style);
    this.instance = mount(Editor, {
      target: this.root,
      props: { hass: { callWS: <T>(msg: Record<string, unknown>) => this.currentHass!.callWS<T>(msg) }, panel: this.currentPanel },
    });
  }
}
if (!customElements.get('eversolo-peq-panel')) customElements.define('eversolo-peq-panel', EversoloPeqPanel);
