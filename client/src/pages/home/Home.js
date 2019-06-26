import React from "react";
import {connect} from 'react-redux';

import Viewport from "../viewport/Viewport";

class Home extends React.Component {

    render(props) {
        return (
            <Viewport></Viewport>
        )
    }
}

export default connect()(Home);
