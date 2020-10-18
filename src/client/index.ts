/* eslint-disable max-classes-per-file */
import 'reflect-metadata'

import {
  CSSResult,
  LitElement,
  TemplateResult,
  css,
  customElement,
  html,
  property,
  query
} from 'lit-element'

import { ease } from '@scola/lib'
import { render } from 'lit-html'
import content from '*.svg'

@customElement('scola-node2')
class NodeElement extends LitElement {
  public static styles: CSSResult[] = [
    css`
      :host {
        display: flex;
        flex-direction: column;
      }

      slot[name="body"] {
        display: inherit;
      }

      :host([flow="column"]) slot[name="body"] {
        flex-direction: column;
      }

      :host([flow="row"]) slot[name="body"] {
        flex-direction: row;
      }

      :host([flow="wrap"]) slot[name="body"]  {
        flex-direction: row;
        flex-wrap: wrap;
      }

      slot[name="body"] slot {
        display: inherit;
        flex-direction: inherit;
      }

      slot[name="body"] slot:not([name]) {
        flex: 1;
        flex-wrap: inherit;
      }

      :host([fill="dark"]) slot[name="body"] {
        background: #ccc;
      }

      :host([fill="light"]) slot[name="body"] {
        background: #eee;
      }

      :host([fill="medium"]) slot[name="body"] {
        background: #ddd;
      }

      :host([height="large"]) slot[name="body"] {
        height: 3.75rem;
      }

      :host([height="max"]),
      :host([height="max"]) slot[name="body"] {
        height: 100%;
      }

      :host([height="medium"]) slot[name="body"] {
        height: 3rem;
      }

      :host([height="small"]) slot[name="body"] {
        height: 2.25rem;
      }

      :host([width="large"]) slot[name="body"] {
        width: 3.75rem;
      }

      :host([width="max"]),
      :host([width="max"]) slot[name="body"] {
        width: 100%;
      }

      :host([width="medium"]) slot[name="body"] {
        width: 3rem;
      }

      :host([width="small"]) slot[name="body"] {
        width: 2.25rem;
      }
    `
  ]

  @property()
  public flow: 'column' | 'row' | 'wrap'

  @query('slot[name="after"]')
  protected afterSlotElement: HTMLSlotElement

  @query('slot[name="before"]')
  protected beforeSlotElement: HTMLSlotElement

  @query('slot[name="body"]')
  protected bodySlotElement: HTMLSlotElement

  @query('slot:not([name])')
  protected defaultSlotElement: HTMLSlotElement

  @query('slot[name="footer"]')
  protected footerSlotElement: HTMLSlotElement

  @query('slot[name="header"]')
  protected headerSlotElement: HTMLSlotElement

  @query('slot[name="prefix"]')
  protected prefixSlotElement: HTMLSlotElement

  @query('slot[name="suffix"]')
  protected suffixSlotElement: HTMLSlotElement

  public render (): TemplateResult {
    return html`
      <slot name="header"></slot>
      <slot name="body">
        <slot name="before"></slot>
        <slot name="prefix"></slot>
        <slot></slot>
        <slot name="suffix"></slot>
        <slot name="after"></slot>
      </slot>
      <slot name="footer"></slot>
    `
  }
}

@customElement('scola-panel2')
class PanelElement extends NodeElement {
  public static styles: CSSResult[] = [
    ...NodeElement.styles,
    css`
      slot[name="body"] {
        flex: 1;
      }

      :host([height]) slot[name="body"] {
        height: initial;
      }

      :host([height="large"]) {
        height: 30rem;
      }

      :host([height="medium"]) {
        height: 20rem;
      }

      :host([height="small"]) {
        height: 10rem;
      }

      :host([width]) slot[name="body"] {
        width: initial;
      }

      :host([width="large"]) {
        width: 30rem;
      }

      :host([width="medium"]) {
        width: 20rem;
      }

      :host([width="small"]) {
        width: 10rem;
      }
    `
  ]
}

@customElement('scola-button2')
class ButtonElement extends NodeElement {
  @property()
  public event: string

  @property()
  public target: string

  public constructor () {
    super()
    this.addEventListener('click', this.handleClick.bind(this))
  }

