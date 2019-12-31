import React, { Component } from "react";
import "./assets/style.css";
import quizService from "./quizService/index";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";
export class App extends Component {
  state = {
    questionBank: [],
    score: 0,
    responses: 0
  };
  componentDidMount() {
    this.getQuestion();
  }
  getQuestion = () => {
    quizService().then(question => {
      this.setState({ questionBank: question });
    });
  };
  computeAnswer = (answer, correct) => {
    if (answer === correct) {
      this.setState({ score: this.state.score + 1 });
    }
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5
    });
  };
  playAgain = () => {
    this.setState({ questionBank: [], score: 0, responses: 0 });
    this.getQuestion();
  };
  render() {
    return (
      <>
        <div className="container">
          <div className="title">Quiz App</div>
          {this.state.questionBank.length > 0 &&
            this.state.responses < 5 &&
            this.state.questionBank.map(
              ({ question, answers, correct, questionId }) => (
                <QuestionBox
                  key={questionId}
                  question={question}
                  options={answers}
                  selected={answer => this.computeAnswer(answer, correct)}
                />
              )
            )}
          {this.state.responses === 5 && (
            <Result score={this.state.score} playAgain={this.playAgain} />
          )}
        </div>
      </>
    );
  }
}

export default App;
