import React, { Component } from "react";
import SushiContainer from "./containers/SushiContainer";
import Table from "./containers/Table";

// Endpoint!
const API = "http://localhost:3000/sushis";

class App extends Component {
  state = {
    allSushi: [],
    sushiCount: 4,
    eatenSushi: [],
    currentBalance: 195,
  };
  async componentDidMount() {
    let response = await fetch(API);
    let data = await response.json();
    this.setState({ allSushi: data });
  }

  displayLimitedSushi = () => {
    return this.state.allSushi.slice(
      this.state.sushiCount - 4,
      this.state.sushiCount
    );
  };

  handlesMoreSushi = () => {
    if (this.state.sushiCount + 4 > this.state.allSushi.length) {
      this.setState({ sushiCount: 4 });
    } else {
      this.setState({
        sushiCount: this.state.sushiCount + 4,
      });
    }
  };

  removesSushi = (id) => {
    const theEatenSushi = this.state.allSushi.find((s) => {
      return s.id === id && !s.isEaten;
    });
    if (!theEatenSushi) {
      return;
    }
    const newBalance = this.state.currentBalance - theEatenSushi.price;
    if (newBalance < 0) {
      return;
    }
    this.setState({
      currentBalance: newBalance,
      eatenSushi: [...this.state.eatenSushi, theEatenSushi],
      allSushi: this.state.allSushi.map((sushi) => {
        if (sushi.id !== id) {
          return sushi;
        }
        return {
          ...sushi,
          isEaten: true,
        };
      }),
    });
  };

  render() {
    return (
      <div className="app">
        <SushiContainer
          allSushi={this.displayLimitedSushi()}
          handlesMoreSushi={this.handlesMoreSushi}
          removesSushi={this.removesSushi}
        />
        <Table
          eatenSushi={this.state.eatenSushi}
          currentBalance={this.state.currentBalance}
        />
      </div>
    );
  }
}

export default App;
