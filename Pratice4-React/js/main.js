import React from 'react'
import { render } from 'react-dom'

var LineComponent = React.createClass({
    render: function () {
        return (<tr>
            <td>{this.props.id} </td>
            <td> {this.props.title} </td>
            <td> {this.props.season} </td>
            <td> {this.props.episode} </td>
        </tr>);
    }
});

var ListComponent = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    render: function () {
        var episodesNode = this.props.data.map(function (episode) {
            return (<LineComponent id={episode.id} title={episode.title} season={episode.season}
                                   episode={episode.episode}/>);
        });
        return (<table>
            <thead>
            <td>id</td>
            <td>title</td>
            <td>season</td>
            <td>episode</td>
            </thead>
            <tbody> {episodesNode} </tbody>
        </table>);
    }
});

var FormComponent = React.createClass({
    getInitialState: function () {
        return {title: '', episode: '', season: ''};
    },
    handleTitleChange: function (e) {
        this.setState({title: e.target.value});
    },
    handleEpisodeChange: function (e) {
        this.setState({episode: e.target.value});
    },
    handleSeasonChange: function (e) {
        this.setState({season: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var title = this.state.title.trim();
        var episode = this.state.episode;
        var season = this.state.season;
        fetch('http://localhost:9312', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                season: season,
                episode: episode
            }),
            mode: 'no-cors'
        }).then(function (response) {
            //console.log(response.text());
            this.props.onEpisodeSubmit(data);
            return response.json();
        }.bind(this)).then(function (data) {
            console.log(data);
            this.props.onEpisodeSubmit(data);
        }.bind(this)).catch(function (err) {
            console.log(err);
        });

    },
    render: function () {
        return (
            <form onSubmit={this.handleSubmit}>
                <label for="title">Title</label> <input type="text" id="title" name="title"
                                                        onChange={this.handleTitleChange}/>
                <label for="episode">Episode</label> <input type="number" id="episode" name="episode"
                                                            onChange={this.handleEpisodeChange}/>
                <label for="season">Season</label> <input type="number" id="season" name="season"
                                                          onChange={this.handleSeasonChange}/>
                <input type="submit" value="Watched"/>
            </form>
        );
    }
});

var BoxComponent = React.createClass({
    loadComponentsFromServer: function () {
        /*var xhr = new XMLHttpRequest();
         var context = this;

         xhr.onreadystatechange = function () {
         console.log(xhr.responseText);
         context.setState({data: xhr.responseText});
         console.log(context.props.data);
         };

         xhr.open('GET','http://localhost:9312', true);
         xhr.setRequestHeader('Accept','application/json');
         xhr.setRequestHeader('Connection','keep-alive');
         xhr.send();*/
        fetch(this.props.url, {
            method: 'GET',
            headers : {
                'Accept': 'application/json',
                'Connection': 'keep-alive'
            }
        }).then(function(response) {
            return response.json();
        }).then(function (data) {
            this.setState({data: data});
        }.bind(this)).catch(function (err) {
            console.log(err);
        });
    },
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        this.loadComponentsFromServer();
    },
    handleEpisodeSubmit: function (data) {
        this.loadComponentsFromServer();
        /*var newData = this.state.data;
         newData.push(data);
         console.log(newData);
         this.setState({data: newData});*/
    },
    render : function(){
        return (
            <div>
                <ListComponent data={this.state.data}/>
                <FormComponent onEpisodeSubmit={this.handleEpisodeSubmit}/>
            </div>
        );
    }
});

render(<BoxComponent url='http://localhost:9312'/>, document.getElementById('content'));
