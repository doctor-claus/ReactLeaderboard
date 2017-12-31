import React, { Component } from 'react';
class RawInput extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return <textarea rows= "22" cols= "65" onChange = {event => this.props.onTextChange(event.target.value)}>{this.props.value}</textarea>;
	}
}

export default RawInput;