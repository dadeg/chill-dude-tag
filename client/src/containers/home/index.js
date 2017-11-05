import React, { Component } from 'react'
import {push} from 'react-router-redux'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    increment,
    incrementAsync,
    decrement,
    decrementAsync
} from '../../modules/counter';
import {joinGame} from '../../api';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: 'no board yet'
        };
        joinGame((err, board) => this.setState({
            board
        }));
    }

    render() {
        return (
            <div className="App">
                <p className="App-intro">
                </p>
                <h1>Chill Dude TAG</h1>
                <h4>Board: {this.state.board}</h4>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    count: state.counter.count,
    isIncrementing: state.counter.isIncrementing,
    isDecrementing: state.counter.isDecrementing,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    increment,
    incrementAsync,
    decrement,
    decrementAsync,
    changePage: () => push('/about-us')
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
