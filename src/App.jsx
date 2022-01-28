import { PageHeader } from "antd";
import { useEffect, useReducer, useState } from "react";
import "./App.css";
import Cart from "./components/Cart";
import CartIcon from "./components/CartIcon";
import ProductsList from "./components/ProductsList";
import { CartContext, ProductContext } from "./contexts";
import { ProductActionEnum } from "./enums";
import { Action } from "./models";
import { cartReducer, productsReducer } from "./reducers";

import products from './data/data';

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartState, cartDispatch] = useReducer(cartReducer, {});
  const [productsState, productsDispatch] = useReducer(productsReducer, []);

  const cartProviderState = { cartState, cartDispatch };
  const productProviderState = { productsState, productsDispatch };

  const cartItemsCount = () => {
    return Object.keys(cartState).length;
  };

  useEffect(() => {
    productsDispatch(new Action(ProductActionEnum.ADD_PRODUCTS, products));
  }, []);

  return (
    <ProductContext.Provider value={productProviderState}>
      <CartContext.Provider value={cartProviderState}>
        <div style={{ padding: "1rem" }}>
          <PageHeader
            title="React E-shop"
            extra={
              <CartIcon
                count={cartItemsCount()}
                onClick={() => cartItemsCount() && setCartOpen(!cartOpen)}
              />
            }
          />
          <ProductsList products={productsState} />
          <Cart visible={cartOpen} onClose={() => setCartOpen(false)} />
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
