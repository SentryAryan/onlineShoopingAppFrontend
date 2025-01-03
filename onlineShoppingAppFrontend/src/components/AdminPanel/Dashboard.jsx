import React from 'react';
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/slices/loadingSlice';
import Loader from '../common/Loader';

const Dashboard = () => {
  // Updated fetchedProducts array with unique IDs and placeholders for product images
  const fetchedProducts = useSelector(state => state.products.products);
  const loading = useSelector(state => state.loading)
  const dispatch = useDispatch()
  const fetchData = async () => {
    
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container fluid className="containerm">
      <h1 className="mb-4">Dashboard</h1>
      <div className="tab-content mb-4">
        <div className="mt-2 mb-4">
          <h3>Our Products</h3>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Product Id</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {fetchedProducts.length > 0 ? (
              loading ? <Loader/> : fetchedProducts.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>{product.description}</td>
                  <td>{product.quantity}</td>
                  <td className='align-middle text-center'>
                    <img
                      src={product.imageUrl || 'https://via.placeholder.com/50'}
                      alt={product.name}
                      style={{ width: '50px', height: '50px' }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default Dashboard;
