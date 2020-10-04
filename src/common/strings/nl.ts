export default {
  button: {
    cancel: 'Annuleren',
    ok: 'OK'
  },
  err: {
    input: {
      invalid: 'De invoer is ongeldig.',
      number: 'Voer een getal in.',
      required: 'Dit veld is verplicht.'
    },
    request: {
      fetch: 'De aanvraag kon niet worden uitgevoerd.'
    },
    response: {
      400: 'De aanvraag is ongeldig.',
      404: 'Het pad kon niet worden gevonden.',
      405: 'De aanvraag is niet toegestaan.',
      auth: 'De aanvraag is niet toegestaan.',
      body: 'Het antwoord kon niet worden verwerkt ({type}).'
    },
    unknown: 'Er is een onbekende fout opgetreden.'
  },
  input: {
    popout: `{count, plural,
      =0 {Maak een selectie...}
      =1 {{values}}
      other {{values} en # andere...}}
    `
  }
}
