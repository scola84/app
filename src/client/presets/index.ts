const iconButton = {
  flow: 'row',
  halign: 'center',
  height: 'small',
  round: 'max',
  valign: 'center',
  width: 'small'
}

const input = {
  fill: 'aux-1',
  flow: 'row',
  height: 'medium',
  hmargin: 'medium',
  round: 'medium',
  valign: 'center',
  vmargin: 'small'
}

declare module '@scola/lib' {
  interface Presets {
    'card': unknown
    'main-card': unknown
  }
}

export default {
  'card': {
    flow: 'column',
    round: 'medium',
    width: 'max'
  },
  'card-header': {
    case: 'upper',
    color: 'aux-2',
    font: 'small',
    hmargin: 'medium',
    vmargin: 'small'
  },
  'clip-meta': {
    contentDimension: 'width',
    contentTransition: '0',
    fill: 'aux-1',
    flow: 'row',
    height: 'max',
    innerWidth: 'small',
    // outerShadow: 'line',
    type: 'content'
  },
  'clip-meta-bar': {
    fill: 'aux-1',
    height: 'max',
    innerBackdrop: 'large',
    width: 'medium'
  },
  'clip-meta-bar-button': {
    ...iconButton,
    color: 'aux-2',
    colorActivated: 'sig-1',
    vmargin: 'medium'
  },
  'clip-meta-bar-buttons': {
    flow: 'column',
    halign: 'center',
    vpadding: 'medium',
    width: 'medium'
  },
  'icon-button': {
    ...iconButton,
    color: 'sig-1',
    fillActive: 'aux-1',
    fillHover: 'aux-1',
    hmargin: 'small'
  },
  'icon-button-toggle': {
    ...iconButton,
    color: 'sig-1',
    fillActivated: 'aux-1',
    hmargin: 'small'
  },
  'input': {
    ...input,
    hpadding: 'large'
  },
  'input-header': {
    color: 'aux-2',
    flow: 'row',
    font: 'small',
    halign: 'between',
    hpadding: 'medium',
    vmargin: 'small'
  },
  'input-icon': {
    color: 'sig-1',
    hmargin: 'medium',
    size: 'medium'
  },
  'input-with-icon': {
    ...input
  },
  'main-card': {
    fill: 'aux-2',
    hmargin: 'small',
    round: 'medium',
    vmargin: 'medium'
  },
  'main-card-panel': {
    fill: 'aux-2',
    rows: 8,
    width: 'flex'
  },
  'main-card-panel-bar': {
    color: 'aux-1',
    fill: 'aux-3',
    flow: 'row',
    height: 'medium',
    valign: 'center',
    width: 'max'
  },
  'main-card-panel-button': {
    color: 'sig-1',
    fillActive: 'aux-2',
    fillHover: 'aux-2',
    flow: 'row',
    height: 'small',
    hmargin: 'small',
    hpadding: 'medium',
    round: 'small',
    valign: 'center'
  },
  'main-card-panel-buttons': {
    hmargin: 'medium'
  },
  'main-card-panel-content': {
    flow: 'row',
    padding: 'small',
    valign: 'start',
    wrap: true
  },
  'menu-button': {
    color: 'aux-1',
    fill: 'aux-2',
    fillActive: 'aux-1',
    fillHover: 'aux-1',
    flow: 'row',
    height: 'medium',
    valign: 'center'
  },
  'menu-icon': {
    color: 'sig-1',
    hmargin: 'large',
    size: 'medium'
  },
  'menu-space': {
    vmargin: 'medium',
    width: 'max'
  },
  'panel-bar': {
    color: 'aux-1',
    fill: 'translucent',
    flow: 'row',
    height: 'medium',
    noOverflow: true,
    outerBackdrop: 'large',
    // outerShadow: 'line',
    valign: 'center',
    width: 'max'
  },
  'panel-buttons-footer': {
    flow: 'row',
    halign: 'between',
    hmargin: 'small',
    width: 'max'
  },
  'panel-buttons-header': {
    hmargin: 'small'
  },
  'panel-main': {
    color: 'aux-1',
    fill: 'aux-1',
    innerBackdrop: 'large',
    // outerShadow: 'line',
    translucent: true,
    width: 'flex'
  },
  'panel-menu': {
    color: 'aux-1',
    fill: 'aux-1',
    innerBackdrop: 'large',
    height: 'max',
    outerHeight: 'max',
    // outerShadow: 'line',
    outerWidth: 'small',
    translucent: true
  },
  'panel-meta': {
    color: 'aux-1',
    innerBackdrop: 'large',
    outerWidth: 'max',
    translucent: true
  },
  'panel-title': {
    font: 'medium',
    hmargin: 'large',
    noOverflow: true,
    noWrap: true,
    weight: 'bold'
  },
  'view': {
    flow: 'row',
    width: 'max'
  }
}
