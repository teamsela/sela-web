'use strict'

import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

class ColourPicker extends React.Component {

  state = {
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
    switch(this.myType){
      case "font":
        console.log("font selected");
        break;
      case "border":
        console.log("border selected");
        break;
      case "bg":
        console.log("bg selected");
        break;
      default:
        console.log("default reflection");
    }
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb });
  };

  // reportType(type:string){
  //   let myType=type;
  //   return myType;
  // }
  myType="";

  renderUi(type:string) {
    const styles = reactCSS({
      default: {
        color: {
          width: '20px',
          height: '5px',
          borderRadius: '0px',
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
        },
        swatch: {
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
          top: '2.25rem',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    let image;
    switch (type) {
      case 'font':
        image = <img src="/img/navTools/font.svg" alt="font" />;
        break;
      case 'bg':
        image = <img src="/img/navTools/bg.svg" alt="background" />;
        break;
      case 'border':
        image = <img src="/img/navTools/border.svg" alt="border" />;
        break;
      default:
        image = null;
    }

    return (
      <div className="colourPicker">
        <div className="colourSwatch" style={styles.swatch} onClick={this.handleClick}>
          {image}
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker color={this.state.color} onChange={this.handleChange} />
          </div>
        ) : null}
      </div>
    );
  }
}

export class FontColour extends ColourPicker {
  myType="font";
  render() {
    return this.renderUi('font');
  }
}
export class BorderColour extends ColourPicker{
  myType="border";
  render() {
    return this.renderUi('border');
  }
}
export class BgColour extends ColourPicker{
  myType="bg";
  render() {
    return this.renderUi('bg');
  }
}
// export SketchExample;