  protected handleClick (): void {
    this.dispatchEvent(new CustomEvent(this.event, {
      bubbles: true,
      composed: true,
      detail: {
        target: this.target
      }
    }))
  }
}

interface ButtonEvent extends CustomEvent {
  detail: {
    data?: DOMStringMap,
    target?: string
  } | null
  target: HTMLElement
}

declare global {
  interface HTMLElementEventMap {
    'scola-clip-content': ButtonEvent
    'scola-clip-content-or-inner': ButtonEvent
    'scola-clip-inner': ButtonEvent
    'scola-clip-nested': ButtonEvent
    'scola-clip-outer': ButtonEvent
  }
}

@customElement('scola-clip')
class ClipElement extends NodeElement {
  public static styles: CSSResult[] = [
    ...NodeElement.styles,
    css`
      slot[name="body"] {
        overflow: hidden;
      }
      
      :host([mode="content"]) slot:not([name]) {
        overflow: hidden;
      }

      :host([mode="outer"]) slot[name="after"]::slotted(*),
      :host([mode="outer"]) slot[name="before"]::slotted(*) {
        position: absolute;
        z-index: 2;
      }

      :host([mode="outer"][flow="column"]) slot[name="after"]::slotted(*) {
        bottom: 0;
      }

      :host([mode="outer"][flow="column"]) slot[name="before"]::slotted(*) {
        top: 0;
      }

      :host([mode="outer"][flow="row"]) slot[name="after"]::slotted(*) {
        right: 0;
      }

      :host([mode="outer"][flow="row"][dir="rtl"]) slot[name="after"]::slotted(*) {
        left: 0;
        right: auto;
      }

      :host([mode="outer"][flow="row"]) slot[name="before"]::slotted(*) {
        left: 0;
      }

      :host([mode="outer"][flow="row"][dir="rtl"]) slot[name="before"]::slotted(*) {
        left: auto;
        right: 0;
      }

      @media not all and (max-height: 1080px) {
        :host([mode="outer"][flow="column"]) slot[name="after"]::slotted(*) {
          position: static;
        }

        :host([mode="outer"][flow="column"]) slot[name="after"]::slotted(:not([shadow="outer-line"])) {
          box-shadow: none;
        }
      }

      @media not all and (max-height: 810px) {
        :host([mode="outer"][flow="column"]) slot[name="before"]::slotted(*) {
          position: static;
        }

        :host([mode="outer"][flow="column"]) slot[name="after"]::slotted(:not([shadow="outer-line"])) {
          box-shadow: none;
        }
      }

      @media not all and (max-width: 1080px) {
        :host([mode="outer"][flow="row"]) slot[name="after"]::slotted(*) {
          position: static;
        }

        :host([mode="outer"][flow="row"]) slot[name="after"]::slotted(:not([shadow="outer-line"])) {
          box-shadow: none;
        }
      }

      @media not all and (max-width: 810px) {
        :host([mode="outer"][flow="row"]) slot[name="before"]::slotted(*) {
          position: static;
        }

        :host([mode="outer"][flow="row"]) slot[name="before"]::slotted(:not([shadow="outer-line"])) {
          box-shadow: none;
        }
      }
    `
  ]

  @property({
    attribute: 'content-dimension',
    reflect: true
  })
  public contentDimension?: 'height' | 'width'

  @property({
    attribute: 'content-transition',
    reflect: true,
    type: Number
  })
  public contentTransition: number = 250

  @property({
    attribute: 'inner-hidden',
    type: Boolean
  })
  public innerHidden?: boolean

  @property({
    attribute: 'inner-transition',
    reflect: true,
    type: Number
  })
  public innerTransition: number = 250

  @property({
    reflect: true
  })
  public mode?: 'content' | 'inner' | 'nested' | 'outer'

  @property({
    attribute: 'outer-transition',
    reflect: true,
    type: Number
  })
  public outerTransition: number = 250

  @property()
  public policy: 'any' | 'max-one' | 'min-one' | 'one'

  protected get contentElements (): NodeListOf<HTMLElement> {
    return this.querySelectorAll<HTMLElement>(':scope > :not([slot])')
  }

  protected get handleElement (): HTMLElement | null {
    return this.querySelector('[handle]')
  }

  protected get outerElements (): NodeListOf<HTMLElement> {
    return this.querySelectorAll<HTMLElement>('[slot="after"], [slot="before"]')
  }

