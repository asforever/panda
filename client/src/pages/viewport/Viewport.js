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
        const canvas = this.viewportRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.props.dispatch(updateWebGLDemo({id: webglDemoID.GL_Book, canvas: this.viewportRef.current}));
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
