import React, { Component }from 'react';
import "./App.css";



// components
import SearchBox from "../components/SearchBox.js";
import CardList from "../components/CardList.js";
import Scroll from "../components/Scroll.js";


//data
// import { robots }from "../robots.js";


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ""
        }
    }


    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(users => {this.setState({ robots: users })});
    }


    onSearchChange = (e) => {
        this.setState({ searchfield: e.target.value })
    }


    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })

        if (robots.length === 0) {
            return <h1>Loading...</h1>
        } else {
            
            return (
                <div className="tc">
                    <h1 className="f1">Robo-Pals</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                    <CardList robots={filteredRobots} />
                    </Scroll>
                </div>
            )
        }

    }
}

export default App;
