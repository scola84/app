import {
  ContentElement,
  TemplateResult,
  customElement,
  html
} from '@scola/lib'

@customElement('me-menu')
export class MenuElement extends ContentElement {
  public flow: ContentElement['flow'] = 'column'

  public heading: string = 'Mijn Herman'

  public render (): TemplateResult {
    return html`
      <slot>
      <span class="title">Inzicht</span>
        <scola-card no-inside>
          <scola-menu-button target="main" name="me-report">
            <scola-icon name="chart"></scola-icon>
            <span>Dashboard</span>
          </scola-menu-button>
          <scola-menu-button>
            <scola-icon name="document"></scola-icon>
            <span>Rapportages</span>
          </scola-menu-button>
        </scola-card>
        <span class="title">Lopende zaken</span>
        <scola-card no-inside>
          <scola-menu-button target="nav" url="/1">
            <scola-icon name="folder"></scola-icon>
            <span>Installaties</span>
            <scola-icon name="arrow-right"></scola-icon>
          </scola-menu-button>
          <scola-menu-button>
            <scola-icon name="check-mark"></scola-icon>
            <span>Acties</span>
          </scola-menu-button>
        </scola-card>
        <span class="title">Instellingen</span>
        <scola-card no-inside>
          <scola-menu-button target="help" name="me-groups" cancel>
            <scola-icon name="hexagon"></scola-icon>
            <span>Organisaties</span>
          </scola-menu-button>
          <scola-menu-button target="main" name="me-try">
            <scola-icon name="bust"></scola-icon>
            <span>Gebruikers</span>
          </scola-menu-button>
        </scola-card>
      </slot>
    `
  }
}
