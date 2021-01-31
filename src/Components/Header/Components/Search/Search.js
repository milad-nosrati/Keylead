import React, { Component } from "react";
import {  
          Form, 
          FormGroup, 
          Col  , 
          Input , 
          InputGroup, 
          InputGroupAddon, 
          InputGroupText} from "reactstrap";


export class Search extends Component {
  state = {
    searchPhrase: ""
  }
  handleChange =(e) => {
    this.setState({
      searchPhrase: e.target.value
    })
  }
  searchPhrase = () => {
    this.props.action ("search" , null, this.state.searchPhrase )
  };

  render() {
    return (
      <Form >
        <FormGroup row className="mb-0 w-6">
          <Col xs={12} >
          <InputGroup>
            <Input 
              className="search-input"
              type="search"
              id="QuickSearch"
              placeholder="Quick Search"
              aria-label="Quick Search"
              onChange={this.handleChange}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText id="search-icon" onClick={this.searchPhrase}>
                <span  className="fa fa-search" />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default Search;
