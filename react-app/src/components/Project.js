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
        this.onOpen = props.onOpen;
    }

    getImg(){
        if(this.img == null){
            return null;
        }else{
            return(<img alt={this.name} src={'imgs/' + this.img}></img>);
        }
    }

    getLink(){
        if(this.onOpen != null){
            return(
                <span className="project-link">
                    <h3 className="unselectable">open</h3>
                </span>
            );
        }
        if(this.link == null){
            return null;
        }else{
            return(
                <a href={this.link} target='_blank' rel='noreferrer' className="project-link">
                    <h3 className="unselectable">link</h3>
                </a>
            );
        }
    }

    render(){
        const interactive = this.onOpen != null;
        return(
            <div
                className={'project-container' + (interactive ? ' project-clickable' : '')}
                onClick={interactive ? this.onOpen : undefined}
                role={interactive ? 'button' : undefined}
                tabIndex={interactive ? 0 : undefined}
                onKeyDown={interactive ? (e) => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); this.onOpen(); } } : undefined}
            >
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