import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import Productitem from './Productitem';



const LatestCollection = () => {

  const {products} =useContext(ShopContext)

  const [latestProducts ,setLatestProducts]=useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0,10));
  },[])
   

  return (
    <div className='my-10'>
          <div className='text-center py-8 text-3xl'>
            <Title  text1={'LATEST'} text2={'COLLECTIONS' } />
              <p className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto text-sm md:text-base text-gray-600 mt-2">
          Check out our freshest arrivals — handpicked to keep your style up to date with the latest trends.
        </p>
          </div>

                {/*rendering products */}
                <div className='grid grid-cols-2 sm:grid-cols-3 md-grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    {
                      latestProducts.map((item,index) =>(
                        < Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                      ) )
                    }
                </div>

    </div>
  )
}

export default LatestCollection;
