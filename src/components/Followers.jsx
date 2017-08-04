import React from 'react';
import { Link } from 'react-router';
import GithubUser from './GithubUser';
var Infinite = require('react-infinite');

class Followers extends React.Component {
    
    constructor() {
        super();
        this.state = {
            page: 1,
            loading: false,
            followers: []
        };
    }
    
    fetchData() {
        //console.log(this)
        
        this.setState = {
            loading: true
        };
        
        fetch(`https://api.github.com/users/${this.props.params.username}/followers?&{this.state.page}&per_page=50`)
        .then(response => response.json())
        .then(
            followers => {
                this.setState({
                    followers: followers
                });
            }
        )
        // .then(
        //     console.log(this)
        // )
    }
    
     componentDidMount() {
        this.fetchData();
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.params.username !== this.props.params.username) { 
          this.fetchData();
      }
    }
    
    render() {
        if (!this.state.followers) {
            return <div>LOADING FOLLOWERS...</div>;
        }
        //console.log(this.state.followers.object.username);
        return (
            <div className="followers-page">
                <h3>Followers of {this.props.params.username}</h3>
                <ul>
                    {this.state.followers.map(follower => { 
                    return(
                        <li key={follower.id}>
                            <GithubUser user={follower.login} avatar_url={follower.avatar_url} img src={follower.avatar_url} />  
                            
                        </li>
                        )
                    })}
                      
                  
                </ul>    
            </div>
        );
    }
}
export default Followers;