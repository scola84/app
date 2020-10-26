import {
  NodeElement,
  TemplateResult,
  customElement,
  html
} from '@scola/lib'

@customElement('me-dashboard')
export class DashboardElement extends NodeElement {
  public flow: NodeElement['flow'] = 'row'

  public halign: NodeElement['halign'] = 'center'

  public hpadding: NodeElement['hpadding'] = 'medium'

  public viewTitle = 'Dashboard'

  public vpadding: NodeElement['vpadding'] = 'medium'

  public wrap: NodeElement['wrap'] = true

  public createRenderRoot (): this {
    return this
  }

  public render (): TemplateResult {
    return html`
      <scola-node flow="row" halign="center" hpadding="medium" vpadding="medium" wrap>
        <scola-section cols="10" preset="main-card">
          <scola-panel preset="main-card-panel">
            <scola-node preset="main-card-panel-bar" slot="header">
              <scola-node preset="panel-title">Profiel</scola-node>
              <scola-node preset="main-card-panel-buttons" slot="after">
                <scola-button
                  event="scola-form-submit"
                  observe="form-progress"
                  preset="main-card-panel-button"
                  target="form"
                >
                  <scola-progress
                    position="center"
                    id="form-progress"
                    method="POST"
                    size="medium"
                    fill="sig-1"
                    type="circle"
                    observe="form"
                  ></scola-progress>
                  <scola-format>Opslaan</scola-format>
                </scola-button>
              </scola-node>
            </scola-node>
            <scola-progress
              size="medium"
              fill="sig-1"
              position="top"
              type="rect"
              observe="form"
            ></scola-progress>
            <scola-form id="form" url="/api/profile" preset="main-card-panel-content">
              <scola-input cols="3" preset="input" cols="7">
                <scola-node preset="input-header" slot="header">
                  <label for="given_name">Voornaam</label>
                </scola-node>
                <input type="text" id="given_name" />
              </scola-input>
              <scola-input preset="input" width="flex">
                <scola-node preset="input-header" slot="header">
                  <label for="family_name">Achternaam</label>
                </scola-node>
                <input type="text" id="family_name" />
              </scola-input>
              <scola-node width="max"></scola-node>
              <scola-input preset="input-icon" width="flex">
                <scola-node preset="input-header" slot="header">
                  <label for="email">E-mailadres</label>
                </scola-node>
                <scola-icon color="sig-1" hmargin="medium" name="at" slot="before"></scola-icon>
                <input type="email" id="email" placeholder="Bijv. naam@domein.nl" />
              </scola-input>
              <scola-node width="max"></scola-node>
              <scola-input preset="input-icon" width="flex">
                <scola-node preset="input-header" slot="header">
                  <label for="tel">Telefoonnr.</label>
                </scola-node>
                <scola-icon color="sig-1" hmargin="medium" name="call" slot="before"></scola-icon>
                <input type="tel" id="tel" placeholder="Bijv. 0612345678" />
              </scola-input>
              <scola-node vmargin="small" width="max"></scola-node>
            </scola-form>
          </scola-panel>
        </scola-section>
      </scola-node>
    `
  }
}
