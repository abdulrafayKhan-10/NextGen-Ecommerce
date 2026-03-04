import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchAllProduct, createProduct, updateProduct, deleteProduct, addProductImage, deleteProductImages, getProductImages } from '../services/productService';
import { ProductReadDto } from '../types/Product';
import Title from '../components/Title';
import { Edit, Trash, Plus, X, Image as ImageIcon } from 'lucide-react';

const Admin = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [email, setEmail] = useState('admin@admin.com'); // Hardcoded login
  const [password, setPassword] = useState('admin123'); // Hardcoded login
  
  const [products, setProducts] = useState<ProductReadDto[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Modal state for Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    productTitle: '',
    description: '',
    price: 0,
    quantity: 0,
    categoryId: '1', // Adding a default mock
    brandName: '',
    imageUrl: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@admin.com' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      toast.success('Admin login successful!');
      loadProducts();
    } else {
      toast.error('Invalid admin credentials!');
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      // Fetching first page, high amount to list them all
      const res = await fetchAllProduct({ page: 1, perPage: 100 });
      setProducts(res.products);
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    toast.info('Logged out from admin panel');
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      productTitle: '',
      description: '',
      price: 0,
      quantity: 0,
      categoryId: '1',
      brandName: '',
      imageUrl: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = async (product: ProductReadDto) => {
    setEditingId(product.id);
    let existingImageUrl = '';
    
    // Try to grab the current image for this product
    try {
      const images = await getProductImages(product.id);
      if (images && images.length > 0) {
        existingImageUrl = images[0].imageURL || '';
      }
    } catch (e) {}

    setFormData({
      productTitle: product.productTitle,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      categoryId: product.categoryId || '1',
      brandName: product.brandName || '',
      imageUrl: existingImageUrl
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted successfully');
        loadProducts();
      } catch (err) {
        toast.error('Failed to delete product');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { imageUrl, ...productPayload } = formData;
      let targetProductId = editingId;

      if (editingId) {
        await updateProduct(editingId, { ...productPayload, id: editingId, createdAt: new Date().toISOString() });
        toast.success('Product updated successfully');
      } else {
        const newProduct = await createProduct(productPayload);
        targetProductId = newProduct.id;
        toast.success('Product created successfully');
      }

      // Handle image updates
      if (targetProductId && imageUrl) {
        await deleteProductImages(targetProductId);
        await addProductImage(targetProductId, imageUrl);
      } else if (targetProductId && !imageUrl) {
        // If image URL is emptied out, clear images
        await deleteProductImages(targetProductId);
      }

      setIsModalOpen(false);
      loadProducts();
    } catch (err) {
      toast.error('Failed to save product');
    }
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-3xl font-bold mb-6">Admin Login</h2>
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-white p-8 border rounded-lg shadow-sm flex flex-col gap-4">
          <p className="text-gray-500 mb-2">Use the pre-filled credentials to login.</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Admin Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Password"
            required
          />
          <button type="submit" className="bg-black text-white px-4 py-2 mt-2 font-bold disabled:opacity-50">
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="pt-10">
      <div className="flex justify-between items-center mb-6">
        <Title text1="ADMIN" text2="DASHBOARD" />
        <div className="flex gap-4">
          <button onClick={openAddModal} className="bg-black text-white px-4 py-2 flex items-center gap-2 text-sm">
            <Plus size={16} /> Add Product
          </button>
          <button onClick={handleLogout} className="border border-black px-4 py-2 text-sm">
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading products...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm">
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Brand</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Stock</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b text-sm text-gray-700">
                  <td className="p-3 border font-medium">{p.productTitle}</td>
                  <td className="p-3 border">{p.brandName}</td>
                  <td className="p-3 border">${p.price}</td>
                  <td className="p-3 border">{p.quantity}</td>
                  <td className="p-3 border flex gap-3">
                    <button onClick={() => openEditModal(p)} className="text-blue-500 hover:text-blue-700">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700">
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    No products found. Start adding some!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-xl p-6 relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Product Title</label>
                <input
                  required
                  value={formData.productTitle}
                  onChange={e => setFormData({...formData, productTitle: e.target.value})}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Brand Name</label>
                <input
                  required
                  value={formData.brandName}
                  onChange={e => setFormData({...formData, brandName: e.target.value})}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full border p-2 rounded h-24"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                    className="w-full border p-2 rounded"
                  />
                  {formData.imageUrl && (
                    <img src={formData.imageUrl} alt="preview" className="h-10 w-10 object-cover rounded border" />
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Price ($)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.quantity}
                    onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>
              
              <button type="submit" className="bg-black text-white py-3 mt-4 font-bold rounded">
                {editingId ? 'Update Product' : 'Create Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;