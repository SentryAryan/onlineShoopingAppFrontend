// import React from 'react';
// import './ManageMenu.css';

// const products = [
//   {
//     image: 'https://i.imgur.com/T9X1jJ0.png',
//     name: 'Shirt',
//     description: 'Black',
//     price: '$1000',
//     qty: 1,
//     seller: 'John Doe'
//   },
//   {
//     image: 'https://i.imgur.com/92vFz3S.png',
//     name: 'Boots',
//     description: 'brown',
//     price: '$900',
//     qty: 1,
//     seller: 'Lea R. Frith'
//   },
//   {
//     image: 'https://i.imgur.com/9V5fU8x.png',
//     name: 'Hat',
//     description: 'Orange',
//     price: '$100',
//     qty: 4,
//     seller: 'Erik L. Richards'
//   },
//   {
//     image: 'https://i.imgur.com/D7R7R8I.png',
//     name: 'Long Dress',
//     description: 'brown',
//     price: '$1000',
//     qty: 1,
//     seller: 'Renee I. Hansen'
//   },
// ];

// function App() {
//   return (
//     <div className="container itemsDetailsBg">
//       <h1 className="text-center">Items Details</h1>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Availability</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product, index) => (
//             <tr key={index}>
//               <td>
//                 <img src={product.image} alt={product.name} className="product-image" />
//               </td>
//               <td>
//                 <div>{product.name}</div>
//               </td>
//               <td>{product.description}</td>
//               <td>{product.price}</td>
//               <td>{product.qty}</td>
//               <td>
//                 <button className="btn btn-primary btn-sm">Edit</button>
//                 <button className="btn btn-danger btn-sm">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;