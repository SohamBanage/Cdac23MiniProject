import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CURD = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //add new form
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isActive, setIsActive] = useState(0);

  //Edit form
  const [editID, setEditID] = useState("");
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editIsActive, setEditIsActive] = useState(0);

  const empdata = [
    {
      id: 1,
      name: "Soham",
      age: 24,
      isActive: 1,
    },
    {
      id: 2,
      name: "Lalit",
      age: 23,
      isActive: 1,
    },
    {
      id: 3,
      name: "Ritu",
      age: 24,
      isActive: 1,
    },
  ];

  const [data, setData] = useState([]);
  useEffect(() => {
    getdata();
  }, []);

  const getdata=()=>(
    axios.get("http://localhost:5036/api/Employees")
    .then((result)=>{
      setData(result.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  )

  const handelEdit = (id) => {
    handleShow();
    axios.get(`http://localhost:5036/api/Employees/${id}`)
     .then((result)=>{
      setEditName(result.data.name);
      setEditAge(result.data.age);
      setEditIsActive(result.data.isActive);
      setEditID(id);
    })
    .catch((error)=>{
      console.log(error)
    })
  };

  const handelDelete = (id) => {
    if (window.confirm("Are you sure to delete this employee") == true) {
      axios.delete(`http://localhost:5036/api/Employees/${id}`)
      .then((result)=>{
        if(result.status === 200)
        {
            toast.success(`Employee has been delete`);
            getdata();
        }
      })
      .catch((error)=>{
        toast.error(error);
      })
    }
  };

  const handleUpdate = (id) => {
    const url=`http://localhost:5036/api/Employees/${editID}`;
    const data ={
      "id":editID,
      "name":editName,
      "age":editAge,
      "isActive":editIsActive,
    }
    axios.put(url,data)
    .then((result)=>{
      getdata();
      clear();
      toast.success('Employee has been updated');
    }).catch((error)=>{
      toast.success(error);
    }).catch((error)=>{
      toast.error(error);
    })

  };


  const handleSave=()=>{
    const url="http://localhost:5036/api/Employees";
    const data ={
      "name":name,
      "age":age,
      "isActive":isActive
    }
    axios.post(url,data)
    .then((result)=>{
      getdata();
      clear();
      toast.success('Employee has been added');
    }).catch((error)=>{
      toast.success(error);
    }).catch((error)=>{
      toast.error(error);
    })
  }
  const clear=()=>{
    setName('');
    setAge('');
    setIsActive(0);
    setEditName('');
    setEditAge('');
    setEditIsActive(0);
    setEditID('');
  }

  const handelActiveChange =(e)=>{
    if(e.target.checked){
      setIsActive(1);
    }
    else{
      setIsActive(0);
    }
  }

  const handelEditActiveChange =(e)=>{
    if(e.target.checked){
      setIsActive(1);
    }
    else{
      setIsActive(0);
    }
  }

 
  return (
    <Fragment>
      <ToastContainer/>
      <Container>
        <Row>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="checkbox"
              checked={isActive === 1 ? true : false}
              onChange={(e) => handelActiveChange(e)}
              value={editIsActive}
            />
            <label>IsActive</label>
          </Col>
          <Col>
            <button className="btn btn-primary" onClick={()=>handleSave()}>Submit</button>
          </Col>
        </Row>
      </Container>
      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>IsActive</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0
            ? data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.isActive}</td>
                    <td colSpan={2}>
                      <button
                        className="btn btn-primary"
                        onClick={() => handelEdit(item.id)}
                      >
                        Edit
                      </button>
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => handelDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : "Loading...."}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify / Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Age"
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="checkbox"
                checked={editIsActive === 1 ? true : false}
                onChange={(e) => handelEditActiveChange(e)}
                value={isActive}
              />
              <label>IsActive</label>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};
export default CURD;
