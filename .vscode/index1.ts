/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import './elements'

import * as icons from './icons'

import {
  IconElement,
  NodeElement,
  TemplateResult,
  createClient,
  customElement,
  html
} from '@scola/lib'

import { strings } from '../common'

IconElement.icons = icons

@customElement('me-main')
class MainElement extends NodeElement {
  public flow: NodeElement['flow'] = 'wrap'

  public halign: NodeElement['halign'] = 'center'

  public heading = 'Main Heading'

  public padding: NodeElement['padding'] = 'medium'

  public render (): TemplateResult {
    return html`
      <slot name="body">
        <!-- <scola-node margin="large" width="max"></scola-node> -->
        <!-- <scola-node rows="6" cols="10">
          <scola-node round="medium" flow="column" fill="medium" padding="" margin="medium" width="max">
            <scola-node vmargin="small" width="max"></scola-node>
            <scola-node vmargin="small" width="max"></scola-node>
            <img src="https://via.placeholder.com/624x234" height="234" style="width: 100%" />
            <scola-node vmargin="medium" width="max"></scola-node>
            <scola-node hmargin="large" font="large" weight="bold">Card title</scola-node>
            <scola-node hmargin="large" color="medium" vmargin="small">Secondary text</scola-node>
            <scola-node vmargin="small" width="max"></scola-node>
            <scola-node hmargin="large" line="large" color="dark" font="small">Greyhound hello coldly wonderfully marginally far upon excluding. Greyhound divisively hello coldly wonderfully marginally far upon excluding.</scola-node>
            <scola-node vmargin="small" width="max"></scola-node>
            <scola-node hmargin="small">
            <scola-button valign="center" slot="after" fill="primary" round="small" hpadding="medium" height="small" color="light" weight="bold" hmargin="medium" state>Action 1</scola-button>
            <scola-button valign="center" slot="after" fill="dark" state round="small" inline hpadding="medium" height="small" weight="bold" color="primary" hmargin="medium">Action 2</scola-button>
            </scola-node>
          </scola-node>
        </scola-node> -->
        <scola-node rows="6" cols="10">
          <scola-node round="medium" fill="medium" margin="medium" width="max" height="flex"></scola-node>
        </scola-node>

        <scola-node cols="10">
          <scola-node rows="3" cols="5">
            <scola-node
              round="medium"
              fill="medium"
              margin="medium"
              height="flex"
              width="max"
              flow="column"
            ></scola-node>
          </scola-node>
          <scola-node rows="3" cols="5">
            <scola-node round="medium" fill="medium" margin="medium" width="max" height="flex"></scola-node>
          </scola-node>
          <scola-node rows="3" cols="5">
            <scola-node round="medium" fill="medium" margin="medium" width="max" height="flex"></scola-node>
          </scola-node>
          <scola-node rows="3" cols="5">
            <scola-node round="medium" fill="medium" margin="medium" width="max" height="flex"></scola-node>
          </scola-node>
        </scola-node>

        <scola-node cols="10">
          <scola-node
            round="medium"
            line="large"
            fill="medium"
            margin="medium"
            height="auto"
            width="max"
            padding="large"
          >
            Dit is een toelichting. Dit is een toelichting. Dit is een toelichting.Dit is een
            toelichting. Dit is een toelichting. Dit is een toelichting.Dit is een toelichting. Dit
            is een toelichting. Dit is een toelichting.Dit is een toelichting. Dit is een
            toelichting.
          </scola-node>
        </scola-node>
        <scola-node cols="10">
          <scola-node
            round="medium"
            line="large"
            fill="medium"
            margin="medium"
            height="auto"
            width="max"
            padding="large"
          >
            Dit is een toelichting.Dit is een toelichting. Dit is een toelichting. Dit is een
            toelichting.Dit is een toelichting. Dit is een toelichting. Dit is een toelichting.Dit
            is een toelichting. Dit is een toelichting. Dit is een toelichting.
  </scola-node>
        </scola-node>
        <scola-node rows="6" cols="10">
          <scola-node round="medium" fill="medium" margin="medium" width="max" height="flex">
            <div class="text">
              <h2>Abc</h2>
              <p>Dit is een tekst</p>
            </div>
          </scola-node>
        </scola-node>
      </slot>
    `
  }
}

@customElement('me-meta')
class MetaElement extends NodeElement {
  public flow: NodeElement['flow'] = 'column'

  public heading = 'Meta Heading'

