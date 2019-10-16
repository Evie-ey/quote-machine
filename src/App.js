import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onGetNewQuote = this.onGetNewQuote.bind(this);
    this.state = {
      quote: {}
    }
  }

  onGetNewQuote(){
    // alert("life is great")
    fetch('https://api.quotable.io/random')
    .then((response)=> {
      return response.json()
    })
    .then((data) => {
      this.setState(() => {
        return {quote: data}
      });
      
      
      
    })
  }

  render() {
    return (
      <div className="App">
        <Quotes quote = {this.state.quote}
          onGetNewQuote = {this.onGetNewQuote}
        />
      </div>
    )
  }
}



  const Quotes =(props) => {
    return (
      <div id="quote-box">
      <p id="text">{props.quote.author}</p>
      <p id="author">{props.quote.content}</p>
      <button onClick={props.onGetNewQuote}>New quote</button>

    </div>
    )
  }
export default App;
