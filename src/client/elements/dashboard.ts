import {
  NodeElement,
  TemplateResult,
  customElement,
  html
} from '@scola/lib'

@customElement('me-dashboard')
export class DashboardElement extends NodeElement {
  public viewTitle = 'Dashboard'

  public createRenderRoot (): this {
    return this
  }

  public render (): TemplateResult {
    return html`
      <scola-node
        flow="row"
        outer-width="max"
        halign="center"
        hpadding="medium"
        vpadding="medium"
        wrap
      >
        <scola-node
          log-level="all"
          id="panel-list"
          cols="6"
          preset="main-card"
          outer-height="large"
          height="max"
        >
          <scola-list
            url="/api/inverter"
            id="list"
            fill="aux-2"
            outer-height="max"
            outer-width="max"
            scrollable
          >
            <scola-input
              is="search"
              save
              id="list-search"
              fill="aux-3"
              slot="header"
              height="medium"
              valign="center"
              flow="row"
              round=""
            >
              <scola-icon
                name="search"
                size="small"
                slot="before"
                hmargin="medium"
                color="aux-2"
              ></scola-icon>
              <input type="search" name="search" placeholder="Zoeken" />
            </scola-input>
            <scola-log no-overflow slot="header" observe="panel-list" hidden outer-shadow="min">
              <scola-node
                slot="template"
                vpadding="small"
                hpadding="medium"
                halign="end"
                fill="aux-3"
                valign="center"
                flow="row"
                wrap
                width="max"
              >
                <scola-format width="auto" hpadding="small" vmargin="small"></scola-format>
                <scola-button event="scola-log-hide" margin="small" preset="main-card-panel-button">
                  OK
                </scola-button>
              </scola-node>
            </scola-log>
            <scola-progress
            stroke="medium"
              fill="sig-1"
              slot="header"
              vposition="top"
              width="max"
              type="rect"
                observe="list"
              ></scola-progress>
            <scola-node
              fill="aux-3"
              hpadding="medium"
              flow="row"
              valign="center"
              halign="end"
              height="medium"
              slot="footer"
            >
              <scola-progress
                slot="before"
                size="medium"
                stroke="small"
                fill="sig-1"
                type="circle"
                observe="list"
              ></scola-progress>
              <scola-button fill="aux-2" preset="icon-button" event="scola-list-restart">
                <scola-icon size="medium" name="refresh"></scola-icon>
              </scola-button>
              <scola-button fill="aux-2" preset="icon-button" target="filter-list" event="scola-dialog-show">
                <scola-icon size="small" name="filter"></scola-icon>
              </scola-button>
              <scola-dialog
                hidden
                id="filter-list"
                vto="bottom-at-top"
                hto="center"
                vfrom-screen="screen-bottom"
                hfrom-screen="screen-center"
                hto-screen="screen-center"
                vto-screen="screen-bottom"
                hspacing="medium"
                vspacing="medium"
              >
                <scola-node
                  fill="aux-3"
                  outer-shadow="small"
                  flow="column"
                >
                <scola-button
                  preset="menu-button"
                  fill="aux-3"
                  hpadding="large"
                  event="scola-dialog-hide scola-list-filter"
                  data-filter-name="filtername"
                  target="filter-list list"
                  >
                  clear
                </scola-button>
                <scola-button
                  preset="menu-button"
                  fill="aux-3"
                  hpadding="large"
                  event="scola-dialog-hide scola-list-filter"
                  data-filter-name="filtername"
                  data-filter-value="filtervalue"
                  target="filter-list list"
                  >
                  filter
                </scola-button>
              </scola-node>
              </scola-dialog>
              <scola-button fill="aux-2" preset="icon-button" target="order-list" event="scola-dialog-show">
                <scola-icon size="medium" name="arrowDown"></scola-icon>
              </scola-button>
              <scola-dialog
                hidden
                id="order-list"
                vto="bottom-at-top"
                hto="center"
                vfrom-screen="screen-bottom"
                hfrom-screen="screen-center"
                hto-screen="screen-center"
                vto-screen="screen-bottom"
                hspacing="medium"
                vspacing="medium"
              >
                <scola-node
                  fill="aux-3"
                  outer-shadow="small"
                  flow="column"
                >
                <scola-button
                  preset="menu-button"
                  fill="aux-3"
                  hpadding="large"
                  event="scola-dialog-hide scola-list-order"
                  data-order-col="xyz"
                  data-order-dir="desc"
                  target="order-list list"
                  >
                  xyz up
                </scola-button>
                <scola-button
                  preset="menu-button"
                  fill="aux-3"
                  hpadding="large"
                  event="scola-dialog-hide scola-list-order"
                  data-order-col="xyz"
                  data-order-dir="asc"
                  target="order-list list"
                  >
                  xyz asc
                </scola-button>
              </scola-node>
              </scola-dialog>
            </scola-node>
            <scola-node slot="empty" height="medium" flow="row" valign="center" hpadding="medium">
              Geen items gevonden
            </scola-node>
            <scola-node
              slot="template"
              height="medium"
              hpadding="medium"
              valign="center"
              flow="row"
            >
              <scola-format code="serial_number" data-id="" data-serialnumber=""></scola-format>
            </scola-node>
          </scola-list>
        </scola-node>
        <scola-node cols="6" preset="main-card">
          <scola-node scrollable id="panel-profile" preset="main-card-panel" log-level="err">
            <scola-node preset="main-card-panel-bar" slot="header">
              <scola-node preset="panel-title">Profiel</scola-node>
              <scola-node preset="main-card-panel-buttons" slot="after">
                <scola-button
                  event="scola-request-toggle"
                  observe="progress-profile"
                  preset="main-card-panel-button"
                  target="form-profile"
                >
                  <scola-progress
                    is="progress"
                    hposition="start"
                    vposition="top"
                    mode="determinate"
                    width="max"
                    height="max"
                    id="progress-profile"
                    method="POST"
                    stroke="small"
                    size="medium"
                    fill="sig-1"
                    type="circle"
                    observe="form-profile"
                  ></scola-progress>
                  <scola-icon is="abort" size="small" name="stop" width="max" valign="center" halign="center" flow="row" height="max" vposition="top" hposition="start"></scola-icon>
                  <scola-format is="start">Opslaan</scola-format>
                </scola-button>
              </scola-node>
            </scola-node>
            <scola-log no-overflow slot="header" observe="panel-profile" hidden>
              <scola-node
                slot="template"
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
            <scola-progress
              stroke="medium"
              fill="sig-1"
              method="POST"
              vposition="top"
              width="max"
              type="rect"
              observe="form-profile"
            ></scola-progress>
            <scola-form
              wait
              no-overflow
              id="form-profile"
              url="/api/profile"
              preset="main-card-panel-content"
            >
              <!-- <scola-button event="scola-request-toggle-pause" margin="small" preset="icon-button" observe="form-profile">
                <scola-icon hposition="start"
                    flow="row"
                    halign="center"
                    valign="center"
                    vposition="top"
                    width="max"
                    height="max"
                    size="medium" name="play" is="start"></scola-icon>
                <scola-icon hposition="start"
                flow="row"
                    halign="center"
                    valign="center"
                    vposition="top"
                    width="max"
                    height="max"
                    size="medium" name="pause" is="pause"></scola-icon>
              </scola-button>
              <scola-button event="scola-request-toggle-stop" margin="small" preset="icon-button" observe="form-profile">
                <scola-icon hposition="start"
                flow="row"
                    halign="center"
                    valign="center"
                    vposition="top"
                    width="max"
                    height="max"
                    size="medium" name="play" is="start"></scola-icon>
                <scola-icon hposition="start"
                flow="row"
                    halign="center"
                    valign="center"
                    vposition="top"
                    width="max"
                    height="max"
                    size="medium" name="stop" is="stop"></scola-icon>
              </scola-button>
              <scola-button event="scola-request-start" margin="small" preset="icon-button" observe="form-profile">
                <scola-icon size="medium" name="play"></scola-icon>
              </scola-button>
              <scola-button event="scola-request-pause" margin="small" preset="icon-button" observe="form-profile">
                <scola-icon size="medium" name="pause"></scola-icon>
              </scola-button>
              <scola-button event="scola-request-stop" margin="small" preset="icon-button" observe="form-profile">
                <scola-icon size="medium" name="stop"></scola-icon>
              </scola-button> -->

              <scola-input cols="3" preset="input" cols="7">
                <scola-node preset="input-header" slot="header">
                  <label for="given_name">Voornaam</label>
                </scola-node>
                <input type="text" id="given_name" name="given_name" />
                <scola-button
                  is="clear"
                  event="scola-input-clear"
                  color="aux-2"
                  slot="after"
                  hidden
                >
                  <scola-icon size="small" name="closeCircle"></scola-icon>
                </scola-button>
                <scola-format
                  is="error"
                  spacing="small"
                  fill="error"
                  color="aux-3"
                  padding="small"
                  hidden
                  hposition="start"
                  vposition="bottom"
                ></scola-format>
              </scola-input>
              <scola-input preset="input" width="flex">
                <scola-node preset="input-header" slot="header">
                  <label for="family_name">Achternaam</label>
                </scola-node>
                <input type="text" id="family_name" name="family_name" />
              </scola-input>
              <!-- <scola-node width="max"></scola-node>
              <scola-input preset="input-with-icon" width="flex">
                <scola-node preset="input-header" slot="header">
                  <label for="email">E-mailadres</label>
                </scola-node>
                <scola-icon preset="input-icon" name="at" slot="before"></scola-icon>
                <input type="email" id="email" placeholder="Bijv. naam@domein.nl" />
              </scola-input>
              <scola-node width="max"></scola-node>
              <scola-input preset="input-with-icon" width="flex">
                <scola-node preset="input-header" slot="header">
                  <label for="tel">Telefoonnr.</label>
                </scola-node>
                <scola-icon preset="input-icon" name="call" slot="before"></scola-icon>
                <input type="tel" id="tel" placeholder="Bijv. 0612345678" />
              </scola-input> -->

              <scola-node width="max"></scola-node>
              <scola-picker preset="input-with-icon" width="flex" disabled>
                <scola-node preset="input-header" slot="header">
                  <label for="color">Kleur</label>
                </scola-node>
                <scola-icon preset="input-icon" name="colorFilter" slot="before"></scola-icon>
                <input type="color" id="color" name="color" />
                <scola-format is="value" code="input_color" data-count="0"></scola-format>
                <scola-button
                  is="clear"
                  event="scola-input-clear"
                  color="aux-2"
                  slot="after"
                  hidden
                >
                  <scola-icon size="small" name="closeCircle"></scola-icon>
                </scola-button>
                <scola-node hmargin="medium" width="small" height="small" round="max" slot="after">
                  <scola-node is="preview" width="max"></scola-node>
                </scola-node>
              </scola-picker>

              <scola-node width="max"></scola-node>
              <scola-picker no-overflow preset="input-with-icon" width="flex">
                <scola-node preset="input-header" slot="header">
                  <label for="file">Bestand</label>
                </scola-node>
                <scola-icon preset="input-icon" name="image" slot="before"></scola-icon>
                <input type="file" id="file" name="file" multiple />
                <scola-format
                  is="value"
                  code="input_file"
                  data-count="0"
                  no-overflow
                  no-wrap
                ></scola-format>
                <scola-button
                  is="clear"
                  event="scola-input-clear"
                  color="aux-2"
                  slot="after"
                  hidden
                  hmargin="medium"
                >
                  <scola-icon size="small" name="closeCircle"></scola-icon>
                </scola-button>
              </scola-picker>

              <scola-node width="max"></scola-node>
              <scola-slider preset="input-with-icon" fill-progress="sig-1" width="flex">
                <scola-node preset="input-header" slot="header">
                  <label for="volume">Range</label>
                  <scola-format code="input_range" is="value"></scola-format>
                </scola-node>
                <scola-icon preset="input-icon" name="volumeOff" slot="before"></scola-icon>
                <scola-icon preset="input-icon" name="volumeHigh" slot="after"></scola-icon>
                <input type="range" name="range" id="range" min="0" max="100" />
                <scola-format
                  is="error"
                  spacing="small"
                  fill="error"
                  color="aux-3"
                  padding="small"
                  hidden
                  hposition="start"
                  vposition="bottom"
                ></scola-format>
              </scola-slider>

              <scola-node width="max"></scola-node>
              <scola-select width="flex" preset="input-with-icon" fill-checked="sig-1" switch>
                <scola-node preset="input-header" slot="header">
                  <label for="switch">Switch</label>
                </scola-node>
                <!-- <scola-icon is="off" name="ellipse-outline" slot="before"></scola-icon> -->
                <!-- <scola-icon is="on" name="checkmark-circle" slot="before"></scola-icon> -->
                <!-- <scola-icon is="off" slot="after"></scola-icon> -->
                <!-- <scola-icon is="on" name="checkmark" slot="after"></scola-icon> -->
                <scola-icon preset="input-icon" name="volumeOff" slot="before"></scola-icon>
                <input name="switch" value="switchvalue" type="checkbox" />
                <span>Switch</span>
                <scola-node margin="small" slot="after"></scola-node>
              </scola-select>

              <scola-node width="max"></scola-node>
              <scola-input width="max" hmargin="medium" vmargin="small" round="medium">
                <scola-node preset="input-header" slot="header">
                  <label>Radio</label>
                </scola-node>
                <scola-node flow="column" width="flex">
                  <scola-select
                    height="medium"
                    width="flex"
                    fill="aux-1"
                    fill-active="aux-1"
                    fill-hover="aux-1"
                    valign="center"
                    flow="row"
                  >
                    <!-- <scola-icon is="off" name="radio-button-off-outline" slot="before"></scola-icon> -->
                    <!-- <scola-icon is="on" name="radio-button-on-outline" slot="before"></scola-icon> -->
                    <scola-icon preset="input-icon" name="volumeOff" slot="before"></scola-icon>
                    <scola-icon size="medium" hmargin="medium" is="off" slot="after"></scola-icon>
                    <scola-icon
                      size="medium"
                      hmargin="medium"
                      is="on"
                      name="checkmark"
                      slot="after"
                    ></scola-icon>
                    <input name="radio" value="radiovalue1" type="radio" />
                    <span>Value 1</span>
                  </scola-select>
                  <!-- <scola-node margin="small"></scola-node> -->
                  <scola-select
                    height="medium"
                    width="flex"
                    fill="aux-1"
                    fill-hover="aux-1"
                    fill-active="aux-1"
                    valign="center"
                    flow="row"
                  >
                    <!-- <scola-icon is="off" name="radio-button-off-outline" slot="before"></scola-icon> -->
                    <!-- <scola-icon is="on" name="radio-button-on-outline" slot="before"></scola-icon> -->
                    <scola-icon preset="input-icon" name="volumeHigh" slot="before"></scola-icon>
                    <scola-icon size="medium" hmargin="medium" is="off" slot="after"></scola-icon>
                    <scola-icon
                      size="medium"
                      hmargin="medium"
                      is="on"
                      name="checkmark"
                      slot="after"
                    ></scola-icon>
                    <input name="radio" value="radiovalue2" type="radio" />
                    <span>Value 2</span>
                  </scola-select>
                </scola-node>
              </scola-input>

              <scola-node width="max"></scola-node>
              <scola-input width="max" hmargin="medium" vmargin="small" round="medium">
                <scola-node preset="input-header" slot="header">
                  <label>Checkbox</label>
                </scola-node>
                <scola-node flow="column" width="flex">
                  <scola-select
                    height="medium"
                    width="flex"
                    fill="aux-1"
                    fill-hover="aux-1"
                    fill-active="aux-1"
                    valign="center"
                    flow="row"
                  >
                    <!-- <scola-icon is="off" name="radio-button-off-outline" slot="before"></scola-icon> -->
                    <!-- <scola-icon is="on" name="radio-button-on-outline" slot="before"></scola-icon> -->
                    <!-- <scola-icon preset="input-icon" name="volumeOff" slot="before"></scola-icon> -->
                    <scola-icon
                      size="medium"
                      hmargin="medium"
                      is="off"
                      name="ellipse"
                      slot="before"
                    ></scola-icon>
                    <scola-icon
                      hmargin="medium"
                      size="medium"
                      is="on"
                      name="checkmarkCircle"
                      slot="before"
                    ></scola-icon>
                    <input name="checkbox1" value="checkbox1value" type="checkbox" />
                    <span>Value 1</span>
                  </scola-select>
                  <!-- <scola-node margin="small"></scola-node> -->
                  <scola-select
                    height="medium"
                    width="flex"
                    fill="aux-1"
                    fill-hover="aux-1"
                    fill-active="aux-1"
                    valign="center"
                    flow="row"
                  >
                    <!-- <scola-icon is="off" name="radio-button-off-outline" slot="before"></scola-icon> -->
                    <!-- <scola-icon is="on" name="radio-button-on-outline" slot="before"></scola-icon> -->
                    <!-- <scola-icon preset="input-icon" name="volumeHigh" slot="before"></scola-icon> -->
                    <scola-icon
                      size="medium"
                      hmargin="medium"
                      is="off"
                      name="ellipse"
                      slot="before"
                    ></scola-icon>
                    <scola-icon
                      hmargin="medium"
                      size="medium"
                      is="on"
                      name="checkmarkCircle"
                      slot="before"
                    ></scola-icon>
                    <input name="checkbox2" value="checkbox2value" type="checkbox" />
                    <span>Value 2</span>
                  </scola-select>
                </scola-node>
              </scola-input>

              <scola-node vmargin="small" width="max"></scola-node>
            </scola-form>
          </scola-node>
        </scola-node>
      </scola-node>
    `
  }
}
