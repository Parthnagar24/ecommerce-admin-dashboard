// Data
const salesData = [
  { month: 'Jan', revenue: 45000, orders: 234, customers: 189, profit: 12000 },
  { month: 'Feb', revenue: 52000, orders: 267, customers: 215, profit: 15600 },
  { month: 'Mar', revenue: 48000, orders: 245, customers: 198, profit: 13200 },
  { month: 'Apr', revenue: 61000, orders: 312, customers: 256, profit: 18300 },
  { month: 'May', revenue: 55000, orders: 289, customers: 234, profit: 16500 },
  { month: 'Jun', revenue: 67000, orders: 345, customers: 289, profit: 20100 },
];

const categoryData = [
  { name: 'Electronics', value: 35, sales: 45000, growth: 12.5, color: '#6366f1' },
  { name: 'Clothing', value: 25, sales: 32000, growth: 8.3, color: '#8b5cf6' },
  { name: 'Home & Garden', value: 20, sales: 26000, growth: -3.2, color: '#ec4899' },
  { name: 'Sports', value: 12, sales: 15000, growth: 15.7, color: '#f59e0b' },
  { name: 'Books', value: 8, sales: 10000, growth: 5.4, color: '#10b981' },
];

let users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', orders: 12, spent: 2340, status: 'Active', joined: '2024-01-15', avatar: 'AJ', lastActive: '2 hours ago' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', orders: 8, spent: 1890, status: 'Active', joined: '2024-02-20', avatar: 'BS', lastActive: '1 day ago' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com', orders: 15, spent: 3200, status: 'Active', joined: '2023-11-10', avatar: 'CW', lastActive: '3 hours ago' },
  { id: 4, name: 'David Brown', email: 'david@example.com', orders: 5, spent: 780, status: 'Inactive', joined: '2024-03-05', avatar: 'DB', lastActive: '2 weeks ago' },
  { id: 5, name: 'Emma Davis', email: 'emma@example.com', orders: 20, spent: 4500, status: 'Active', joined: '2023-09-12', avatar: 'ED', lastActive: '30 mins ago' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', orders: 3, spent: 450, status: 'Active', joined: '2024-04-18', avatar: 'FM', lastActive: '5 hours ago' },
];

let orders = [
  { id: '#ORD-1001', customer: 'Alice Johnson', product: 'iPhone 15 Pro', amount: 1299, status: 'Delivered', date: '2024-06-15', payment: 'Credit Card' },
  { id: '#ORD-1002', customer: 'Bob Smith', product: 'Nike Air Max', amount: 189, status: 'Processing', date: '2024-06-14', payment: 'PayPal' },
  { id: '#ORD-1003', customer: 'Carol Williams', product: 'MacBook Air', amount: 1445, status: 'Shipped', date: '2024-06-14', payment: 'Credit Card' },
  { id: '#ORD-1004', customer: 'Emma Davis', product: 'Sony Camera', amount: 678, status: 'Delivered', date: '2024-06-13', payment: 'Debit Card' },
  { id: '#ORD-1005', customer: 'Frank Miller', product: 'Headphones', amount: 123, status: 'Processing', date: '2024-06-13', payment: 'PayPal' },
  { id: '#ORD-1006', customer: 'Alice Johnson', product: 'iPad Pro', amount: 899, status: 'Shipped', date: '2024-06-12', payment: 'Credit Card' },
  { id: '#ORD-1007', customer: 'Bob Smith', product: 'Smart Watch', amount: 399, status: 'Delivered', date: '2024-06-12', payment: 'PayPal' },
];

let editingUserId = null;
let charts = {};

// Tab Switching
function switchTab(tabName) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
  
  event.target.classList.add('active');
  document.getElementById(`${tabName}-tab`).classList.remove('hidden');

  if (tabName === 'analytics' && !charts.ordersChart) {
    initAnalyticsCharts();
  }
}

