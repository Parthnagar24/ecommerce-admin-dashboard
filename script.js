// --- DATA ---
const salesData = [
    { month: 'Jan', revenue: 45000, orders: 234, customers: 189, profit: 12000 },
    { month: 'Feb', revenue: 52000, orders: 267, customers: 215, profit: 15600 },
    { month: 'Mar', revenue: 48000, orders: 245, customers: 198, profit: 13200 },
    { month: 'Apr', revenue: 61000, orders: 312, customers: 256, profit: 18300 },
    { month: 'May', revenue: 55000, orders: 289, customers: 234, profit: 16500 },
    { month: 'Jun', revenue: 67000, orders: 345, customers: 289, profit: 20100 },
];

const categoryData = [
    { name: 'Electronics', value: 35, sales: 45000, growth: 12.5, color: '#4f46e5' }, 
    { name: 'Clothing', value: 25, sales: 32000, growth: 8.3, color: '#7c3aed' },    
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
    { id: '#ORD-1001', customer: 'Alice Johnson', product: 'iPhone 15 Pro', amount: 1299, status: 'Delivered', date: '2024-06-15', payment: 'Credit Card', details: 'A high-end smartphone.' },
    { id: '#ORD-1002', customer: 'Bob Smith', product: 'Nike Air Max', amount: 189, status: 'Processing', date: '2024-06-14', payment: 'PayPal', details: 'Running shoes, size 10.' },
    { id: '#ORD-1003', customer: 'Carol Williams', product: 'MacBook Air', amount: 1445, status: 'Shipped', date: '2024-06-14', payment: 'Credit Card', details: 'Laptop for professional use.' },
    { id: '#ORD-1004', customer: 'Emma Davis', product: 'Sony Camera', amount: 678, status: 'Delivered', date: '2024-06-13', payment: 'Debit Card', details: 'Digital camera with extra lens.' },
    { id: '#ORD-1005', customer: 'Frank Miller', product: 'Headphones', amount: 123, status: 'Processing', date: '2024-06-13', payment: 'PayPal', details: 'Noise-cancelling headphones.' },
    { id: '#ORD-1006', customer: 'Alice Johnson', product: 'iPad Pro', amount: 899, status: 'Shipped', date: '2024-06-12', payment: 'Credit Card', details: 'Tablet for drawing and notes.' },
    { id: '#ORD-1007', customer: 'Bob Smith', product: 'Smart Watch', amount: 399, status: 'Delivered', date: '2024-06-12', payment: 'PayPal', details: 'Fitness tracker and smartwatch.' },
];

const mockNotifications = [
    { id: 1, text: "Order #ORD-1008 is processing.", time: "5 mins ago", icon: "📦" },
    { id: 2, text: "New user registered: John Doe.", time: "1 hour ago", icon: "👤" },
    { id: 3, text: "Low stock alert for iPhone 15 Pro.", time: "3 hours ago", icon: "⚠️" },
];

let editingUserId = null;
let charts = {};

// --- UTILITIES & MODAL/DROPDOWN CONTROLS ---

function showMessage(message, type = 'error') {
    const box = document.getElementById('messageBox');
    box.textContent = message;
    box.classList.remove('bg-red-500', 'bg-green-500', 'hidden', 'opacity-0');
    box.classList.add(type === 'error' ? 'bg-red-500' : 'bg-green-500', 'opacity-100');
    box.style.display = 'block';

    setTimeout(() => {
        box.classList.add('opacity-0');
        box.addEventListener('transitionend', () => box.style.display = 'none', { once: true });
    }, 3000);
}

function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    document.querySelectorAll('.dropdown.active').forEach(d => {
        if (d.id !== dropdownId) {
            d.classList.remove('active');
        }
    });
    dropdown.classList.toggle('active');
}

function toggleNotificationDropdown() {
    toggleDropdown('notificationDropdown');
    renderNotifications();
    // Clear the badge when opened
    document.getElementById('notificationBadge').style.display = 'none';
}

function toggleUserDropdown() {
    toggleDropdown('userDropdown');
}

function handleSignOut() {
    showMessage("Signing out... (Mock action)", "error");
    // Add actual sign-out logic here
    toggleUserDropdown();
}

