import _ from 'lodash'
import {css} from 'styled-components'

export const theme = (key) => prop => _.get(prop.theme, key) || console.warn(key, 'is missing in theme', prop.theme)

const sizes = {
	large: 992,
	medium: 768,
	small: 376
}
export const media = _.mapValues(sizes, v => (...args) => css`
  @media (max-width: ${v}px) {
    ${css(...args)}
  }
`)

/**
 *  Colors need to be in Hex
 */
export const gradient = ({start, end}) => css`
  background: ${start}; /* Old browsers */
  background: -moz-linear-gradient(top, ${start} 0%, ${end} 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, ${start} 0%,${end} 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, ${start} 0%,${end} 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${start}', endColorstr='${end}',GradientType=0 ); /* IE6-9 */
`
