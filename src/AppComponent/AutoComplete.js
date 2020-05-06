import React, { Component } from "react";
import "./AutoComplete.css"

export class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: null
    };
  }

  onChange = e => {
    if(this.props.suggestions) {
        const inputValue = e.currentTarget.value;
        const suggestions = this.props.suggestions;
        const checkSugesstionValue = suggestions.findIndex((value) => value == inputValue);
        const userInput = checkSugesstionValue !== -1 ? this.props.suggestionsValue[checkSugesstionValue] : inputValue;

        const filteredSuggestions = suggestions.filter(
        suggestion =>
            suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
        );

        this.setState({
        activeSuggestion: 0,
        filteredSuggestions,
        showSuggestions: true,
        userInput: inputValue
        });
        this.props.handleChange(userInput)
        if(this.props.getIndex){
            this.props.getIndex(checkSugesstionValue)
        }
    }
  };

  onClick = e => {
    if(this.props.suggestions){
        const inputValue = e.currentTarget.innerText;
        const suggestions = this.props.suggestions;
        const checkSugesstionValue = suggestions.findIndex((value) => value == inputValue);
        const userInput = this.props.suggestionsValue[checkSugesstionValue];
        this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: inputValue
        });
        this.props.handleChange(userInput, this.props.suggestions[checkSugesstionValue])
        if(this.props.getIndex){
            this.props.getIndex(checkSugesstionValue)
        }
    }
    
  };
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;
    let suggestionsListComponent;
    if ((showSuggestions && userInput) && this.props.suggestions) {
      if ((filteredSuggestions.length > 0) && this.props.suggestions) {
        suggestionsListComponent = (
          <ul class="suggestions" style={this.props.listBoxStyle ? this.props.listBoxStyle : null}>
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              if (index === activeSuggestion) {
                className = "";
              }

              return (
                <li className="li" key={suggestion} onClick={onClick} style={this.props.listStyle ? this.props.listStyle : null}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions</em>
          </div>
        );
      }
    }

    return (
      <React.Fragment>
        <input
          type="autosearch "
          className={this.props.className ? this.props.className : "input form-input pecs default-box-height"} 
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput ? userInput : this.props.defaultValue}
          style={this.props.inputStyle ? this.props.inputStyle : null}
          placeholder={this.props.placeHolder ? this.props.placeHolder : null}
          tabIndex={this.props.tabIndex ? this.props.tabIndex : null}
        />
        {suggestionsListComponent}
        <label className={"closeAutoComplete " + (showSuggestions ? "" : "d-none")} onClick={() => this.setState({ showSuggestions: false })}></label>
      </React.Fragment>
    );
  }
}

export default Autocomplete;