function renderNotifications() {
    const list = document.getElementById('notificationList');
    const noNoti = document.getElementById('noNotifications');
    
    if (mockNotifications.length === 0) {
        list.innerHTML = '';
        noNoti.classList.remove('hidden');
        return;
    }

    noNoti.classList.add('hidden');
    list.innerHTML = mockNotifications.map(n => `
        <li class="flex items-start p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
            <span class="mr-2 text-lg">${n.icon}</span>
            <div class="flex-1">
                <div class="text-gray-900 dark:text-white">${n.text}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">${n.time}</div>
            </div>
        </li>
    `).join('');
}

// --- DARK MODE LOGIC ---
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

function toggleDarkMode() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
    updateChartColors();
}

function getChartColors() {
    const isDark = document.documentElement.classList.contains('dark');
    return {
        primary: isDark ? '#8b5cf6' : '#6366f1',
        secondary: isDark ? '#a78bfa' : '#8b5cf6',
        grid: isDark ? '#374151' : '#e5e7eb',
        text: isDark ? '#d1d5db' : '#6b7280',
        tooltipBg: isDark ? '#1f2937' : 'white',
        tooltipBorder: isDark ? '#4b5563' : '#e5e7eb',
    };
}

function updateChartColors() {
    const colors = getChartColors();
    
    // Revenue Chart
    if (charts.revenueChart) {
        charts.revenueChart.data.datasets[0].borderColor = colors.primary;
        charts.revenueChart.data.datasets[0].backgroundColor = colors.primary + '20'; // 20% opacity
        charts.revenueChart.options.scales.y.grid.color = colors.grid;
        charts.revenueChart.options.scales.x.grid.color = colors.grid;
        charts.revenueChart.options.scales.y.ticks.color = colors.text;
        charts.revenueChart.options.scales.x.ticks.color = colors.text;
        charts.revenueChart.options.plugins.legend.labels.color = colors.text;
        charts.revenueChart.update();
    }

    // Orders Chart
    if (charts.ordersChart) {
        charts.ordersChart.data.datasets[0].borderColor = colors.primary;
        charts.ordersChart.data.datasets[0].backgroundColor = colors.primary + '20';
        charts.ordersChart.data.datasets[1].borderColor = colors.secondary;
        charts.ordersChart.data.datasets[1].backgroundColor = colors.secondary + '20';
        charts.ordersChart.options.scales.y.grid.color = colors.grid;
        charts.ordersChart.options.scales.x.grid.color = colors.grid;
        charts.ordersChart.options.scales.y.ticks.color = colors.text;
        charts.ordersChart.options.scales.x.ticks.color = colors.text;
        charts.ordersChart.options.plugins.legend.labels.color = colors.text;
        charts.ordersChart.update();
    }

    // Performance Chart
    if (charts.performanceChart) {
        charts.performanceChart.data.datasets[0].backgroundColor = colors.primary;
        charts.performanceChart.options.scales.y.grid.color = colors.grid;
        charts.performanceChart.options.scales.x.grid.color = colors.grid;
        charts.performanceChart.options.scales.y.ticks.color = colors.text;
        charts.performanceChart.options.scales.x.ticks.color = colors.text;
        charts.performanceChart.options.plugins.legend.labels.color = colors.text;
        charts.performanceChart.update();
    }
}

// --- TAB SWITCHING ---
function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active-tab', 'text-primary', 'dark:text-white', 'border-primary', 'border-b-2', 'font-bold'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
    
    // Use event.target if triggered by click, otherwise find the correct button
    const activeTabButton = event ? event.target : document.querySelector(`.tab[onclick*="${tabName}"]`);
    if(activeTabButton) {
        activeTabButton.classList.add('active-tab', 'text-primary', 'dark:text-white', 'border-primary', 'border-b-2', 'font-bold');
    }

    document.getElementById(`${tabName}-tab`).classList.remove('hidden');

    if (tabName === 'analytics' && !charts.ordersChart) {
        initAnalyticsCharts();
    }
    if (tabName === 'users') {
        renderUsersTable();
    }
    if (tabName === 'orders') {
        renderAllOrdersTable();
    }
}

