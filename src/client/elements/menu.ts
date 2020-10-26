import {
  NodeElement,
  TemplateResult,
  customElement,
  html
} from '@scola/lib'

@customElement('me-menu')
export class MenuElement extends NodeElement {
  public flow: NodeElement['flow'] = 'column'

  public hpadding: NodeElement['hpadding'] = 'large'

  public vpadding: NodeElement['vpadding'] = 'medium'

  public render (): TemplateResult {
    return html`
      <slot name="body">
        <scola-node preset="card">
          <scola-format preset="card-header" slot="header">Overzicht</scola-format>
          <scola-button preset="menu-button" target="menu" vref="me-menu2">
            <scola-icon name="speedometer" preset="menu-icon" slot="before"></scola-icon>
            <scola-format>Dashboard</scola-format>
          </scola-button>
          <scola-button preset="menu-button" target="main" vref="me-reports">
            <scola-icon name="analytics" preset="menu-icon" slot="before"></scola-icon>
            <scola-format>Rapportages</scola-format>
          </scola-button>
        </scola-node>
      </slot>
    `
  }
}
