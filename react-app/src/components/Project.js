import React, { Component } from "react";
import './styles/Project.css'

class Project extends Component{
    constructor(props){
        super(props);
        this.name = props.name;
        this.tools = props.tools;
        this.desc = props.desc;
        this.img = props.img;
        this.link = props.link;
    }

    getImg(){
        if(this.img == null){
            return null;
        }else{
            return(<img alt={this.name} src={'imgs/' + this.img}></img>);
        }
    }

    getLink(){
        if(this.link == null){
            return null;
        }else{
            return(
                <a href={this.link} target='_black' className="project-link">
                    <h3 className="unselectable">link</h3>
                </a>
            );
        }
    }

    render(){
        return(
            <div className="project-container">
                {this.getImg()}
                <div>
                    <div className="project-header">
                        <h3>{this.name}</h3>
                        {this.getLink()}
                    </div>
                    <p className="project-sub">{this.tools}</p>
                    <p className="project-desc">{this.desc}</p>
                </div>
            </div>
        );
    }

}

export default Project;