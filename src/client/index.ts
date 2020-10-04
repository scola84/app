import 'reflect-metadata'
import './elements'

import {
  createClient,
  html
} from '@scola/lib'

import { strings } from '../common'

createClient({
  dom: {
    body: html`
      <scola-app
        style="background: center/cover url(/images/spices.jpg);"
        theme="scola-glass"
      >
        <me-aside slot="aside"></me-aside>
      </scola-app>
    `,
    title: 'Mijn Herman'
  },
  formatter: {
    lang: 'nl',
    strings
  },
  views: [
    {
      default: true,
      name: 'me-menu',
      target: 'nav'
    }
  ]
})
