import React, { Component } from "react";
import './styles/Project.css'

class Project extends Component{
    constructor(props){
        super(props);
        this.name = props.name;
        this.tools = props.tools;
        this.desc = props.desc;
        this.img = props.img;
    }

    getImg(){
        if(this.img == null){
            return null;
        }else{
            return(<img alt={this.name} src={'imgs/' + this.img}></img>);
        }
    }

    render(){
        return(
            <div className="project-container">
                {this.getImg()}
                <div>
                    <h3>{this.name}</h3>
                    <p className="project-sub">{this.tools}</p>
                    <p className="project-desc">{this.desc}</p>
                </div>
            </div>
        );
    }

}

export default Project;