import React from 'react';

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
      <article id="quote-box" className="container">
        <div className="card">
          <div className="card-body card-info">
            <q className="card-text" id="text">
              {props.quote.content}
            </q>
            <p className="card-text" id="author">
              {props.quote.author}
            </p>
          </div>
          <div className="card-bottom">
            <a href="#a" className="card-link">Facebook</a>
            <a href="#a" className="card-link" id="tweet-quote">Tweeter</a>
            <button 
              onClick={props.onGetNewQuote}
              id="new-quote"
            >
              New quote
            </button>
          </div>
        </div>

      </article>
    )
  }
export default App;
