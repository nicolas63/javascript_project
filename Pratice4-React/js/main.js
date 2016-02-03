import React from 'react'
import { render } from 'react-dom'

class Tutu
{
    alert() {
        console.log('Test Class');
    }
}

var t = new Tutu();

console.log('test basic');

t.alert();

/*
 fetch('http://localhost:9312', {
 method: 'post',
 headers : {
 'Accept': 'application/json',
 'Content-Type': 'application/json'
 },
 body: JSON.stringify({
 title: 'The Big Bang Theory',
 season: 1,
 episode: 1
 }),
 mode: 'no-cors'
 }).then(function(response) {
 console.log(response);
 }).catch(function(err) {
 console.log(err);
 });
*/

var HelloMessage = React.createClass({
    render: function() {
        return <div>Hello {this.props.name}</div>;
    }
});

var LineComponent = React.createClass({
    render: function() {
        return <tr><td>{this.props.id} </td><td> {this.props.title} </td><td> {this.props.season} </td><td> {this.props.episode} </td></tr>;
    }
});

var ListComponent = React.createClass({
    loadComponentsFromServer: function () {
        fetch(this.props.url, {
            method: 'GET',
            headers : {
                'Accept': 'application/json',
                'Connection': 'keep-alive'
            },
            mode: 'no-cors'
        }).then(function(response) {
            return response.json();
            //this.setState({data: response.body});
            //console.log(response.json());
            /*var dataNodes = this.props.data.map(function(episode){
                return (<LineComponent id={episode.id} title={episode.title} season={episode.season} episode={episode.episode}/> )
            });*/
        }).then(function (data) {
            console.log(data);
        }.bind(this)).catch(function(err) {
            console.log(err);
        });
    },
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        this.loadComponentsFromServer();
    },
    render : function(){
        return <table> <thead><td>id</td> <td>title</td> <td>season</td> <td>episode</td> </thead> <tbody> {this.state.data} </tbody> </table>
    }
});

//render(<HelloMessage name="John" />, document.getElementById('content'));

render(<ListComponent url='http://localhost:9312'/>,document.getElementById('content'));
//render(<LineComponent id="3" title="coucou" season="1" episode="1" />,document.getElementById('content'));