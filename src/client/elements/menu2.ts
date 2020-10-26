import {
  NodeElement,
  TemplateResult,
  customElement,
  html
} from '@scola/lib'

@customElement('me-menu2')
export class Menu2Element extends NodeElement {
  public flow: NodeElement['flow'] = 'column'

  public hpadding: NodeElement['hpadding'] = 'large'

  public vpadding: NodeElement['vpadding'] = 'medium'

  public render (): TemplateResult {
    return html`
      <slot name="body">
        <scola-node preset="card">
          <scola-format preset="card-header" slot="header">Overzicht</scola-format>
          <scola-button preset="menu-button" target="main" vref="me-dashboard">
            <scola-icon name="speedometer" preset="menu-icon" slot="before"></scola-icon>
            <scola-format>Dashboard</scola-format>
          </scola-button>
          <scola-button preset="menu-button" target="main" vref="me-reports">
            <scola-icon name="analytics" preset="menu-icon" slot="before"></scola-icon>
            <scola-format>Rapportages</scola-format>
          </scola-button>
        </scola-node>
        <scola-node preset="menu-space"></scola-node>
        <scola-node preset="card">
          <scola-format preset="card-header" slot="header">Lopende zaken</scola-format>
          <scola-button preset="menu-button" target="profile" vref="me-dashboard">
            <scola-icon name="cube" preset="menu-icon" slot="before"></scola-icon>
            <scola-format>Installaties</scola-format>
          </scola-button>
          <scola-button preset="menu-button" target="profile" vref="me-reports">
            <scola-icon name="checkbox" preset="menu-icon" slot="before"></scola-icon>
            <scola-format>Acties</scola-format>
          </scola-button>
        </scola-node>
        <scola-node preset="menu-space"></scola-node>
        <scola-node preset="card" disabled slot="body">
          <scola-format preset="card-header" slot="header">Instellingen</scola-format>
          <scola-button preset="menu-button">
            <scola-icon name="business" preset="menu-icon" slot="before"></scola-icon>
            <scola-format>Organisaties</scola-format>
          </scola-button>
          <scola-button preset="menu-button">
            <scola-icon name="people" preset="menu-icon" slot="before"></scola-icon>
            <scola-format>Gebruikers</scola-format>
          </scola-button>
        </scola-node>
      </slot>
    `
  }
}
