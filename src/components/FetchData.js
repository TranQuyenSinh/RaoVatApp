import React, { Component } from 'react'

export class FetchData extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1 id='tableLabel'>Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
            </div>
        )
    }
}
