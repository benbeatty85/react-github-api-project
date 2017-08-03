import React from 'react';
import { Link } from 'react-router';
import GithubUser from './GithubUser';

class Followers extends React.Component {
    
    constructor() {
        super();
        this.state = {};
    }
    
    fetchData () {
        fetch(`https://api.github.com/users/${this.props.params.username}/followers`)
        .then(response => response.json())
        .then(
            followers => {
                this.setState({
                    followers: followers
                });
            }
        );
    }
     
    componentDidMount() {
        this.fetchData();
    }
    
    componentDidUpdate(prevProps) {
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
                    <div className="followers-display">
                        <li key={follower.id}>
                            <GithubUser user={follower.login} avatar_url={follower.avatar_url} img src= {follower.avatar_url} />
                        </li>
                    </div>
                        )
                    })}
                      
                  
                </ul>    
            </div>
        );
    }
}
export default Followers;