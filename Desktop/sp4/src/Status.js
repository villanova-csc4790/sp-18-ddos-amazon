import React, { Component } from 'react';


class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_color: "ffffff",
            bulb_img: "bulb-off.gif",
        }
        this.loadLightState = this.loadLightState.bind(this)
    }

    loadLightState() {
        let host = process.env.REACT_APP_SERVICE_HOST || 'localhost'
        let port = process.env.REACT_APP_SERVICE_PORT || '8000'
        let url = 'http://' + host + ':' + port + '/light/'

        fetch(url)
        .then(results => {
            return results.json();
        }).then(data => {
            let c = data.hex
            this.setState({current_color: c})
            console.log('current_color', this.state.current_color)

            if (data.on || data.on == null) {
                this.setState({bulb_img: 'bulb-on.gif'})
            }
            else {
                this.setState({bulb_img: 'bulb-off.gif'})
            }
        })
    }

    componentDidMount() {
        this.loadLightState()
        setInterval(this.loadLightState, 1000)
    }

    render() {
        return(
            <div align="center">
                {/* <div className="status-box"
                     style={{background: '#' + this.state.current_color}}></div> */}
                <img src={this.state.bulb_img} className="status-box" style={{background: '#' + this.state.current_color}}/>
                <div className="status-title">Current Light Color</div>
            </div>
        )
    }

}

export default Status;