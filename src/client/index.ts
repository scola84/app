import 'reflect-metadata'
import './elements'

import {
  Formatter,
  IconElement,
  NodeElement,
  ViewElement,
  html,
  render
} from '@scola/lib'

import icons from './icons'
import presets from './presets'
import strings from '../common/strings'

window.addEventListener('DOMContentLoaded', (): void => {
  Formatter.lang = 'nl'
  Formatter.strings = strings

  IconElement.icons = icons
  NodeElement.presets = presets

  ViewElement.states = {
    main: {
      refs: ['me-dashboard'],
      save: true
    },
    menu: {
      refs: ['me-menu'],
      save: true
    }
  }

  ViewElement.type = 'replace'

  document.title = 'Mijn Herman'

  render(html`
    <style>
      scola-app {
        font-family: PT Sans, sans-serif;
        background-size: cover;
      }

      scola-app[theme="scola-translucent"][mode="dark"] {
        background: url(/images/shapes.jpg);
      }

      @media (prefers-color-scheme: dark) {
        scola-app[theme="scola-translucent"][mode="system"] {
          background: url(/images/shapes.jpg);
        }
      }

      scola-app[theme="scola-translucent"][mode="light"] {
        background: url(/images/sunflowers3.jpg);
      }

      @media (prefers-color-scheme: light) {
        scola-app[theme="scola-translucent"][mode="system"] {
          background: url(/images/sunflowers3.jpg);
        }
      }
    </style>
    <scola-app theme="scola-solid" mode="dark">
      <scola-panel id="menu-panel" preset="panel-menu" slot="before">
        <scola-node preset="panel-bar" slot="header">
          <scola-node preset="panel-title">Menu</scola-node>
          <scola-node preset="panel-buttons-header" slot="after">
            <scola-button event="scola-view-back" observe="" preset="icon-button" target="menu">
              <scola-icon name="arrowBack"></scola-icon>
            </scola-button>
            <scola-button
              event="scola-view-forward"
              observe=""
              preset="icon-button"
              target="menu"
            >
              <scola-icon name="arrowForward"></scola-icon>
            </scola-button>
            <scola-button
              at-small
              event="scola-clip-outer"
              preset="icon-button"
              target="menu-panel"
            >
              <scola-icon name="close"></scola-icon>
            </scola-button>
          </scola-node>
        </scola-node>
        <scola-view id="menu" preset="view">
          <scola-node height="medium" slot="after"></scola-node>
          <scola-node height="medium" slot="before"></scola-node>
        </scola-view>
      </scola-panel>
      <scola-panel preset="panel-main">
        <scola-node preset="panel-bar" slot="header">
          <scola-title observe="main" preset="panel-title"></scola-title>
          <scola-node at-large at-medium preset="panel-buttons-header" slot="after">
            <scola-button
              event="scola-clip-outer"
              observe=""
              preset="icon-button-toggle"
              target="menu-panel"
            >
              <scola-icon name="menu"></scola-icon>
            </scola-button>
            <scola-button event="scola-view-back" observe="" preset="icon-button" target="main">
              <scola-icon name="arrowBack"></scola-icon>
            </scola-button>
            <scola-button
              event="scola-view-forward"
              observe=""
              preset="icon-button"
              target="main"
            >
              <scola-icon name="arrowForward"></scola-icon>
            </scola-button>
            <scola-button
              event="scola-clip-outer"
              observe=""
              preset="icon-button-toggle"
              target="meta-clip"
            >
              <scola-icon name="ellipsisVertical"></scola-icon>
            </scola-button>
          </scola-node>
        </scola-node>
        <scola-node at-small preset="panel-bar" slot="footer">
          <scola-node preset="panel-buttons-footer">
            <scola-button
              event="scola-clip-outer"
              observe=""
              preset="icon-button-toggle"
              target="menu-panel"
            >
              <scola-icon name="menu"></scola-icon>
            </scola-button>
            <scola-button event="scola-view-back" observe="" preset="icon-button" target="main">
              <scola-icon name="arrowBack"></scola-icon>
            </scola-button>
            <scola-button
              event="scola-view-forward"
              observe=""
              preset="icon-button"
              target="main"
            >
              <scola-icon name="arrowForward"></scola-icon>
            </scola-button>
            <scola-button
              event="scola-clip-outer"
              observe=""
              preset="icon-button-toggle"
              target="meta-clip"
            >
              <scola-icon name="ellipsisVertical"></scola-icon>
            </scola-button>
          </scola-node>
        </scola-node>
        <scola-view id="main" preset="view">
          <scola-node height="medium" slot="before"></scola-node>
          <scola-node at-large at-medium margin="medium" slot="before"></scola-node>
          <scola-node at-small height="medium" slot="after"></scola-node>
        </scola-view>
      </scola-panel>
      <scola-clip hidden id="meta-clip" preset="clip-meta" slot="after">
        <scola-node handle preset="clip-meta-bar" slot="after">
          <scola-node preset="clip-meta-bar-buttons">
            <scola-button event="scola-clip-outer" preset="icon-button" target="meta-clip">
              <scola-icon name="close"></scola-icon>
            </scola-button>
            <scola-button
              event="scola-clip-content-or-inner"
              observe=""
              preset="clip-meta-bar-button"
              target="notifications-panel"
            >
              <scola-icon name="notifications"></scola-icon>
            </scola-button>
            <scola-button
              event="scola-clip-content-or-inner"
              observe=""
              preset="clip-meta-bar-button"
              target="profile-panel"
            >
              <scola-icon name="person"></scola-icon>
            </scola-button>
          </scola-node>
        </scola-node>
        <scola-panel hidden id="notifications-panel" preset="panel-meta">
          <scola-node preset="panel-bar" slot="header">
            <scola-node preset="panel-title">Meldingen</scola-node>
            <scola-node preset="panel-buttons-header" slot="after"></scola-node>
          </scola-node>
          <scola-view id="notifications" preset="view">
            <scola-node height="medium" slot="after"></scola-node>
            <scola-node height="medium" slot="before"></scola-node>
          </scola-view>
        </scola-panel>
        <scola-panel hidden id="profile-panel" preset="panel-meta">
          <scola-node preset="panel-bar" slot="header">
            <scola-node preset="panel-title">Profiel</scola-node>
            <scola-node preset="panel-buttons-header" slot="after">
              <scola-button
                event="scola-view-back"
                observe=""
                preset="icon-button"
                target="profile"
              >
                <scola-icon name="arrowBack"></scola-icon>
              </scola-button>
              <scola-button
                event="scola-view-forward"
                observe=""
                preset="icon-button"
                target="profile"
              >
                <scola-icon name="arrowForward"></scola-icon>
              </scola-button>
            </scola-node>
          </scola-node>
          <scola-view id="profile" preset="view">
            <scola-node height="medium" slot="after"></scola-node>
            <scola-node height="medium" slot="before"></scola-node>
          </scola-view>
        </scola-panel>
      </scola-clip>
    </scola-app>
  `, document.body)
})