  public padding: NodeElement['padding'] = 'medium'

  public render (): TemplateResult {
    return html`
      <slot name="body">
        <scola-node flow="column" fill="light" margin="medium" round="medium" padding="small">
          <scola-node
            font="small"
            case="upper"
            color="medium"
            slot="header"
            hmargin="medium"
            vmargin="small"
          >
            Bonjour
          </scola-node>
          <scola-node
            font="small"
            line="medium"
            color="medium"
            slot="footer"
            hpadding="medium"
            vmargin="small"
          >
            Ietsje langer. Ietsje langer. Ietsje langer. Ietsje langer. Ietsje langer. Ietsje
            langer. Ietsje langer. Ietsje langer.
          </scola-node>
          <scola-input
            fill="medium"
            margin="small"
            round="medium"
            valign="center"
            height="medium"
            hpadding="medium"
          >
            <scola-node font="small" color="medium" slot="header" vmargin="small" hpadding="medium">
              <label for="text">Hello</label>
            </scola-node>
            <scola-icon color="primary" name="addCircle" slot="before"></scola-icon>
            <scola-button
              inline
              padding="small"
              slot="after"
              round="max"
              fill="dark"
              state
              event="scola-input-clear"
            >
              <scola-icon color="primary" name="addCircle" slot="before"></scola-icon>
            </scola-button>
            <scola-node color="medium" hmargin="small" slot="prefix">$</scola-node>
            <scola-node color="medium" slot="suffix" hmargin="small">EUR</scola-node>
            <input type="number" id="text" placeholder="Nummer" />
          </scola-input>

          <scola-input-select
            fill="medium"
            margin="small"
            round="medium"
            valign="center"
            height="medium"
            hpadding="medium"
            state
          >
            <scola-node font="small" color="medium" slot="header" vmargin="small" hpadding="medium">
              <label for="text">Hello</label>
            </scola-node>
            <!-- <scola-icon color="primary" off name="ellipse" slot="before"></scola-icon> -->
            <!-- <scola-icon color="primary" on name="checkmarkCircle" slot="before"></scola-icon> -->
            <scola-icon color="primary" off slot="before"></scola-icon>
            <scola-icon color="primary" on name="checkmark" slot="before"></scola-icon>
            <input name="radioname" value="abc" type="checkbox" checked />
            <scola-node hmargin="medium">Help eens</scola-node>
          </scola-input-select>

          <scola-input-select
            fill="medium"
            margin="small"
            round="medium"
            valign="center"
            height="medium"
            hpadding="medium"
            check="primary"
            switch
          >
            <scola-node font="small" color="medium" slot="header" vmargin="small" hpadding="medium">
              <label for="text">Hello</label>
            </scola-node>
            <!-- <scola-icon off name="ellipse" slot="before"></scola-icon> -->
            <!-- <scola-icon on name="checkmarkCircle" slot="before"></scola-icon> -->
            <!-- <scola-icon off slot="after"></scola-icon> -->
            <!-- <scola-icon on name="checkmark" slot="after"></scola-icon> -->
            <scola-icon color="primary" name="volumeOff" slot="before"></scola-icon>
            <input name="radioname" value="abc" type="checkbox" checked />
            <scola-node hmargin="medium">Help eens</scola-node>
          </scola-input-select>

          <scola-input
            fill="medium"
            margin="small"
            round="medium"
            valign="center"
            hpadding="medium"
            vpadding="medium"
            switch
          >
            <scola-node
              font="small"
              color="medium"
              slot="header"
              vmargin="small"
              width="max"
              hpadding="medium"
            >
              <label for="text">Hello</label>
            </scola-node>
            <!-- <scola-node flow="column" vpadding="medium"> -->
            <scola-input-select height="small" valign="center">
              <!-- <scola-icon off name="radioButtonOff" slot="before"></scola-icon> -->
              <!-- <scola-icon on name="radioButtonOn" slot="before"></scola-icon> -->
              <scola-icon color="primary" name="volumeOff" slot="before"></scola-icon>
              <scola-icon color="primary" off slot="after"></scola-icon>
              <scola-icon color="primary" on name="checkmark" slot="after"></scola-icon>
              <input name="checkmark" value="abc" type="radio" checked />
              <scola-node hmargin="medium">Help eens</scola-node>
            </scola-input-select>

            <scola-input-select height="small" valign="center">
              <!-- <scola-icon off name="radioButtonOff" slot="before"></scola-icon> -->
              <!-- <scola-icon on name="radioButtonOn" slot="before"></scola-icon> -->
              <scola-icon color="primary" name="volumeHigh" slot="before"></scola-icon>
              <scola-icon color="primary" off slot="after"></scola-icon>
              <scola-icon color="primary" on name="checkmark" slot="after"></scola-icon>
              <input name="checkmark" value="xyz" type="radio" />
              <scola-node hmargin="medium">Help eens</scola-node>
            </scola-input-select>
            <!-- </scola-node> -->
          </scola-input>

          <scola-input
            fill="medium"
            margin="small"
            round="medium"
            valign="center"
            hpadding="medium"
            vpadding="medium"
            switch
          >
            <scola-node
              font="small"
              color="medium"
              slot="header"
              vmargin="small"
              width="max"
              hpadding="medium"
            >
              <label for="text">Hello</label>
            </scola-node>
            <scola-input-select height="small" valign="center">
              <scola-icon
                color="primary"
                off
                name="radioButtonOff"
                slot="before"
              ></scola-icon>
              <scola-icon
                color="primary"
                on
                name="radioButtonOn"
                slot="before"
              ></scola-icon>
              <!-- <scola-icon off slot="before"></scola-icon>
                  <scola-icon on name="checkmark" slot="before"></scola-icon> -->
              <input name="radio" value="abc" type="radio" />
              <scola-node hmargin="medium">Help eens</scola-node>
            </scola-input-select>

            <scola-input-select height="small" valign="center">
              <scola-icon
                color="primary"
                off
                name="radioButtonOff"
                slot="before"
              ></scola-icon>
              <scola-icon
                color="primary"
                on
                name="radioButtonOn"
                slot="before"
              ></scola-icon>
              <!-- <scola-icon off slot="before"></scola-icon>
                  <scola-icon on name="checkmark" slot="before"></scola-icon> -->
              <input name="radio" value="xyz" type="radio" />
              <scola-node hmargin="medium">Help eens</scola-node>
            </scola-input-select>
          </scola-input>

          <scola-input-range
            fill="medium"
            progress="primary"
            margin="small"
            round="medium"
            valign="center"
            height="medium"
            hpadding="small"
          >
            <scola-node
              font="small"
              color="medium"
              slot="header"
              vmargin="small"
              width="max"
              hpadding="medium"
              halign="between"
            >
              <label for="text">Hello</label>
              <scola-format code="input.range" data-value="0"></scola-format>
            </scola-node>
            <input type="range" min="0" max="45" step="5" name="range" value="10" />
            <scola-button
              padding="small"
              slot="before"
              round="max"
              stealth
              event="scola-input-range-min"
            >
              <scola-icon color="primary" name="volumeOff" slot="before"></scola-icon>
            </scola-button>
            <scola-button
              padding="small"
              slot="after"
              round="max"
              stealth
              event="scola-input-range-max"
            >
              <scola-icon color="primary" name="volumeHigh" slot="before"></scola-icon>
            </scola-button>
          </scola-input-range>

          <scola-input-color
            fill="medium"
            margin="small"
            round="medium"
            valign="center"
            height="medium"
            hpadding=""
          >
            <scola-node
              font="small"
              color="medium"
              slot="header"
              vmargin="small"
              width="max"
              hpadding="medium"
              halign="between"
            >
              <label for="text">Hello</label>
            </scola-node>
            <scola-icon
              color="primary"
              name="colorFilter"
              slot="before"
              hmargin="medium"
            ></scola-icon>
            <input type="color" id="color" name="color" value="#000" />
            <label for="color">
              <scola-format code="input.color" data-count="0" nowrap></scola-format>
            </label>
            <label slot="suffix" for="color"></label>
          </scola-input-color>

          <scola-input-file
            fill="medium"
            state
            margin="small"
            round="medium"
            valign="center"
            height="medium"
            hpadding="small"
          >
            <scola-node
              font="small"
              color="medium"
              slot="header"
              vmargin="small"
              width="max"
              hpadding="medium"
              halign="between"
            >
              <label for="text">Hello</label>
            </scola-node>
            <scola-icon
              color="primary"
              name="image"
              slot="before"
              hmargin="small"
            ></scola-icon>
            <input type="file" id="file" name="file" multiple />
            <label for="file">
              <scola-format code="input.file" data-count="0" hmargin="small" nowrap></scola-format>
            </label>
          </scola-input-file>

          <scola-button
            round="medium"
            fill="medium"
            event="scola-split-toggle"
            height="small"
            target="menu"
            margin="small"
            halign="center"
            valign="center"
          >
            <scola-icon color="primary" name="addCircle" slot="before"></scola-icon>
            <span>Dark Left!</span>
          </scola-button>
        </scola-node>
      </slot>
    `
  }
}

