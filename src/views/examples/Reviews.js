import React, { useState, useEffect } from "react";
import { Container, Row, Card, CardHeader, Button, Modal, ModalHeader, ModalBody, Table, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Header from "components/Headers/Header.js";

const Tables = () => {
  const navigate = useNavigate();
  const loggedIn = sessionStorage.getItem("loggedIn");
  if (loggedIn !== "true") {
    navigate("/auth/login");
  }

  const [reviews, setReviews] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    rating: "",
    title: "",
    review: "",
    u_id: "",
    id: "",
    username: "",
  });

  const fetchReviews = () => {
    fetch(`https://backend.alainstore.in/Get/AllReview`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDeleteReview = (orderId) => {
    fetch(`https://backend.alainstore.in/Delete/Review/${orderId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchReviews();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleSubmit = () => {
    fetch(`https://backend.alainstore.in/Add/FakeReview`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Review Posted.') {
          toggleModal();
        }
        fetchReviews();
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="row">
                  <div className="col-11">
                    <h3 className="mb-0">Product Review List</h3>
                  </div>
                  <div className="col-1">
                    <Form role="form" >
                      <Modal isOpen={modalIsOpen} toggle={toggleModal}>
                        <ModalHeader toggle={toggleModal}>Add Review</ModalHeader>
                        <ModalBody>
                          <FormGroup>
                            <Label for="id">Product ID</Label>
                            <Input
                              type="text"
                              name="id"
                              id="id"
                              value={formData.id}
                              onChange={handleChange}
                              required
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label for="u_id">User ID</Label>
                            <Input
                              type="text"
                              name="u_id"
                              id="u_id"
                              value={formData.u_id}
                              onChange={handleChange}
                              required
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                              type="text"
                              name="username"
                              id="username"
                              value={formData.username}
                              onChange={handleChange}
                              required
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label for="rating">Rating</Label>
                            <Input
                              type="number"
                              name="rating"
                              id="rating"
                              min="1" max="5"
                              value={formData.rating}
                              onChange={handleChange}
                              required
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                              type="text"
                              name="title"
                              id="title"
                              value={formData.title}
                              onChange={handleChange}
                              required
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label for="review">Review</Label>
                            <Input
                              type="textarea"
                              name="review"
                              id="review"
                              value={formData.review}
                              onChange={handleChange}
                              required
                            />
                          </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={handleSubmit}>
                            Submit Review
                          </Button>{" "}
                          <Button color="secondary" onClick={toggleModal}>
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </Form>
                    <Button color="primary" size="sm" onClick={toggleModal}>
                      Add Review
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Product Id</th>
                    <th scope="col">User Id</th>
                    <th scope="col">Username Name</th>
                    <th scope="col">Rating</th>
                    <th scope="col">title</th>
                    <th scope="col">date</th>
                    <th scope="col">review</th>
                    <th scope="col">Images</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <tr key={review.o_id}>
                        <td>{review.id}</td>
                        <td>{review.u_id}</td>
                        <td>{review.username}</td>
                        <td>{review.rating}</td>
                        <td>{review.title}</td>
                        <td>{review.date}</td>
                        <td>{review.review}</td>
                        <td>
                          <div className="avatar-group">
                            {review.images.map((image, i) => (
                              <a className="avatar avatar-sm" href={`https://backend.alainstore.in/uploads/${image}`} target="_blank" id={`tooltip742438047_${i}`} onClick={(e) => e.preventDefault()} key={i} >
                                <img alt="..." height="30px" width="30px" src={`https://backend.alainstore.in/uploads/${image}`} />
                              </a>
                            ))}
                          </div>
                        </td>
                        <td>
                          <Button color="danger" size="sm" onClick={() => handleDeleteReview(review.r_id)}>Delete</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">No Review Available.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
