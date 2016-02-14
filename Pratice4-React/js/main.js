import React from 'react'
import { render } from 'react-dom'

var LineComponent = React.createClass({
    render: function () {
        return (
            <tr className="col-10">
                <td className="col-3">{this.props.id}</td>
                <td className="col-3">{this.props.title}</td>
                <td className="col-2">{this.props.season}</td>
                <td className="col-2">{this.props.episode}</td>
            </tr>);
    }
});

var ListComponent = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    render: function () {
        var episodesNode = this.props.data.map(function (episode) {
            return (<LineComponent id={episode.id}
                                   title={episode.title}
                                   season={episode.season}
                                   episode={episode.episode}/>);
        });
        return (
            <table className="col-7 col-10-m">
                <thead>
                <td className="col-3">id</td>
                <td className="col-3">title</td>
                <td className="col-2">season</td>
                <td className="col-2">episode</td>
                </thead>
                <tbody>{episodesNode}</tbody>
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
        fetch(this.props.url, {
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
        }).then(function () {
            this.props.onEpisodeSubmit();
        }.bind(this)).catch(function (err) {
            console.log(err);
        });

    },
    render: function () {
        return (
            <form onSubmit={this.handleSubmit} className="col-3 col-10-m">
                <label for="title" className="col-10 col-5-m">Title</label>
                <input type="text"
                       id="title"
                       name="title"
                       className="col-10 col-5-m"
                       onChange={this.handleTitleChange}/>

                <label for="episode" className="col-10 col-5-m">Episode</label>
                <input type="number"
                       id="episode"
                       name="episode"
                       className="col-10 col-5-m"
                       onChange={this.handleEpisodeChange}/>

                <label for="season" className="col-10 col-5-m">Season</label>
                <input type="number"
                       id="season"
                       name="season"
                       className="col-10 col-5-m"
                       onChange={this.handleSeasonChange}/>
                <br/>
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
    },
    render : function(){
        return (
            <div className="grid">
                <ListComponent data={this.state.data}/>
                <FormComponent url={this.props.url} onEpisodeSubmit={this.handleEpisodeSubmit}/>
            </div>
        );
    }
});

render(<BoxComponent url='http://localhost:9312'/>, document.getElementById('content'));
