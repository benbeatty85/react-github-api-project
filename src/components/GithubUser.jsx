import React from 'react';
import { Link } from 'react-router';
class GithubUser extends React.Component {
    
    render() {
        /*console.log(this.props)*/
        return (
        <div>
            <Link className="githubUserLink" to={`/user/${this.props.user}`}>
                <h2 className="githubUser-name">{this.props.user}</h2>
                <img className="githubUser-avatar" src={this.props.avatar_url} alt={`${this.props.user} avatar`} />
            </Link>
        </div>
        );
    }
}
export default GithubUser;


