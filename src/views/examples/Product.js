import React, { useState, useEffect } from "react";
import { Card, CardHeader, Table, Container, Row, Button } from "reactstrap";
import Header from "components/Headers/Header.js";
import { useNavigate } from "react-router-dom";

const Tables = () => {
  const navigate = useNavigate();
  const loggedIn = sessionStorage.getItem("loggedIn");
  if (loggedIn !== "true") {
    navigate("/auth/login");
  }

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/Admin/Get/All/Product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.product);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Product List </h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Product id</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">SubCategory</th>
                    <th scope="col">StartPrice</th>
                    <th scope="col">EndPrice</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Images</th>
                  </tr>
                </thead>
                <ProductTable products={products} />
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

const ProductTable = ({ products }) => {
  return (
    <tbody>
      {products.length > 0 ? (
        products.map((product) => (
          <tr key={product._id}>
            <td>{product._id}</td>
            <td>{product.ProductName}</td>
            <td>{product.Category}</td>
            <td>{product.SubCategory}</td>
            <td>{product.StartPrice}</td>
            <td>{product.EndPrice}</td>
            <td>{product.Stock}</td>
            <td>
              <div className="avatar-group">
                {product.ProductImage.slice(0, 5).map((image, i) => (
                  <a
                    className="avatar avatar-sm"
                    href={`http://localhost:3000/uploads/${image}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.preventDefault()}
                    key={i}
                  >
                    <img alt="..." height="30px" width="30px" src={`http://localhost:3000/uploads/${image}`} />
                  </a>
                ))}
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="9">No products available.</td>
        </tr>
      )}
    </tbody>
  );
};

export default Tables;





// import React, { useState, useEffect } from "react";
// import { Card, CardHeader, Table, Container, Row, Button } from "reactstrap";
// import Header from "components/Headers/Header.js";
// import { useNavigate } from "react-router-dom";

// const Tables = () => {
//   const navigate = useNavigate();
//   const loggedIn = sessionStorage.getItem("loggedIn");
//   if (loggedIn !== "true") {
//     navigate("/auth/login");
//   }

//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch("https://backend.alainstore.in/Get/All/Product")
//       .then((response) => response.json())
//       .then((data) => {
//         setProducts(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   const handleProductUpdate = (updatedProduct) => {
//     // Send a PUT request to update the product on the server
//     fetch(`https://backend.alainstore.in/Update/MRP/${updatedProduct.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         mrp: updatedProduct.mrp,
//         wrong_mrp: updatedProduct.wrong_mrp,
//         stock: updatedProduct.stock,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Product updated:", data);
//         // Update the state to reflect the changes
//         const updatedProducts = products.map((product) =>
//           product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product
//         );
//         setProducts(updatedProducts);
//       })
//       .catch((error) => {
//         console.error("Error updating product:", error);
//       });
//   };

//   const handleDeleteClick = (productId) => {
//     // Send a DELETE request to remove the product on the server
//     fetch(`https://backend.alainstore.in/Delete/Product/${productId}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Product deleted:", data);
//         // Update the state to reflect the changes
//         const updatedProducts = products.filter((product) => product.id !== productId);
//         setProducts(updatedProducts);
//       })
//       .catch((error) => {
//         console.error("Error deleting product:", error);
//       });
//   };

//   return (
//     <>
//       <Header />
//       <Container className="mt--7" fluid>
//         <Row>
//           <div className="col">
//             <Card className="shadow">
//               <CardHeader className="border-0">
//                 <h3 className="mb-0">Product List </h3>
//               </CardHeader>
//               <Table className="align-items-center table-flush" responsive>
//                 <thead className="thead-light">
//                   <tr>
//                     <th scope="col">Product id</th>
//                     <th scope="col">Product Name</th>
//                     <th scope="col">Category</th>
//                     <th scope="col">Brand</th>
//                     <th scope="col">Model</th>
//                     <th scope="col">mrp</th>
//                     <th scope="col">wrong mrp</th>
//                     <th scope="col">Stock</th>
//                     <th scope="col">Images</th>
//                     <th scope="col">Actions</th>
//                   </tr>
//                 </thead>
//                 <ProductTable products={products} onUpdate={handleProductUpdate} onDelete={handleDeleteClick} />
//               </Table>
//             </Card>
//           </div>
//         </Row>
//       </Container>
//     </>
//   );
// };

// const ProductTable = ({ products, onUpdate, onDelete }) => {
//   const [mrpValues, setMrpValues] = useState({});
//   const [wrongMrpValues, setWrongMrpValues] = useState({});
//   const [stockValues, setWstockValues] = useState({});

//   useEffect(() => {
//     // Initialize the state variables with the current product values
//     const initialMrpValues = {};
//     const initialWrongMrpValues = {};
//     const initialstockValues = {};
//     products.forEach((product) => {
//       initialMrpValues[product.id] = product.mrp;
//       initialWrongMrpValues[product.id] = product.wrong_mrp;
//       initialstockValues[product.id] = product.stock;
//     });
//     setMrpValues(initialMrpValues);
//     setWrongMrpValues(initialWrongMrpValues);
//     setWstockValues(initialstockValues);
//   }, [products]);

//   const handleMrpChange = (productId, value) => {
//     setMrpValues({ ...mrpValues, [productId]: value });
//   };

//   const handleWrongMrpChange = (productId, value) => {
//     setWrongMrpValues({ ...wrongMrpValues, [productId]: value });
//   };

//   const handlestockChange = (productId, value) => {
//     setWstockValues({ ...stockValues, [productId]: value });
//   };

//   const handleUpdateClick = (productId) => {
//     // Send a request to update the product with new mrp and wrong_mrp values
//     const updatedProduct = {
//       id: productId,
//       mrp: mrpValues[productId],
//       wrong_mrp: wrongMrpValues[productId],
//       stock: stockValues[productId],
//     };
//     onUpdate(updatedProduct);
//   };

//   const handleDeleteClick = (productId) => {
//     onDelete(productId);
//   };

//   return (
//     <tbody>
//       {products.length > 0 ? (
//         products.map((product, index) => (
//           <tr key={index}>
//             <td>{product.id}</td>
//             <td>{product.productname}</td>
//             <td>{product.category}</td>
//             <td>{product.brand}</td>
//             <td>{product.model}</td>
//             <td>
//               <input
//                 type="number"
//                 style={{ border: "none" }}
//                 value={mrpValues[product.id] || ""}
//                 onChange={(e) => handleMrpChange(product.id, e.target.value)}
//               />
//             </td>
//             <td>
//               <input
//                 type="number"
//                 style={{ border: "none" }}
//                 className="border-none"
//                 value={wrongMrpValues[product.id] || ""}
//                 onChange={(e) => handleWrongMrpChange(product.id, e.target.value)}
//               />
//             </td>
//             <td>
//               <input
//                 type="number"
//                 style={{ border: "none" }}
//                 className="border-none"
//                 value={stockValues[product.id] || ""}
//                 onChange={(e) => handlestockChange(product.id, e.target.value)}
//               />
//             </td>
//             <td>
//             <div className="avatar-group">
//               {product.images.slice(0, 5).map((image, i) => (
//                 <a
//                   className="avatar avatar-sm"
//                   href={`https://backend.alainstore.in/uploads/${image}`}
//                   target="_blank"
//                   id={`tooltip742438047_${i}`}
//                   onClick={(e) => e.preventDefault()}
//                   key={i}
//                 >
//                   <img alt="..." height="30px" width="30px" src={`https://backend.alainstore.in/uploads/${image}`} />
//                 </a>
//               ))}
//             </div>

//               {/* <div className="avatar-group">
//                 {product.images.map((image, i) => (
//                   <a className="avatar avatar-sm" href={`https://backend.alainstore.in/uploads/${image}`} target="_blank" id={`tooltip742438047_${i}`} onClick={(e) => e.preventDefault()} key={i}>
//                     <img alt="..." height="30px" width="30px" src={`https://backend.alainstore.in/uploads/${image}`} />
//                   </a>
//                 ))}
//               </div> */}
//             </td>
//             <td>
//               <Button style={{ backgroundColor: "#ffd958" }} size="sm" onClick={() => handleUpdateClick(product.id)}> Update </Button>
//               <Button style={{ backgroundColor: "#f5365c" }} size="sm" onClick={() => handleDeleteClick(product.id)}> Delete </Button>
//             </td>
//           </tr>
//         ))
//       ) : (
//         <tr>
//           <td colSpan="9">No products available.</td>
//         </tr>
//       )}
//     </tbody>
//   );
// };

// export default Tables;







// import React, { useState, useEffect } from "react";
// import { Card, CardHeader, Table, Container, Row, Button } from "reactstrap";
// import Header from "components/Headers/Header.js";
// import { useNavigate } from "react-router-dom";
// // import ModalImage from 'react-modal-image';


// const Tables = () => {
//   const navigate = useNavigate();
//   const loggedIn = sessionStorage.getItem("loggedIn");
//   if (loggedIn !== "true") {
//     navigate("/auth/login");
//   }
//   const [Product, setProduct] = useState([]);

//   useEffect(() => {
//     fetch("https://backend.alainstore.in/Get/All/Product")
//       .then((response) => response.json())
//       .then((data) => {
//         setProduct(data);
//         console.log(Product.length);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   const handleProductUpdate = (updatedProduct) => {
//     // Send a PUT request to update the product on the server
//     fetch(`https://backend.alainstore.in/Update/MRP/${updatedProduct.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         mrp: updatedProduct.mrp,
//         wrong_mrp: updatedProduct.wrong_mrp,
//         stock: updatedProduct.stock,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Product updated:", data);
//         // Update the state to reflect the changes
//         const updatedProducts = Product.map((product) => {
//           if (product.id === updatedProduct.id) {
//             return { ...product, mrp: updatedProduct.mrp, wrong_mrp: updatedProduct.wrong_mrp, stock: updatedProduct.stock };
//           } else {
//             return product;
//           }
//         });
//         setProduct(updatedProducts);
//         // alert("updated")
//       })
//       .catch((error) => {
//         console.error("Error updating product:", error);
//       });
//   };

//   return (
//     <>
//       <Header />
//       <Container className="mt--7" fluid>
//         <Row>
//           <div className="col">
//             <Card className="shadow">
//               <CardHeader className="border-0">
//                 <h3 className="mb-0">Product List </h3>
//               </CardHeader>
//               <Table className="align-items-center table-flush" responsive>
//                 <thead className="thead-light">
//                   <tr>
//                     <th scope="col">Product id</th>
//                     <th scope="col">Product Name</th>
//                     <th scope="col">Category</th>
//                     <th scope="col">Brand</th>
//                     <th scope="col">Model</th>
//                     <th scope="col">mrp</th>
//                     <th scope="col">wrong mrp</th>
//                     <th scope="col">Stock</th>
//                     <th scope="col">Images</th>
//                     <th scope="col">Actions</th>
//                   </tr>
//                 </thead>
//                 <ProductTable products={Product} onUpdate={handleProductUpdate} />
//               </Table>
//             </Card>
//           </div>
//         </Row>
//       </Container>
//     </>
//   );
// };

// const ProductTable = ({ products, onUpdate }) => {
//   const [mrpValues, setMrpValues] = useState({});
//   const [wrongMrpValues, setWrongMrpValues] = useState({});
//   const [stockValues, setWstockValues] = useState({});

//   useEffect(() => {
//     // Initialize the state variables with the current product values
//     const initialMrpValues = {};
//     const initialWrongMrpValues = {};
//     const initialstockValues = {};
//     products.forEach((product) => {
//       initialMrpValues[product.id] = product.mrp;
//       initialWrongMrpValues[product.id] = product.wrong_mrp;
//       initialstockValues[product.id] = product.stock;
//     });
//     setMrpValues(initialMrpValues);
//     setWrongMrpValues(initialWrongMrpValues);
//     setWstockValues(initialstockValues);
//   }, [products]);

//   const handleMrpChange = (productId, value) => {
//     setMrpValues({ ...mrpValues, [productId]: value });
//   };

//   const handleWrongMrpChange = (productId, value) => {
//     setWrongMrpValues({ ...wrongMrpValues, [productId]: value });
//   };

//   const handlestockChange = (productId, value) => {
//     setWstockValues({ ...stockValues, [productId]: value });
//   };

//   const handleUpdateClick = (productId) => {
//     // Send a request to update the product with new mrp and wrong_mrp values
//     const updatedProduct = {
//       id: productId,
//       mrp: mrpValues[productId],
//       wrong_mrp: wrongMrpValues[productId],
//       stock: stockValues[productId],
//     };
//     onUpdate(updatedProduct);
//   };
  
//   const handleDeleteClick = (productId) => {
//     alert(productId)
//     fetch(`https://backend.alainstore.in/Delete/Product/${productId}`, {
//       method: "Delete",
//       headers: {
//         "Content-Type": "application/json",
//       }
//     })
//   };

//   return (
//     <tbody>
//       {products.length > 0 ? (
//         products.map((product, index) => (
//           <tr key={index}>
//             <td>{product.id}</td>
//             <td>{product.productname}</td>
//             <td>{product.category}</td>
//             <td>{product.brand}</td>
//             <td>{product.model}</td>
//             <td>
//               <input
//                 type="number"
//                 style={{ border: "none" }}
//                 value={mrpValues[product.id] || ""}
//                 onChange={(e) => handleMrpChange(product.id, e.target.value)}
//               />
//             </td>
//             <td>
//               <input
//                 type="number"
//                 style={{ border: "none" }}
//                 className="border-none"
//                 value={wrongMrpValues[product.id] || ""}
//                 onChange={(e) => handleWrongMrpChange(product.id, e.target.value)}
//               />
//             </td>
//             <td>
//               <input
//                 type="number"
//                 style={{ border: "none" }}
//                 className="border-none"
//                 value={stockValues[product.id] || ""}
//                 onChange={(e) => handlestockChange(product.id, e.target.value)}
//               />
//             </td>
//             {/* <ModalImage key={i} small={`http:/A/localhost:3001/uploads/${image}`} className="rounded-circle" large={`https://backend.alainstore.in/uploads/${image}`} alt={`Image ${i}`} />  */}
//             <td>
//               <div className="avatar-group">
//                 {product.images.map((image, i) => (
//                   <a className="avatar avatar-sm" href={`https://backend.alainstore.in/uploads/${image}`} target="_blank" id={`tooltip742438047_${i}`} onClick={(e) => e.preventDefault()} key={i} >
//                     <img alt="..." height="30px" width="30px" src={`https://backend.alainstore.in/uploads/${image}`} />
//                   </a>
//                 ))}
//               </div>
//             </td>
//             <td>
//               <Button style={{ backgroundColor: "#ffd958" }} size="sm" onClick={() => handleUpdateClick(product.id)}> Update </Button>
//               <Button style={{ backgroundColor: "#f5365c" }} size="sm" onClick={() => handleDeleteClick(product.id)}> Delete </Button>
//             </td>
//           </tr>
//         ))
//       ) : (
//         <tr>
//           <td colSpan="9">No products available.</td>
//         </tr>
//       )}
//     </tbody>
//   );
// };

// export default Tables;








// import { Card, CardHeader, Media, Table, Container, Row, UncontrolledTooltip } from "reactstrap";
// import Header from "components/Headers/Header.js";
// import React, { useState, useEffect } from "react";

// const Tables = () => {
//   const [Product, setProduct] = useState([]);

//   useEffect(() => {
//     fetch("https://backend.alainstore.in/Get/All/Product")
//       .then((response) => response.json())
//       .then((data) => {
//         setProduct(data);
//         console.log(Product.length);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);
//   return (
//     <>
//       <Header />
//       <Container className="mt--7" fluid>
//         <Row>
//           <div className="col">
//             <Card className="shadow">
//               <CardHeader className="border-0">
//                 <h3 className="mb-0">Product List </h3>
//               </CardHeader>
//               <Table className="align-items-center table-flush" responsive>
//                 <thead className="thead-light">
//                   <tr>
//                     <th scope="col">Product id</th>
//                     <th scope="col">Product Name</th>
//                     <th scope="col">Category</th>
//                     <th scope="col">Brand</th>
//                     <th scope="col">Model</th>
//                     <th scope="col">mrp</th>
//                     <th scope="col">wrong mrp</th>
//                     <th scope="col">Stock</th>
//                     <th scope="col">Images</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {Product.length > 0 ? (
//                     Product.map((product, index) => (
//                       <tr key={index}>
//                         <td>{product.id}</td>
//                         <th scope="row">
//                           <Media className="align-items-center">
//                             <Media>
//                               <span className="mb-0 text-sm">{product.productname}</span>
//                             </Media>
//                           </Media>
//                         </th>
//                         <td>{product.category}</td>
//                         <td>{product.brand}</td>
//                         <td>{product.model}</td>
//                         <td>{product.mrp}</td>
//                         <td>{product.wrong_mrp}</td>
//                         <td>{product.stock}</td>
//                         <td>
//                           <div className="avatar-group">
//                             {product.images.map((image, i) => (
//                               <a className="avatar avatar-sm" href="#pablo" id={`tooltip742438047_${i}`} onClick={(e) => e.preventDefault()} key={i} >
//                                 <img alt="..." className="rounded-circle" src={`https://backend.alainstore.in/uploads/${image}`} />
//                               </a>
//                             ))}

//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="7">No products available.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </Card>
//           </div>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Tables;
