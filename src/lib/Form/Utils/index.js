import { getNestedObject, updateNestedObject } from './stateManagement'

const noop = function () {}
const noopReturn = arg => arg

/**
 * A function that generates a set of methods that bind the input to the owner
 * component's state
 * @param {*} state The state associated with the input
 * @param {array} param0.keys Array of keys depicting level of nesting of state
 * @param {*} param0.formatValue Function to format the data before
 * rendering input
 * @param {*} param0.formatChange Function to format input's changed value
 * before updating state
 * @param {*} param0.onChange Function that specifies how to update state
 * - usually via `setState` or redux dispatch
 * @returns Object that contains props for the input
 */
function generateStateBindings (state, {
  keys,
  defaultValue,
  formatValue = noopReturn,
  formatChange = noopReturn,
  stateChangeHandler = noop
} = {}) {
  return {
    value: formatValue(getNestedObject(state, ['_value', ...keys])),
    defaultValue,
    validity: getNestedObject(state, ['_validity', ...keys]),
    onChange: (value) => {
      const newState = updateNestedObject(state, ['_value', ...keys], formatChange(value))
      stateChangeHandler.call(this, newState)
    },
    onValidation: (validity) => {
      const newState = updateNestedObject(state, ['_validity', ...keys], formatChange(validity))
      stateChangeHandler.call(this, newState)
    }
  }
}

export {
  generateStateBindings
}