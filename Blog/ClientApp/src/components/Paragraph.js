import React from 'react'
import './Paragraph.css'

class Paragraph extends React.Component {
    constructor(props) {
        super(props)
        const { text, header } = props.info

        this.state = {
            text: text,
            header: header,
        }
    }


    render() {
        return (
            <div className="card-body m-2">
                <h4 className="card-title mb-2 col-sm-6 m-auto text-center ">{this.state.header}</h4>
                <br/>       
                <pre className="card-text m-auto col-sm-6 text-white-50">
                    {this.state.text}
                     </pre>
                </div>
        )
    }
}

export default Paragraph