import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Copy,
  ExternalLink,
  MoreVertical,
  Check,
  AlertTriangle,
  Image as ImageIcon,
  Sparkles,
  RefreshCw,
  Eye,
} from 'lucide-react';
import adminDataService from '../services/adminDataService';
import StatusBadge from '../components/StatusBadge';
import Drawer from '../components/Drawer';
import ConfirmModal from '../components/ConfirmModal';

const AdminProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialAction = searchParams.get('action');
  const initialFilter = searchParams.get('filter');
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState(() => adminDataService.getProducts());
  const [categories, setCategories] = useState(() => adminDataService.getCategories());

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [stockFilter, setStockFilter] = useState(initialFilter || 'all'); // all | in-stock | low-stock | out-of-stock

  // Drawer Form State (Add / Edit)
  const [isDrawerOpen, setIsDrawerOpen] = useState(initialAction === 'add');
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    sku: '',
    category: 'graphic-tees',
    price: 999,
    originalPrice: 1499,
    status: 'Active',
    color: 'Black',
    description: '',
    fabricGsm: '280 GSM',
    fit: 'Oversized Boxy Fit',
    image: '/images/products/midnight-graphic-tee.png',
    galleryImages: ['/images/products/midnight-graphic-tee.png'],
    isNew: true,
    isBestSeller: false,
    sizes: [
      { size: 'S', stock: 10 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 20 },
      { size: 'XL', stock: 12 },
      { size: 'XXL', stock: 5 },
    ],
  });

  // Delete Confirm Modal
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Sync products on change
  const reloadData = () => {
    setProducts(adminDataService.getProducts());
    setCategories(adminDataService.getCategories());
  };

  useEffect(() => {
    if (initialAction === 'add') {
      handleOpenAddDrawer();
    }
  }, [initialAction]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchCategory = (p.categoryName || p.category || '').toLowerCase().includes(q);
        const matchSku = (p.sku || p.id || '').toLowerCase().includes(q);
        const matchColor = (p.color || '').toLowerCase().includes(q);
        if (!matchTitle && !matchCategory && !matchSku && !matchColor) return false;
      }

      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Status
      if (selectedStatus !== 'all' && p.status !== selectedStatus) {
        return false;
      }

      // Stock filter
      const totalStock = p.sizes?.reduce((sum, s) => sum + (s.stock || 0), 0) || p.stock || 0;
      if (stockFilter === 'low-stock' && totalStock > 10) return false;
      if (stockFilter === 'out-of-stock' && totalStock > 0) return false;
      if (stockFilter === 'in-stock' && totalStock === 0) return false;

      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedStatus, stockFilter]);

  // Open Add Drawer
  const handleOpenAddDrawer = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      sku: `DRIP-${Math.floor(1000 + Math.random() * 9000)}`,
      category: 'graphic-tees',
      price: 999,
      originalPrice: 1499,
      status: 'Active',
      color: 'Black',
      description: 'Streetwear staple tailored for heavyweight drape and premium everyday comfort.',
      fabricGsm: '280 GSM',
      fit: 'Oversized Boxy Drop Shoulder',
      image: '/images/products/midnight-graphic-tee.png',
      galleryImages: ['/images/products/midnight-graphic-tee.png'],
      isNew: true,
      isBestSeller: false,
      sizes: [
        { size: 'S', stock: 8 },
        { size: 'M', stock: 15 },
        { size: 'L', stock: 15 },
        { size: 'XL', stock: 10 },
        { size: 'XXL', stock: 4 },
      ],
    });
    setIsDrawerOpen(true);
  };

  // Open Edit Drawer
  const handleOpenEditDrawer = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title || '',
      sku: product.sku || product.id,
      category: product.category || 'graphic-tees',
      price: product.price || 999,
      originalPrice: product.originalPrice || product.price + 500,
      status: product.status || 'Active',
      color: product.color || 'Black',
      description: product.description || '',
      fabricGsm: product.fabricGsm || '280 GSM',
      fit: product.fit || 'Oversized Boxy Fit',
      image: product.image || '',
      galleryImages: product.images || [product.image],
      isNew: product.isNew || false,
      isBestSeller: product.isBestSeller || false,
      sizes: product.sizes || [
        { size: 'S', stock: 5 },
        { size: 'M', stock: 10 },
        { size: 'L', stock: 10 },
        { size: 'XL', stock: 5 },
        { size: 'XXL', stock: 2 },
      ],
    });
    setIsDrawerOpen(true);
  };

  // Save product (Add or Update)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    const catObj = categories.find((c) => c.id === formData.category);
    const categoryName = catObj ? catObj.name : formData.category;

    const payload = {
      ...formData,
      categoryName,
      discount: `${Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)}% OFF`,
    };

    if (editingProduct) {
      adminDataService.updateProduct(editingProduct.id, payload);
    } else {
      adminDataService.addProduct(payload);
    }

    reloadData();
    setIsDrawerOpen(false);
    setSearchParams({});
  };

  // Duplicate Product
  const handleDuplicate = (id) => {
    adminDataService.duplicateProduct(id);
    reloadData();
  };

  // Delete Product
  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      adminDataService.deleteProduct(deleteTargetId);
      setDeleteTargetId(null);
      reloadData();
    }
  };

  // Quick Status Toggle
  const handleToggleStatus = (product, newStatus) => {
    adminDataService.updateProduct(product.id, { status: newStatus });
    reloadData();
  };

  // Stock size update in form
  const handleSizeStockChange = (idx, newStock) => {
    const nextSizes = [...formData.sizes];
    nextSizes[idx].stock = Math.max(0, parseInt(newStock) || 0);
    setFormData({ ...formData, sizes: nextSizes });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Inventory Management</span>
            <span>•</span>
            <span className="text-emerald-600 font-bold">{products.length} Items Total</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Products Catalog
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={reloadData}
            className="p-2 bg-white text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            title="Refresh product list"
          >
            <RefreshCw size={15} />
          </button>

          <button
            onClick={handleOpenAddDrawer}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
          >
            <Plus size={16} />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Search */}
          <div className="lg:col-span-4 relative">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product title, SKU, color..."
              className="w-full bg-slate-50 border border-slate-200 pl-9 pr-3 py-2 rounded-lg text-xs focus:outline-none focus:bg-white focus:border-indigo-500"
            />
          </div>

          {/* Category Filter */}
          <div className="lg:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs font-medium focus:outline-none focus:bg-white focus:border-indigo-500"
            >
              <option value="all">All Categories (7)</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="lg:col-span-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs font-medium focus:outline-none focus:bg-white focus:border-indigo-500"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          {/* Stock Filter */}
          <div className="lg:col-span-3">
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs font-medium focus:outline-none focus:bg-white focus:border-indigo-500"
            >
              <option value="all">All Inventory Levels</option>
              <option value="low-stock">Low Stock (≤ 10 units)</option>
              <option value="out-of-stock">Out of Stock (0 units)</option>
              <option value="in-stock">In Stock (&gt; 0 units)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Product</th>
                <th className="px-5 py-3.5">SKU / ID</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Price</th>
                <th className="px-5 py-3.5">Inventory</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-500">
                    No products found matching active filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const totalStock = p.sizes?.reduce((sum, s) => sum + (s.stock || 0), 0) || p.stock || 0;
                  const isLow = totalStock <= 10 && totalStock > 0;
                  const isOut = totalStock === 0;

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Product Thumbnail & Title */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-11 h-11 rounded-lg object-contain bg-slate-100 border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0 max-w-xs">
                            <div className="font-bold text-slate-900 truncate">
                              {p.title}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate flex items-center gap-2">
                              <span>{p.color || 'Streetwear'}</span>
                              {p.isNew && (
                                <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-1 rounded">
                                  NEW
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="px-5 py-3.5 font-mono text-slate-500">
                        {p.sku || p.id.replace('prod_', '').slice(0, 10).toUpperCase()}
                      </td>

                      {/* Category */}
                      <td className="px-5 py-3.5">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                          {p.categoryName || p.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-3.5">
                        <span className="font-bold text-slate-900">₹{p.price}</span>
                        {p.originalPrice && p.originalPrice > p.price && (
                          <span className="text-slate-400 line-through text-[11px] ml-1.5">
                            ₹{p.originalPrice}
                          </span>
                        )}
                      </td>

                      {/* Stock Inventory */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono font-bold ${
                              isOut
                                ? 'text-rose-600'
                                : isLow
                                ? 'text-amber-600'
                                : 'text-slate-800'
                            }`}
                          >
                            {totalStock} in stock
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 flex gap-1 mt-0.5">
                          {p.sizes?.map((s) => (
                            <span key={s.size} className="bg-slate-50 px-1 border border-slate-100">
                              {s.size}:{s.stock}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        <StatusBadge status={p.status || 'Active'} />
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditDrawer(p)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                            title="Edit product"
                          >
                            <Edit2 size={14} />
                          </button>

                          <button
                            onClick={() => handleDuplicate(p.id)}
                            className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                            title="Duplicate product"
                          >
                            <Copy size={14} />
                          </button>

                          <button
                            onClick={() => setDeleteTargetId(p.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                            title="Delete product"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT PRODUCT DRAWER */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSearchParams({});
        }}
        title={editingProduct ? 'Edit Streetwear Product' : 'Add New Streetwear Product'}
        subtitle={editingProduct ? `SKU: ${formData.sku}` : 'Fill in the specifications to publish or draft a product'}
        width="max-w-2xl"
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="product-form"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
            >
              {editingProduct ? 'Save Changes' : 'Create Product'}
            </button>
          </>
        }
      >
        <form id="product-form" onSubmit={handleSaveProduct} className="space-y-6 text-xs">
          {/* General Information */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-2">
              1. General Details
            </h4>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Master Angel Raglan"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500 font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  SKU Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="DRIP-7821"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-mono focus:outline-none focus:bg-white focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Category Section *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500 font-medium"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Color Scheme *
                </label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="e.g. Black / White"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500 font-semibold"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Description & Streetwear Fit Notes
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product design inspiration, wash notes, and styling recommendations..."
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Pricing & Fabric Specs */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-2">
              2. Pricing & Fabric Specifications
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Selling Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Original Strikethrough Price (₹)
                </label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Fabric Weight (GSM)
                </label>
                <input
                  type="text"
                  value={formData.fabricGsm}
                  onChange={(e) => setFormData({ ...formData, fabricGsm: e.target.value })}
                  placeholder="e.g. 350 GSM Heavy Waffle"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Fit Type
                </label>
                <input
                  type="text"
                  value={formData.fit}
                  onChange={(e) => setFormData({ ...formData, fit: e.target.value })}
                  placeholder="e.g. Oversized Boxy Fit"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Size & Stock Inventory Matrix */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-2">
              3. Size Stock Matrix
            </h4>

            <div className="grid grid-cols-5 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
              {formData.sizes.map((s, idx) => (
                <div key={s.size} className="text-center">
                  <label className="block font-bold text-slate-700 mb-1">
                    {s.size}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={s.stock}
                    onChange={(e) => handleSizeStockChange(idx, e.target.value)}
                    className="w-full bg-white border border-slate-300 p-1.5 text-center font-mono rounded focus:border-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Media Image URLs */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-2">
              4. Product Media & Images
            </h4>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Primary Clean Image Path / URL *
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/products/waffle-master-angel-raglan-black-white.png"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-mono focus:outline-none focus:bg-white focus:border-indigo-500 text-[11px]"
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-10 h-10 object-contain bg-slate-100 rounded border border-slate-300 shrink-0"
                  />
                )}
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600"
                />
                <span className="font-bold text-slate-700">Mark as New Arrival</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isBestSeller}
                  onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600"
                />
                <span className="font-bold text-slate-700">Mark as Featured / Top Pick</span>
              </label>
            </div>
          </div>
        </form>
      </Drawer>

      {/* DELETE CONFIRMATION MODAL */}
      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Product from Catalog?"
        message="This will permanently remove the product card and its inventory records from the Drip Clothing catalog."
        confirmText="Delete Product"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export default AdminProducts;
