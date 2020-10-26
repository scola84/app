import {
  NodeElement,
  TemplateResult,
  customElement,
  html
} from '@scola/lib'

@customElement('me-reports')
export class ReportsElement extends NodeElement {
  public flow: NodeElement['flow'] = 'wrap'

  public viewTitle = 'Rapportages'

  public render (): TemplateResult {
    return html`
      <slot name="body">
        Rapportages
      </slot>
    `
  }
}
