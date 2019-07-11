import React from "react";
import "../App.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      toDoItemList: [],
      doneToDoItemList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handelDelete = this.handelDelete.bind(this);
    this.handelKeyPress = this.handelKeyPress.bind(this);
    this.handelDone = this.handelDone.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  addToDoItem = () => {
    if (this.state.value != "") {
      this.setState({
        value: "",
        toDoItemList: [...this.state.toDoItemList, this.state.value]
      });
    }
  };
  handelDelete(index) {
    this.state.toDoItemList.splice(index, 1);
    this.setState({
      toDoItemList: [...this.state.toDoItemList]
    });
  }
  handelKeyPress = e => {
    if (e.key === "Enter") {
      this.addToDoItem();
    }
  };
  handelDone(index) {
    this.state.doneToDoItemList.unshift(this.state.toDoItemList[index]);
    this.state.toDoItemList.splice(index, 1);
    this.setState({
      toDoItemList: [...this.state.toDoItemList],
      doneToDoItemList: [...this.state.doneToDoItemList]
    });
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <span>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            onKeyPress={this.handelKeyPress}
          />
        </span>
        <button onClick={this.addToDoItem}>add</button>
        <ul style={{ listStyleType: "none" }}>
          {this.state.toDoItemList.map((item, index) => (
            <li key={index}>
              <span>{item}</span>
              <button
                onClick={e => {
                  this.handelDone(index);
                }}
              >
                V
              </button>
              <button
                onClick={e => {
                  this.handelDelete(index);
                }}
              >
                X
              </button>
            </li>
          ))}
        </ul>
        {this.state.doneToDoItemList.length != 0 && (
          <div>
            <h1>Done ToDos</h1>
            <ul style={{ listStyleType: "none" }}>
              {this.state.doneToDoItemList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Header;
