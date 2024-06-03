import React, { Component } from 'react'
import { authAxios } from '../axios'
export class Counter extends Component {
    async fetchData() {
        let { data } = await authAxios.get('/api/auth/users')
    }

    render() {
        return (
            <div>
                <h1>Counter</h1>

                <p className='bg-custom'>This is a simple example of a React component.</p>

                <p aria-live='polite'>
                    Current count: <strong></strong>
                </p>

                <button className='btn btn-main' onClick={this.fetchData}>
                    FETCH
                </button>
            </div>
        )
    }
}