  public constructor () {
    super()
    this.dir = document.dir
    this.addEventListener('click', this.handleClick.bind(this))
  }

  public firstUpdated (): void {
    if (this.mode === 'content') {
      this.addEventListener('scola-clip-content', this.handleContent.bind(this))
      this.addEventListener('scola-clip-content-or-inner', this.handleContentOrInner.bind(this))
      this.firstUpdatedContent()
    }

    if (this.mode === 'inner') {
      this.addEventListener('scola-clip-inner', this.handleInner.bind(this))

      if (this.innerHidden === true) {
        this.firstUpdatedInner()
      }
    }

    if (this.mode === 'nested') {
      this.addEventListener('scola-clip-nested', this.handleNested.bind(this))
    }

    if (this.mode === 'outer') {
      this.addEventListener('scola-clip-outer', this.handleOuter.bind(this))
      this.firstUpdatedOuter()
    }
  }

  public hideInnerElement (transition = this.innerTransition): void {
    const name = this.determineInnerPropertyName()
    const to = this.determineInnerPropertyValue(this.defaultSlotElement)

    ease(0, to, transition, (value) => {
      this.defaultSlotElement.style.setProperty(name, `-${value}px`)
    })

    this.defaultSlotElement.hidden = true
  }

  public hideOuterElement (element: HTMLElement, transition = this.outerTransition): void {
    const name = this.determineOuterPropertyName(element)
    const to = this.determineOuterPropertyValue(element)

    if (window.getComputedStyle(element).position === 'static') {
      this.setZIndexRelative(element)
    }

    ease(0, to, transition, (value) => {
      element.style.setProperty(name, `-${value}px`)

      if (value === to) {
        if (window.getComputedStyle(element).position === 'absolute') {
          element.style.removeProperty('z-index')
        }
      }
    })

    element.hidden = true
  }

  public showContent (element: HTMLElement, transition = this.contentTransition): void {
    const contentElements = Array.from(this.contentElements)
    const dimensionName = this.flow === 'row' ? 'width' : 'height'
    const scrollName = this.flow === 'row' ? 'scrollLeft' : 'scrollTop'

    const from = this.defaultSlotElement[scrollName]
    const to = contentElements.indexOf(element) *
      element.getBoundingClientRect()[dimensionName] *
      (this.dir === 'rtl' ? -1 : 1)

    contentElements.forEach((contentElement) => {
      contentElement.hidden = contentElement !== element
    })

    ease(from, to, transition, (value) => {
      this.defaultSlotElement[scrollName] = value
    })
  }

  public showInnerElement (transition = this.innerTransition): void {
    this.defaultSlotElement.style.removeProperty('display')

    const name = this.determineInnerPropertyName()
    const from = this.determineInnerPropertyValue(this.defaultSlotElement)

    ease(from, 0, transition, (value) => {
      this.defaultSlotElement.style.setProperty(name, `-${value}px`)
    })

    this.defaultSlotElement.hidden = false
  }

  public showOuterElement (element: HTMLElement, transition = this.outerTransition): void {
    element.style.removeProperty('display')

    const name = this.determineOuterPropertyName(element)
    const from = this.determineOuterPropertyValue(element)

    if (window.getComputedStyle(element).position === 'absolute') {
      this.setZIndexAbsolute(element)
    } else {
      this.setZIndexRelative(element)
    }

    ease(from, 0, transition, (value) => {
      element.style.setProperty(name, `-${value}px`)
    })

    element.hidden = false
  }

  public toggleInnerElement (): void {
    if (this.defaultSlotElement.hidden) {
      this.showInnerElement()
    } else {
      this.hideInnerElement()
    }
  }

  public toggleOuterElement (element: HTMLElement): void {
    if (element.hidden) {
      this.showOuterElement(element)
    } else {
      this.hideOuterElement(element)
    }
  }

  protected determineInnerPropertyName (): string {
    const slotName = this.handleElement?.assignedSlot?.name

    switch (slotName) {
      case 'after':
        return this.dir === 'rtl' ? 'margin-left' : 'margin-right'
      case 'before':
        return this.dir === 'rtl' ? 'margin-right' : 'margin-left'
      case 'footer':
        return 'margin-bottom'
      case 'header':
        return 'margin-top'
      default:
        return ''
    }
  }

