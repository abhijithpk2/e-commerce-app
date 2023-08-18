import React from 'react'
import Layouts from '../components/Layouts/Layouts'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/Auth'
import { useNavigate } from 'react-router-dom'
import Item from 'antd/es/list/Item'

const CartPage = () => {
  const [auth, setAuth] = useAuth()
  const [cart, setCart] = useCart()
  const navigate = useNavigate();

  // delete cart item
  const removeCartItem = (pid) =>{
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index,1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error)
    }
  }

  // total Price 
  const totalPrice = ()=>{
    try {
      let total = 0;
      cart?.map((item) => {total= total+item.price} )
      return total.toLocaleString("en-US",{
        style:"currency",
        currency:"INR"
      })

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layouts>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You have ${cart.length} items in your Cart ${auth?.token ? "" : "Please login to checkout"}` :
                " Your cart is empty"
              }
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <>Cart Items</>
          {cart?.map((p) => (
            <div className="row mb-2 p-3 card flex-row">
              <div className="col-md-4">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name} width="100px" height={"100px"} />
              </div>
              <div className="col-md-8">
                <p>{p.name}</p>
                <p>{p.description.substring(0, 30)}</p>
                <p>Price :{p.price}</p>
                <button className='btn btn-danger' onClick={()=>removeCartItem(p._id)}>Remove</button>
              </div>
            </div>
          ))}
          </div>
          <div className="col-md-6 text-center">
            <>
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: {totalPrice()}</h4>
            </>
          </div>
        </div>
      </div>
    </Layouts>
  )
}

export default CartPage