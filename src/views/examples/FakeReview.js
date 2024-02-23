import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, FormGroup, Form, Input } from "reactstrap";
import Header from "components/Headers/Header.js";
const AddProduct = () => {
  const navigate = useNavigate();
  const loggedIn = sessionStorage.getItem("loggedIn");
  if(loggedIn !== "true"){
    navigate("/auth/login");
  }
  const [productname, setProductname] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [skucode, setSkucode] = useState("");
  const [mrp, setMrp] = useState("");
  const [wrong_mrp, setWrong_mrp] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [showCustomCategoryInput, setShowCustomCategoryInput] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from your API
    fetch("https://backend.alainstore.in/Get/Categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);




  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("model", model);
    formData.append("skucode", skucode);
    formData.append("mrp", mrp);
    formData.append("wrong_mrp", wrong_mrp);
    formData.append("stock", stock);
    formData.append("description", description);

    const files = document.getElementById("name").files;
    for (let i = 0; i < files.length; i++) {
      formData.append("name", files[i]);
    }

    try {
      const response = await fetch("https://backend.alainstore.in/Upload/Product", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        navigate('/admin/Products');
        console.log("Form submitted successfully!");
        // alert("Form submitted successfully!");
        setProductname("");
        setCategory("");
        setBrand("");
        setModel("");
        setSkucode("");
        setMrp("");
        setWrong_mrp("");
        setStock("");
        setDescription("");
      } else {
        alert("Error submitting form!");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === 'custom') {
      setShowCustomCategoryInput(true);
      setCategory('');
    } else {
      setShowCustomCategoryInput(false);
      setCategory(selectedCategory);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow p-5">
              <Form role="form" onSubmit={handleSubmit} enctype="multipart/form-data">

                <h1 className="heading-small  mb-4" style={{ color: "#11c7ef" }}>
                  Add Products
                </h1>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="8">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Name
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-username"
                          placeholder="Product Name"
                          onChange={(e) => setProductname(e.target.value)}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Sku code
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          placeholder="Sku code"
                          onChange={(e) => setSkucode(e.target.value)}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-city"
                        >
                          MRP
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue="MRP"
                          id="input-city"
                          placeholder="MRP"
                          onChange={(e) => setMrp(e.target.value)}
                          min={0}
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-country"
                        >
                          Wrong MRP
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue="Wrong MRP"
                          id="input-country"
                          placeholder="Wrong MRP"
                          onChange={(e) => setWrong_mrp(e.target.value)}
                          min={0}
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-country"
                        >
                          Stock
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-postal-code"
                          placeholder="Stock"
                          onChange={(e) => setStock(e.target.value)}
                          min={0}
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                  <Col lg="4">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-city">
                      Category
                    </label>
                    <br />
                    <select
                      className="form-control-alternative px-2 py-2 rounded w-100"
                      aria-label="Small select example"
                      value={category}
                      onChange={handleCategoryChange}
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      {categories.map((cat) => (
                        <option key={cat.category} value={cat.category}>
                          {cat.category}
                        </option>
                      ))}
                      <option value="custom">Other (Enter Custom Category)</option>
                    </select>
                    {showCustomCategoryInput && (
                      <input
                        type="text"
                        className="form-control-alternative px-2 py-2 rounded w-100 mt-2"
                        placeholder="Enter Custom Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    )}
                  </FormGroup>
                </Col>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-country"
                        >
                          Brand
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-country"
                          placeholder="Brand"
                          onChange={(e) => setBrand(e.target.value)}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-country"
                        >
                          Model
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-postal-code"
                          placeholder="Model"
                          onChange={(e) => setModel(e.target.value)}
                          min={0}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                {/* Description */}
                <h6 className="heading-small mb-4" style={{ color: "#11c7ef" }}>Prodct Description</h6>
                <div className="pl-lg-4">
                  <FormGroup>
                    <label className="form-control-label" >Description</label>
                    <Input
                      className="form-control-alternative"
                      placeholder="Describe about Product features..."
                      rows="4"
                      onChange={(e) => setDescription(e.target.value)}
                      type="textarea"
                    />
                  </FormGroup>
                </div>

                <label className="form-control-label py-3" htmlFor="input-city" style={{ color: "#11c7ef" }}>
                  Upload Product Image and Video
                </label>
                <Row>
                  <Col lg="8">
                    <FormGroup>
                      <br />
                      <input
                        type="file"
                        className="w-100"
                        id="name"
                        name="name"
                        multiple
                        onChange={(e) => { }}
                        style={{
                          border: '2px solid #6161611f',
                          borderRadius: '5px',
                          padding: '10px',
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4 pt-3">
                    <FormGroup>
                      <input type="submit" className="w-100" style={{ backgroundColor: '#11c7ef', color: '#fff', margin: '10px', border: "transparent", padding: '14px 0px', borderRadius: '5px', cursor: 'pointer', }} />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AddProduct;