@customElement('me-menu')
class MenuElement extends NodeElement {
  public flow: NodeElement['flow'] = 'column'

  public heading = 'Menu Heading'

  public padding: NodeElement['padding'] = 'medium'

  public render (): TemplateResult {
    return html`
      <slot name="body">
        <scola-node flow="column" margin="medium" round="medium">
          <scola-node
            case="upper"
            font="small"
            slot="header"
            hmargin="medium"
            vmargin="small"
            color="medium"
          >
            Inzicht
          </scola-node>
          <scola-button
            fill="light"
            state
            height="medium"
            valign="center"
            hpadding="small"
            event="scola-split-toggle"
            target="list-panel"
          >
            <scola-icon
              color="primary"
              name="speedometer"
              slot="before"
              hmargin="medium"
            ></scola-icon>
            <span>Dashboard</span>
          </scola-button>
          <scola-button fill="light" state height="medium" valign="center" hpadding="small">
            <scola-icon
              color="primary"
              name="analytics"
              slot="before"
              hmargin="medium"
            ></scola-icon>
            <scola-node nowrap>Rapportages</scola-node>
            <!-- <scola-node color="medium" slot="suffix">10</scola-node> -->
            <!-- <scola-icon slot="after" name="chevronForward"></scola-icon> -->
          </scola-button>
        </scola-node>
        <scola-node flow="column" margin="medium" round="medium">
          <scola-node
            case="upper"
            font="small"
            slot="header"
            hmargin="medium"
            vmargin="small"
            color="medium"
          >
            Lopende zaken
          </scola-node>
          <scola-button fill="light" state height="medium" valign="center" hpadding="small">
            <scola-icon color="primary" name="cube" slot="before" hmargin="medium"></scola-icon>
            <span>Installaties</span>
          </scola-button>
          <scola-button fill="light" state height="medium" valign="center" hpadding="small">
            <scola-icon color="primary" name="checkbox" slot="before" hmargin="medium"></scola-icon>
            <span>Acties</span>
          </scola-button>
        </scola-node>
        <scola-node flow="column" margin="medium" round="medium">
          <scola-node
            case="upper"
            font="small"
            slot="header"
            hmargin="medium"
            vmargin="small"
            color="medium"
          >
            Instellingen
          </scola-node>
          <scola-button fill="light" state height="medium" valign="center" hpadding="small">
            <scola-icon color="primary" name="business" slot="before" hmargin="medium"></scola-icon>
            <span>Organisaties</span>
          </scola-button>
          <scola-button fill="light" state height="medium" valign="center" hpadding="small">
            <scola-icon color="primary" name="people" slot="before" hmargin="medium"></scola-icon>
            <span>Gebruikers</span>
          </scola-button>
        </scola-node>
      </slot>
    `
  }
}

