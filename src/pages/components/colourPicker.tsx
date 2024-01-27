'use strict'

import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

// import { useSharedState } from './Nav';

class ColourPicker extends React.Component {

  myType="";
  setNewColour= () => {};
  setPickerStatus= () => {};

  constructor(props:any){
    super(props);
  }

  state = {
    displayColorPicker: false,
    selected: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
    selectColor: {
      r: '0',
      g: '0',
      b: '0',
      a: '0',
    }
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
  handleSelect = () => {
    if(this.state.selected){
      this.setState({selected:false});
      this.setState({selectColor:
        {
          r: '0',
          g: '0',
          b: '0',
          a: '0',
        }
      })
      this.setPickerStatus(false);
    }
    else{
      this.setState({selected:true});
      this.setState({selectColor:
        {
          r: '0',
          g: '0',
          b: '0',
          a: '0.25',
        }
      })
      this.setPickerStatus(true);
    }
  }

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
  };

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
        select: {
          display: 'inline-block',
          cursor: 'pointer',
          background: `rgba(${this.state.selectColor.r}, ${this.state.selectColor.g}, ${this.state.selectColor.b}, ${this.state.selectColor.a})`,
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
        <div className="colourPickerWrapper">
          <div className="colourSwatch swatch" style={styles.select} onClick={this.handleSelect}>
            {image}
            <div style={styles.color} />
          </div>
          <div className="colourMore swatch" onClick={this.handleClick} >
            <img style={styles.swatch} src="/img/navTools/more.svg" alt="more colour" />
          </div>
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
  constructor(props:any){
    super(props);
  }
  render() {
    return this.renderUi('font');
  }
}
export class BorderColour extends ColourPicker{
  myType="border";
  constructor(props:any){
    super(props);
  }
  render() {
    return this.renderUi('border');
  }
}
export class BgColour extends ColourPicker{
  myType="bg";
  constructor(props:any){
    super(props);
    console.log(props.color);
    this.state.color=props.color;
    this.state.selected=props.selected
    this.setNewColour=props.setNewColour.bind(this);
    this.setPickerStatus=props.setPickerStatus.bind(this);
  }
  handleChange = (color) => {
    this.setState({ color: color.rgb })
    this.setNewColour(color.rgb);
  };
  render() {
    return this.renderUi('bg');
  }
}
// export SketchExample;