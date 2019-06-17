import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './main.css';

function Quote(props) {
    return (
        <div id="full-quote">
            <p id="text">{props.text}</p>
            <p id="author">{props.author}</p>
        </div>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: null,
            author: null
        };

        this.handleQuoteClick = this.handleQuoteClick.bind(this);
    }

    // Quote API thanks to https://github.com/lukePeavey/quota
    handleQuoteClick() {
        fetch('https://quota.glitch.me/random')
        .then(response => response.json())
        .then(data => {
          this.setState({
              text: "\"" + data.quoteText + "\"",
              author: '-' + data.quoteAuthor
          });
        });
    }

    componentDidMount() {
        this.handleQuoteClick();
    }

    makeLink(text, author) {
        return "twitter.com/intent/tweet?text=" + text + " -" + author;
    }

    render() {
        return (
            <div id="quote-box">
                <Quote text={this.state.text} author={this.state.author} />
                <a href={this.makeLink(this.state.text, this.state.author)} id="tweet-quote" class="button">Tweet Quote</a>
                <a href="#quote-box" id="new-quote" onClick={this.handleQuoteClick} class="button">New Quote</a>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));