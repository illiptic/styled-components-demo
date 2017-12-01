import _ from 'lodash'

export function theme (key) {
  return prop => _.get(prop.theme, key)
}
