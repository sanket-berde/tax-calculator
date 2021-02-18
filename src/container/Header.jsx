import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <div className="header-container">
                <img src={require("../image/menu.png")} alt="menu" className="menu menu-item" />
                <span className="menu-item">HR CLOUD</span>
                <img src={require("../image/user.png")} alt="user" className="user menu-item" />
                <img src={require("../image/notification.png")} alt="notification" className="notification menu-item" />
                <img src={require("../image/message.png")} alt="message" className="message menu-item" />
            </div>
        )
    }
}

export default Header;