// --- CHART INITIALIZATION ---
function initCharts() {
    const colors = getChartColors();
    const commonChartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { 
            legend: { 
                display: true, 
                position: 'bottom',
                labels: {
                    color: colors.text
                }
            },
            tooltip: {
                backgroundColor: colors.tooltipBg,
                borderColor: colors.tooltipBorder,
                borderWidth: 1,
                titleColor: colors.text,
                bodyColor: colors.text,
            }
        },
        scales: {
            x: {
                grid: { color: colors.grid },
                ticks: { color: colors.text }
            },
            y: { 
                beginAtZero: true,
                grid: { color: colors.grid },
                ticks: { color: colors.text }
            }
        }
    };

    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    charts.revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: salesData.map(d => d.month),
            datasets: [{
                label: 'Revenue ($)',
                data: salesData.map(d => d.revenue),
                borderColor: colors.primary,
                backgroundColor: colors.primary + '20',
                fill: true,
                tension: 0.4,
                borderWidth: 3
            }]
        },
        options: commonChartOptions
    });

    // Category Chart (Doughnut)
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
                legend: { 
                    display: true, 
                    position: 'bottom',
                    labels: {
                        color: colors.text
                    }
                }
            }
        }
    });
}

function initAnalyticsCharts() {
    const colors = getChartColors();
    const commonChartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { 
            legend: { 
                display: true, 
                position: 'bottom',
                labels: {
                    color: colors.text
                }
            },
            tooltip: {
                backgroundColor: colors.tooltipBg,
                borderColor: colors.tooltipBorder,
                borderWidth: 1,
                titleColor: colors.text,
                bodyColor: colors.text,
            }
        },
        scales: {
            x: {
                grid: { color: colors.grid },
                ticks: { color: colors.text }
            },
            y: { 
                beginAtZero: true,
                grid: { color: colors.grid },
                ticks: { color: colors.text }
            }
        }
    };

    // Orders & Customer Growth Chart
    const ordersCtx = document.getElementById('ordersChart').getContext('2d');
    charts.ordersChart = new Chart(ordersCtx, {
        type: 'line',
        data: {
            labels: salesData.map(d => d.month),
            datasets: [
                {
                    label: 'Orders',
                    data: salesData.map(d => d.orders),
                    borderColor: colors.primary,
                    backgroundColor: colors.primary + '20',
                    tension: 0.4,
                    borderWidth: 3
                },
                {
                    label: 'Customers',
                    data: salesData.map(d => d.customers),
                    borderColor: colors.secondary,
                    backgroundColor: colors.secondary + '20',
                    tension: 0.4,
                    borderWidth: 3
                }
            ]
        },
        options: commonChartOptions
    });

    // Category Performance Chart (Bar)
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    charts.performanceChart = new Chart(performanceCtx, {
        type: 'bar',
        data: {
            labels: categoryData.map(d => d.name),
            datasets: [{
                label: 'Sales ($)',
                data: categoryData.map(d => d.sales),
                backgroundColor: colors.primary,
                borderRadius: 8
            }]
        },
        options: {
            ...commonChartOptions,
            plugins: { legend: { display: false } },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: colors.text }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: colors.grid },
                    ticks: { color: colors.text }
                }
            }
        }
    });

    renderCategoryInsights();
    updateChartColors(); 
}

// --- RENDER FUNCTIONS ---