@customElement('me-list')
class ListElement extends NodeElement {
  public flow: NodeElement['flow'] = 'column'

  public heading = 'List Heading'

  public padding: NodeElement['padding'] = 'medium'

  public render (): TemplateResult {
    return html`
      <slot name="body">
        <scola-node flow="column" margin="medium" round="medium">
          <scola-node
            case="upper"
            font="small"
            slot="header"
            hmargin="medium"
            vmargin="small"
            color="medium"
          >
            Inzicht
          </scola-node>
          <scola-button state fill="light" height="medium" valign="center" hpadding="small">
            <scola-icon
              color="primary"
              name="speedometer"
              slot="before"
              hmargin="medium"
            ></scola-icon>
            <span>Dashboard</span>
          </scola-button>
          <scola-button state fill="light" height="medium" valign="center" hpadding="small">
            <scola-icon
              color="primary"
              name="analytics"
              slot="before"
              hmargin="medium"
            ></scola-icon>
            <scola-node nowrap>Rapportages</scola-node>
            <scola-node color="medium" slot="suffix">10</scola-node>
            <scola-icon slot="after" name="chevronForward"></scola-icon>
          </scola-button>
        </scola-node>
      </slot>
    `
  }
}

// document.dir = 'rtl'

createClient({
  dom: {
    // body: html`
    //   <scola-app
    //     style="background: center/cover url(/images/spices.jpg);"
    //     theme="scola-light"
    //   >
    //     <me-aside slot="aside"></me-aside>
    //   </scola-app>
    // `,
    body: html`
      <style>
        scola-app {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
            Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        }
      </style>
      <scola-app flow="row">
        <scola-panel shadow="outer-line" id="menu-panel" fill="light" slot="before" width="small">
          <scola-node
            color="dark"
            fill="light"
            hpadding="medium"
            slot="header"
            height="medium"
            valign="center"
          >
            <scola-node weight="bold" hmargin="medium" nowrap>Menu</scola-node>
            <scola-button
              inline
              state
              slot="after"
              round="max"
              color="primary"
              fill="dark"
              height="small"
              width="small"
              halign="center"
              valign="center"
              event="scola-split-toggle"
              target="menu-panel"
            >
              <scola-icon name="close" slot="after"></scola-icon>
            </scola-button>
      </scola-node>
          <scola-view id="menu" push save></scola-view>
        </scola-panel>
        <scola-panel hidden id="list-panel" fill="medium" slot="before" width="small">
          <scola-node
            color="dark"
            fill="dark"
            hpadding="medium"
            slot="header"
            height="medium"
            valign="center"
          >
            <scola-node weight="bold" hmargin="medium" nowrap>Menu</scola-node>
            <scola-button
              inline
              state
              slot="after"
              round="max"
              color="primary"
              fill="dark"
              height="small"
              width="small"
              halign="center"
              valign="center"
              event="scola-split-toggle"
              target="list-panel"
            >
              <scola-icon name="close" slot="after"></scola-icon>
            </scola-button>
          </scola-node>
          <scola-view id="list" push save></scola-view>
        </scola-panel>
        <scola-panel translucent id="main-panel" fill="light">
          <scola-node
            blur="medium"
            color="dark"
            fill="translucent"
            hpadding="medium"
            slot="header"
            height="medium"
            valign="center"
          >
            <scola-node weight="bold" hmargin="medium" halign="center" nowrap>Main</scola-node>
            <scola-button
              inline
              state
              slot="before"
              round="max"
              color="primary"
              fill="dark"
              height="small"
              width="small"
              halign="center"
              valign="center"
              event="scola-split-toggle"
              target="menu-panel"
            >
              <scola-icon name="menu" slot="before"></scola-icon>
            </scola-button>
            <scola-button
              inline
              state
              slot="after"
              round="max"
              color="primary"
              fill="dark"
              height="small"
              width="small"
              halign="center"
              valign="center"
              event="scola-split-toggle"
              target="meta-panel"
            >
              <scola-icon name="menu" slot="before"></scola-icon>
            </scola-button>
          </scola-node>
          <scola-node
            blur="medium"
            color="dark"
            fill="translucent"
            hpadding="medium"
            slot="footer"
            height="medium"
            valign="center"
          ></scola-node>
          <scola-view id="main" push save>
            <scola-node height="medium" slot="before"></scola-node>
            <scola-node height="medium" slot="after"></scola-node>
          </scola-view>
        </scola-panel>
        <scola-panel shadow="outer-line" translucent id="meta-panel" fill="light" slot="after" width="small" hiddena>
          <scola-node
            blur="medium"
            color="dark"
            fill="translucent"
            hpadding="medium"
            slot="header"
            height="medium"
            valign="center"
          >
            <scola-node weight="bold" hmargin="medium" nowrap>Meta</scola-node>
            <scola-button
              inline
              state
              slot="after"
              round="max"
              color="primary"
              fill="dark"
              height="small"
              width="small"
              halign="center"
              valign="center"
              event="scola-split-toggle"
              target="meta-panel"
            >
              <scola-icon name="close" slot="after"></scola-icon>
            </scola-button>
          </scola-node>
          <scola-view id="meta" push save>
            <scola-node style="height: 3rem;" slot="before"></scola-node>
          </scola-view>
        </scola-panel>
      </scola-app>
    `,
    title: 'Mijn Herman'
  },
  formatter: {
    lang: 'nl',
    strings
  },
  views: [
    {
      default: true,
      name: 'me-menu',
      target: 'menu'
    },
    {
      default: true,
      name: 'me-list',
      target: 'list'
    },
    {
      default: true,
      name: 'me-main',
      target: 'main'
    },
    {
      default: true,
      name: 'me-meta',
      target: 'meta'
    }
  ]
})
