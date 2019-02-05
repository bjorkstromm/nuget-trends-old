import React, { Component } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar";
import Badge from "react-bootstrap/Badge";

interface AppState {
  packageIds: string[];
}

class App extends React.Component<any, AppState> {
  state: AppState = {
    packageIds: []
  };

  addPackageId = (packageId: string) => {
    this.setState(prevState => {
      return {
        packageIds: prevState.packageIds.concat([packageId])
      };
    });
    this.forceUpdate();
  };

  render() {
    const { packageIds } = this.state;
    return (
      <div className={"App container"}>
        <h1>NuGet Trends</h1>
        <SearchBar onSelected={this.addPackageId} />
        <hr />
        <div>
          {packageIds.map(x => (
            <Badge key={x} pill variant="primary" style={{ margin: "0px 5px" }}>
              {x}
            </Badge>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
