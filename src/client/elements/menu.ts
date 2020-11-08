import {
  NodeElement,
  TemplateResult,
  customElement,
  html
} from '@scola/lib'

@customElement('me-menu')
export class MenuElement extends NodeElement {
  public createRenderRoot (): this {
    return this
  }

  public render (): TemplateResult {
    return html`
      <scola-node
        fill="aux-1"
        hpadding="large"
        vpadding="medium"
        flow="column"
        width="flex"
        scrollable
        outer-height="max"
      >
        <scola-node height="medium"></scola-node>
        <scola-node preset="card">
          <scola-node
            color="aux-2"
            hmargin="medium"
            vmargin="small"
            font="small"
            case="upper"
            flow="row"
            halign="between"
            slot="header"
          >
            <scola-format preset="">Overzicht</scola-format>
            <!-- <scola-popout hto="start-at-end" vto="top" locked> -->
            <scola-button event="scola-dialog-show" target="dialog">open</scola-button>
            <!-- <scola-dialog hidden id="dialog" fill="translucent" width="max" height="max" vposition="top" hposition="start" hfrom="screen-center" hto="screen-center" vfrom="screen-top" vto="screen-top"> -->
            <scola-dialog
              hidden
              id="dialog"
              vto="top"
              hto="start-at-end"
              vfrom-screen="screen-bottom"
              hfrom-screen="screen-center"
              hto-screen="screen-center"
              vto-screen="screen-bottom"
              hspacing="medium"
              vspacing="medium"
            >
              <scola-node
                scrollable
                fill="aux-2"
                outer-shadow="small"
                inner-width="small"
                flow="column"
              >
                <scola-button preset="menu-button" hpadding="large" event="scola-dialog-hide">
                  hide
                </scola-button>
                <scola-button
                  preset="menu-button"
                  hpadding="large"
                  event="scola-dialog-hide"
                >
                  hide
                </scola-button>
                <scola-button
                  preset="menu-button"
                  hpadding="large"
                  event="scola-dialog-show"
                  target="dialog2"
                >
                  show
                </scola-button>
                <!-- <scola-button preset="menu-button" event="scola-dialog-hide">hide</scola-button>
                <scola-button preset="menu-button" event="scola-dialog-hide">hide</scola-button>
                <scola-button preset="menu-button" event="scola-dialog-hide">hide</scola-button>
                <scola-button preset="menu-button" event="scola-dialog-hide">hide</scola-button>
                <scola-button preset="menu-button" event="scola-dialog-hide">hide</scola-button>
                <scola-button preset="menu-button" event="scola-dialog-hide">hide</scola-button>
                <scola-button preset="menu-button" event="scola-dialog-hide">hide</scola-button>
                <scola-button preset="menu-button" event="scola-dialog-hide">hide</scola-button>
                <scola-button preset="menu-button" event="scola-dialog-hide">hide</scola-button>
                <scola-button preset="menu-button" event="scola-dialog-hide">hide</scola-button>
                <scola-button preset="menu-button" event="scola-dialog-hide">hide</scola-button>
                <scola-button preset="menu-button" event="scola-dialog-hide">hide</scola-button>
                <scola-button preset="menu-button" event="scola-dialog-hide">hide</scola-button>
                <scola-button preset="menu-button" event="scola-dialog-hide">hide</scola-button>
                <scola-button preset="menu-button" event="scola-dialog-hide">hide</scola-button>
                <scola-button preset="menu-button" event="scola-dialog-hide">hide</scola-button>
                <scola-button preset="menu-button" event="scola-dialog-hide">hide</scola-button>
                <scola-button preset="menu-button" event="scola-dialog-hide">hide</scola-button>
                <scola-button preset="menu-button" event="scola-dialog-hide">hida</scola-button> -->
              </scola-node>
            </scola-dialog>
            <scola-dialog
              hspacing="medium"
              hidden
              id="dialog2"
              vto="top"
              hto="start-at-end"
              vfrom-screen="screen-bottom"
              hfrom-screen="screen-center"
              hto-screen="screen-center"
              vto-screen="screen-bottom"
            >
              <scola-node
                scrollable
                fill="aux-2"
                outer-shadow="small"
                inner-width="small"
                flow="column"
              >
                <scola-button preset="menu-button" hpadding="large" event="scola-dialog-hide">
                  hide
                </scola-button>
                <scola-button
                  preset="menu-button"
                  hpadding="large"
                  event="scola-dialog-hide"
                  cancel
                >
                  hide
                </scola-button>
                <scola-button preset="menu-button" hpadding="large" event="scola-dialog-hide">
                  hide
                </scola-button>
              </scola-node>
            </scola-dialog>
          </scola-node>
          <scola-button preset="menu-button" target="menu" vref="me-menu2">
            <scola-icon name="speedometer" preset="menu-icon" slot="before"></scola-icon>
            <scola-format>Dashboard</scola-format>
          </scola-button>
          <scola-button preset="menu-button" target="main" vref="me-reports">
            <scola-icon name="analytics" preset="menu-icon" slot="before"></scola-icon>
            <scola-format>Rapportages</scola-format>
          </scola-button>
        </scola-node>
      </scola-node>
    `
  }
}