// Initialize Charts
function initCharts() {
  const revenueCtx = document.getElementById('revenueChart').getContext('2d');
  charts.revenueChart = new Chart(revenueCtx, {
    type: 'line',
    data: {
      labels: salesData.map(d => d.month),
      datasets: [{
        label: 'Revenue',
        data: salesData.map(d => d.revenue),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: true, position: 'bottom' }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  const categoryCtx = document.getElementById('categoryChart').getContext('2d');
  charts.categoryChart = new Chart(categoryCtx, {
    type: 'doughnut',
    data: {
      labels: categoryData.map(d => d.name),
      datasets: [{
        data: categoryData.map(d => d.value),
        backgroundColor: categoryData.map(d => d.color),
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: true, position: 'bottom' }
      }
    }
  });
}

function initAnalyticsCharts() {
  const ordersCtx = document.getElementById('ordersChart').getContext('2d');
  charts.ordersChart = new Chart(ordersCtx, {
    type: 'line',
    data: {
      labels: salesData.map(d => d.month),
      datasets: [
        {
          label: 'Orders',
          data: salesData.map(d => d.orders),
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          tension: 0.4,
          borderWidth: 3
        },
        {
          label: 'Customers',
          data: salesData.map(d => d.customers),
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          tension: 0.4,
          borderWidth: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: true, position: 'bottom' }
      }
    }
  });

  const performanceCtx = document.getElementById('performanceChart').getContext('2d');
  charts.performanceChart = new Chart(performanceCtx, {
    type: 'bar',
    data: {
      labels: categoryData.map(d => d.name),
      datasets: [{
        label: 'Sales',
        data: categoryData.map(d => d.sales),
        backgroundColor: '#6366f1',
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false }
      }
    }
  });

  renderCategoryInsights();
}

function renderCategoryInsights() {
  const list = document.getElementById('categoryList');
  list.innerHTML = categoryData.map((cat, idx) => `
    <div class="category-item">
      <div class="category-left">
        <div class="category-icon" style="background-color: ${cat.color};">
          ${cat.name[0]}
        </div>
        <div>
          <div class="category-name">${cat.name}</div>
          <div class="category-percent">${cat.value}% of total sales</div>
        </div>
      </div>
      <div class="category-right">
        <div class="category-sales">$${cat.sales.toLocaleString()}</div>
        <div class="category-growth">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${cat.growth >= 0 ? '#059669' : '#dc2626'}" stroke-width="2">
            <polyline points="${cat.growth >= 0 ? '23 6 13.5 15.5 8.5 10.5 1 18' : '23 18 13.5 8.5 8.5 13.5 1 6'}"/>
          </svg>
          <span style="color: ${cat.growth >= 0 ? '#059669' : '#dc2626'}; font-size: 0.875rem; font-weight: 600;">
            ${Math.abs(cat.growth)}%
          </span>
        </div>
      </div>
    </div>
  `).join('');
}

// Render Tables
function renderOrdersTable() {
  const tbody = document.getElementById('ordersTableBody');
  tbody.innerHTML = orders.slice(0, 5).map(order => `
    <tr>
      <td style="font-weight: 600;">${order.id}</td>
      <td style="color: #475569;">${order.customer}</td>
      <td style="color: #475569;">${order.product}</td>
      <td style="font-weight: 700;">$${order.amount}</td>
      <td><span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span></td>
      <td>
        <button class="action-btn view" onclick="viewOrder('${order.id}')">
          <svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
          </svg>
        </button>
      </td>
    </tr>
  `).join('');
}

function renderUsersTable() {
  const searchTerm = document.getElementById('userSearch')?.value.toLowerCase() || '';
  const filterStatus = document.getElementById('userFilter')?.value || 'all';

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm) || 
                         user.email.toLowerCase().includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const tbody = document.getElementById('usersTableBody');
  tbody.innerHTML = filteredUsers.map(user => `
    <tr>
      <td>
        <div class="user-cell">
          <div class="user-avatar-small">${user.avatar}</div>
          <div>
            <div class="user-name">${user.name}</div>
            <div class="user-active">${user.lastActive}</div>
          </div>
        </div>
      </td>
      <td style="color: #475569;">${user.email}</td>
      <td style="font-weight: 600;">${user.orders}</td>
      <td style="font-weight: 700;">$${user.spent}</td>
      <td><span class="status-badge status-${user.status.toLowerCase()}">${user.status}</span></td>
      <td>
        <button class="action-btn edit" onclick="editUser(${user.id})">
          <svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button class="action-btn delete" onclick="deleteUser(${user.id})">
          <svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      </td>
    </tr>
  `).join('');
}

function renderAllOrdersTable() {
  const searchTerm = document.getElementById('orderSearch')?.value.toLowerCase() || '';
  const filterStatus = document.getElementById('orderFilter')?.value || 'all';

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm) ||
                         order.customer.toLowerCase().includes(searchTerm) ||
                         order.product.toLowerCase().includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const tbody = document.getElementById('allOrdersTableBody');
  tbody.innerHTML = filteredOrders.map(order => `
    <tr>
      <td style="font-weight: 600;">${order.id}</td>
      <td style="color: #475569;">${order.customer}</td>
      <td style="color: #475569;">${order.product}</td>
      <td style="font-weight: 700;">$${order.amount}</td>
      <td style="color: #475569;">${order.payment}</td>
      <td><span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span></td>
      <td style="color: #475569;">${order.date}</td>
      <td>
        <button class="action-btn view" onclick="viewOrder('${order.id}')">
          <svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
          </svg>
        </button>
      </td>
    </tr>
  `).join('');
}

// User Modal Functions
function openUserModal() {
  editingUserId = null;
  document.getElementById('userModalTitle').textContent = 'Add New User';
  document.getElementById('userName').value = '';
  document.getElementById('userEmail').value = '';
  document.getElementById('userOrders').value = '0';
  document.getElementById('userSpent').value = '0';
  document.getElementById('userStatus').value = 'Active';
  document.getElementById('userModal').classList.add('active');
}

function closeUserModal() {
  document.getElementById('userModal').classList.remove('active');
}

function editUser(id) {
  const user = users.find(u => u.id === id);
  if (!user) return;

  editingUserId = id;
  document.getElementById('userModalTitle').textContent = 'Edit User';
  document.getElementById('userName').value = user.name;
  document.getElementById('userEmail').value = user.email;
  document.getElementById('userOrders').value = user.orders;
  document.getElementById('userSpent').value = user.spent;
  document.getElementById('userStatus').value = user.status;
  document.getElementById('userModal').classList.add('active');
}

function saveUser() {
  const name = document.getElementById('userName').value;
  const email = document.getElementById('userEmail').value;
  const orderCount = parseInt(document.getElementById('userOrders').value) || 0;
  const spent = parseInt(document.getElementById('userSpent').value) || 0;
  const status = document.getElementById('userStatus').value;

  if (!name || !email) {
    alert('Please fill in all required fields');
    return;
  }

  if (editingUserId) {
    const index = users.findIndex(u => u.id === editingUserId);
    users[index] = { ...users[index], name, email, orders: orderCount, spent, status };
  } else {
    const newUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name,
      email,
      orders: orderCount,
      spent,
      status,
      joined: new Date().toISOString().split('T')[0],
      avatar: name.split(' ').map(n => n[0]).join('').toUpperCase(),
      lastActive: 'Just now'
    };
    users.push(newUser);
  }

  renderUsersTable();
  closeUserModal();
}

function deleteUser(id) {
  if (confirm('Are you sure you want to delete this user?')) {
    users = users.filter(u => u.id !== id);
    renderUsersTable();
  }
}

// Order Modal Functions
function viewOrder(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const body = document.getElementById('orderDetailsBody');
  body.innerHTML = `
    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 1rem; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-size: 0.875rem; color: #64748b;">Order ID</div>
        <div style="font-size: 1.125rem; font-weight: 700; color: #0f172a;">${order.id}</div>
      </div>
      <span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span>
    </div>
    <div style="margin-bottom: 0.75rem;">
      <div style="font-size: 0.875rem; color: #64748b;">Customer</div>
      <div style="font-weight: 600; color: #0f172a;">${order.customer}</div>
    </div>
    <div style="margin-bottom: 0.75rem;">
      <div style="font-size: 0.875rem; color: #64748b;">Product</div>
      <div style="font-weight: 600; color: #0f172a;">${order.product}</div>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 0.75rem;">
      <div>
        <div style="font-size: 0.875rem; color: #64748b;">Amount</div>
        <div style="font-size: 1.125rem; font-weight: 700; color: #0f172a;">$${order.amount}</div>
      </div>
      <div>
        <div style="font-size: 0.875rem; color: #64748b;">Payment Method</div>
        <div style="font-weight: 600; color: #0f172a;">${order.payment}</div>
      </div>
    </div>
    <div>
      <div style="font-size: 0.875rem; color: #64748b;">Order Date</div>
      <div style="font-weight: 600; color: #0f172a;">${order.date}</div>
    </div>
    <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
      <div style="font-size: 0.875rem; font-weight: 600; color: #475569; margin-bottom: 0.75rem;">Update Status</div>
      <div style="display: flex; gap: 0.5rem;">
        <button onclick="updateOrderStatus('${order.id}', 'Processing')" class="btn-${order.status === 'Processing' ? 'primary' : 'secondary'}" style="flex: 1; padding: 0.5rem;">Processing</button>
        <button onclick="updateOrderStatus('${order.id}', 'Shipped')" class="btn-${order.status === 'Shipped' ? 'primary' : 'secondary'}" style="flex: 1; padding: 0.5rem;">Shipped</button>
        <button onclick="updateOrderStatus('${order.id}', 'Delivered')" class="btn-${order.status === 'Delivered' ? 'primary' : 'secondary'}" style="flex: 1; padding: 0.5rem;">Delivered</button>
      </div>
    </div>
  `;

  document.getElementById('orderModal').classList.add('active');
}

function closeOrderModal() {
  document.getElementById('orderModal').classList.remove('active');
}

function updateOrderStatus(orderId, newStatus) {
  const index = orders.findIndex(o => o.id === orderId);
  if (index !== -1) {
    orders[index].status = newStatus;
    renderOrdersTable();
    renderAllOrdersTable();
    viewOrder(orderId);
  }
}

// Refresh Function
function handleRefresh() {
  const btn = event.currentTarget;
  btn.style.animation = 'spin 1s linear';
  setTimeout(() => {
    btn.style.animation = '';
  }, 1000);
}

// Event Listeners
document.getElementById('userSearch')?.addEventListener('input', renderUsersTable);
document.getElementById('userFilter')?.addEventListener('change', renderUsersTable);
document.getElementById('orderSearch')?.addEventListener('input', renderAllOrdersTable);
document.getElementById('orderFilter')?.addEventListener('change', renderAllOrdersTable);

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
  initCharts();
  renderOrdersTable();
  renderUsersTable();
  renderAllOrdersTable();
});
