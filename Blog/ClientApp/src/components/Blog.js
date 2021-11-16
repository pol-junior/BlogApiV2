import React from 'react'
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import Paragraph from './Paragraph'

class Blog extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.match.params.id,
            data: {}
        }

    }

    async componentDidMount() {
        const response = await fetch(`api/article/${this.state.id}`)
        const blog = await response.json();
        this.setState({ data: blog })

    }

    render() {
        if (this.state.data.paragraphs != null) {
            var res = this.state.data.paragraphs.map(x => <Paragraph key={x.id} info={x}></Paragraph>)
        }
        return (
            <div className='bg-dark d-flex flex-column text-white-50 w-100' >
                <img src={this.state.data.imageUrl} />
                <h1 className='text-center m-4'>{this.state.data.title}</h1>
                <div>
                    {res}
                </div>
                <div>
                    <NavLink tag={Link} className="text-white-50 btn btn-info" to="/previewList">Back</NavLink>
                </div>
            </div>
        )
    }
}

export default Blog