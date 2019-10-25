import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

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
      <div className="app" style={{backgroundColor:this.state.theColor}}>
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
      <div className="container quote-wrapper">
        <div className="row">
          <div className="col-sm-10 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <article  id="quote-box" >
              <div className="quote" style={colorStyle}>
                <q id="text">
                  {props.quote.content}
                </q>
                <p id="author">
                  {props.quote.author}
                </p>
              </div>
              <div className="quote-buttons">
                <a href="#a" className="card-link" id="facebook-quote" style={colorStyle}>
                  <FontAwesomeIcon icon={['fab', 'facebook']} size="lg" />
                </a>
                <a href={"https://twitter.com/intent/tweet?text="+ props.quote.content + props.quote.author} className="card-link" 
                    id="tweet-quote" style={colorStyle}
                    target="_blank" rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={['fab', 'twitter']} size="lg" />
                </a>
                <button 
                  onClick={props.onGetNewQuote}
                  id="new-quote"
                  style={backgroundStyle}
                >
                  New quote
                </button>
              </div>
            </article>
            </div>
        </div>
      </div>
    )
  }
export default App;
