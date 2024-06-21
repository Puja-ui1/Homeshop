import React from 'react';

class PopupLink extends React.Component {
    openPopup = (event) => {
        event.preventDefault();
        const { url, windowName } = this.props;
        const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no, width=600,height=500,left=-1000,top=-1000`;
        window.open(url, windowName, params);
    };

    render() {
        return (
            <a href={this.props.url} onClick={this.openPopup} style={{ width: "100%", color: "black" }}>
                {this.props.children}
            </a>
        );
    }
}

export default PopupLink;