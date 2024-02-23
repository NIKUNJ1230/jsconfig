import { Card, CardHeader, Table, Container, Row, Button } from "reactstrap";
import Header from "components/Headers/Header.js";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Tables = () => {
  const navigate = useNavigate();
  const loggedIn = sessionStorage.getItem("loggedIn");
  if (loggedIn !== "true") {
    navigate("/auth/login");
  }
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    let statusQueryParam = "";
    let dateQueryParam = "";

    if (selectedStatus !== "all") {
      statusQueryParam = `status=${selectedStatus}`;
    }

    if (selectedDate) {
      // Adjust the date to UTC midnight to avoid timezone issues
      const adjustedDate = new Date(
        Date.UTC(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate()
        )
      );

      const formattedDate = adjustedDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      dateQueryParam = `date=${formattedDate}`;
    }

    const queryParams = [statusQueryParam, dateQueryParam].filter(Boolean).join("&");

    fetch(`https://backend.alainstore.in/Get/All/Order?${queryParams}`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedStatus, selectedDate]);

  const handleApproveOrRejectOrder = (orderId, status) => {
    // Send a PUT request to update the order status (approve or reject)
    fetch(`https://backend.alainstore.in/Approvement/Order/${orderId}/${status}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        // Refresh the order list after approval or rejection
        fetch(`https://backend.alainstore.in/Get/All/Order`)
          .then((response) => response.json())
          .then((updatedData) => {
            setOrders(updatedData);
          })
          .catch((error) => {
            console.error("Error fetching updated data:", error);
          });
      })
      .catch((error) => {
        console.error(
          `${status === "approve" ? "Approving" : "Rejecting"} order error:`,
          error
        );
      });
  };

  const renderOrdersByDay = () => {
    let currentDate = null;

    return orders.map((order, index) => {
      const date = new Date(order.created_at).toLocaleDateString();

      // Check if the date has changed or it's the first row
      if (date !== currentDate || index === 0) {
        currentDate = date;
        return (
          <React.Fragment key={`date-${date}`}>
            <tr style={{ color: "red" }}>
              <td colSpan="9" style={{ fontWeight: "bold" }}>
                {date}
              </td>
            </tr>
            <tr key={order.o_id}>
              <td>{order.o_id}</td>
              <td>{order.id}</td>
              <td>{order.product_names}</td>
              <td>{order.quantities}</td>
              <td>
                <span>
                  {new Date(order.created_at).toLocaleString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZone: 'UTC'
                  })}{' '}
                  {new Date(order.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </span>
              </td>
              <td>{order.subamounts}</td>
              <td>{order.total_amount}</td>
              <td
                style={{
                  color:
                    order.approved === 1
                      ? "#42f321"
                      : order.approved === 2
                        ? "#FF3534"
                        : "#ffac10",
                }}
              >
                {order.approved === 1
                  ? "Approved"
                  : order.approved === 2
                    ? "Rejected"
                    : "Pending"}
              </td>
              <td>
                {order.approved === 0 && (
                  <>
                    <Button
                      color="success"
                      size="sm"
                      onClick={() => handleApproveOrRejectOrder(order.o_id, "approve")}
                    >
                      Approve
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => handleApproveOrRejectOrder(order.o_id, "reject")}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </td>
            </tr>
          </React.Fragment>
        );
      }

      return (
        <tr key={order.o_id}>
          <td>{order.o_id}</td>
          <td>{order.id}</td>
          <td>{order.product_names}</td>
          <td>{order.quantities}</td>
          <td>
            <span>
              {new Date(order.created_at).toLocaleString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'UTC'
              })}{' '}
              {new Date(order.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })}
            </span>
          </td>
          <td>{order.subamounts}</td>
          <td>{order.total_amount}</td>
          <td
            style={{
              color:
                order.approved === 1
                  ? "#42f321"
                  : order.approved === 2
                    ? "#FF3534"
                    : "#ffac10",
            }}
          >
            {order.approved === 1
              ? "Approved"
              : order.approved === 2
                ? "Rejected"
                : "Pending"}
          </td>
          <td>
            {order.approved === 0 && (
              <>
                <Button
                  color="success"
                  size="sm"
                  onClick={() => handleApproveOrRejectOrder(order.o_id, "approve")}
                >
                  Approve
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleApproveOrRejectOrder(order.o_id, "reject")}
                >
                  Reject
                </Button>
              </>
            )}
          </td>
        </tr>
      );
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
                  <div className="col-8">
                    <h3 className="mb-0">Order List</h3>
                  </div>
                  <div className="col-3">
                    <div className="d-flex">
                      <DatePicker
                        className="form-control-alternative px-2 py-2 rounded ml-5 mr-4" // Added mr-2 for right margin
                        selected={selectedDate}
                        onChange={handleDateChange}
                        placeholderText="Select Date"
                        isClearable
                      />
                      <select
                        className="form-control-alternative px-2 py-2 rounded ml-2"
                        aria-label="Small select example"
                        value={selectedStatus}
                        onChange={handleStatusChange}
                      >
                        <option value="all">All Orders</option>
                        <option value="0">Pending Orders</option>
                        <option value="1">Confirmed Orders</option>
                        <option value="2">Rejected Orders</option>
                      </select>
                    </div>
                  </div>

                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Order Id</th>
                    <th scope="col">Product Id</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantities</th>
                    <th scope="col">Time</th>
                    <th scope="col">SubTotal</th>
                    <th scope="col">TotalAmount</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    renderOrdersByDay()
                  ) : (
                    <tr>
                      <td colSpan="9">No orders available.</td>
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
