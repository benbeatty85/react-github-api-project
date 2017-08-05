import React from 'react';
//import { Link } from 'react-router';
import GithubUser from './GithubUser';
import Infinite from 'react-infinite';

class Followers extends React.Component {
 constructor() {
    super();
    this.state = {
      page: 1,
      loading: false,
      followers: []
    };
}
 fetchData = () => {
   this.setState({
      loading: true
    });
    //console.log(this)
    fetch(`https://api.github.com/users/${this.props.params.username}/followers?&page=${this.state.page}&per_page=50`)
      .then(response => response.json())
      .then(
        followersResponse => {
          console.log('got response');
         let mergedArray = this.state.followers.concat(followersResponse);
          this.setState({
            followers: mergedArray,
            page: this.state.page + 1,
            loading: false
          });
        }
      );
    
  }
  
 componentDidUpdate(prevProps, prevState) {
    if (prevProps.params.username !== this.props.params.username) {
      this.fetchData();
    }
  }
 render() {
    console.log('in render', this.state.followers);
    
    return (
      <div className="followers-page">
        <h3>Followed by {this.props.params.username}</h3>
        <Infinite className="followers-page"
                  isInfiniteLoading={this.state.loading}
                  onInfiniteLoad={this.fetchData.bind(this)}
                  useWindowAsScrollContainer
                  elementHeight={100}
                  infiniteLoadBeginEdgeOffset={100} >
        {this.state.followers.map( follower => {
            return <GithubUser user={follower.login} key={follower.id} avatar_url={follower.avatar_url} />
        }
        )}
        </Infinite>
      </div>
    );
  }
}
export default Followers;