import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Loader2, Check, X, Package } from 'lucide-react';
import './Products.css';

// Initial products data
const initialProducts = [
  {
    id: 1,
    name: 'Full Home',
    description: 'Complete home maintenance and repair services covering all areas of your home.',
    price: 299,
    category: 'service',
    rating: 4.8,
    inStock: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Clinic',
    description: 'Specialized maintenance and repair services for medical facilities and clinics.',
    price: 499,
    category: 'service',
    rating: 4.9,
    inStock: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Commercial',
    description: 'Comprehensive maintenance solutions for commercial properties and businesses.',
    price: 799,
    category: 'service',
    rating: 4.7,
    inStock: true,
    featured: false,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'One Repairing',
    description: 'Quick and reliable single repair service for any urgent maintenance needs.',
    price: 99,
    category: 'service',
    rating: 4.5,
    inStock: true,
    featured: true,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const Products = () => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [notification, setNotification] = useState(null);
  const notificationTimer = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'service',
    inStock: true,
    featured: false,
    image: ''
  });

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const showNotification = (message, type = 'success') => {
    if (notificationTimer.current) {
      clearTimeout(notificationTimer.current);
    }
    
    setNotification({ message, type });
    
    notificationTimer.current = setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.price) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...formData, id: editingProduct.id, price: Number(formData.price) } 
          : p
      ));
      showNotification('Product updated successfully!');
    } else {
      // Add new product
      const newProduct = {
        ...formData,
        id: Date.now(),
        price: Number(formData.price),
        rating: 4.5, // Default rating for new products
        inStock: true
      };
      setProducts([...products, newProduct]);
      showNotification('Product added successfully!');
    }
    
    // Reset form and close modal
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'service',
      inStock: true,
      featured: false,
      image: ''
    });
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      inStock: product.inStock,
      featured: product.featured,
      image: product.image || ''
    });
    setIsModalOpen(true);
  };

  const confirmDelete = (productId) => {
    setProductToDelete(productId);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setProducts(products.filter(p => p.id !== productToDelete));
      setProductToDelete(null);
      showNotification('Service deleted successfully!');
    } catch (error) {
      showNotification('Failed to delete service. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="products-container">

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            className={`notification ${notification.type}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {notification.type === 'success' ? (
              <Check size={18} />
            ) : (
              <X size={18} />
            )}
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="products-header">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Services
        </motion.h1>
        <motion.button 
          className="btn btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setEditingProduct(null);
            setFormData({
              name: '',
              description: '',
              price: '',
              category: 'service',
              inStock: true,
              featured: false,
              image: ''
            });
            setIsModalOpen(true);
          }}
        >
          <Plus size={18} /> Add New Service
        </motion.button>
      </div>

      <motion.div 
        className="products-grid"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {products.length === 0 ? (
          <motion.div 
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="empty-state-content">
              <Package size={48} className="empty-icon" />
              <h3>No services available</h3>
              <p>Get started by adding your first service</p>
            </div>
          </motion.div>
        ) : (
          products.map((product) => (
            <motion.div 
              key={product.id} 
              className={`product-card ${product.featured ? 'featured' : ''}`}
              variants={item}
              whileHover={{ y: -5 }}
            >
              {product.featured && <div className="featured-badge">Featured</div>}
              <div className="product-image">
                <img 
                  src={product.image || 'https://via.placeholder.com/400x250?text=Service+Image'} 
                  alt={product.name} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x250?text=Image+Not+Available';
                  }}
                />
              </div>
              <div className="product-content">
                <div className="product-header">
                  <h3>{product.name}</h3>
                  <span className={`status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                    {product.inStock ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="price">₹{product.price.toFixed(2)}</span>
                  <div className="actions">
                    <motion.button 
                      className="btn btn-sm btn-edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(product);
                      }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Edit2 size={16} className="mr-1" />
                      <span>Edit</span>
                    </motion.button>
                    <motion.button 
                      className="btn btn-sm btn-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmDelete(product.id);
                      }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Trash2 size={16} className="mr-1" />
                      <span>Delete</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <motion.div 
            className="modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>{editingProduct ? 'Edit Service' : 'Add New Service'}</h2>
              <button 
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Service Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter service name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Enter service description"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price (₹) *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="service">Service</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="repair">Repair</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="image">Image URL (optional)</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                />
                <label htmlFor="featured">Featured Service</label>
              </div>
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="spin" size={18} />
                      <span>Saving...</span>
                    </>
                  ) : editingProduct ? 'Update Service' : 'Add Service'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {productToDelete && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isLoading && setProductToDelete(null)}
          >
            <motion.div 
              className="modal delete-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Delete Service</h3>
                <button 
                  className="close-btn"
                  onClick={() => !isLoading && setProductToDelete(null)}
                  disabled={isLoading}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <div className="delete-icon">
                  <Package size={48} />
                </div>
                <h4>Are you sure?</h4>
                <p>This will permanently delete the service. This action cannot be undone.</p>
              </div>
              <div className="modal-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setProductToDelete(null)}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="spinner" size={18} />
                      Deleting...
                    </>
                  ) : 'Delete Service'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;