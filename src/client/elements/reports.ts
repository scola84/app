import {
  NodeElement,
  TemplateResult,
  customElement,
  html
} from '@scola/lib'

@customElement('me-reports')
export class ReportsElement extends NodeElement {
  public viewTitle = 'Rapportages'

  public createRenderRoot (): this {
    return this
  }

  public render (): TemplateResult {
    return html`
      <scola-node flow="row" halign="center" hpadding="medium" vpadding="medium" wrap>
        Rapportages
      </scola-node>
    `
  }
}
