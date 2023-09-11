import React, { useEffect, useState } from "react";
import Layouts from "../components/Layouts/Layouts";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/Cart";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/Homapage.css";


const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [cart, setCart] = useCart(); 
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // initial product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // get products
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get similar product
  // getting bases on the same category
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layouts>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            style={{ width: "18rem" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: ₹ {product.price}</h6>
          <h6>Category: {product?.category?.name}</h6>

          <button
            className="btn btn-secondary ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <hr></hr>
      <div className="row container home-page">
        <h1 className="text-center mt-3">Similar Products</h1>
        {relatedProducts < 1 && (
          <p className="text-center ">No Similar Products Found</p>
        )}

        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-3" key={p._id} style={{ width: "18rem" }}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
                style={{ width: "18rem" }}
              />
              <div className="card-body ">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h5>
                </div>
                <p className="card-text">{p.description.substring(0, 30)}..</p>
                <p className="card-name-price"></p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button
                  className="btn btn-secondary ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Item Added to cart");
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layouts>
  );
};

export default ProductDetails;
