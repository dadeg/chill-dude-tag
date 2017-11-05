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
import {subscribeToTimer} from '../../api';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timestamp: 'no timestamp yet'
        };
        subscribeToTimer((err, timestamp) => this.setState({
            timestamp
        }));
    }

    render() {
        return (
            <div className="App">
                <p className="App-intro">
                    This is the timer value: {this.state.timestamp}
                </p>
                <h1>Chill Dude TAG</h1>


                <ul id="messages"></ul>
                <form action="">
                    <input id="m" autocomplete="off"/>
                    <button>Send</button>
                </form>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    count: state.counter.count,
    isIncrementing: state.counter.isIncrementing,
    isDecrementing: state.counter.isDecrementing
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
