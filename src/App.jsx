import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ShoppingCart, Users, DollarSign, TrendingUp, Search, Eye, Edit, Trash2, Plus, X, Bell, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

const salesData = [
  { month: 'Jan', revenue: 45000, orders: 234, customers: 189, profit: 12000 },
  { month: 'Feb', revenue: 52000, orders: 267, customers: 215, profit: 15600 },
  { month: 'Mar', revenue: 48000, orders: 245, customers: 198, profit: 13200 },
  { month: 'Apr', revenue: 61000, orders: 312, customers: 256, profit: 18300 },
  { month: 'May', revenue: 55000, orders: 289, customers: 234, profit: 16500 },
  { month: 'Jun', revenue: 67000, orders: 345, customers: 289, profit: 20100 },
];

const categoryData = [
  { name: 'Electronics', value: 35, sales: 45000, growth: 12.5 },
  { name: 'Clothing', value: 25, sales: 32000, growth: 8.3 },
  { name: 'Home & Garden', value: 20, sales: 26000, growth: -3.2 },
  { name: 'Sports', value: 12, sales: 15000, growth: 15.7 },
  { name: 'Books', value: 8, sales: 10000, growth: 5.4 },
];

const initialUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', orders: 12, spent: 2340, status: 'Active', joined: '2024-01-15', avatar: 'AJ', lastActive: '2 hours ago' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', orders: 8, spent: 1890, status: 'Active', joined: '2024-02-20', avatar: 'BS', lastActive: '1 day ago' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com', orders: 15, spent: 3200, status: 'Active', joined: '2023-11-10', avatar: 'CW', lastActive: '3 hours ago' },
  { id: 4, name: 'David Brown', email: 'david@example.com', orders: 5, spent: 780, status: 'Inactive', joined: '2024-03-05', avatar: 'DB', lastActive: '2 weeks ago' },
  { id: 5, name: 'Emma Davis', email: 'emma@example.com', orders: 20, spent: 4500, status: 'Active', joined: '2023-09-12', avatar: 'ED', lastActive: '30 mins ago' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', orders: 3, spent: 450, status: 'Active', joined: '2024-04-18', avatar: 'FM', lastActive: '5 hours ago' },
];

