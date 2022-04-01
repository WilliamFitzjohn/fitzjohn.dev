import React, { Component } from "react";
import './styles/Project.css'

class Project extends Component{
    constructor(props){
        super(props);
        this.name = props.name;
        this.tools = props.tools;
        this.desc = props.desc;
    }

    render(){
        return(
            <div className="project-container">
                
                <div>
                    <h3>{this.name}</h3>
                    <p>{this.tools}</p>
                    <p>{this.desc}</p>
                </div>
            </div>
        );
    }

}

export default Project;