import {
  ContentElement,
  TemplateResult,
  customElement,
  html
} from '@scola/lib'

@customElement('me-groups')
export class GroupsElement extends ContentElement {
  public render (): TemplateResult {
    return html`
      <h1>Groepen</h1>
    `
  }
}
