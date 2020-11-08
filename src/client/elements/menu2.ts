import {
  NodeElement,
  TemplateResult,
  customElement,
  html
} from '@scola/lib'

@customElement('me-menu2')
export class Menu2Element extends NodeElement {
  public createRenderRoot (): this {
    return this
  }

  public render (): TemplateResult {
    return html`
      <scola-node flow="column" width="flex" hpadding="large" vpadding="medium">
      <scola-node height="medium"></scola-node>
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
      <scola-node preset="card" disabled>
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
      </scola-node>
    `
  }
}
