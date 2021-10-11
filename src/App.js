import axios from "axios";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: null
  }

  }
  componentDidMount() {
    axios.get('/token')
    .then((token) => {
      this.setState({
        token: token.data
      })
    })
    .catch(err => { console.log(err)})
  }
  render() {
    const { name } = this.props;
    console.log(this.state)
    return (
      <>
        <h1>
          Hello {name}
        </h1>
      </>
    );
  }
}

export default App;
