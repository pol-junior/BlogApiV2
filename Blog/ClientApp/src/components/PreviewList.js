import React from 'react';
import Preview from './Preview'

 class PreviewList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    async componentDidMount() {
        const response = await fetch('https://localhost:44362/api/article')
        const date = await response.json()
        this.setState({ data: date})
    }

    render() {
        const res = this.state.data.map(x => <Preview key={x.id} info={x}></Preview>);
        return (
            <div>
                {res}
            </div>
        );
    }
}

export default PreviewList
