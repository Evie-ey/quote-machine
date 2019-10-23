import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onGetNewQuote = this.onGetNewQuote.bind(this);
    this.state = {
      quote: {},
      myColors: [
                  '#800000', '#dab0a4', '#de3c59','#FF00FF', '#003366',
                  '#808000', '#5e7c95', '#de3c59', '#572578','#009688',
                  '#816c53', '#006400'
                 ],
      theColor: '',

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

  backgroundStyle() {
    return {backgroundColor:this.state.theColor}
  }

  componentDidMount() {
    return this.onGetNewQuote();
  }

  componentDidUpdate(prevprops, prevState) {
    const randomColor = Math.floor(Math.random() * this.state.myColors.length);
    if(prevState.quote.content !== this.state.quote.content) {
        this.setState(() => ({theColor:this.state.myColors[randomColor]}))
        console.log(this.state.myColors[randomColor])
    }
  }

  componentWillUnmount() {
    console.log('will unamount')
  }

  render() {
    return (
      <div className="App" style={{backgroundColor:this.state.theColor}}>
        <Quotes quote = {this.state.quote}
          onGetNewQuote = {this.onGetNewQuote}
          theColor = {this.state.theColor}
        />
      </div>
    )
  }
}



  const Quotes =(props) => {
    const styles = {
      backgroundStyle: {
        backgroundColor:props.theColor
      },
        colorStyle: {
          color: props.theColor
      }
  };

  const {backgroundStyle, colorStyle} = styles;
    return (
      <article id="quote-box" className="container">
        <div className="card">
          <div className="card-body card-info" style={colorStyle}>
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
              style={backgroundStyle}
            >
              New quote
            </button>
          </div>
        </div>

      </article>
    )
  }
export default App;