function renderCategoryInsights() {
    const list = document.getElementById('categoryList');
    list.innerHTML = categoryData.map(cat => {
        const growthColorClass = cat.growth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
        const growthIcon = cat.growth >= 0 ? 
            `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>` : 
            `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>`;

        return `
            <div class="flex items-center justify-between p-4 bg-gray-50/80 dark:bg-gray-700/50 rounded-lg shadow-sm hover:shadow-md transition">
                <div class="flex items-center space-x-4">
                    <div class="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md" style="background-color: ${cat.color};">${cat.name[0]}</div>
                    <div>
                        <div class="font-semibold text-gray-900 dark:text-white">${cat.name}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">${cat.value}% of total sales</div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-lg font-bold text-gray-900 dark:text-white">$${cat.sales.toLocaleString()}</div>
                    <div class="flex items-center justify-end text-sm font-medium ${growthColorClass}">
                        ${growthIcon}
                        <span>${Math.abs(cat.growth)}%</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function getStatusBadge(status) {
    const statusMap = {
        'Delivered': { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-800 dark:text-green-300', border: 'border-green-300' },
        'Shipped': { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-800 dark:text-blue-300', border: 'border-blue-300' },
        'Processing': { bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-800 dark:text-yellow-300', border: 'border-yellow-300' },
        'Active': { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-800 dark:text-green-300', border: 'border-green-300' },
        'Inactive': { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-600 dark:text-gray-300', border: 'border-gray-300' },
    };
    const s = statusMap[status] || statusMap['Processing'];
    return `<span class="px-3 py-1 text-xs font-semibold rounded-full border ${s.bg} ${s.text} ${s.border}">${status}</span>`;
}

function renderOrdersTable() {
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = orders.slice(0, 5).map(order => `
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">${order.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${order.customer}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${order.product}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">$${order.amount}</td>
            <td class="px-6 py-4 whitespace-nowrap">${getStatusBadge(order.status)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="p-2 rounded-full text-primary hover:bg-primary/10 transition" onclick="viewOrder('${order.id}')" title="View Order">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
            </td>
        </tr>
    `).join('');
}

function renderUsersTable() {
    const searchTerm = document.getElementById('userSearch')?.value.toLowerCase() || '';
    const filterStatus = document.getElementById('userFilter')?.value || 'all';

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm);
        const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = filteredUsers.map(user => `
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full bg-primary/70 dark:bg-primary-dark/70 flex items-center justify-center text-white text-xs font-semibold">${user.avatar}</div>
                    <div>
                        <div class="text-sm font-medium text-gray-900 dark:text-white">${user.name}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">${user.lastActive}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${user.email}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">${user.orders}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">$${user.spent}</td>
            <td class="px-6 py-4 whitespace-nowrap">${getStatusBadge(user.status)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1">
                <button class="p-2 rounded-full text-blue-500 hover:bg-blue-500/10 transition" onclick="editUser(${user.id})" title="Edit User">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button class="p-2 rounded-full text-red-500 hover:bg-red-500/10 transition" onclick="deleteUser(${user.id})" title="Delete User">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
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
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">${order.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${order.customer}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${order.product}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">$${order.amount}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${order.payment}</td>
            <td class="px-6 py-4 whitespace-nowrap">${getStatusBadge(order.status)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${order.date}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="p-2 rounded-full text-primary hover:bg-primary/10 transition" onclick="viewOrder('${order.id}')" title="View Order">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
            </td>
        </tr>
    `).join('');
}

// --- USER MODAL FUNCTIONS ---
function openUserModal() {
    editingUserId = null;
    document.getElementById('userModalTitle').textContent = 'Add New User';
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
    document.getElementById('userOrders').value = '0';
    document.getElementById('userSpent').value = '0';
    document.getElementById('userStatus').value = 'Active';
    document.querySelector('#userModal .btn-submit').textContent = 'Add User';
    document.getElementById('userModal').classList.add('active');
}

function closeUserModal() {
    document.getElementById('userModal').classList.remove('active');
}

function editUser(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;

    editingUserId = id;
    document.getElementById('userModalTitle').textContent = 'Edit User: ' + user.name;
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userOrders').value = user.orders;
    document.getElementById('userSpent').value = user.spent;
    document.getElementById('userStatus').value = user.status;
    document.querySelector('#userModal .btn-submit').textContent = 'Save Changes';
    document.getElementById('userModal').classList.add('active');
}

function saveUser() {
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const orderCount = parseInt(document.getElementById('userOrders').value) || 0;
    const spent = parseFloat(document.getElementById('userSpent').value) || 0;
    const status = document.getElementById('userStatus').value;
    const errorElement = document.getElementById('userModalError');
    errorElement.classList.add('hidden');

    if (!name || !email) {
        errorElement.textContent = 'Name and Email are required.';
        errorElement.classList.remove('hidden');
        return;
    }

    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
         errorElement.textContent = 'Please enter a valid email address.';
        errorElement.classList.remove('hidden');
        return;
    }

    if (editingUserId) {
        const index = users.findIndex(u => u.id === editingUserId);
        users[index] = { ...users[index], name, email, orders: orderCount, spent, status };
        showMessage('User details updated successfully!', 'success');
    } else {
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            name,
            email,
            orders: orderCount,
            spent,
            status,
            joined: new Date().toISOString().split('T')[0],
            avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
            lastActive: 'Just now'
        };
        users.push(newUser);
        showMessage('New user added successfully!', 'success');
    }

    renderUsersTable();
    closeUserModal();
}

function deleteUser(id) {
    showMessage(`User ID ${id} deleted! (This is a mock action)`, 'error');
    users = users.filter(u => u.id !== id);
    renderUsersTable();
}

// --- ORDER MODAL FUNCTIONS ---
function viewOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const body = document.getElementById('orderDetailsBody');
    body.innerHTML = `
        <div class="space-y-4">
            <div class="flex justify-between items-center pb-4 mb-4 border-b border-gray-200 dark:border-gray-700/50">
                <div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">Order ID</div>
                    <div class="text-xl font-bold text-gray-900 dark:text-white">${order.id}</div>
                </div>
                ${getStatusBadge(order.status)}
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">Customer</div>
                    <div class="font-semibold text-gray-900 dark:text-white">${order.customer}</div>
                </div>
                <div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">Date</div>
                    <div class="font-semibold text-gray-900 dark:text-white">${order.date}</div>
                </div>
            </div>

            <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Product</div>
                <div class="font-semibold text-gray-900 dark:text-white">${order.product}</div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">Amount</div>
                    <div class="text-2xl font-bold text-green-600 dark:text-green-400">$${order.amount}</div>
                </div>
                <div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">Payment Method</div>
                    <div class="font-semibold text-gray-900 dark:text-white">${order.payment}</div>
                </div>
            </div>

            <div class="pt-4 border-t border-gray-200 dark:border-gray-700/50">
                <div class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Update Status</div>
                <div class="flex gap-2">
                    <button onclick="updateOrderStatus('${order.id}', 'Processing')" class="flex-1 py-2 text-sm font-medium rounded-lg transition ${order.status === 'Processing' ? 'bg-yellow-500 text-white shadow-md' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800'}">Processing</button>
                    <button onclick="updateOrderStatus('${order.id}', 'Shipped')" class="flex-1 py-2 text-sm font-medium rounded-lg transition ${order.status === 'Shipped' ? 'bg-blue-500 text-white shadow-md' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'}">Shipped</button>
                    <button onclick="updateOrderStatus('${order.id}', 'Delivered')" class="flex-1 py-2 text-sm font-medium rounded-lg transition ${order.status === 'Delivered' ? 'bg-green-500 text-white shadow-md' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800'}">Delivered</button>
                </div>
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
        viewOrder(orderId); // Re-render modal with new status
        showMessage(`Order ${orderId} status updated to ${newStatus}`, 'success');
    }
}

// --- GLOBAL ACTIONS ---
function handleRefresh() {
    const btn = document.querySelector('button[title="Refresh Data"]');
    btn.style.animation = 'spin 1s linear';
    setTimeout(() => {
        btn.style.animation = '';
        showMessage('Dashboard data refreshed!', 'success');
    }, 1000);
}

// --- EVENT LISTENERS & INITIALIZATION ---
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
document.getElementById('userSearch')?.addEventListener('input', renderUsersTable);
document.getElementById('userFilter')?.addEventListener('change', renderUsersTable);
document.getElementById('orderSearch')?.addEventListener('input', renderAllOrdersTable);
document.getElementById('orderFilter')?.addEventListener('change', renderAllOrdersTable);

window.addEventListener('DOMContentLoaded', () => {
    // Check initial theme preference
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        document.documentElement.classList.remove('dark');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }

    // Initial rendering and chart setup
    initCharts();
    renderOrdersTable();
    renderUsersTable();
    renderAllOrdersTable();
    
    // Set initial active tab state
    // We explicitly call switchTab on 'overview' to ensure the active styling is applied on load.
    switchTab('overview');
    
    // Hide badge if no mock notifications initially (or show if there are)
    if (mockNotifications.length === 0) {
         document.getElementById('notificationBadge').style.display = 'none';
    }
});
