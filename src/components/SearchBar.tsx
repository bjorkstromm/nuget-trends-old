import React from "react";
import Autocomplete from "react-autocomplete";
import ListGroup from "react-bootstrap/ListGroup";

import { nugetAutoComplete } from "../services/nugetService";

interface SearchBarProps {
  onSelected(packageId: string): void;
}
interface SearchBarState {
  value: string;
  packages: string[];
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  state: SearchBarState = {
    value: "",
    packages: []
  };

  render() {
    const { onSelected } = this.props;
    return (
      <Autocomplete
        inputProps={{
          id: "packageId-autocomplete",
          className: "form-control",
          placeholder: "Search NuGet package."
        }}
        wrapperStyle={{
          position: "relative",
          display: "inline-block",
          width: "100%"
        }}
        getItemValue={item => item}
        items={this.state.packages}
        menuStyle={{ textAlign: "left" }}
        renderMenu={(items, value, styles) => (
          <ListGroup style={{ ...styles }} children={items} />
        )}
        renderItem={(item, isHighlighted) => (
          <ListGroup.Item
            key={item}
            active={isHighlighted}
            style={{ textAlign: "left" }}
            className="py-0"
          >
            {item}
          </ListGroup.Item>
        )}
        value={this.state.value}
        onChange={async e => {
          this.setState({ value: e.target.value });
          this.setState({
            packages: await nugetAutoComplete(e.target.value)
          });
        }}
        onSelect={(value, item) => {
          this.setState({ value: "", packages: [] });
          onSelected(value);
        }}
      />
    );
  }
}

export default SearchBar;
