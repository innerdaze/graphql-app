import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getGraph } from '../actions/GraphQLActions'

class Query extends Component {
  constructor(props) {
    super(props)

    this.state = {
      queryText: ''
    }

    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleGetGraphClick = this.handleGetGraphClick.bind(this)
  }

  handleGetGraphClick() {
    this.state.queryText && this.props.dispatch(getGraph(this.state.queryText))
  }

  handleSearchChange(e) {
    this.setState({
      queryText: e.target.value
    })
  }

  render() {
    let queryText

    const inputRef = node => {
      this.queryText = node
    }

    let data = this.props.store.get('data')
    let { character, actor, role, traits } = data && data.toObject()

    return (
      <div>
        {this.props.store.get('fetching') &&
          <p>Fetch in progress...</p>
        }
        {data &&
          <div>
            <h3>{ character }</h3>
            <p>{ actor }</p>
            <p>{ role }</p>
            <p>{ traits }</p>
          </div>
        }
        <textarea value={this.state.value} onChange={this.handleSearchChange}></textarea>
        <button onClick={this.handleGetGraphClick}>
          query
        </button>
        </div>
    )
  }
}

Query.propTypes = {
  dispatch: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired
}

Query.defaultProps = {
  dispatch: Function.prototype,
  store: Function.prototype
}

export default connect(
  state => ({
    store: state.query
  })
)(Query)
