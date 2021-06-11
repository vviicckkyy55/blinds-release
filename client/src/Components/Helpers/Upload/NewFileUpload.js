import React, { Component } from "react";
import axios from "axios";

import { Card, CardHeader, CardText, CardBody, Row, Col, Progress } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


class NewFileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      selectedFile: null
    };
  }

  handleSelectedFile = e => {
    e.preventDefault();
    this.setState({
      description: e.target.value,
      selectedFile: e.target.files[0]
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleUpload = event => {
    event.preventDefault();
    const data = new FormData(event.target);
    data.append("file", this.state.selectedFile);

    axios
      .post("http://localhost:3333/api/uploadFile", data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
          }
      }, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total * 100)
          });
        }
      })
      .then((res) => {
        toast.success('Upload Successful');
        this.props.history.push("/");
      })
      .catch(error => {
        toast.error(`Upload Fail with status: ${error.statusText}`)
        alert("Oops some error happened, please try again");
      });
  };

  render() {
    const { description, selectedFile } = this.state;

    return (
      <div>
        <Row>
          <Col xs="4">
            <Card>
              <CardHeader className="p-2 mb-2 bg-primary text-white">
                Upload a new Document
              </CardHeader>
              <CardBody>
              <ToastContainer position="right" />
                <CardText>
                  <form onSubmit={this.handleUpload}>
                    <div className="form-group">
                      <label htmlFor="description">Description:</label>
                      <input
                        type="text"
                        class="form-control"
                        name="description"
                        onChange={this.onChange}
                        placeholder="Description"
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={this.handleSelectedFile}
                      />
                    </div>
                    <Progress max="100" color="success" value={this.state.loaded} className="mt-4 mb-1">
                      {isNaN(Math.round(this.state.loaded, 2)) ? 0 : Math.round(this.state.loaded, 2)}%
                    </Progress>
                    <button type="submit" class="btn btn-primary">
                      Upload
                    </button>
                  </form>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NewFileUpload;