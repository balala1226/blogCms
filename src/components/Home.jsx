import { Component } from "react";
import '../style/Home.css'

class Home extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className='content'>
          <h1>All Posts</h1>
        </div>
      </>
    );
  }
}

export default Home

