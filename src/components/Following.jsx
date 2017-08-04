import React from 'react';
import { Link } from 'react-router';
import GithubUser from './GithubUser';

class Following extends React.Component {
    
    constructor() {
        super();
        this.state = {};
    }
    
    fetchData () {
        fetch(`https://api.github.com/users/${this.props.params.username}/following`)
        .then(response => response.json())
        .then(
            following => {
                this.setState({
                    following: following
                });
            }
        );
    }
     
    componentDidMount() {
        this.fetchData();
    }
    
    componentDidUpdate(prevProps,prevState) {
      if (prevProps.params.username !== this.props.params.username) { 
          this.fetchData();
      }
    
    }
    
    render() {
        if (!this.state.following) {
            return <div>LOADING FOLLOWERS...</div>;
        }
        //console.log(this.state.followers.object.username);
        return (
            <div className="following-page">
                <h3>Followers of {this.props.params.username}</h3>
                <ul>
                    {this.state.following.map(followed => { 
                    return(
                    <div className="following-display">
                        <li key={followed.id}>
                            <GithubUser user={followed.login} avatar_url={followed.avatar_url} img src= {followed.avatar_url} />
                        </li>
                    </div>
                        )
                    })}
                      
                  
                </ul>    
            </div>
        );
    }
}
export default Following;