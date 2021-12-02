import React from "react";
import './Header.css'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageUrl: 'https://avatanplus.com/files/resources/original/5899dc703e19a15a1905167e.png'
        }
    }

    render() {
        return (
            <div className='header-div'>

                <div className='header-innerdiv'>
                    <h1 className='header-h1'>
                        <pre>
                            Some nice pleace <br />
                            to read<br />
                            to thing<br />
                            to feal<br />
                            <br />
                        </pre>
                    </h1>

                </div>
                <img src={this.state.imageUrl} />
            </div>
        )
    }
}

export default Header