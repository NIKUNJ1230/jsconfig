import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import Header from "components/Headers/Header.js";

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [endPrice, setEndPrice] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [stock, setStock] = useState("");
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/Admin/Find/Categories", {
        headers: {
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjY2Y0YjVlYmIxZjVlY2EwMWY5OGJmIn0sImlhdCI6MTcwNzkzMzk2N30._l7CG75qz9FHI91cQVOXLWLE_vi1zu5ExD8srrcRas0",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data.Category);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("An error occurred while fetching categories:", error);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ProductName", productName);
    formData.append("Category", selectedCategory);
    formData.append("SubCategory", selectedSubCategory);
    formData.append("ProductDescription", productDescription);
    formData.append("StartPrice", startPrice);
    formData.append("EndPrice", endPrice);
    formData.append("MinOrder", minOrder);
    formData.append("Stock", stock);
    // formData.append("productImage", productImage);
    // Append all selected files to formData
    if (productImage) {
      for (let i = 0; i < productImage.length; i++) {
        formData.append("productImage", productImage[i]);
      }
    } console.log([...formData]);
    try {
      const response = await fetch("http://localhost:3000/Admin/Vender/AddProduct", {
        method: "POST",
        headers: {
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjY2Y0YjVlYmIxZjVlY2EwMWY5OGJmIn0sImlhdCI6MTcwNzkzMzk2N30._l7CG75qz9FHI91cQVOXLWLE_vi1zu5ExD8srrcRas0"
        },
        body: formData,
      });
      if (response.ok) {
        navigate('/admin/Products');
      } else {
        console.error("Error adding product");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="shadow p-5">
              <h1 className=" mb-4" style={{ color: "#11c7ef" }}>
                Add Product
              </h1>
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <FormGroup>
                  <h5 className="heading-small p-0" style={{ color: "#b5bdc4" }}>Product Name</h5>
                  <Input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                  <h5 className="heading-small p-0" style={{ color: "#b5bdc4" }}>Product Description</h5>
                  <Input type="textarea" placeholder="Product Description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                  <h5 className="heading-small p-0" style={{ color: "#b5bdc4" }}>Start Price</h5>
                  <Input type="number" placeholder="Start Price" value={startPrice} onChange={(e) => setStartPrice(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                  <h5 className="heading-small p-0" style={{ color: "#b5bdc4" }}>End Price</h5>
                  <Input type="number" placeholder="End Price" value={endPrice} onChange={(e) => setEndPrice(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                  <h5 className="heading-small p-0" style={{ color: "#b5bdc4" }}>Min Order</h5>
                  <Input type="number" placeholder="Min Order" value={minOrder} onChange={(e) => setMinOrder(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                  <h5 className="heading-small p-0" style={{ color: "#b5bdc4" }}>Stock</h5>
                  <Input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                  <h5 className="heading-small p-0" style={{ color: "#b5bdc4" }}>Select Category</h5>
                  <Input
                    type="select"
                    value={selectedCategory}
                    // className=" w-100 border py-2 rounded px-2"
                    onChange={handleCategoryChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.name} value={category.name}>{category.name}</option>
                    ))}
                  </Input>
                </FormGroup>


                {/* <FormGroup>
                  <select value={selectedCategory} className="w-100 border py-2 rounded px-2" onChange={handleCategoryChange} required>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.name} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                </FormGroup> */}

                <FormGroup>
                  <h5 className="heading-small p-0" style={{ color: "#b5bdc4" }}>Select Subcategory</h5>
                  <Input
                    type="select"
                    value={selectedSubCategory}
                    onChange={handleSubCategoryChange}
                    required
                  >
                    <option value="">Select Subcategory</option>
                    {selectedCategory &&
                      categories.find((cat) => cat.name === selectedCategory)?.subcategories.map((subCategory) => (
                        <option key={subCategory._id} value={subCategory.name}>{subCategory.name}</option>
                      ))}
                  </Input>
                </FormGroup>

                {/* <FormGroup>
                  <select value={selectedSubCategory} onChange={handleSubCategoryChange} required>
                    <option value="">Select Subcategory</option>
                    {selectedCategory &&
                      categories.find((cat) => cat.name === selectedCategory)?.subcategories.map((subCategory) => (
                        <option key={subCategory._id} value={subCategory.name}>{subCategory.name}</option>
                      ))}
                  </select>
                </FormGroup> */}
                <FormGroup>
                  <h5 className="heading-small p-0" style={{ color: "#b5bdc4" }}>Add Product</h5>
                  {/* <Input type="file" multiple onChange={(e) => console.log(e.target.files)} required /> */}
                  <Input type="file" multiple onChange={(e) => setProductImage(e.target.files)} required />
                </FormGroup>
                <Button type="submit" color="primary">Add Product</Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddProduct;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, Container, Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
// import Header from "components/Headers/Header.js";

// const AddProduct = () => {
//   const navigate = useNavigate();
//   const [productName, setProductName] = useState("");
//   const [hashTags, setHashTags] = useState("");
//   const [productDescription, setProductDescription] = useState("");
//   const [startPrice, setStartPrice] = useState("");
//   const [endPrice, setEndPrice] = useState("");
//   const [minOrder, setMinOrder] = useState("");
//   const [stock, setStock] = useState("");
//   const [category, setCategory] = useState("");
//   const [subCategory, setSubCategory] = useState("");
//   const [productImage, setProductImage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("ProductName", productName);
//     formData.append("HashTags", hashTags);
//     formData.append("ProductDescription", productDescription);
//     formData.append("StartPrice", startPrice);
//     formData.append("EndPrice", endPrice);
//     formData.append("MinOrder", minOrder);
//     formData.append("Stock", stock);
//     formData.append("Category", category);
//     formData.append("SubCategory", subCategory);
//     formData.append("productImage", productImage);

//     try {
//       const response = await fetch("http://localhost:3000/Admin/Vender/AddProduct", {
//         method: "POST",
//         headers: {
//           Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjY2Y0YjVlYmIxZjVlY2EwMWY5OGJmIn0sImlhdCI6MTcwNzkzMzk2N30._l7CG75qz9FHI91cQVOXLWLE_vi1zu5ExD8srrcRas0"
//         },
//         body: formData,
//       });

//       if (response.ok) {
//         navigate('/admin/Products');
//       } else {
//         console.error("Error adding product");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Container className="mt--7" fluid>
//         <Row>
//           <Col>
//             <Card className="shadow p-5">
//               <h1 className="heading-small mb-4" style={{ color: "#11c7ef" }}>
//                 Add Product
//               </h1>
//               <Form onSubmit={handleSubmit} encType="multipart/form-data">
//                 <FormGroup>
//                   <Input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} required />
//                 </FormGroup>
//                 <FormGroup>
//                   <Input type="text" placeholder="Hash Tags" value={hashTags} onChange={(e) => setHashTags(e.target.value)} />
//                 </FormGroup>
//                 <FormGroup>
//                   <Input type="textarea" placeholder="Product Description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} required />
//                 </FormGroup>
//                 <FormGroup>
//                   <Input type="number" placeholder="Start Price" value={startPrice} onChange={(e) => setStartPrice(e.target.value)} required />
//                 </FormGroup>
//                 <FormGroup>
//                   <Input type="number" placeholder="End Price" value={endPrice} onChange={(e) => setEndPrice(e.target.value)} required />
//                 </FormGroup>
//                 <FormGroup>
//                   <Input type="number" placeholder="Min Order" value={minOrder} onChange={(e) => setMinOrder(e.target.value)} required />
//                 </FormGroup>
//                 <FormGroup>
//                   <Input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
//                 </FormGroup>
//                 <FormGroup>
//                   <Input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
//                 </FormGroup>
//                 <FormGroup>
//                   <Input type="text" placeholder="Sub Category" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} required />
//                 </FormGroup>
//                 <FormGroup>
//                   <Input type="file" multiple onChange={(e) => setProductImage(e.target.files[0])} required />
//                 </FormGroup>
//                 <Button type="submit" color="primary">Add Product</Button>
//               </Form>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default AddProduct;



// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, Container, Row, Col, FormGroup, Form, Input } from "reactstrap";
// import Header from "components/Headers/Header.js";
// const AddProduct = () => {
//   const navigate = useNavigate();
//   const loggedIn = sessionStorage.getItem("loggedIn");
//   if (loggedIn !== "true") {
//     navigate("/auth/login");
//   }
//   const [productname, setProductname] = useState("");
//   const [category, setCategory] = useState("");
//   const [brand, setBrand] = useState("");
//   const [model, setModel] = useState("");
//   const [skucode, setSkucode] = useState("");
//   const [mrp, setMrp] = useState("");
//   const [wrong_mrp, setWrong_mrp] = useState("");
//   const [stock, setStock] = useState("");
//   const [description, setDescription] = useState("");
//   const [showCustomCategoryInput, setShowCustomCategoryInput] = useState(false);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     // Fetch categories from your API
//     fetch("https://backend.alainstore.in/Get/Categories")
//       .then((response) => response.json())
//       .then((data) => {
//         setCategories(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching categories:", error);
//       });
//   }, []);




//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("productname", productname);
//     formData.append("category", category);
//     formData.append("brand", brand);
//     formData.append("model", model);
//     formData.append("skucode", skucode);
//     formData.append("mrp", mrp);
//     formData.append("wrong_mrp", wrong_mrp);
//     formData.append("stock", stock);
//     formData.append("description", description);

//     const files = document.getElementById("name").files;
//     for (let i = 0; i < files.length; i++) {
//       formData.append("name", files[i]);
//     }

//     try {
//       const response = await fetch("https://backend.alainstore.in/Upload/Product", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         navigate('/admin/Products');
//         console.log("Form submitted successfully!");
//         // alert("Form submitted successfully!");
//         setProductname("");
//         setCategory("");
//         setBrand("");
//         setModel("");
//         setSkucode("");
//         setMrp("");
//         setWrong_mrp("");
//         setStock("");
//         setDescription("");
//       } else {
//         alert("Error submitting form!");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//   };

//   const handleCategoryChange = (e) => {
//     const selectedCategory = e.target.value;
//     if (selectedCategory === 'custom') {
//       setShowCustomCategoryInput(true);
//       setCategory('');
//     } else {
//       setShowCustomCategoryInput(false);
//       setCategory(selectedCategory);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Container className="mt--7" fluid>
//         <Row>
//           <div className="col">
//             <Card className="shadow p-5">
//               <Form role="form" onSubmit={handleSubmit} enctype="multipart/form-data">

//                 <h1 className="heading-small  mb-4" style={{ color: "#11c7ef" }}>
//                   <b>Add Products</b>
//                 </h1>
//                 <div className="pl-lg-4">
//                   <Row>
//                     <Col lg="8">
//                       <FormGroup>
//                         <label
//                           className="form-control-label"
//                           htmlFor="input-username"
//                         >
//                           Name
//                         </label>
//                         <Input
//                           className="form-control-alternative"
//                           id="input-username"
//                           placeholder="Product Name"
//                           onChange={(e) => setProductname(e.target.value)}
//                           type="text"
//                           required
//                         />
//                       </FormGroup>
//                     </Col>
//                     <Col lg="4">
//                       <FormGroup>
//                         <label
//                           className="form-control-label"
//                           htmlFor="input-email"
//                         >
//                           Sku code
//                         </label>
//                         <Input
//                           className="form-control-alternative"
//                           id="input-email"
//                           placeholder="Sku code"
//                           onChange={(e) => setSkucode(e.target.value)}
//                           type="text"
//                         />
//                       </FormGroup>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col lg="4">
//                       <FormGroup>
//                         <label
//                           className="form-control-label"
//                           htmlFor="input-city"
//                         >
//                           MRP
//                         </label>
//                         <Input
//                           className="form-control-alternative"
//                           defaultValue="MRP"
//                           id="input-city"
//                           placeholder="MRP"
//                           onChange={(e) => setMrp(e.target.value)}
//                           min={0}
//                           type="number"
//                           required
//                         />
//                       </FormGroup>
//                     </Col>
//                     <Col lg="4">
//                       <FormGroup>
//                         <label
//                           className="form-control-label"
//                           htmlFor="input-country"
//                         >
//                           Wrong MRP
//                         </label>
//                         <Input
//                           className="form-control-alternative"
//                           defaultValue="Wrong MRP"
//                           id="input-country"
//                           placeholder="Wrong MRP"
//                           onChange={(e) => setWrong_mrp(e.target.value)}
//                           min={0}
//                           type="number"
//                         />
//                       </FormGroup>
//                     </Col>
//                     <Col lg="4">
//                       <FormGroup>
//                         <label
//                           className="form-control-label"
//                           htmlFor="input-country"
//                         >
//                           Stock
//                         </label>
//                         <Input
//                           className="form-control-alternative"
//                           id="input-postal-code"
//                           placeholder="Stock"
//                           onChange={(e) => setStock(e.target.value)}
//                           min={0}
//                           type="number"
//                           required
//                         />
//                       </FormGroup>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col lg="4">
//                       <FormGroup>
//                         <label className="form-control-label" htmlFor="input-city">
//                           Category
//                         </label>
//                         <br />
//                         <select
//                           className="form-control-alternative px-2 py-2 rounded w-100"
//                           aria-label="Small select example"
//                           value={category}
//                           onChange={handleCategoryChange}
//                           required
//                         >
//                           <option value="" disabled>
//                             Select Category
//                           </option>
//                           {categories.map((cat) => (
//                             <option key={cat.category} value={cat.category}>
//                               {cat.category}
//                             </option>
//                           ))}
//                           <option value="custom">Other (Enter Custom Category)</option>
//                         </select>
//                         {showCustomCategoryInput && (
//                           <input
//                             type="text"
//                             className="form-control-alternative px-2 py-2 rounded w-100 mt-2"
//                             placeholder="Enter Custom Category"
//                             value={category}
//                             onChange={(e) => setCategory(e.target.value)}
//                           />
//                         )}
//                       </FormGroup>
//                     </Col>
//                     <Col lg="4">
//                       <FormGroup>
//                         <label
//                           className="form-control-label"
//                           htmlFor="input-country"
//                         >
//                           Brand
//                         </label>
//                         <Input
//                           className="form-control-alternative"
//                           id="input-country"
//                           placeholder="Brand"
//                           onChange={(e) => setBrand(e.target.value)}
//                           type="text"
//                           required
//                         />
//                       </FormGroup>
//                     </Col>
//                     <Col lg="4">
//                       <FormGroup>
//                         <label
//                           className="form-control-label"
//                           htmlFor="input-country"
//                         >
//                           Model
//                         </label>
//                         <Input
//                           className="form-control-alternative"
//                           id="input-postal-code"
//                           placeholder="Model"
//                           onChange={(e) => setModel(e.target.value)}
//                           min={0}
//                           type="text"
//                           required
//                         />
//                       </FormGroup>
//                     </Col>
//                   </Row>
//                 </div>
//                 {/* Description */}
//                 <h6 className="heading-small mb-4" style={{ color: "#11c7ef" }}>Prodct Description</h6>
//                 <div className="pl-lg-4">
//                   <FormGroup>
//                     <label className="form-control-label" >Description</label>
//                     <Input
//                       className="form-control-alternative"
//                       placeholder="Describe about Product features..."
//                       rows="4"
//                       onChange={(e) => setDescription(e.target.value)}
//                       type="textarea"
//                       required
//                     />
//                   </FormGroup>
//                 </div>

//                 <label className="form-control-label py-3" htmlFor="input-city" style={{ color: "#11c7ef" }}>
//                   Upload Product Image and Video
//                 </label>
//                 <Row>
//                   <Col lg="8">
//                     <FormGroup>
//                       <br />
//                       <input
//                         type="file"
//                         className="w-100"
//                         id="name"
//                         name="name"
//                         multiple
//                         onChange={(e) => { }}
//                         style={{
//                           border: '2px solid #6161611f',
//                           borderRadius: '5px',
//                           padding: '10px',
//                         }}
//                         required
//                       />
//                     </FormGroup>
//                   </Col>
//                   <Col lg="4 pt-3">
//                     <FormGroup>
//                     <button type="submit"  className="w-100" style={{ backgroundColor: '#11c7ef', color: '#fff', margin: '10px', border: "transparent", padding: '14px 0px', borderRadius: '5px', cursor: 'pointer', }}>Add Product</button>
//                       {/* <input type="submit" placeholder="Add Product" className="w-100" style={{ backgroundColor: '#11c7ef', color: '#fff', margin: '10px', border: "transparent", padding: '14px 0px', borderRadius: '5px', cursor: 'pointer', }} /> */}
//                     </FormGroup>
//                   </Col>
//                 </Row>
//               </Form>
//             </Card>
//           </div>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default AddProduct;