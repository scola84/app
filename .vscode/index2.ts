/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import './elements'

import * as icons from './icons'

import {
  ButtonEvent,
  CSSResult,
  IconElement,
  NodeElement,
  TemplateResult,
  createClient,
  css,
  customElement,
  html,
  query
} from '@scola/lib'

IconElement.icons = icons

@customElement('scola-drawer')
class DrawerElement extends NodeElement {
  public static styles: CSSResult[] = [
    ...NodeElement.styles,
    css`
      :host([mode="tab"]) slot:not([name]) {
        /* overflow-x: scroll; */
        scroll-snap-type: x mandatory;
      }

      :host([mode="tab"]) slot:not([name])::slotted(*) {
        scroll-snap-align: start;
        flex: 0 0 100%;
      }
    `
  ]

  @query('slot:not([name])')
  public defaultSlotElement: HTMLSlotElement

  public constructor () {
    super()
    this.addEventListener('scola-drawer-move', this.handleMove.bind(this))
  }

  protected handleMove (event: ButtonEvent): void {
    const target = this.querySelector(`#${event.detail?.target ?? ''}`)
    const tabs = this.querySelectorAll(':scope > :not([slot])')

    console.log(tabs)

    if (target === null) {
      return
    }

    this.defaultSlotElement.scrollTo({
      behavior: 'smooth',
      left: target.getBoundingClientRect().width * Array.from(tabs).indexOf(target)
    })
  }
}

createClient({
  dom: {
    body: html`
      <scola-app flow="row">
        <scola-panel slot="after" height="max">
          <scola-drawer height="max" fill="medium" flow="column" mode="tab">
            
            <scola-node slot="after" width="medium" height="flex" flow="column" fill="dark" halign="evenly" valign="center" padding="medium">
            <scola-button state width="small" height="small" round="max" fill="medium" valign="center" halign="center" event="scola-drawer-move" target="abc">
                <scola-icon name="menu"></scola-icon>
              </scola-button>
              <scola-button state width="small" height="small" round="max" fill="medium" valign="center" halign="center" event="scola-drawer-move" target="def">
                <scola-icon name="colorFilter"></scola-icon>
              </scola-button>
            </scola-node>

            <scola-panel width="medium" height="max" id="abc" fill="dark">
              <scola-node style="height: 800px; " fill="dark" width="max">abc</scola-node>          
            </scola-panel>
            <scola-panel width="medium" height="max" id="def" fill="dark">
              <scola-node style="height: 800px; " fill="dark" width="max">def</scola-node>          
            </scola-panel>
          </scola-drawer>
        </scola-panel>
      </scola-app>
    `,
    title: 'Mijn Herman'
  }
})
