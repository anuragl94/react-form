import React, { Component } from 'react'
import Form from '../../lib/Form'

class _Input extends Component {
  constructor (props) {
    super(props)
    if (props.value !== props.defaultValue) {
      props.onChange && props.onChange(props.defaultValue)
    }
    this.handleValidation()
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (e) {
    const value = e.target.value
    this.props.onChange && this.props.onChange(value)
    this.handleValidation()
  }
  handleValidation () {
    if (!this.input) {
      return
    }
    const validity = (obj => {
      const result = {}
      for (let type in obj) {
        result[type] = obj[type]
      }
      return result
    })(this.input.validity)
    this.props.onValidation && this.props.onValidation(validity)
  }
  componentDidMount () {
    this.handleValidation()
  }
  render () {
    const {
      label,
      type = 'text',
      value,
      defaultValue = '',
      onChange,
      onValidation,
      ...props
    } = this.props
    return (
      <input
        {...{ type }}
        {...props}
        value={ value || defaultValue }
        onChange={this.handleChange}
        ref={node => { this.input = node }}
      />
    )
  }
}

const InputWrapperHoC = function (Input) {
  Input.displayName = 'Input'
  return class InputWrap extends Component {
    render () {
      const {
        label,
        validity,
        ...props
      } = this.props
      const hasError = validity && (validity.valid === false)
      return (
        <fieldset>
          <label>
            <span className='label-wrap'>{label}</span>
            <div className='input-wrap'>
              <div className={`input ${hasError ? 'input--error' : ''}`.trim()}>
                <Input {...props} />
              </div>
            </div>
          </label>
        </fieldset>
      )
    }
  }
}

const Input = InputWrapperHoC(_Input)

export default class TestForm extends Form {
  render () {
    return (
      <div>
        <form onSubmit={e => { e.preventDefault() }}>
          <pre className='state-preview'>
            {JSON.stringify(this.state, 2, 2)}
          </pre>
          <Input
            label='Username'
            type='text'
            required
            {...this.generateStateBindings(this.state, {
              keys: ['username'],
              defaultValue: 'admin',
              stateChangeHandler: this.setState
            })}
          />
          <Input
            label='Password'
            type='password'
            required
            {...this.generateStateBindings(this.state, {
              keys: ['password'],
              defaultValue: '',
              stateChangeHandler: this.setState
            })}
          />
        </form>
      </div>
    )
  }
}