const initialOrders = [
  { id: '#ORD-1001', customer: 'Alice Johnson', product: 'iPhone 15 Pro', amount: 1299, status: 'Delivered', date: '2024-06-15', payment: 'Credit Card' },
  { id: '#ORD-1002', customer: 'Bob Smith', product: 'Nike Air Max', amount: 189, status: 'Processing', date: '2024-06-14', payment: 'PayPal' },
  { id: '#ORD-1003', customer: 'Carol Williams', product: 'MacBook Air', amount: 1445, status: 'Shipped', date: '2024-06-14', payment: 'Credit Card' },
  { id: '#ORD-1004', customer: 'Emma Davis', product: 'Sony Camera', amount: 678, status: 'Delivered', date: '2024-06-13', payment: 'Debit Card' },
  { id: '#ORD-1005', customer: 'Frank Miller', product: 'Headphones', amount: 123, status: 'Processing', date: '2024-06-13', payment: 'PayPal' },
  { id: '#ORD-1006', customer: 'Alice Johnson', product: 'iPad Pro', amount: 899, status: 'Shipped', date: '2024-06-12', payment: 'Credit Card' },
  { id: '#ORD-1007', customer: 'Bob Smith', product: 'Smart Watch', amount: 399, status: 'Delivered', date: '2024-06-12', payment: 'PayPal' },
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export default function EcommerceDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState(initialUsers);
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [userForm, setUserForm] = useState({ name: '', email: '', orders: 0, spent: 0, status: 'Active' });
  const [loading, setLoading] = useState(false);
  const [notifications] = useState(3);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [users, searchTerm, filterStatus]);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.product.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [orders, searchTerm, filterStatus]);

  const stats = {
    totalRevenue: salesData.reduce((sum, item) => sum + item.revenue, 0),
    totalOrders: orders.length,
    totalCustomers: users.length,
    avgOrderValue: (salesData.reduce((sum, item) => sum + item.revenue, 0) / orders.length).toFixed(2),
    revenueGrowth: 12.5,
    ordersGrowth: 8.2,
    customersGrowth: 15.3,
    avgGrowth: 5.7,
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setUserForm({ name: '', email: '', orders: 0, spent: 0, status: 'Active' });
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm({ name: user.name, email: user.email, orders: user.orders, spent: user.spent, status: user.status });
    setShowUserModal(true);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSaveUser = () => {
    if (!userForm.name || !userForm.email) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userForm } : u));
    } else {
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...userForm,
        joined: new Date().toISOString().split('T')[0],
        avatar: userForm.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        lastActive: 'Just now'
      };
      setUsers([...users, newUser]);
    }
    setShowUserModal(false);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Processing': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Inactive': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-200">
          <p className="font-semibold text-slate-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-200/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                E-commerce Pro
              </h1>
              <p className="text-sm text-slate-600 mt-0.5">Manage your store with intelligence</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleRefresh} className={`p-2 hover:bg-slate-100 rounded-lg transition ${loading ? 'animate-spin' : ''}`}>
                <RefreshCw size={20} className="text-slate-600" />
              </button>
              <div className="relative">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition relative">
                  <Bell size={20} className="text-slate-600" />
                  {notifications > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </button>
              </div>
              <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-slate-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">Admin User</p>
                  <p className="text-xs text-slate-500">admin@store.com</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  AU
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {['overview', 'analytics', 'users', 'orders'].map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSearchTerm('');
                setFilterStatus('all');
              }}
              className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 capitalize ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
                  : 'bg-white/60 backdrop-blur-sm text-slate-600 hover:bg-white hover:shadow-md'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'from-emerald-500 to-teal-600', change: stats.revenueGrowth, bgPattern: 'from-emerald-50 to-teal-50' },
                { title: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'from-blue-500 to-indigo-600', change: stats.ordersGrowth, bgPattern: 'from-blue-50 to-indigo-50' },
                { title: 'Customers', value: stats.totalCustomers, icon: Users, color: 'from-purple-500 to-pink-600', change: stats.customersGrowth, bgPattern: 'from-purple-50 to-pink-50' },
                { title: 'Avg Order Value', value: `$${stats.avgOrderValue}`, icon: TrendingUp, color: 'from-orange-500 to-red-600', change: stats.avgGrowth, bgPattern: 'from-orange-50 to-red-50' },
              ].map((stat, idx) => (
                <div key={idx} className={`relative overflow-hidden bg-gradient-to-br ${stat.bgPattern} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/60`}>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                        <stat.icon className="text-white" size={24} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {stat.change >= 0 ? <ArrowUpRight size={16} className="text-emerald-600" /> : <ArrowDownRight size={16} className="text-red-600" />}
                      <span className={`text-sm font-semibold ${stat.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{Math.abs(stat.change)}%</span>
                      <span className="text-xs text-slate-500">vs last month</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/60">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Revenue & Profit Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/60">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Sales by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 overflow-hidden">
              <div className="p-6 border-b border-slate-200/60">
                <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50/80">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Order ID</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Product</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition">
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">{order.id}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{order.customer}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{order.product}</td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-900">${order.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>{order.status}</span>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleViewOrder(order)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                            <Eye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/60">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Orders & Customer Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="orders" stroke="#6366f1" strokeWidth={3} />
                    <Line type="monotone" dataKey="customers" stroke="#8b5cf6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/60">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Category Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="sales" fill="#6366f1" radius={[12, 12, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Category Insights</h3>
              <div className="grid gap-4">
                {categoryData.map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl hover:bg-slate-100/50 transition">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: COLORS[idx] }}>{cat.name[0]}</div>
                      <div>
                        <p className="font-semibold text-slate-900">{cat.name}</p>
                        <p className="text-sm text-slate-600">{cat.value}% of total sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-900">${cat.sales.toLocaleString()}</p>
                      <div className="flex items-center gap-1 justify-end">
                        {cat.growth >= 0 ? <ArrowUpRight size={14} className="text-emerald-600" /> : <ArrowDownRight size={14} className="text-red-600" />}
                        <span className={`text-sm font-semibold ${cat.growth >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{Math.abs(cat.growth)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/60">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input type="text" placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="flex gap-2">
                  <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <button onClick={handleAddUser} className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition flex items-center gap-2">
                    <Plus size={16} />Add User
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50/80">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">User</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Orders</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Spent</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">{user.avatar}</div>
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                              <p className="text-xs text-slate-500">{user.lastActive}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">{user.email}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">{user.orders}</td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-900">${user.spent}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(user.status)}`}>{user.status}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => handleEditUser(user)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => handleDeleteUser(user.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/60">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input type="text" placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="all">All Status</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50/80">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Order ID</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Product</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Payment</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition">
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">{order.id}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{order.customer}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{order.product}</td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-900">${order.amount}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{order.payment}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>{order.status}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">{order.date}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleViewOrder(order)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                            <Eye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all">
            <div className="flex justify-between items-center p-6 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">{editingUser ? 'Edit User' : 'Add New User'}</h3>
              <button onClick={() => setShowUserModal(false)} className="p-2 hover:bg-slate-100 rounded-lg transition">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Name *</label>
                <input type="text" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Enter full name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                <input type="email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Enter email address" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Total Orders</label>
                  <input type="number" value={userForm.orders} onChange={(e) => setUserForm({ ...userForm, orders: parseInt(e.target.value) || 0 })} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Total Spent ($)</label>
                  <input type="number" value={userForm.spent} onChange={(e) => setUserForm({ ...userForm, spent: parseInt(e.target.value) || 0 })} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                <select value={userForm.status} onChange={(e) => setUserForm({ ...userForm, status: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 flex gap-3">
              <button onClick={() => setShowUserModal(false)} className="flex-1 px-6 py-3 border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-50 transition">
                Cancel
              </button>
              <button onClick={handleSaveUser} className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-lg">
                {editingUser ? 'Update' : 'Add'} User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full transform transition-all">
            <div className="flex justify-between items-center p-6 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">Order Details</h3>
              <button onClick={() => setShowOrderModal(false)} className="p-2 hover:bg-slate-100 rounded-lg transition">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <div>
                  <p className="text-sm text-slate-600">Order ID</p>
                  <p className="text-lg font-bold text-slate-900">{selectedOrder.id}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(selectedOrder.status)}`}>{selectedOrder.status}</span>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Customer</p>
                  <p className="text-base font-semibold text-slate-900">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Product</p>
                  <p className="text-base font-semibold text-slate-900">{selectedOrder.product}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Amount</p>
                    <p className="text-lg font-bold text-slate-900">${selectedOrder.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Payment Method</p>
                    <p className="text-base font-semibold text-slate-900">{selectedOrder.payment}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Order Date</p>
                  <p className="text-base font-semibold text-slate-900">{selectedOrder.date}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm font-semibold text-slate-700 mb-3">Update Status</p>
                <div className="flex gap-2">
                  {['Processing', 'Shipped', 'Delivered'].map(status => (
                    <button key={status} onClick={() => handleUpdateOrderStatus(selectedOrder.id, status)} className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition ${selectedOrder.status === status ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200">
              <button onClick={() => setShowOrderModal(false)} className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-lg">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
