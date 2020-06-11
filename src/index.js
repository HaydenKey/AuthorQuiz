import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import {shuffle, sample} from 'underscore';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Mark_Twain_by_AF_Bradley.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'AF Bradley',
    books: [
      'The Adventures of Huckleberry Finn',
      'Life on The Mississippi',
      'Roughing It'
    ]
  },
  {
    name: 'Joseph Conrad',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Joseph_Conrad%2C_Fotografie_von_George_Charles_Beresford%2C_1904.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'George Charles Beresford',
    books: ['Heart of Darkness']
  },
  {
    name: 'J.K. Rowling',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/J._K._Rowling_2010.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Daniel Orgen',
    books: ['Harry Potter and the Sourcers Stone']
  },
  {
    name: 'Stephen King',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Stephen_King%2C_Comicon.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Pinguino',
    books: ['The Shining', 'IT']
  },
  {
    name: 'Charles Dickens',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Charles_Dickens.png',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Wikimedia Commons',
    books: ['David Copperfeild', 'A Tale of Two Cities']
  },
  {
    name: 'William Shakespeare',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Shakespeare_Droeshout_1623.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Wikimedia Commons',
    books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
  },
];

function getTurnData(authors) {
  const allBooks = authors.reduce(function (p, c, i) {
    return p.concat(c.books);
  }, []);

  const fourRandomBooks = shuffle(allBooks).slice(0,4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find((author) => 
      author.books.some((title) => 
        title === answer
      )
    )
  }
}

function resetState() {
  return {
    turnData: getTurnData(authors),
    highlight: ''
  }
}

let state = resetState();

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}

function App() {
  return <AuthorQuiz {...state} 
    onAnswerSelected={onAnswerSelected}
    onContinue={() => {
      state = resetState();
      render();
    }}
  />
}

const AuthorWrapper = withRouter(({ history }) =>
  <AddAuthorForm onAddAuthor={(author) => {
    authors.push(author);
    history.push('/');
  }} />
);

function render() {
  ReactDOM.render(
  <BrowserRouter>
    <React.Fragment>
      <Route exact path="/" component={App} />
      <Route path="/add" component={AuthorWrapper}/>
    </React.Fragment>
  </BrowserRouter>, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
render();
serviceWorker.unregister();
