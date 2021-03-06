import React from "react";
import {connect} from "react-redux";
import styles from "./Viewport.module.css";
import {updateWebGLDemo, webglDemoID} from "../../store/actions";

class Viewport extends React.Component {
    constructor(props) {
        super(props);
        this.viewportRef = React.createRef();
    }

    componentDidMount() {
        this.props.dispatch(updateWebGLDemo({id: webglDemoID.GL_Pbr, canvas: this.viewportRef.current}));
    }

    render() {
        return (
            <div className={styles.viewport}>
                <canvas ref={this.viewportRef}></canvas>
            </div>
        )
    }
}

export default connect()(Viewport);
