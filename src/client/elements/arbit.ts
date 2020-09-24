import {
  ContentElement,
  TemplateResult,
  customElement,
  html
} from '@scola/lib'

@customElement('me-try')
export class TryElement extends ContentElement {
  public flow: ContentElement['flow'] = 'column'

  public heading: string = 'Trying...'

  public justify: ContentElement['justify'] = 'center'

  public render (): TemplateResult {
    return html`
      <slot>
        <scola-space flow="column" size="extra-large"></scola-space>
        <h1>Try me</h1>
        <scola-card>
          <div class="text">
            <b>Dit is een titel</b>
            <scola-space flow="column" size="extra-small"></scola-space>
            Dit is een tekst
          </div>
        </scola-card>
      </slot>
    `
  }
}
