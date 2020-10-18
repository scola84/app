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
    color: `{count, plural,
      =0 {Selecteer een kleur...}
      =1 {{red}, {green}, {blue}}
    }`,
    file: `{count, plural,
      =0 {Selecteer een bestand...}
      =1 {{name} ({size, number, ::compact-short}B)}
      other {# bestanden geselecteerd ({size, number, ::compact-short}B)}
    }`,
    popout: `{count, plural,
      =0 {Selecteer een item...}
      =1 {{values}}
      other {# items geselecteerd...}
    }`,
    range: '{value}%'
  }
}
