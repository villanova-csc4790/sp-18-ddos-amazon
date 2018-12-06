import React, { Component } from 'react';


class EventsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
        };
        this.loadChanges = this.loadChanges.bind(this)
    }

    loadChanges() {
        let host = process.env.REACT_APP_SERVICE_HOST || 'localhost'
        let port = process.env.REACT_APP_SERVICE_PORT || '8000'
        let url = 'http://' + host + ':' + port + '/changes/'

        fetch(url)
        .then(results => {
            return results.json();
        }).then(data => {
            let events = data.results.map((e) => {
                return(
                    <tr key={e.id}>
                        <td>{e.service_ip}</td>
                        <td>{e.client_id}</td>
                        <td>{e.client_ip}</td>
                        <td>
                            <div className="color-box"
                                 style={{background: '#' + e.color}}></div>
                        </td>
                        <td>{new Date(e.timestamp).toLocaleString()}</td>
                    </tr>
                )
            })
            this.setState({events: events})
            console.log('events', this.state.events)
        })
    }

    componentDidMount() {
        this.loadChanges()
        setInterval(this.loadChanges, 1000)
    }

    render() {
        return(
            <table className="table table-striped table-bordered table-hover table-dark">
                <thead>
                    <tr>
                        <th scope="col">Service IP</th>
                        <th scope="col">Client ID</th>
                        <th scope="col">Client IP</th>
                        <th scope="col">Color</th>
                        <th scope="col">Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.events}
                </tbody>
            </table>
        )
    }
}

export default EventsTable;