  protected determineInnerPropertyValue (element: HTMLElement): number {
    const style = window.getComputedStyle(element)
    const slotName = this.handleElement?.assignedSlot?.name

    if (slotName === undefined) {
      return 0
    }

    if (slotName === 'after' || slotName === 'before') {
      return parseInt(style.width, 10)
    }

    return parseInt(style.height, 10)
  }

  protected determineOuterPropertyName (element: HTMLElement): string {
    const slotName = element.assignedSlot?.name ?? ''

    switch (`${this.flow}-${slotName}`) {
      case 'column-after':
        return 'margin-bottom'
      case 'column-before':
        return 'margin-top'
      case 'row-after':
        return this.dir === 'rtl' ? 'margin-left' : 'margin-right'
      case 'row-before':
        return this.dir === 'rtl' ? 'margin-right' : 'margin-left'
      default:
        return ''
    }
  }

  protected determineOuterPropertyValue (element: HTMLElement): number {
    const style = window.getComputedStyle(element)

    if (this.flow === 'row') {
      return parseInt(style.width, 10)
    }

    return parseInt(style.height, 10)
  }

  protected firstUpdatedContent (): void {
    this.defaultSlotElement.scrollLeft = 0
    this.defaultSlotElement.scrollTop = 0

    const name = this.contentDimension ?? 'width'
    this.defaultSlotElement.style.setProperty('position', 'absolute')
    this.defaultSlotElement.style.setProperty('z-index', '-1')

    window.requestAnimationFrame(() => {
      let size = '0px'

      Array
        .from(this.contentElements)
        .forEach((element, index) => {
          if (index === 0) {
            size = window.getComputedStyle(element)[name]
            this.defaultSlotElement.style.setProperty(`max-${name}`, size)

            if (this.innerHidden === true) {
              this.firstUpdatedInner()
            }

            this.defaultSlotElement.style.removeProperty('position')
            this.defaultSlotElement.style.removeProperty('z-index')
          }

          element.style.setProperty('flex', `0 0 ${size}`)
          element.hidden = index !== 0
        })
    })
  }

  protected firstUpdatedInner (): void {
    this.defaultSlotElement.style.setProperty('display', 'none')
    this.defaultSlotElement.hidden = true
  }

  protected firstUpdatedOuter (): void {
    Array
      .from(this.outerElements)
      .forEach((element) => {
        if (
          element.hidden ||
          window.getComputedStyle(element).position === 'absolute'
        ) {
          element.style.setProperty('display', 'none')
          this.hideOuterElement(element)
        }
      })
  }

  protected handleClick (event: Event): void {
    event.cancelBubble = true

    Array
      .from(this.outerElements)
      .forEach((element) => {
        if (
          !element.hidden &&
          window.getComputedStyle(element).position === 'absolute' &&
          !event.composedPath().includes(element)
        ) {
          this.hideOuterElement(element)
        }
      })
  }

  protected handleContent (event: ButtonEvent): void {
    const target = this.querySelector<HTMLElement>(`#${event.detail?.target ?? ''}`)

    if (!target) {
      return
    }

    event.cancelBubble = true
    this.showContent(target)
  }

  protected handleContentOrInner (event: ButtonEvent): void {
    const target = this.querySelector<HTMLElement>(`#${event.detail?.target ?? ''}`)

    if (!target) {
      return
    }

    if (target.hidden) {
      if (this.defaultSlotElement.hidden) {
        this.handleInner(event)
      }

      this.handleContent(event)
    } else {
      this.handleInner(event)
    }
  }

  protected handleInner (event: Event): void {
    event.cancelBubble = true
    this.toggleInnerElement()
  }

  protected handleNested (event: Event): void {
    event.cancelBubble = true

    const countNotHidden = Array
      .from(this.contentElements)
      .reduce((count, element): number => {
        return count +
          (element instanceof ClipElement && element.defaultSlotElement.hidden ? 0 : 1)
      }, 0)

    this.contentElements.forEach((contentElement) => {
      if (contentElement instanceof ClipElement) {
        if (event.composedPath().includes(contentElement)) {
          if (contentElement.defaultSlotElement.hidden) {
            contentElement.showInnerElement()
          } else if (this.policy === 'min-one') {
            if (countNotHidden > 1) {
              contentElement.hideInnerElement()
            }
          } else if (this.policy === 'any') {
            contentElement.hideInnerElement()
          }
        } else if (this.policy === 'max-one') {
          if (!contentElement.defaultSlotElement.hidden) {
            contentElement.hideInnerElement()
          }
        } else if (this.policy === 'one') {
          if (!contentElement.defaultSlotElement.hidden) {
            contentElement.hideInnerElement()
          }
        }
      }
    })
  }

