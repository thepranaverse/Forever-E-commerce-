import React, { useContext, useState ,useEffect} from "react";
import { shopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItems from "./ProductItems";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(shopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCpy = products.slice();
      productsCpy = productsCpy.filter((item) => category === item.category);
        productsCpy = productsCpy.filter((item) => subCategory === item.subCategory);
     
       setRelated(productsCpy.slice(0,5))
    
    }
  }, [products]);

    return (
      <div className="my-24">
        <div className="text-center text-3xl py-2">
                <Title text1={"RELATED"} text2={"PRODUCTS"} />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                    {
                        related.map((item ,index) => {
                            return <ProductItems
                              key={index}
                              id={item._id}
                              image={item.image}
                              name={item.name}
                              price={item.price}
                            />;
                        })
                    }
                </div>

        </div>
      </div>
    );
};

export default RelatedProducts;
