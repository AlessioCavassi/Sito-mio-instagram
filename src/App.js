import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, Button } from './components/ui';
import ReactPlayer from 'react-player';

const products = [
  { id: 1, name: 'Prodotto 1', price: 19.99, media: './assets/IMG_0404.mp4', mediaType: 'video' },
  { id: 2, name: 'Prodotto 2', price: 29.99, media: './assets/IMG_0302.mov', mediaType: 'video' },
  { id: 3, name: 'Prodotto 3', price: 39.99, media: '/api/placeholder/400/300', mediaType: 'image' },
  { id: 4, name: 'Prodotto 4', price: 49.99, media: '/api/placeholder/400/300', mediaType: 'image' },
  { id: 5, name: 'Prodotto 5', price: 59.99, media: '/api/placeholder/400/300', mediaType: 'image' },
  { id: 6, name: 'Prodotto 6', price: 69.99, media: '/api/placeholder/400/300', mediaType: 'image' },
];

const ProductCard = ({ product, onAddToCart, addLog }) => {
  const [videoError, setVideoError] = useState(null);

  useEffect(() => {
    addLog(`Rendering product: ${product.name}, Media: ${product.media}`);
  }, [product, addLog]);

  const handleVideoError = (e) => {
    const errorMessage = `Error loading video for ${product.name}: ${e.message}`;
    addLog(errorMessage);
    setVideoError(errorMessage);
  };

  return (
    <Card className="m-2">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {product.mediaType === 'video' ? (
          <>
            <ReactPlayer 
              url={product.media} 
              width="100%"
              height="192px"
              controls={true}
              onError={handleVideoError}
              onReady={() => addLog(`Video ready: ${product.name}`)}
              config={{ file: { 
                attributes: {
                  crossOrigin: "anonymous"
                }
              }}}
            />
            {videoError && <p className="text-red-500">Error: {videoError}</p>}
          </>
        ) : (
          <img 
            src={product.media} 
            alt={product.name} 
            className="w-full h-48 object-cover" 
            onError={(e) => addLog(`Error loading image for ${product.name}: ${e.message}`)}
          />
        )}
        <p className="mt-2 text-lg font-bold">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onAddToCart(product)}>
          Aggiungi al carrello
        </Button>
      </CardFooter>
    </Card>
  );
};

const ShoppingCart = ({ cartItems, onRemoveFromCart }) => (
  <div className="mt-8">
    <h2 className="text-2xl font-bold mb-4">Carrello</h2>
    {cartItems.length === 0 ? (
      <p>Il carrello è vuoto</p>
    ) : (
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between items-center mb-2">
            <span>{item.name} - ${item.price.toFixed(2)}</span>
            <button 
              onClick={() => onRemoveFromCart(item)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Rimuovi
            </button>
          </li>
        ))}
      </ul>
    )}
    <p className="mt-4 text-xl font-bold">
      Totale: ${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
    </p>
  </div>
);

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs(prevLogs => [...prevLogs, `${new Date().toISOString()}: ${message}`]);
  };

  useEffect(() => {
    addLog('App component mounted');
    addLog(`Products loaded: ${products.length}`);
  }, []);

  const addToCart = (product) => {
    addLog(`Adding to cart: ${product.name}`);
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (product) => {
    addLog(`Removing from cart: ${product.name}`);
    setCartItems(cartItems.filter((item) => item.id !== product.id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Il nostro Ecommerce</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} addLog={addLog} />
        ))}
      </div>
      <ShoppingCart cartItems={cartItems} onRemoveFromCart={removeFromCart} />
      
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-bold mb-2">Debug Logs:</h2>
        <button 
          onClick={() => setLogs([])} 
          className="mb-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Clear Logs
        </button>
        {logs.map((log, index) => (
          <p key={index} className="text-sm">{log}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
