import {
  PanelElement,
  TemplateResult,
  customElement,
  html
} from '@scola/lib'

@customElement('me-aside')
export class AsideElement extends PanelElement {
  public logLevel: PanelElement['logLevel'] = 'off'

  public noOutside: PanelElement['noOutside'] = true

  public render (): TemplateResult {
    return html`
      <slot>
        <scola-view-tab position="right">
          <scola-icon-button
            event="scola-app-hide"
            slot="buttons"
            target="aside"
          >
            <scola-icon name="cross"></scola-icon>
          </scola-icon-button>
          <scola-space size="small" slot="buttons"></scola-space>
          <scola-tab-button
            at-large
            at-medium
            deselect
            selected
            slot="buttons"
            target="tab-log"
          >
            <scola-icon name="bell"></scola-icon>
          </scola-tab-button>
          <scola-tab-button
            at-small
            selected
            slot="buttons"
            target="tab-log"
          >
            <scola-icon name="bell"></scola-icon>
          </scola-tab-button>
          <scola-panel id="tab-log" width="small">
            <scola-bar slot="header">
              <span slot="text">Meldingen</span>
            </scola-bar>
          </scola-panel>
          <scola-tab-button
            at-large
            at-medium
            deselect
            slot="buttons"
            target="tab-profile"
          >
            <scola-icon name="bust"></scola-icon>
          </scola-tab-button>
          <scola-tab-button
            at-small
            slot="buttons"
            target="tab-profile"
          >
            <scola-icon name="bust"></scola-icon>
          </scola-tab-button>
          <scola-panel hidden id="tab-profile" width="small">
            <scola-bar slot="header">
              <span slot="text">Profiel</span>
            </scola-bar>
          </scola-panel>
          <scola-tab-button
            at-large
            at-medium
            deselect
            slot="buttons"
            target="tab-help"
          >
            <scola-icon name="question-mark"></scola-icon>
          </scola-tab-button>
          <scola-tab-button
            at-small
            slot="buttons"
            target="tab-help"
          >
            <scola-icon name="question-mark"></scola-icon>
          </scola-tab-button>
          <scola-view-panel hidden id="tab-help" width="small">
            <scola-bar slot="header">
              <span slot="text">Help</span>
              <scola-view-panel-buttons
                at-large
                at-medium
                no-home
                slot="buttons"
              ></scola-view-panel-buttons>
            </scola-bar>
            <scola-bar at-small slot="footer">
              <scola-view-panel-buttons
                at-small
                no-home
                slot="buttons"
              ></scola-view-panel-buttons>
            </scola-bar>
            <scola-view id="help" base="/api/help"></scola-view>
          </scola-view-panel>
        </scola-view-tab>
      </slot>
    `
  }
}
