import React from 'react'

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
                <h4 className="card-title mb-2 col-sm-6 m-auto text-center">{this.state.header}</h4>
                <br/>
                <p className="card-text m-auto col-sm-6">
                    {this.state.text}
                     </p>
                </div>
        )
    }
}

export default Paragraph