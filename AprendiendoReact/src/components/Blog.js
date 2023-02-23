import React, { Component } from "react";
import Slider from "./Slider";
import Sidebar from "./Sidebar";

class Blog extends Component {
    render() {

        return (
            <div id="blog">
                <Slider
                    title="Blog"
                />
                <div className="center">
                    <div id="content">
                        {/* Listado de artículos que vendran de la api rest de node */}
                    </div>
                    <Sidebar />
                </div>
            </div>
        );
    }
}

export default Blog;