import React, { Component } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar";
import { nugetSearch, SearchResult } from "./services/nugetService";
import PackageCard from "./components/PackageCard";

interface AppState {
  packageIds: string[];
  packages: SearchResult[];
}

const max = 4;
const variants = ["primary", "success", "danger", "warning"];

class App extends React.Component<any, AppState> {
  state: AppState = {
    packageIds: [],
    packages: []
  };

  addPackageId = (packageId: string) => {
    this.setState(prevState => {
      return {
        packageIds: prevState.packageIds.concat([packageId])
      };
    });

    const that = this;
    setTimeout(async () => {
      that.addPackage(await nugetSearch(packageId));
    }, 100);
  };

  addPackage = (item: SearchResult) => {
    this.setState(prevState => {
      return {
        packages: prevState.packages.concat([item])
      };
    });
  };

  render() {
    const { packageIds } = this.state;
    return (
      <div className={"App container"}>
        <h1>NuGet Trends</h1>
        <SearchBar onSelected={this.addPackageId} />
        <hr />
        <div>
          {packageIds.map((value, index) => (
            <PackageCard
              key={value}
              backGround={variants[index]}
              packageId={value}
              metadata={this.state.packages.find(x => {
                return x.id.toLowerCase() === value.toLowerCase();
              })}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
