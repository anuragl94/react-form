import React, { Component } from 'react'
import Form from '../../lib/Form'

class Input extends Component {
  constructor (props) {
    super(props)
    if (props.value !== props.defaultValue) {
      props.onChange(props.defaultValue)
    }
  }
  render () {
    const {
      label,
      type = 'text',
      value,
      defaultValue = '',
      onChange,
      ...props
    } = this.props
    return (
      <fieldset>
        <label>
          <span className='label-wrap'>{label}</span>
          <div className='input-wrap'>
            <input
              {...{ type }}
              {...props}
              value={ value || defaultValue }
              onChange={e => { onChange(e.target.value) }}
            />
          </div>
        </label>
      </fieldset>
    )
  }
}


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
            {...this.generateStateBindings(this.state, {
              keys: ['username'],
              defaultValue: 'admin',
              stateChangeHandler: this.setState
            })}
          />
          <Input
            label='Password'
            type='password'
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
