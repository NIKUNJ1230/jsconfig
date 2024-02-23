import { Line, Bar } from "react-chartjs-2";
import { Button, Card, CardHeader, CardBody, Progress, Table, Container, Row, Col } from "reactstrap";
import Header from "components/Headers/Header.js";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Index = () => {
  const navigate = useNavigate();
  const loggedIn = sessionStorage.getItem("loggedIn");
  if (loggedIn !== "true") {
    navigate("/auth/login");
  }
  const [monthlyData, setMonthlyData] = useState({});
  const [monthlyOrders, setMonthlyOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Fetch data from the API for total sales
    fetch("https://backend.alainstore.in/Get/salesData")
      .then((response) => response.json())
      .then((apiData) => {
        // Process the API data to group and aggregate by month
        const monthlySales = {};
        const monthlyOrdersData = [];

        apiData.forEach((item) => {
          const date = new Date(item.created_at);
          const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

          // Group by month
          if (monthlySales[monthKey]) {
            monthlySales[monthKey] += item.total_amount;
          } else {
            monthlySales[monthKey] = item.total_amount;
          }

          // Group by month for total orders
          const monthOrderItem = monthlyOrdersData.find((order) => order.month === monthKey);
          if (monthOrderItem) {
            monthOrderItem.totalOrders += 1;
          } else {
            monthlyOrdersData.push({ month: monthKey, totalOrders: 1 });
          }
        });

        setMonthlyData(monthlySales);
        setMonthlyOrders(monthlyOrdersData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Fetch data from the API for orders
    fetch("https://backend.alainstore.in/Get/All/Order?status=0")
      .then((response) => response.json())
      .then((apiData) => {
        setOrders(apiData);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });

      fetch("https://backend.alainstore.in/Get/All/Product/Dashboard")
    .then((response) => response.json())
    .then((apiData) => {
      setProducts(apiData);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
  }, []);


  const handleApproveOrRejectOrder = (orderId, status) => {
    // Send a PUT request to update the order status (approve or reject)
    fetch(`https://backend.alainstore.in/Approvement/Order/${orderId}/${status}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        // Refresh the order list after approval or rejection
        fetch("https://backend.alainstore.in/Get/All/Order?status=0")
      .then((response) => response.json())
      .then((apiData) => {
        setOrders(apiData);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
      })
      .catch((error) => {
        console.error(
          `${status === "approve" ? "Approving" : "Rejecting"} order error:`,
          error
        );
      });
  };



  const chartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: "Total Sales (Monthly)",
        data: Object.values(monthlyData),
        fill: false,
        borderColor: "rgb(17, 199, 239)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
          displayFormats: {
            month: "MMM YYYY",
          },
        },
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Sales",
        },
      },
    },
  };

  const containerStyle = {
    backgroundColor: "#ffffff",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
  };

  const chartExample2Data = {
    labels: monthlyOrders.map((item) => item.month),
    datasets: [
      {
        label: "Total Orders (Monthly)",
        data: monthlyOrders.map((item) => item.totalOrders),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const chartExample2Options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
          displayFormats: {
            month: "MMM YYYY",
          },
        },
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Orders",
        },
      },
    },
    // Set height to 100% of the div
    maintainAspectRatio: false,
    aspectRatio: 1,
  };

  const handleOrders = () => {
    navigate('/admin/Orders', { replace: true });
  }
  const handleProducts = () => {
    navigate('/admin/Products', { replace: true });
  }

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0 p-4" xl="8" style={containerStyle}>
            <h6 className="text-uppercase text-muted ls-1 mb-1">
              Total Selling / Month
            </h6>
            <div className="chart-container">
              {Object.keys(monthlyData).length > 0 ? (
                <Line data={chartData} options={chartOptions} />
              ) : (
                <p>Loading data...</p>
              )}
            </div>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Total orders / Month
                    </h6>
                    <h2 className="mb-0">Total orders</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Bar data={chartExample2Data} options={chartExample2Options} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Pending Orders</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={handleOrders}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    {/* <th scope="col">Order Id</th> */}
                    <th scope="col">Product Id</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantities</th>
                    <th scope="col">Time</th>
                    {/* <th scope="col">SubTotal</th> */}
                    <th scope="col">TotalAmount</th>
                    {/* <th scope="col">Status</th> */}
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.o_id}>
                      <th scope="row">{order.id}</th>
                      {/* <td>{order.u_id}</td> */}
                      <td>{order.product_names}</td>
                      <td>{order.quantities}</td>
                       <td>{order.created_at}</td>
                     {/* <td>{order.subamounts}</td> */}
                      <td>{order.total_amount}</td>
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
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col">
                  <h3 className="mb-0">Products</h3>
                </div>
                <div className="col text-right">
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={handleProducts}
                    size="sm"
                  >
                    See all
                  </Button>
                </div>
              </Row>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">MRP</th>
                  <th scope="col">Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <th scope="row">{product.id}</th>
                    <td>{product.productname}</td>
                    <td>{product.mrp}</td>
                    <td>{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;




// import { Line, Bar } from "react-chartjs-2";
// import { Button, Card, CardHeader, CardBody, Progress, Table, Container, Row, Col } from "reactstrap";

// // core components
// import { chartExample2 } from "variables/charts.js";
// import Header from "components/Headers/Header.js";
// import React, { useEffect, useState } from "react";

// const Index = () => {
//   const [monthlyData, setMonthlyData] = useState({});

//   useEffect(() => {
//     // Fetch data from the API
//     fetch("https://backend.alainstore.in/Get/salesData")
//       .then((response) => response.json())
//       .then((apiData) => {
//         // Process the API data to group and aggregate by month
//         const monthlySales = {};

//         apiData.forEach((item) => {
//           const date = new Date(item.created_at);
//           const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

//           // Group by month
//           if (monthlySales[monthKey]) {
//             monthlySales[monthKey] += item.total_amount;
//           } else {
//             monthlySales[monthKey] = item.total_amount;
//           }
//         });

//         setMonthlyData(monthlySales);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   const chartData = {
//     labels: Object.keys(monthlyData),
//     datasets: [
//       {
//         label: "Total Sales (Monthly)",
//         data: Object.values(monthlyData),
//         fill: false,
//         borderColor: "rgb(17, 199, 239)",
//         borderWidth: 2,
//       },
//     ],
//   };

//   const chartOptions = {
//     scales: {
//       x: {
//         type: "time",
//         time: {
//           unit: "month",
//           displayFormats: {
//             month: "MMM YYYY",
//           },
//         },
//         title: {
//           display: true,
//           text: "Month",
//         },
//       },
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: "Total Sales",
//         },
//       },
//     },
//   };

//   const containerStyle = {
//     backgroundColor: "#ffffff",
//     Color:"white",
//     padding: "10px",
//     borderRadius: "5px",
//   };

//   return (
//     <>
//       <Header />
//       <Container className="mt--7" fluid>
//         <Row>
//           <Col className="mb-5 mb-xl-0" xl="8" style={containerStyle}>
//             <div className="chart-container">
//               {Object.keys(monthlyData).length > 0 ? (
//                 <Line data={chartData} options={chartOptions} />
//               ) : (
//                 <p>Loading data...</p>
//               )}
//             </div>
//           </Col>
//           <Col xl="4">
//             <Card className="shadow">
//               <CardHeader className="bg-transparent">
//                 <Row className="align-items-center">
//                   <div className="col">
//                     <h6 className="text-uppercase text-muted ls-1 mb-1">
//                       Performance
//                     </h6>
//                     <h2 className="mb-0">Total orders</h2>
//                   </div>
//                 </Row>
//               </CardHeader>
//               <CardBody>
//                 <div className="chart">
                
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Index;







/*

table page 


  <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Page visits</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Page name</th>
                    <th scope="col">Visitors</th>
                    <th scope="col">Unique users</th>
                    <th scope="col">Bounce rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">/argon/</th>
                    <td>4,569</td>
                    <td>340</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/index.html</th>
                    <td>3,985</td>
                    <td>319</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/charts.html</th>
                    <td>3,513</td>
                    <td>294</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      36,49%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/tables.html</th>
                    <td>2,050</td>
                    <td>147</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/profile.html</th>
                    <td>1,795</td>
                    <td>190</td>
                    <td>
                      <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Social traffic</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>1,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>



*/











// import { useState } from "react";
// // node.js library that concatenates classes (strings)
// import classnames from "classnames";
// // javascipt plugin for creating charts
// import Chart from "chart.js";
// // react plugin used to create charts
// import { Line, Bar } from "react-chartjs-2";
// // reactstrap components
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   NavItem,
//   NavLink,
//   Nav,
//   Progress,
//   Table,
//   Container,
//   Row,
//   Col,
// } from "reactstrap";

// // core components
// import {
//   chartOptions,
//   parseOptions,
//   chartExample1,
//   chartExample2,
// } from "variables/charts.js";

// import Header from "components/Headers/Header.js";

// const Index = (props) => {
//   const [activeNav, setActiveNav] = useState(1);
//   const [chartExample1Data, setChartExample1Data] = useState("data1");

//   if (window.Chart) {
//     parseOptions(Chart, chartOptions());
//   }

//   const toggleNavs = (e, index) => {
//     e.preventDefault();
//     setActiveNav(index);
//     setChartExample1Data("data" + index);
//   };
//   return (
//     <>
//       <Header />
//       {/* Page content */}
//       <Container className="mt--7" fluid>
//         <Row>
//           <Col className="mb-5 mb-xl-0" xl="8">
//             <Card className="bg-gradient-default shadow">
//               <CardHeader className="bg-transparent">
//                 <Row className="align-items-center">
//                   <div className="col">
//                     <h6 className="text-uppercase text-light ls-1 mb-1">
//                       Overview
//                     </h6>
//                     <h2 className="text-white mb-0">Sales value</h2>
//                   </div>
//                   <div className="col">
//                     <Nav className="justify-content-end" pills>
//                       <NavItem>
//                         <NavLink
//                           className={classnames("py-2 px-3", {
//                             active: activeNav === 1,
//                           })}
//                           href="#pablo"
//                           onClick={(e) => toggleNavs(e, 1)}
//                         >
//                           <span className="d-none d-md-block">Month</span>
//                           <span className="d-md-none">M</span>
//                         </NavLink>
//                       </NavItem>
//                       <NavItem>
//                         <NavLink
//                           className={classnames("py-2 px-3", {
//                             active: activeNav === 2,
//                           })}
//                           data-toggle="tab"
//                           href="#pablo"
//                           onClick={(e) => toggleNavs(e, 2)}
//                         >
//                           <span className="d-none d-md-block">Week</span>
//                           <span className="d-md-none">W</span>
//                         </NavLink>
//                       </NavItem>
//                     </Nav>
//                   </div>
//                 </Row>
//               </CardHeader>
//               <CardBody>
//                 {/* Chart */}
//                 <div className="chart">
//                   <Line
//                     data={chartExample1[chartExample1Data]}
//                     options={chartExample1.options}
//                     getDatasetAtEvent={(e) => console.log(e)}
//                   />
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//           <Col xl="4">
//             <Card className="shadow">
//               <CardHeader className="bg-transparent">
//                 <Row className="align-items-center">
//                   <div className="col">
//                     <h6 className="text-uppercase text-muted ls-1 mb-1">
//                       Performance
//                     </h6>
//                     <h2 className="mb-0">Total orders</h2>
//                   </div>
//                 </Row>
//               </CardHeader>
//               <CardBody>
//                 {/* Chart */}
//                 <div className="chart">
//                   <Bar
//                     data={chartExample2.data}
//                     options={chartExample2.options}
//                   />
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//         <Row className="mt-5">
//           <Col className="mb-5 mb-xl-0" xl="8">
//             <Card className="shadow">
//               <CardHeader className="border-0">
//                 <Row className="align-items-center">
//                   <div className="col">
//                     <h3 className="mb-0">Page visits</h3>
//                   </div>
//                   <div className="col text-right">
//                     <Button
//                       color="primary"
//                       href="#pablo"
//                       onClick={(e) => e.preventDefault()}
//                       size="sm"
//                     >
//                       See all
//                     </Button>
//                   </div>
//                 </Row>
//               </CardHeader>
//               <Table className="align-items-center table-flush" responsive>
//                 <thead className="thead-light">
//                   <tr>
//                     <th scope="col">Page name</th>
//                     <th scope="col">Visitors</th>
//                     <th scope="col">Unique users</th>
//                     <th scope="col">Bounce rate</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <th scope="row">/argon/</th>
//                     <td>4,569</td>
//                     <td>340</td>
//                     <td>
//                       <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">/argon/index.html</th>
//                     <td>3,985</td>
//                     <td>319</td>
//                     <td>
//                       <i className="fas fa-arrow-down text-warning mr-3" />{" "}
//                       46,53%
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">/argon/charts.html</th>
//                     <td>3,513</td>
//                     <td>294</td>
//                     <td>
//                       <i className="fas fa-arrow-down text-warning mr-3" />{" "}
//                       36,49%
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">/argon/tables.html</th>
//                     <td>2,050</td>
//                     <td>147</td>
//                     <td>
//                       <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">/argon/profile.html</th>
//                     <td>1,795</td>
//                     <td>190</td>
//                     <td>
//                       <i className="fas fa-arrow-down text-danger mr-3" />{" "}
//                       46,53%
//                     </td>
//                   </tr>
//                 </tbody>
//               </Table>
//             </Card>
//           </Col>
//           <Col xl="4">
//             <Card className="shadow">
//               <CardHeader className="border-0">
//                 <Row className="align-items-center">
//                   <div className="col">
//                     <h3 className="mb-0">Social traffic</h3>
//                   </div>
//                   <div className="col text-right">
//                     <Button
//                       color="primary"
//                       href="#pablo"
//                       onClick={(e) => e.preventDefault()}
//                       size="sm"
//                     >
//                       See all
//                     </Button>
//                   </div>
//                 </Row>
//               </CardHeader>
//               <Table className="align-items-center table-flush" responsive>
//                 <thead className="thead-light">
//                   <tr>
//                     <th scope="col">Referral</th>
//                     <th scope="col">Visitors</th>
//                     <th scope="col" />
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <th scope="row">Facebook</th>
//                     <td>1,480</td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">60%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="60"
//                             barClassName="bg-gradient-danger"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">Facebook</th>
//                     <td>5,480</td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">70%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="70"
//                             barClassName="bg-gradient-success"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">Google</th>
//                     <td>4,807</td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">80%</span>
//                         <div>
//                           <Progress max="100" value="80" />
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">Instagram</th>
//                     <td>3,678</td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">75%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="75"
//                             barClassName="bg-gradient-info"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">twitter</th>
//                     <td>2,645</td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">30%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="30"
//                             barClassName="bg-gradient-warning"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 </tbody>
//               </Table>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Index;
