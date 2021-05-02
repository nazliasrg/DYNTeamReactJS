import React, {Component} from 'react';

class DropDown extends Component{
    constructor(){
        super();
        this.state = {
            showMenu:false
        };
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event){
        event.preventDefault();

        this.setState({showMenu: true}, () =>{
            document.addEventListener(`click`, this.closeMenu);
        });
    }

    closeMenu(){
        this.setState({showMenu: false}, () =>{
            document.removeEventListener(`click`, this.closeMenu);
        });
    }

    render(){
        return(
            <div>
                <button onClick={this.showMenu}>
                    Category
                </button>
                {
                    this.state.showMenu ?
                    (
                        <div className="menu">
                            <button> menu 1</button>
                            <button> menu 2</button>
                        </div>
                    ) : (null)
                }
            </div>
        )
    }
}

export default DropDown;