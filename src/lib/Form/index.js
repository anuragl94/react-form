import { Component } from 'react'
import { generateStateBindings } from './Utils'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.generateStateBindings = generateStateBindings.bind(this)
  }
}

export default Form