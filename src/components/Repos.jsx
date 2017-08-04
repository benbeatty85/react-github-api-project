import React from 'react';
//import { Link } from 'react-router';
import GithubRepo from './GithubRepo';
class Repos extends React.Component {
    
    constructor() {
        super();
        this.state = {};
    }
    
    fetchData() {
        //console.log(this)
        fetch(`https://api.github.com/users/${this.props.params.username}/repos`)
        .then(response => response.json())
        .then(
            repos => {
                this.setState({
                    repos: repos 
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
        if (!this.state.repos) {
            return <div>LOADING REPOS...</div>;
        }
        //console.log(this.state);
        return (
            <div className="repos-page">
                <h3>Public Repositories by {this.props.params.username}</h3>
                <ul>
                    {this.state.repos.map(repo => { 
                    return(
                        <li key={repo.id}>
                            <GithubRepo name={repo.full_name} stargazers={repo.stargazers_count}/>  
                            
                          
                        </li>
                        ) 
                    })}
                      
                  
                </ul>    
            </div>
        );
    }
}
export default Repos;