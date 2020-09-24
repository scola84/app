import {
  FormFillInputElement,
  customElement
} from '@scola/lib'

@customElement('scola-postcodenl')
export class PostcodeNLElement extends FormFillInputElement {
  public get postalCodeElement (): HTMLInputElement | null {
    return this.querySelector('input[name="postal_code"]')
  }

  public get addressLevel2Element (): HTMLInputElement | null {
    return this.querySelector('input[name="address_level2"]')
  }

  protected handleInput (event: Event): void {
    if (
      event.target !== this.postalCodeElement &&
      event.target !== this.addressLevel2Element
    ) {
      return
    }

    if (
      !(/[0-9]{4}[a-z]{2}/iu).test(this.postalCodeElement?.value ?? '') ||
      !(/\d+/u).test(this.addressLevel2Element?.value ?? '')
    ) {
      return
    }

    super.handleInput(event)
  }
}