  protected handleOuter (event: ButtonEvent): void {
    const target = this.querySelector<HTMLElement>(`#${event.detail?.target ?? ''}`)

    if (!target) {
      return
    }

    event.cancelBubble = true
    this.toggleOuterElement(target)
  }

  protected setZIndexAbsolute (element: HTMLElement): void {
    element.style.setProperty(
      'z-index',
      String(2 + Array
        .from(this.outerElements)
        .map((outerElement) => {
          return outerElement === element
            ? 0
            : Number(outerElement.style.zIndex)
        })
        .reduce((left, right) => {
          return Math.max(left, right)
        }, 0))
    )
  }

  protected setZIndexRelative (element: HTMLElement): void {
    const assignedElements = Array
      .from(element.assignedSlot?.assignedElements() ?? [])

    assignedElements.forEach((assignedElement) => {
      if (assignedElement instanceof HTMLElement) {
        assignedElement.style.setProperty(
          'z-index',
          String(1 + assignedElements.length - assignedElements.indexOf(assignedElement))
        )
      }
    })
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const content = html`
    <style>
      body {
        height: 100%;
        margin: 0;
        position: fixed;
        width: 100%;
      }
    </style>
    <scola-clip flow="row" width="max" height="max" mode="outer">
      <scola-panel2 slot="before" id="menu" width="medium" height="max" fill="dark">
        <scola-clip mode="nested" policy="one" flow="column">
          <scola-clip fill="light" mode="inner">
            <scola-button2 handle height="small" fill="medium" slot="header" event="scola-clip-nested">
              Test2
            </scola-button2>
            <scola-button2 fill="dark" event="scola-clip-outer" target="list">
              Dit is een test
            </scola-button2>
          </scola-clip>
          <scola-clip fill="light" mode="inner" inner-hidden>
            <scola-button2 handle height="small" fill="medium" slot="header" event="scola-clip-nested">
              Test2
            </scola-button2>
            <scola-button2 fill="dark" event="scola-clip-outer" target="list">
              Dit is een test
            </scola-button2>
          </scola-clip>
          <scola-clip fill="light" mode="inner" inner-hidden>
            <scola-button2 handle height="small" fill="medium" slot="header" event="scola-clip-nested">
              Test2
            </scola-button2>
            <scola-button2 fill="dark" event="scola-clip-outer" target="list">
              Dit is een test
            </scola-button2>
          </scola-clip>
        </scola-clip>
      </scola-panel2>
      <scola-panel2 slot="before" id="list" width="medium" height="max" fill="dark" hidden>
        <scola-clip fill="light" mode="inner" flow="column">
          <scola-button2 handle height="small" fill="medium" slot="header" event="scola-clip-inner">
            Test3
          </scola-button2>
          <scola-button2 fill="dark" event="scola-clip-outer" target="meta">
            Dit is een test
          </scola-button2>
          <scola-button2 fill="dark" event="scola-clip-outer" target="meta">
            Dit is een test
          </scola-button2>
          <scola-button2 fill="dark" event="scola-clip-outer" target="meta">
            Dit is een test
          </scola-button2>
        </scola-clip>
      </scola-panel2>
      <scola-clip id="meta" slot="after" height="max" fill="medium"
        mode="content" flow="row" content-dimension="width">
        <scola-node2 fill="dark" width="medium" height="max" slot="after" flow="column" handle>
          <scola-button2 width="small" height="small" fill="light" 
            event="scola-clip-content-or-inner" target="abc">a</scola-button2>
            <scola-button2 width="small" height="small" fill="light" 
            event="scola-clip-content-or-inner" target="def">d</scola-button2>
            <scola-button2 width="small" height="small" fill="light" 
            event="scola-clip-content-or-inner" target="ghi">g</scola-button2>
        </scola-node2>
        <scola-panel2 id="abc" width="medium" height="max" fill="dark">
          abc
        </scola-panel2>
        <scola-panel2 id="def" width="medium" height="max" fill="light">
          def
        </scola-panel2>
        <scola-panel2 id="ghi" width="medium" height="max" fill="light">
          ghi
        </scola-panel2>
      </scola-clip>
      <scola-node2 flow="column" width="max" style="background: red;">
        <scola-clip fill="light" mode="inner">
          <scola-button2 handle height="small" fill="medium" slot="header" event="scola-clip-inner">
            Test
          </scola-button2>
          <scola-button2 fill="dark" event="scola-clip-outer" target="menu">
            Dit is een test
          </scola-button2>
        </scola-clip>
      </scola-node2>
    </scola-clip>
    <!-- <scola-clip flow="column" width="max" height="max" mode="outer">
      
      <scola-panel2 slot="before" id="menu" width="max" height="medium" fill="dark">
        <scola-clip mode="nested" policy="one" flow="column">
          <scola-clip fill="light" mode="inner">
            <scola-button2 handle height="small" fill="medium" slot="header" event="scola-clip-nested">
              Test2
            </scola-button2>
            <scola-button2 fill="dark" event="scola-clip-outer" target="list">
              Dit is een test
            </scola-button2>
          </scola-clip>
          <scola-clip fill="light" mode="inner" inner-hidden>
            <scola-button2 handle height="small" fill="medium" slot="header" event="scola-clip-nested">
              Test2
            </scola-button2>
            <scola-button2 fill="dark" event="scola-clip-outer" target="list">
              Dit is een test
            </scola-button2>
          </scola-clip>
          <scola-clip fill="light" mode="inner" inner-hidden>
            <scola-button2 handle height="small" fill="medium" slot="header" event="scola-clip-nested">
              Test2
            </scola-button2>
            <scola-button2 fill="dark" event="scola-clip-outer" target="list">
              Dit is een test
            </scola-button2>
          </scola-clip>
        </scola-clip>
      </scola-panel2>

      <scola-panel2 slot="before" id="list" width="max" height="medium" fill="dark" hidden>
        <scola-clip fill="light" mode="inner" flow="column">
          <scola-button2 handle height="small" fill="medium" slot="header" event="scola-clip-inner">
            Test3
          </scola-button2>
          <scola-button2 fill="dark" event="scola-clip-outer" target="meta">
            Dit is een test
          </scola-button2>
          <scola-button2 fill="dark" event="scola-clip-outer" target="meta">
            Dit is een test
          </scola-button2>
          <scola-button2 fill="dark" event="scola-clip-outer" target="meta">
            Dit is een test
          </scola-button2>
        </scola-clip>
      </scola-panel2>

      <scola-clip id="meta" slot="after" width="max" fill="medium"
        mode="content" flow="column" content-dimension="height">
        <scola-node2 fill="dark" width="max" height="medium" slot="footer" flow="row" handle>
          <scola-button2 width="small" height="small" fill="light" 
            event="scola-clip-content-or-inner" target="abc">a</scola-button2>
          <scola-button2 width="small" height="small" fill="light" 
            event="scola-clip-content-or-inner" target="def">d</scola-button2>
        </scola-node2>
        <scola-panel2 id="abc" width="max" height="medium" fill="dark">
          abc
        </scola-panel2>
        <scola-panel2 id="def" width="max" height="medium" fill="light">
          def
        </scola-panel2>
      </scola-clip>

      <scola-node2 flow="column" height="max" style="background: red;">
        <scola-clip fill="light" mode="inner">
          <scola-button2 handle height="small" fill="medium" slot="header" event="scola-clip-inner">
            Test
          </scola-button2>
          <scola-button2 fill="dark" event="scola-clip-outer" target="menu">
            Dit is een test
          </scola-button2>
        </scola-clip>
      </scola-node2>
    </scola-clip> -->
  `

  render(content, document.body)
})

// <scola-node2 fill="light">
//       <scola-node2 flow="row">
//         <scola-node2 fill="dark" height="small">body</scola-node2>
//         <scola-button2 fill="dark" height="small">body</scola-button2>
//       </scola-node2>
//     </scola-node2>
