import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
class App extends Component {
	constructor(props){
		super(props),
		this.state = { value: {} },
		this.rows();
	}
	rows(){
		axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
		.then(response => {
			this.setState({ value: response });
			document.getElementById("day").innerHTML = "Points in past 30 days &#9660;";
			document.getElementById("allt").innerHTML = "All time points"
		})
		.catch(error => {
			console.log(error);
		})
	}
	data1(name){
		if(name.data == undefined){
			return <tr></tr>
		}
		return name.data.map(value =>{
			return (
				<tr key = {value.username} className= "info">
					<td>{name.data.indexOf(value) + 1}</td>
					<td><img src= {value.img} />{value.username}</td>
					<td>{value.recent}</td>
					<td>{value.alltime}</td>
				</tr>
			);
		});
	}
	changeState(){
		axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
		.then(response => {
			this.setState({ value: response });
			document.getElementById("allt").innerHTML = "All time points &#9660;";
			document.getElementById("day").innerHTML = "Points in past 30 days";
		})
		.catch(error => {
			console.log(error);
		})
	}
	render(){
		return (
			<div>
				<div className = "header">Leaderboard</div>
				<table className = "table table-striped">
					<thead>
						<tr>
							<th>#</th>
							<th><span className = "name">Name</span></th>
							<th className= "days" onClick = {event => this.rows()} id= "day">Points in past 30 days</th>
							<th className= "alltime" onClick= {event => this.changeState()} id= "allt">All time points</th>
						</tr>
					</thead>
					<tbody>
						{this.data1(this.state.value)}
					</tbody>
				</table>
			</div>
		);
	}
}
ReactDOM.render(<App />, document.querySelector('.container'));