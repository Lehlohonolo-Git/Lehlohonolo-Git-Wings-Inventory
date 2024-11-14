import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2'; // Import the chart component from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'; // Import necessary Chart.js elements
import Slider from 'react-slick';
import './App.css'; // Ensure the CSS is imported

// Import images
import image1 from './banana.jpg';
import image2 from './apple.jpg';
import image3 from './orange.jpg';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([image1, image2, image3]); // Use imported image variables directly

  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array ensures this runs once on mount

  const fetchProducts = () => {
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  };

  // Prepare chart data
  const productNames = products.map(product => product.name);
  const productQuantities = products.map(product => product.quantity);

  const data = {
    labels: productNames,
    datasets: [
      {
        label: 'Stock Levels',
        data: productQuantities,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  return (
    <div>
      <main>
        {/* Image carousel */}
        <div className="image-carousel">
          <Slider {...sliderSettings}>
            {images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Slide ${index + 1}`} className="carousel-image" />
              </div>
            ))}
          </Slider>
        </div>

        {/* Stock Levels Chart */}
        <div className="chart-container">
          <h4>Current Stock Levels</h4>
          <Line data={data} />
        </div>

        {/* Product Table */}
        
        <h3>Dashboard</h3>
        <table id="stock-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.desc}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Dashboard;
