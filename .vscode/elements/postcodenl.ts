import {
  FormFillElement,
  customElement
} from '@scola/lib'

@customElement('scola-postcodenl')
export class PostcodeNLElement extends FormFillElement {
  public wait = true

  public get postalCodeElement (): HTMLInputElement | null {
    return this.querySelector('input[name="postal_code"]')
  }

  public get addressLevel2Element (): HTMLInputElement | null {
    return this.querySelector('input[name="address_level2"]')
  }

  public constructor () {
    super()
    this.addEventListener('scola-input', this.handleInput.bind(this))
  }

  protected handleInput (event: Event): void {
    if (
      event.target !== this.postalCodeElement?.parentElement &&
      event.target !== this.addressLevel2Element?.parentElement
    ) {
      return
    }

    if (
      !(/[0-9]{4}[a-z]{2}/iu).test(this.postalCodeElement?.value ?? '') ||
      !(/\d+/u).test(this.addressLevel2Element?.value ?? '')
    ) {
      return
    }

    event.cancelBubble = true
    this.fetchRequest()
  }
}
