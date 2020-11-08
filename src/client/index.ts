import 'reflect-metadata'
import './elements'

import {
  FormatElement,
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
  FormatElement.lang = 'nl'
  FormatElement.strings = strings

  IconElement.icons = icons
  NodeElement.presets = presets

  ViewElement.states = {
    main: {
      save: true,
      views: [{
        ref: 'me-dashboard'
      }]
    },
    menu: {
      save: true,
      views: [{
        ref: 'me-menu'
      }]
    }
  }

  ViewElement.type = 'replace'

  // document.dir = 'rtl'
  document.title = 'Mijn Herman'
  document.body.ontouchstart = (): void => {}

  render(
    html`
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
      <scola-app id="app" theme="scola-solid" mode="light" log-level="all" no-context>
        <scola-node slot="header" vposition="bottom" hposition="end" padding="medium">
          <scola-log observe="app" timeout="" hidden>
            <scola-node
              slot="template"
              no-overflow
              vpadding="small"
              hpadding="medium"
              halign="end"
              fill="aux-3"
              valign="center"
              flow="row"
              wrap
              width="max"
            >
              <scola-format width="auto" hpadding="small" vmargin="small" log></scola-format>
              <scola-button event="scola-log-hide" margin="small" preset="main-card-panel-button">
                OK
              </scola-button>
            </scola-node>
          </scola-log>
        </scola-node>
        <scola-node id="menu-panel" preset="panel-menu" slot="before">
          <scola-node preset="panel-bar" slot="header" vposition="top">
            <scola-title preset="panel-title">Menu</scola-title>
            <scola-node preset="panel-buttons-header" slot="after">
              <scola-button event="scola-view-back" observe="" preset="icon-button" target="menu">
                <scola-icon rtl size="medium" name="arrowBack"></scola-icon>
              </scola-button>
              <scola-button
                event="scola-view-forward"
                observe=""
                preset="icon-button"
                target="menu"
              >
                <scola-icon rtl size="medium" name="arrowForward"></scola-icon>
              </scola-button>
              <scola-button
                at-small
                event="scola-clip-outer"
                preset="icon-button"
                target="menu-panel"
              >
                <scola-icon size="medium" name="close"></scola-icon>
              </scola-button>
            </scola-node>
          </scola-node>
          <scola-view id="menu" preset="view"></scola-view>
        </scola-node>
        <scola-node scrollable preset="panel-main">
          <scola-node preset="panel-bar" slot="header" vposition="top">
            <scola-title observe="main" preset="panel-title"></scola-title>
            <scola-node at-large at-medium preset="panel-buttons-header" slot="after">
              <scola-button
                event="scola-clip-outer"
                observe=""
                preset="icon-button-toggle"
                target="menu-panel"
              >
                <scola-icon size="medium" name="menu"></scola-icon>
              </scola-button>
              <scola-button event="scola-view-back" observe="" preset="icon-button" target="main">
                <scola-icon rtl size="medium" name="arrowBack"></scola-icon>
              </scola-button>
              <scola-button
                event="scola-view-forward"
                observe=""
                preset="icon-button"
                target="main"
              >
                <scola-icon rtl size="medium" name="arrowForward"></scola-icon>
              </scola-button>
              <scola-button
                event="scola-clip-outer"
                observe=""
                preset="icon-button-toggle"
                target="meta-clip"
              >
                <scola-icon size="medium" name="ellipsisVertical"></scola-icon>
              </scola-button>
            </scola-node>
          </scola-node>
          <scola-node at-small preset="panel-bar" slot="footer" vposition="bottom">
            <scola-node preset="panel-buttons-footer">
              <scola-button
                event="scola-clip-outer"
                observe=""
                preset="icon-button-toggle"
                target="menu-panel"
              >
                <scola-icon size="medium" name="menu"></scola-icon>
              </scola-button>
              <scola-button event="scola-view-back" observe="" preset="icon-button" target="main">
                <scola-icon size="medium" name="arrowBack"></scola-icon>
              </scola-button>
              <scola-button
                event="scola-view-forward"
                observe=""
                preset="icon-button"
                target="main"
              >
                <scola-icon size="medium" name="arrowForward"></scola-icon>
              </scola-button>
              <scola-button
                event="scola-clip-outer"
                observe=""
                preset="icon-button-toggle"
                target="meta-clip"
              >
                <scola-icon size="medium" name="ellipsisVertical"></scola-icon>
              </scola-button>
            </scola-node>
          </scola-node>
          <scola-view content-duration="0" id="main" preset="view">
            <scola-node height="medium" slot="header"></scola-node>
            <scola-node at-large at-medium margin="medium" slot="header"></scola-node>
            <scola-node at-small height="medium" slot="footer"></scola-node>
          </scola-view>
        </scola-node>
        <scola-clip id="meta-clip" preset="clip-meta" slot="after" hidden>
          <scola-node is="handle" preset="clip-meta-bar" slot="after">
            <scola-node preset="clip-meta-bar-buttons">
              <scola-button event="scola-clip-outer" preset="icon-button" target="meta-clip">
                <scola-icon size="medium" name="close"></scola-icon>
              </scola-button>
              <scola-button
                event="scola-clip-content-or-inner"
                observe=""
                preset="clip-meta-bar-button"
                target="notifications-panel"
              >
                <scola-icon size="medium" name="notifications"></scola-icon>
                <scola-icon flow="row" halign="center" valign="center" vposition="top" hposition="end" font="small" fill="error" color="aux-3" padding="small" round="max" size="small">9</scola-icon>
              </scola-button>
              <scola-button
                event="scola-clip-content-or-inner"
                observe=""
                preset="clip-meta-bar-button"
                target="profile-panel"
              >
                <scola-icon size="medium" name="person"></scola-icon>
              </scola-button>
            </scola-node>
          </scola-node>
          <scola-node scrollable hidden id="notifications-panel" preset="panel-meta">
            <scola-node preset="panel-bar" slot="header" vposition="top">
              <scola-node preset="panel-title">Meldingen</scola-node>
              <scola-node preset="panel-buttons-header" slot="after"></scola-node>
            </scola-node>
            <scola-view id="notifications" preset="view">
              <scola-node height="medium" slot="after"></scola-node>
              <scola-node height="medium" slot="before"></scola-node>
            </scola-view>
          </scola-node>
          <scola-node scrollable hidden id="profile-panel" preset="panel-meta">
            <scola-node preset="panel-bar" slot="header" vposition="top">
              <scola-node preset="panel-title">Profiel</scola-node>
              <scola-node preset="panel-buttons-header" slot="after">
                <scola-button
                  event="scola-view-back"
                  observe=""
                  preset="icon-button"
                  target="profile"
                >
                  <scola-icon size="medium" name="arrowBack"></scola-icon>
                </scola-button>
                <scola-button
                  event="scola-view-forward"
                  observe=""
                  preset="icon-button"
                  target="profile"
                >
                  <scola-icon size="medium" name="arrowForward"></scola-icon>
                </scola-button>
              </scola-node>
            </scola-node>
            <scola-view id="profile" preset="view">
              <scola-node height="medium" slot="after"></scola-node>
              <scola-node height="medium" slot="before"></scola-node>
            </scola-view>
          </scola-node>
        </scola-clip>
      </scola-app>
    `,
    document.body
  )
})
