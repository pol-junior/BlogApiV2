import React from 'react'

class InputParagraph extends React.Component {
    constructor(props) {
        super(props)
        this.data = {}
        this.state = {
            header: '',
            text: '',
            articleid: props.id
        }
        this.handleChange = this.handleChange.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

  

    async onClick(e) {
        console.log(JSON.stringify(this.state))
        const response = await fetch('api/paragraph', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        });
        console.log(response)
        this.setState({ header: '', text: '' });
    }

    render() {
        return (
            <div>
                <div>
                    <label className='form-label text-white'>header</label>
                    <input type='text' name='header' value={this.state.header} onChange={this.handleChange} className='form-control'></input> Header
                </div>
                <div>
                    <label className='form-label text-white'>text</label>
                    <textarea value={this.state.text} name='text' className='form-control' row='3' onChange={this.handleChange}></textarea>
                </div>
                <button onClick={this.onClick} className='btn btn-primary m-2' >Add</button>
            </div>
        )
    }


}

export default InputParagraph