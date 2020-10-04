import {
  ContentElement,
  TemplateResult,
  customElement,
  html
} from '@scola/lib'

@customElement('me-report')
export class ReportElement extends ContentElement {
  public flow: ContentElement['flow'] = 'wrap'

  public heading: string = 'Rapportages'

  public justify: ContentElement['justify'] = 'center'

  public render (): TemplateResult {
    return html`
      <slot>
        <scola-space flow="column" size="extra-large"></scola-space>
        <h1>Rapportage 2019</h1>
        <h2>Koen van den Boogaart</h2>
        <h3>Augustus 2020</h3>
        <scola-space flow="column" size="extra-large"></scola-space>
        <scola-cell rows="6" cols="10">
          <scola-card no-inside>
            <scola-panel log-level="off" height="flex">
              <scola-bar slot="header">
                <span slot="text">Test</span>
                <scola-icon-button 
                 target="fill-locale"
                 event="scola-form-fill"
                 slot="buttons">
                  <scola-icon name="bell"></scola-icon>
                </scola-icon-button>
              </scola-bar>
              <scola-form-submit id="submit-locale" url="/api/select">
                <scola-form-fill id="fill-locale" url="/locales/data.json" wait>
                  <scola-content flow="wrap">
                    <!-- <scola-input-popout name="theme">
                      <label for="brand" slot="label">Merk</label>
                      <scola-popout halign="left">
                        <span slot="anchor">
                          <scola-format code="input.popout" data-count="0"></scola-format>
                        </span>
                        <scola-dialog inline no-outside>
                          <scola-card>
                            <scola-input branch inline>
                              <scola-input-radio state-as="none">
                                <input type="radio" value="dark1"/>
                                <scola-menu-button>Whether to enable dark mode</scola-menu-button>
                              </scola-input-radio>
                              <scola-input-radio state-as="none">
                                <input type="radio" value="light1" />
                                <scola-menu-button>Whether to enable light mode</scola-menu-button>
                              </scola-input-radio>
                              <scola-input-radio state-as="none">
                                <input type="radio" value="glass1" />
                                <scola-menu-button>Whether to enable glass mode</scola-menu-button>
                              </scola-input-radio>
                            </scola-input>
                          </scola-card>
                        </scola-dialog>
                      </scola-popout>
                    </scola-input-popout> -->
                    <scola-space flow="column"></scola-space>
                    <scola-input-select>
                        <label for="test" slot="label">Label</label>
                        <select id="test" name="test">
                          <option value="locs">Locaties</option>
                          <option value="cases">Dossiers</option>
                        </select>
                      </scola-input-select>
                      <scola-input-select>
                        <label for="test1" slot="label">Label</label>
                        <select id="test1" name="test1">
                          <option value="locs">Locaties</option>
                          <option value="cases">Dossiers</option>
                        </select>
                      </scola-input-select>
                      <scola-space flow="column"></scola-space>
                      <scola-input inline branch>
                        <label slot="label">Dark mode</label>
                        <scola-input-radio>
                          <input type="radio" name="theme" value="dark" />
                          <span>Whether to enable dark mode.</span>
                        </scola-input-radio>
                        <scola-input-radio>
                          <input type="radio" name="theme" value="light" />
                          <span>Whether to enable light mode.</span>
                        </scola-input-radio>
                        <scola-input-radio>
                          <input type="radio" name="theme" value="glass" />
                          <span>Whether to enable glass mode.</span>
                        </scola-input-radio>
                      </scola-input>
                      <scola-space flow="column"></scola-space>
                      <scola-postcodenl url="/api/select">
                        <scola-input>
                          <label for="postal_code" slot="label">Postcode</label>
                          <input id="postal_code" name="postal_code" type="text" />
                        </scola-input>
                        <scola-input>
                          <label for="address_level2" slot="label">Huisnummer</label>
                          <input id="address_level2" name="address_level2" type="number" min="0" />
                        </scola-input>
                        <scola-input-select>
                          <label for="test1" slot="label">Label</label>
                          <select id="test1" name="test1"></select>
                        </scola-input-select>
                      </scola-postcodenl>
                  </scola-content>
                </scola-form-fill>
              </scola-form-submit>
              <scola-bar slot="footer" no-text>
                <scola-request url="/"
                  .init="${{ method: 'PUT' }}"
                  slot="buttons">
                  <scola-text-button 
                    event="scola-request">
                    <span>Verwijderen</span>
                  </scola-text-button>
                </scola-request>
                <scola-text-button 
                 target="submit-locale"
                 event="scola-request"
                 slot="buttons">
                  <span>Opslaan</span>
                </scola-text-button>
              </scola-bar>
            </scola-panel>
          </scola-card>
        </scola-cell>
        <!-- <scola-cell rows="6" cols="10">
          <scola-card no-inside>
          <scola-panel height="flex">
              <scola-bar slot="header">
                <span slot="text">Test</span>
                <scola-icon-button slot="buttons" event="scola-popout-hide">
                  <scola-icon name="cross"></scola-icon>
                </scola-icon-button>
              </scola-bar>
              <scola-content id="mix" flow="column">
                <div class="title">Naam</div>
                <scola-card flow="wrap">
                  <scola-input-select>
                    <label for="language" slot="label">Taal</label>
                    <select id="language" name="language">
                      <option value="nl">Nederlands</option>
                      <option value="en">English</option>
                    </select>
                  </scola-input-select>
                  <scola-space flow="column"></scola-space>
                  <scola-input inline branch>
                    <label slot="label">Dark mode</label>
                    <scola-input-radio>
                      <input type="radio" id="dark" name="theme" value="dark" checked />
                      <span>Whether to enable dark mode.</span>
                    </scola-input-radio>
                    <scola-input-radio>
                      <input type="radio" id="light" name="theme" value="light" />
                      <span>Whether to enable light mode.</span>
                    </scola-input-radio>
                    <scola-input-radio>
                      <input type="radio" id="glass" name="theme" value="glass" />
                      <span>Whether to enable glass mode.</span>
                    </scola-input-radio>
                  </scola-input>
                  <scola-space flow="column"></scola-space>
                  <scola-input-checkbox inline>
                    <label for="dark" slot="label">Plants</label>
                    <input type="checkbox" id="rose" name="plant[]" value="rose" checked />
                    <span>Rose</span>
                  </scola-input-checkbox>
                  <scola-space flow="column"></scola-space>
                  <scola-input branch>
                    <label for="dark" slot="label">Plants</label>
                    <scola-input-checkbox>
                      <input type="checkbox" id="rose" name="plant[]" value="rose" checked />
                      <span>Rose</span>
                    </scola-input-checkbox>
                    <scola-input-checkbox>
                      <input type="checkbox" id="dahlia" name="plant[]" value="dahlia" />
                      <span>Dahlia</span>
                    </scola-input-checkbox>
                  </scola-input>
                  <scola-space flow="column"></scola-space>
                  <scola-input>
                    <label for="files" slot="label">Files</label>
                    <input type="file" id="files" name="files[]" multiple />
                  </scola-input>
                  <scola-space flow="column"></scola-space>
                  <scola-input>
                    <label for="date" slot="label">Date</label>
                    <input type="date" id="date" name="date" />
                  </scola-input>
                  <scola-input inline>
                    <label for="time" slot="label">Time</label>
                    <input type="time" id="time" name="time" />
                  </scola-input>
                  <scola-space flow="column"></scola-space>
                  <scola-input>
                    <label for="address_level1" slot="label">Straat</label>
                    <input type="text" id="address_level1" name="address_level1" />
                  </scola-input>
                </scola-card>
                <div class="comment">
                  Vul hier je naam in. Je mag je voornaam en je achternaam invullen. Maar als je je
                  voornaam vergeten bent, mag alleen je achternaam ook.
                </div>
              </scola-content>
              <scola-bar slot="footer" no-text>
                <scola-text-button slot="buttons" event="scola-popout-hide">
                  <span>Annuleren</span>
                </scola-text-button>
                <scola-text-button slot="buttons" event="scola-form-submit">
                  <span>Opslaan</span>
                </scola-text-button>
              </scola-bar>
            </scola-panel>
          </scola-card>
        </scola-cell> -->
        <scola-cell cols="10">
          <scola-cell rows="3" cols="5">
            <scola-card>
              <scola-bar no-inside no-outside>
                <span slot="text">Test</span>
                <scola-icon-button slot="buttons" event="scola-popout-show" target="xyz">
                    <scola-icon name="bell"></scola-icon>
                  </scola-icon-button>
                <scola-popout id="xyz" slot="buttons" halign="screen" valign="screen">
                  <scola-icon-button slot="anchor">
                    <scola-icon name="bell"></scola-icon>
                  </scola-icon-button>
                  <scola-dialog>
                    <scola-card>
                      <scola-menu-button>Test</scola-menu-button>
                      <scola-menu-button>Test xyz</scola-menu-button>
                      <scola-menu-button>Test abc</scola-menu-button>
                      <scola-menu-button>Test Lorem</scola-menu-button>
                    </scola-card>
                  </scola-dialog>
                </scola-popout>
              </scola-bar>
              <scola-content no-inside>
              <div class="text">
                <scola-format code="cases"></scola-format>
              </div>
              </scola-content>
            </scola-card>
          </scola-cell>
          <scola-cell rows="3" cols="5">
            <scola-card>
              <span>a</span>
            </scola-card>
          </scola-cell>
          <scola-cell rows="3" cols="5">
            <scola-card>
              <span>a</span>
            </scola-card>
          </scola-cell>
          <scola-cell rows="3" cols="5">
            <scola-card>
              <span>a</span>
            </scola-card>
          </scola-cell>
        </scola-cell>
        <h2>Groep 2</h2>
        <scola-cell cols="10">
          <scola-card>
            <div class="text">
              Dit is een toelichting. Dit is een toelichting. Dit is een
              toelichting.Dit is een toelichting. Dit is een toelichting. Dit is
              een toelichting.Dit is een toelichting. Dit is een toelichting.
              Dit is een toelichting.Dit is een toelichting. Dit is een
              toelichting.
            </div>
          </scola-card>
        </scola-cell>
        <scola-cell cols="10">
          <scola-card>
            <div class="text">
              Dit is een toelichting.Dit is een toelichting. Dit is een
              toelichting. Dit is een toelichting.Dit is een toelichting. Dit is
              een toelichting. Dit is een toelichting.Dit is een toelichting.
              Dit is een toelichting. Dit is een toelichting.
            </div>
          </scola-card>
        </scola-cell>
        <scola-cell rows="6" cols="10">
          <scola-card>
            <div class="text">
              <h2>Abc</h2>
              <p>Dit is een tekst</p>
            </div>
          </scola-card>
        </scola-cell>
      </slot>
    `
  }
}
