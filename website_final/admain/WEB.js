// ======== DATA ========
const mockData = {
  donors: [
    { id:1, name:'أحمد السيد', email:'ahmed@kheirmasr.org', phone:'+201001234567', city:'القاهرة', totalDonations:5000, dateJoined:'2024-01-15' },
    { id:2, name:'سارة محمود', email:'sara@kheirmasr.org', phone:'+201001234568', city:'الإسكندرية', totalDonations:3500, dateJoined:'2024-02-20' },
    { id:3, name:'محمد عبد الله', email:'mohamed@kheirmasr.org', phone:'+201001234569', city:'المنصورة', totalDonations:7500, dateJoined:'2024-01-10' },
    { id:4, name:'منة الله أشرف', email:'menna@kheirmasr.org', phone:'+201001234570', city:'أسيوط', totalDonations:2000, dateJoined:'2024-03-05' },
    { id:5, name:'أحمد حسن', email:'hassan@kheirmasr.org', phone:'+201001234571', city:'القاهرة', totalDonations:4500, dateJoined:'2024-02-12' },
    { id:6, name:'مي فؤاد', email:'mai@kheirmasr.org', phone:'+201001234572', city:'طنطا', totalDonations:6000, dateJoined:'2024-01-25' },
    { id:7, name:'كريم وائل', email:'karim@kheirmasr.org', phone:'+201001234573', city:'الزقازيق', totalDonations:3000, dateJoined:'2024-03-15' },
    { id:8, name:'فاطمة خالد', email:'fatma@kheirmasr.org', phone:'+201001234574', city:'سوهاج', totalDonations:5500, dateJoined:'2024-02-28' },
  ],
  donations: [
    { id:'D001', donorName:'أحمد السيد', campaign:'ستر ودفا', amount:500, paymentMethod:'بطاقة', status:'completed', date:'2024-04-15' },
    { id:'D002', donorName:'سارة محمود', campaign:'نقطة مية', amount:750, paymentMethod:'فودافون كاش', status:'completed', date:'2024-04-14' },
    { id:'D003', donorName:'محمد عبد الله', campaign:'تعليم ولادنا', amount:1000, paymentMethod:'تحويل بنكي', status:'pending', date:'2024-04-13' },
    { id:'D004', donorName:'منة الله أشرف', campaign:'شِفا وعلاج', amount:300, paymentMethod:'بطاقة', status:'completed', date:'2024-04-12' },
    { id:'D005', donorName:'أحمد حسن', campaign:'ستر ودفا', amount:600, paymentMethod:'فودافون كاش', status:'completed', date:'2024-04-11' },
    { id:'D006', donorName:'مي فؤاد', campaign:'نقطة مية', amount:850, paymentMethod:'بطاقة', status:'failed', date:'2024-04-10' },
    { id:'D007', donorName:'كريم وائل', campaign:'تعليم ولادنا', amount:400, paymentMethod:'تحويل بنكي', status:'completed', date:'2024-04-09' },
    { id:'D008', donorName:'فاطمة خالد', campaign:'شِفا وعلاج', amount:950, paymentMethod:'بطاقة', status:'completed', date:'2024-04-08' },
  ],
  campaigns: [
    { id:1, name:'ستر ودفا', description:'تجهيز بطاطين وشنط موسمية للأسر الأولى بالرعاية', target:50000, collected:35000, image:'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400', status:'active' },
    { id:2, name:'نقطة مية', description:'توصيل مياه نقية للقرى والمناطق الأشد احتياجًا', target:30000, collected:28000, image:'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=400', status:'active' },
    { id:3, name:'تعليم ولادنا', description:'دعم المصاريف والشنط والأدوات للطلبة غير القادرين', target:75000, collected:45000, image:'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', status:'active' },
    { id:4, name:'شِفا وعلاج', description:'مساعدة الحالات الطبية في العلاج والدواء والتحاليل', target:40000, collected:32000, image:'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400', status:'active' },
  ],
  cases: [
    { id:1, title:'Urgent Medical Surgery', description:'Child needs urgent heart surgery', requiredAmount:15000, collectedAmount:8500, remainingAmount:6500, image:'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400', urgency:'high' },
    { id:2, title:'Family Shelter', description:'Family lost home in disaster', requiredAmount:10000, collectedAmount:7000, remainingAmount:3000, image:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400', urgency:'medium' },
    { id:3, title:'Education Support', description:'Student needs scholarship', requiredAmount:5000, collectedAmount:4500, remainingAmount:500, image:'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400', urgency:'low' },
  ],
  requests: [
    { id:1, requester:'Ali Mohammed', type:'Medical Help', amount:5000, status:'pending', date:'2024-04-15' },
    { id:2, requester:'Maria Garcia', type:'Education', amount:2000, status:'pending', date:'2024-04-14' },
    { id:3, requester:'James Brown', type:'Emergency', amount:3000, status:'approved', date:'2024-04-13' },
    { id:4, requester:'Aisha Khan', type:'Medical Help', amount:4000, status:'rejected', date:'2024-04-12' },
  ],
  payments: [
    { id:'P001', donor:'John Smith', amount:500, method:'Visa', status:'success', date:'2024-04-15 10:30 AM', transactionId:'TXN123456' },
    { id:'P002', donor:'Sarah Johnson', amount:750, method:'PayPal', status:'success', date:'2024-04-14 02:15 PM', transactionId:'TXN123457' },
    { id:'P003', donor:'Mohammed Ali', amount:1000, method:'Bank', status:'pending', date:'2024-04-13 09:00 AM', transactionId:'TXN123458' },
    { id:'P004', donor:'Emily Davis', amount:300, method:'Mastercard', status:'success', date:'2024-04-12 04:45 PM', transactionId:'TXN123459' },
    { id:'P005', donor:'Lisa Anderson', amount:850, method:'Visa', status:'failed', date:'2024-04-10 11:20 AM', transactionId:'TXN123460' },
  ],
  activityLogs: [
    { id:1, user:'Admin', action:'Created new campaign "Help Children"', date:'2024-04-15 10:30 AM', ip:'192.168.1.1' },
    { id:2, user:'Manager', action:'Approved donation request #123', date:'2024-04-15 09:15 AM', ip:'192.168.1.2' },
    { id:3, user:'Admin', action:'Updated donor information', date:'2024-04-14 03:45 PM', ip:'192.168.1.1' },
    { id:4, user:'Staff', action:'Exported donors report', date:'2024-04-14 02:30 PM', ip:'192.168.1.3' },
    { id:5, user:'Admin', action:'Changed system settings', date:'2024-04-13 11:00 AM', ip:'192.168.1.1' },
  ],
  monthlyDonations: [
    { month:'Jan', amount:12000 }, { month:'Feb', amount:15000 }, { month:'Mar', amount:18000 },
    { month:'Apr', amount:22000 }, { month:'May', amount:20000 }, { month:'Jun', amount:25000 },
  ],
  users: [
    { id:1, name:'أحمد فؤاد', email:'admin@charity.com', role:'Admin', status:'Active', lastLogin:'2026-04-20 08:45' },
    { id:2, name:'منى خالد', email:'mona@charity.com', role:'Moderator', status:'Active', lastLogin:'2026-04-20 07:10' },
    { id:3, name:'كريم عادل', email:'karim@charity.com', role:'Moderator', status:'Inactive', lastLogin:'2026-04-17 05:30' },
  ],
  notifications: [
    { id:1, title:'تبرع كبير وصل', details:'فيه تبرع بـ 3000 جنيه لحملة تعليم ولادنا.', time:'من 5 دقايق', type:'success' },
    { id:2, title:'حملة قربت تكمل', details:'حملة نقطة مية وصلت لـ 93% من الهدف.', time:'من 23 دقيقة', type:'warning' },
    { id:3, title:'عملية دفع فشلت', details:'التبرع D006 محتاج مراجعة من الفريق.', time:'من ساعة', type:'error' },
  ],
  messages: [
    { id:1, from:'فاطمة خالد', subject:'ممكن نسخة من الإيصال', preview:'محتاجين تبعتوا إيصال التبرع مرة تانية لو سمحتم.', time:'10:05 ص', unread:true },
    { id:2, from:'أحمد السيد', subject:'تبرع شهري ثابت', preview:'عايز أفعّل تبرع شهري ثابت للحملة.', time:'أمس', unread:false },
    { id:3, from:'فريق الميديا', subject:'تحديث بانر الحملة', preview:'النسخ الجديدة من البانرات جاهزة للرفع.', time:'أمس', unread:false },
  ],
  media: [
    { id:1, name:'children-campaign.jpg', size:'420 KB', date:'2026-04-19', url:'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600' },
    { id:2, name:'clean-water.jpg', size:'510 KB', date:'2026-04-18', url:'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=600' },
    { id:3, name:'medical-aid.jpg', size:'398 KB', date:'2026-04-17', url:'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=600' },
  ],
  content: [
    { id:1, page:'Home Hero', type:'Section', status:'Published', updatedAt:'2026-04-20' },
    { id:2, page:'About Us', type:'Page', status:'Published', updatedAt:'2026-04-19' },
    { id:3, page:'Donation FAQs', type:'Article', status:'Draft', updatedAt:'2026-04-17' },
  ],
};

// ======== STATE ========
let state = {
  authenticated: false,
  user: null,
  currentPage: 'dashboard',
  theme: localStorage.getItem('theme') || 'light',
  language: localStorage.getItem('language') || 'ar',
  donors: [...mockData.donors],
  donorsPage: 1,
  donorsSearch: '',
  donorsSortCol: 'name',
  donorsSortDir: 'asc',
  donorsSelected: [],
  donationsFilter: 'all',
  settings: {
    siteName: 'خير مصر',
    email: 'admin@charity.com',
    currency: 'EGP',
    timezone: 'Africa/Cairo',
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  },
  campaigns: [...mockData.campaigns],
  donations: [...mockData.donations],
  volunteers: [],
  analyticsStats: null,
  backendConnected: false,
  apiBase: localStorage.getItem('apiBase') || 'http://127.0.0.1:8000/api',
};
const ITEMS_PER_PAGE = 5;
const BRIDGE_KEY = 'siteDashboardEvents';

// ======== TRANSLATIONS ========
const t = {
  en: {
    dashboard:'Dashboard', donors:'Donors', donations:'Donations',
    campaigns:'Campaigns', cases:'Cases', requests:'Requests', payments:'Payments',
    reports:'Reports', users:'Team', notifications:'Notifications',
    messages:'Messages', media:'Media', content:'Content',
    activityLogs:'Activity', settings:'Settings',
    search:'Search in dashboard...', signIn:'Enter Dashboard', welcomeBack:'Welcome back',
    signInSub:'Sign in to manage Kheir Masr dashboard', email:'Email', password:'Password',
    rememberMe:'Remember me', forgotPassword:'Forgot password?', noAccount:"Don't have an account?",
    registerHere:'Register here', notificationsHeader:'Notifications',
  },
  ar: {
    dashboard:'لوحة التحكم', donors:'إدارة المتبرعين', donations:'إدارة التبرعات',
    campaigns:'الحملات', cases:'الحالات', requests:'الطلبات', payments:'المدفوعات',
    reports:'التقارير', users:'إدارة المستخدمين', notifications:'الإشعارات',
    messages:'الرسائل', media:'مدير الوسائط', content:'إدارة المحتوى',
    activityLogs:'سجل النشاطات', settings:'الإعدادات',
    search:'بحث...', signIn:'تسجيل الدخول', welcomeBack:'مرحباً بعودتك',
    signInSub:'سجّل الدخول إلى حساب الإدارة', email:'البريد الإلكتروني', password:'كلمة المرور',
    rememberMe:'تذكرني', forgotPassword:'نسيت كلمة المرور؟', noAccount:'ليس لديك حساب؟',
    registerHere:'سجّل الآن', notificationsHeader:'الإشعارات',
  }
};
function tr(key){ return (t[state.language] || t.en)[key] || key; }
function tx(enText, arText){ return state.language === 'ar' ? arText : enText; }

function translateStaticUI() {
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };
  setText('login-title', tr('welcomeBack'));
  setText('login-sub', tr('signInSub'));
  setText('login-email-label', tr('email'));
  setText('login-password-label', tr('password'));
  setText('remember-label', tr('rememberMe'));
  setText('forgot-label', tr('forgotPassword'));
  setText('register-label', tr('registerHere'));
  setText('notif-header-label', tr('notificationsHeader'));
  setText('brand-title', state.language === 'ar' ? 'خير مصر' : 'Kheir Masr');
  const search = document.getElementById('global-search');
  if (search) search.placeholder = state.language === 'ar' ? 'دوّر جوه الداش بورد...' : tr('search');
  const emailInput = document.getElementById('login-email');
  if (emailInput) emailInput.placeholder = state.language === 'ar' ? 'اكتب إيميل الإدارة' : 'Enter admin email';
  const passwordInput = document.getElementById('login-password');
  if (passwordInput) passwordInput.placeholder = state.language === 'ar' ? 'اكتب الباسورد' : 'Enter password';
  const loginBtn = document.getElementById('login-btn');
  if (loginBtn && !loginBtn.disabled) loginBtn.textContent = state.language === 'ar' ? 'دخول لوحة التحكم' : tr('signIn');
  const footer = document.getElementById('login-footer');
  if (footer) footer.childNodes[0].textContent = `${tr('noAccount')} `;
  document.documentElement.setAttribute('dir', state.language === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', state.language);
  document.getElementById('lang-label').textContent = state.language === 'ar' ? 'AR' : 'EN';

  if (state.language === 'ar') {
    setText('login-title', 'أهلاً بعودتك');
    setText('login-sub', 'سجّل دخولك لإدارة لوحة خير مصر');
    setText('login-email-label', 'الإيميل');
    setText('login-password-label', 'الباسورد');
    setText('remember-label', 'افتكرني');
    setText('forgot-label', 'نسيت الباسورد؟');
    setText('register-label', 'سجل من هنا');
    setText('notif-header-label', 'الإشعارات');
    if (search) search.placeholder = 'دوّر جوه الداش بورد...';
    if (loginBtn && !loginBtn.disabled) loginBtn.textContent = 'دخول لوحة التحكم';
    if (footer) footer.childNodes[0].textContent = 'معندكش حساب؟ ';
  }
}

// ======== MENU ========
const menuItems = [
  { id:'dashboard', icon:'layout-dashboard' },
  { id:'donors', icon:'users' },
  { id:'donations', icon:'dollar-sign' },
  { id:'campaigns', icon:'megaphone' },
  { id:'cases', icon:'briefcase' },
  { id:'requests', icon:'file-text' },
  { id:'payments', icon:'credit-card' },
  { id:'reports', icon:'bar-chart-3' },
  { id:'users', icon:'user-cog' },
  { id:'notifications', icon:'bell' },
  { id:'messages', icon:'message-square' },
  { id:'media', icon:'image' },
  { id:'content', icon:'file-edit' },
  { id:'activityLogs', icon:'activity' },
  { id:'settings', icon:'settings' },
];

// ======== INIT ========
function init() {
  applyTheme();
  translateStaticUI();
  consumeWebsiteBridgeEvents();
  window.addEventListener('focus', consumeWebsiteBridgeEvents);

  // Auto-login: if token + user exist in localStorage (set by login1.html), skip login screen
  const savedToken = localStorage.getItem('token');
  const savedUser  = localStorage.getItem('user');
  if (savedToken && savedUser) {
    try {
      state.user          = JSON.parse(savedUser);
      state.authenticated = true;
      showApp();
      return;
    } catch(_) {}
  }
  // No saved session — show login screen
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
}

function applyTheme() {
  document.documentElement.classList.toggle('dark', state.theme === 'dark');
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  if (state.theme === 'dark') {
    icon.innerHTML = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>';
  } else {
    icon.innerHTML = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>';
  }
}

function showApp() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  buildSidebar();
  if (state.user) {
    document.getElementById('user-info-wrap').style.display = 'flex';
    document.getElementById('user-name-display').textContent = state.user.name;
  }
  renderPage();
  translateStaticUI();
  syncDashboardDataFromBackend();
}

// ======== AUTH ========
function togglePass() {
  const inp = document.getElementById('login-password');
  inp.type = inp.type === 'password' ? 'text' : 'password';
}

async function doLogin() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  if (!email || !password) { showToast(tx('Please fill all fields','من فضلك املأ كل الحقول'), 'warning'); return; }
  const btn = document.getElementById('login-btn');
  btn.innerHTML = '<span class="spinner"></span> Signing in...';
  btn.disabled = true;
  const loginResult = await loginWithApi(email, password);
  if (loginResult.success) {
    state.user = loginResult.user;
    state.authenticated = true;
    state.backendConnected = loginResult.backendConnected;
    localStorage.setItem('user', JSON.stringify(state.user));
    if (loginResult.token) localStorage.setItem('token', loginResult.token);
    showApp();
    await syncDashboardDataFromBackend();
    showToast(tx('Login successful','تم تسجيل الدخول بنجاح'), 'success');
    return;
  }
  // If not connected show error from backend
  if (loginResult.status === 422 || loginResult.status === 401) {
    btn.innerHTML = tr('signIn');
    btn.disabled = false;
    showToast(loginResult.message, 'error');
    return;
  }
  btn.innerHTML = tr('signIn');
  btn.disabled = false;
  showToast(loginResult.message, 'error');
}

function doLogout() {
  // Call backend logout
  const token = localStorage.getItem('token');
  if (token) {
    fetch(state.apiBase + '/auth/logout', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }
    }).catch(() => {});
  }

  state.authenticated = false;
  state.user          = null;
  state.analyticsStats = null;
  localStorage.removeItem('user');
  localStorage.removeItem('token');

  // Redirect to main login page
  window.location.href = '../login1.html';
}

// ======== SIDEBAR ========
function buildSidebar() {
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = menuItems.map(item => `
    <button class="nav-btn ${state.currentPage === item.id ? 'active' : ''}" onclick="navigate('${item.id}')">
      ${getIcon(item.icon)}
      <span class="nav-label">${tr(item.id)}</span>
    </button>
  `).join('');
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}
function toggleMobileSidebar() {
  document.getElementById('sidebar').classList.add('mobile-open');
  document.getElementById('sidebar-overlay').classList.add('open');
}
function closeMobileSidebar() {
  document.getElementById('sidebar').classList.remove('mobile-open');
  document.getElementById('sidebar-overlay').classList.remove('open');
}

function navigate(page) {
  state.currentPage = page;
  closeMobileSidebar();
  buildSidebar();
  renderPage();
  // destroy charts
  Object.keys(Chart.instances || {}).forEach(k => Chart.instances[k]?.destroy());
}

// ======== HEADER ========
function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', state.theme);
  applyTheme();
  // re-render charts
  if (state.currentPage === 'dashboard') renderPage();
}

function toggleLang() {
  state.language = state.language === 'en' ? 'ar' : 'en';
  localStorage.setItem('language', state.language);
  document.documentElement.setAttribute('dir', state.language === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', state.language);
  document.getElementById('lang-label').textContent = state.language === 'ar' ? 'AR' : 'EN';
  buildSidebar();
  renderPage();
  translateStaticUI();
}

function toggleNotif() {
  document.getElementById('notif-dropdown').classList.toggle('open');
}
document.addEventListener('click', e => {
  const nb = document.getElementById('notif-btn');
  const nd = document.getElementById('notif-dropdown');
  if (nb && nd && !nb.contains(e.target) && !nd.contains(e.target)) {
    nd.classList.remove('open');
  }
});

// ======== TOAST ========
function showToast(message, type='success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// ======== ICON HELPER ========
function getIcon(name, size=20) {
  const icons = {
    'layout-dashboard': '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
    'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    'dollar-sign': '<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    'megaphone': '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    'briefcase': '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    'file-text': '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/>',
    'credit-card': '<rect width="22" height="16" x="1" y="4" rx="2" ry="2"/><line x1="1" x2="23" y1="10" y2="10"/>',
    'bar-chart-3': '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
    'user-cog': '<circle cx="18" cy="15" r="3"/><path d="M18 12v.01M18 18v.01"/><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',
    'bell': '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    'message-square': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    'image': '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    'file-edit': '<path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5"/><polyline points="14 2 14 8 20 8"/><path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z"/>',
    'activity': '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    'settings': '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    'trending-up': '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    'trending-down': '<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>',
    'plus': '<line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/>',
    'trash-2': '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
    'edit': '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
    'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    'x-circle': '<circle cx="12" cy="12" r="10"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/>',
    'eye': '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    'file-down': '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/>',
    'save': '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',
    'upload': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
    'globe': '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    'palette': '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
    'award': '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    'search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
  };
  const d = icons[name] || '';
  return `<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">${d}</svg>`;
}

// ======== RENDER PAGE ========
function renderPage() {
  const el = document.getElementById('page-inner');
  const pages = {
    dashboard: renderDashboard,
    donors: renderDonors,
    donations: renderDonations,
    campaigns: renderCampaigns,
    cases: renderCases,
    requests: renderRequests,
    payments: renderPayments,
    reports: renderReports,
    users: renderUsers,
    notifications: renderNotifications,
    messages: renderMessages,
    media: renderMedia,
    content: renderContent,
    activityLogs: renderActivityLogs,
    settings: renderSettings,
  };
  const fn = pages[state.currentPage] || (() => renderPlaceholder(tr(state.currentPage)));
  el.innerHTML = fn();
  applyAutoLocalization(el);
  if (state.currentPage === 'dashboard') initCharts();
}

function applyAutoLocalization(container) {
  if (state.language !== 'ar') return;
  const replacements = {
    'Dashboard': 'لوحة التحكم',
    'Donors Management': 'إدارة المتبرعين',
    'Donations Management': 'إدارة التبرعات',
    'Campaigns': 'الحملات',
    'Cases Management': 'إدارة الحالات',
    'Requests Management': 'إدارة الطلبات',
    'Payments Management': 'إدارة المدفوعات',
    'Activity Logs': 'سجل النشاطات',
    'Settings': 'الإعدادات',
    'Reports': 'التقارير',
    'Users Management': 'إدارة المستخدمين',
    'Notifications Center': 'مركز الإشعارات',
    'Messages': 'الرسائل',
    'Media Manager': 'مدير الوسائط',
    'Content Management': 'إدارة المحتوى',
    'Add Donor': 'إضافة متبرع',
    'Add Campaign': 'إضافة حملة',
    'Add User': 'إضافة مستخدم',
    'New Message': 'رسالة جديدة',
    'Upload': 'رفع',
    'Create': 'إنشاء',
    'Delete': 'حذف',
    'Edit': 'تعديل',
    'Previous': 'السابق',
    'Next': 'التالي',
    'Actions': 'إجراءات',
    'Name': 'الاسم',
    'Email': 'البريد الإلكتروني',
    'Phone': 'الهاتف',
    'City': 'المدينة',
    'Date Joined': 'تاريخ الانضمام',
    'Status': 'الحالة',
    'Date': 'التاريخ',
    'Amount': 'المبلغ',
    'Method': 'طريقة الدفع',
    'Campaign': 'الحملة',
    'Donor': 'المتبرع',
    'completed': 'مكتمل',
    'pending': 'معلّق',
    'failed': 'فشل',
    'approved': 'مقبول',
    'rejected': 'مرفوض',
    'Unread': 'غير مقروءة',
    'Read': 'مقروءة'
  };

  let html = container.innerHTML;
  Object.entries(replacements).forEach(([en, ar]) => {
    html = html.replaceAll(`>${en}<`, `>${ar}<`);
    html = html.replaceAll(` ${en}<`, ` ${ar}<`);
    html = html.replaceAll(`>${en} `, `>${ar} `);
  });
  container.innerHTML = html;
}

// ======== DASHBOARD ========
function renderDashboard() {
  // Use real backend stats if available, fallback to mock
  const st = state.analyticsStats;
  const totalDonationsAmt = st ? st.totalDonations : mockData.donations.reduce((s,d)=>s+d.amount,0);
  const totalDonorsCount  = st ? st.totalDonors    : mockData.donors.length;
  const activeCampaigns   = st ? st.activeCampaigns: mockData.campaigns.filter(c=>c.status==='active').length;
  const totalVolunteers   = st ? st.totalVolunteers : 0;
  const topDonors    = [...state.donors].sort((a,b)=>b.totalDonations-a.totalDonations).slice(0,5);
  const topCampaigns = (st?.topCampaigns?.length ? st.topCampaigns : [...state.campaigns].sort((a,b)=>b.collected-a.collected)).slice(0,4);
  const connBadge = state.backendConnected
    ? `<span style="display:inline-flex;align-items:center;gap:4px;background:#dcfce7;color:#166534;padding:6px 12px;border-radius:20px;font-size:0.78rem;font-weight:700;">&#9679; ${tx('Live Data', 'بيانات مباشرة')}</span>`
    : `<span style="display:inline-flex;align-items:center;gap:4px;background:#fef3c7;color:#92400e;padding:6px 12px;border-radius:20px;font-size:0.78rem;font-weight:700;">&#9679; ${tx('Demo Mode', 'وضع تجريبي')}</span>`;
  return `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;flex-wrap:wrap;gap:0.5rem;">
      <h2 style="font-size:1.35rem;font-weight:800;margin:0;">${tx('Dashboard Overview', 'نظرة سريعة على الداش بورد')}</h2>
      ${connBadge}
    </div>
    <div class="stats-grid">
      ${statCard(tx('Total Donations','إجمالي التبرعات'), tx('$','') + totalDonationsAmt.toLocaleString() + tx('',' جنيه'),12.5,'dollar-sign','#0d4a3a','#eefbf5')}
      ${statCard(tx('Total Donors','عدد المتبرعين'),totalDonorsCount,8.3,'users','#1d6b56','#effcf6')}
      ${statCard(tx('Active Campaigns','الحملات النشطة'),activeCampaigns,5.2,'megaphone','#d97706','#fff7ed')}
      ${statCard(tx('Total Volunteers','عدد المتطوعين'),totalVolunteers,3.1,'heart','#a855f7','#faf5ff')}
    </div>
    <div class="charts-grid">
      <div class="chart-card"><p class="chart-title">${tx('Monthly Donations Trend','حركة التبرعات الشهرية')}</p><div class="chart-wrap"><canvas id="lineChart"></canvas></div></div>
      <div class="chart-card"><p class="chart-title">${tx('Campaign Performance','أداء الحملات')}</p><div class="chart-wrap"><canvas id="barChart"></canvas></div></div>
      <div class="chart-card"><p class="chart-title">${tx('Payment Methods Distribution','توزيع طرق الدفع')}</p><div class="chart-wrap"><canvas id="pieChart"></canvas></div></div>
      <div class="chart-card"><p class="chart-title">${tx('Campaign Contributions','مساهمة كل حملة')}</p><div class="chart-wrap"><canvas id="doughnutChart"></canvas></div></div>
    </div>
    <div class="bottom-grid">
      <div class="card card-p">
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem;">${getIcon('users',18)}<span>${tx('Top Donors','أعلى المتبرعين')}</span></h3>
        ${topDonors.map((d,i)=>`
          <div class="top-item">
            <div class="top-rank">${i+1}</div>
            <div class="top-info"><p class="top-name">${d.name}</p><p class="top-city">${d.city}</p></div>
            <span class="top-amount">${tx('$','')}${d.totalDonations.toLocaleString()}${tx('',' جنيه')}</span>
          </div>
        `).join('')}
      </div>
      <div class="card card-p">
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem;">${getIcon('award',18)}<span>${tx('Top Campaigns','أقوى الحملات')}</span></h3>
        ${topCampaigns.map(c=>{
          const pct = ((c.collected/c.target)*100).toFixed(1);
          return `
            <div style="margin-bottom:1.25rem;">
              <div style="display:flex;justify-content:space-between;margin-bottom:0.25rem;">
                <span style="font-weight:500;font-size:0.875rem;">${c.name}</span>
                <span style="font-size:0.75rem;color:var(--muted-foreground);">${tx('$','')}${c.collected.toLocaleString()} / ${tx('$','')}${c.target.toLocaleString()}${tx('',' جنيه')}</span>
              </div>
              <div class="progress-bar" style="margin:0.4rem 0;"><div class="progress-fill" style="width:${pct}%"></div></div>
              <span style="font-size:0.75rem;color:var(--muted-foreground);">${tx(`${pct}% achieved`, `وصلت لـ ${pct}%`)}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function statCard(title, value, change, icon, color, bg) {
  const isPos = change >= 0;
  const darkBg = 'transparent';
  return `
    <div class="stat-card">
      <div class="stat-top">
        <div class="stat-icon-wrap" style="background:${bg};">${getIcon(icon, 24).replace('class="nav-icon"', `style="color:${color};width:24px;height:24px;"`)}</div>
        <div class="stat-change ${isPos?'pos':'neg'}">${getIcon(isPos?'trending-up':'trending-down',16).replace('class="nav-icon"','')}${Math.abs(change)}%</div>
      </div>
      <p class="stat-label">${title}</p>
      <p class="stat-value" data-target="${value}">${value}</p>
    </div>
  `;
}

function initCharts() {
  const isDark = state.theme === 'dark';
  const tc = isDark ? '#e5e7eb' : '#1f2937';
  const gc = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const baseOpts = {
    responsive:true, maintainAspectRatio:false,
    plugins:{ legend:{ labels:{ color:tc } } },
    scales:{ x:{ ticks:{color:isDark?'#9ca3af':'#6b7280'}, grid:{color:gc} }, y:{ ticks:{color:isDark?'#9ca3af':'#6b7280'}, grid:{color:gc} } }
  };
  const md = mockData;

  new Chart(document.getElementById('lineChart'), {
    type:'line',
    data:{ labels:md.monthlyDonations.map(m=>m.month), datasets:[{ label:'Donations ($)', data:md.monthlyDonations.map(m=>m.amount), borderColor:isDark?'#60a5fa':'#2563eb', backgroundColor:isDark?'rgba(96,165,250,0.1)':'rgba(37,99,235,0.1)', fill:true, tension:0.4 }] },
    options:baseOpts
  });
  new Chart(document.getElementById('barChart'), {
    type:'bar',
    data:{ labels:md.campaigns.map(c=>c.name), datasets:[
      { label:'Target', data:md.campaigns.map(c=>c.target), backgroundColor:isDark?'rgba(148,163,184,0.5)':'rgba(203,213,225,0.5)' },
      { label:'Collected', data:md.campaigns.map(c=>c.collected), backgroundColor:isDark?'#4ade80':'#16a34a' }
    ]},
    options:baseOpts
  });
  new Chart(document.getElementById('pieChart'), {
    type:'pie',
    data:{ labels:['Credit Card','PayPal','Bank Transfer'], datasets:[{ data:[45,30,25], backgroundColor:[isDark?'#60a5fa':'#2563eb',isDark?'#fbbf24':'#f59e0b',isDark?'#4ade80':'#16a34a'] }] },
    options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ labels:{ color:tc } } } }
  });
  new Chart(document.getElementById('doughnutChart'), {
    type:'doughnut',
    data:{ labels:md.campaigns.map(c=>c.name), datasets:[{ data:md.campaigns.map(c=>c.collected), backgroundColor:[isDark?'#60a5fa':'#2563eb',isDark?'#4ade80':'#16a34a',isDark?'#fbbf24':'#f59e0b',isDark?'#c084fc':'#9333ea'] }] },
    options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ labels:{ color:tc } } } }
  });
}

// ======== DONORS ========
function renderDonors() {
  const { donors, donorsSearch, donorsSortCol, donorsSortDir, donorsPage, donorsSelected } = state;
  const filtered = donors.filter(d =>
    d.name.toLowerCase().includes(donorsSearch.toLowerCase()) ||
    d.email.toLowerCase().includes(donorsSearch.toLowerCase()) ||
    d.city.toLowerCase().includes(donorsSearch.toLowerCase())
  );
  const sorted = [...filtered].sort((a,b) => {
    const av = a[donorsSortCol], bv = b[donorsSortCol];
    if (typeof av === 'string') return donorsSortDir==='asc'?av.localeCompare(bv):bv.localeCompare(av);
    return donorsSortDir==='asc'?av-bv:bv-av;
  });
  const total = sorted.length;
  const pages = Math.ceil(total / ITEMS_PER_PAGE);
  const paged = sorted.slice((donorsPage-1)*ITEMS_PER_PAGE, donorsPage*ITEMS_PER_PAGE);
  const cols = ['name','email','phone','city','totalDonations','dateJoined'];
  const colLabels = { name:'Name', email:'Email', phone:'Phone', city:'City', totalDonations:'Total Donations', dateJoined:'Date Joined' };

  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;flex-wrap:wrap;gap:1rem;">
      <h1 class="page-title" style="margin:0;">${tx('Donors Management','إدارة المتبرعين')}</h1>
      <button class="btn btn-blue" onclick="showAddDonorModal()">${getIcon('plus',18).replace('class="nav-icon"','')} ${tx('Add Donor','إضافة متبرع')}</button>
    </div>
    <div class="toolbar">
      <div class="toolbar-inner">
        <div class="search-field">
          <svg class="si" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input type="text" placeholder="${tx('Search donors...','دوّر على متبرع...')}" value="${donorsSearch}" oninput="donorSearch(this.value)" />
        </div>
        <div class="toolbar-actions">
          <button class="btn btn-green" onclick="exportDonorsExcel()">${getIcon('file-down',16).replace('class="nav-icon"','')} Excel</button>
      <button class="btn btn-red" onclick="exportDonorsPdf()">${getIcon('download',16).replace('class="nav-icon"','')} PDF</button>
          <button class="btn" style="background:var(--destructive);color:#fff;" onclick="bulkDeleteDonors()">${getIcon('trash-2',16).replace('class="nav-icon"','')} ${tx('Delete','حذف')} (${donorsSelected.length})</button>
        </div>
      </div>
    </div>
    <div class="card" style="overflow:hidden;">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" ${donorsSelected.length===paged.length&&paged.length>0?'checked':''} onchange="toggleAllDonors(this)" /></th>
              ${cols.map(c=>`<th class="sortable" onclick="donorSort('${c}')">${colLabels[c]}${donorsSortCol===c?`<span>${donorsSortDir==='asc'?'↑':'↓'}</span>`:''}</th>`).join('')}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${paged.map(d=>`
              <tr>
                <td><input type="checkbox" ${donorsSelected.includes(d.id)?'checked':''} onchange="toggleDonorRow(${d.id})" /></td>
                <td style="font-weight:500;">${d.name}</td>
                <td style="color:var(--muted-foreground);">${d.email}</td>
                <td style="color:var(--muted-foreground);">${d.phone}</td>
                <td>${d.city}</td>
                <td style="font-weight:700;color:#16a34a;">$${d.totalDonations.toLocaleString()}</td>
                <td style="color:var(--muted-foreground);">${d.dateJoined}</td>
                <td>
                  <div style="display:flex;gap:0.5rem;">
                    <button style="padding:0.4rem;border:none;border-radius:0.25rem;background:transparent;cursor:pointer;transition:all 0.2s;" onmouseenter="this.style.background='#3b82f6';this.style.color='#fff'" onmouseleave="this.style.background='transparent';this.style.color=''" onclick="editDonor(${d.id})" title="Edit">${getIcon('edit',16).replace('class="nav-icon"','')}</button>
                    <button style="padding:0.4rem;border:none;border-radius:0.25rem;background:transparent;cursor:pointer;transition:all 0.2s;" onmouseenter="this.style.background='#ef4444';this.style.color='#fff'" onmouseleave="this.style.background='transparent';this.style.color=''" onclick="deleteDonor(${d.id})" title="Delete">${getIcon('trash-2',16).replace('class="nav-icon"','')}</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div class="pagination">
        <span class="pag-info">Showing ${(donorsPage-1)*ITEMS_PER_PAGE+1} to ${Math.min(donorsPage*ITEMS_PER_PAGE,total)} of ${total}</span>
        <div class="pag-btns">
          <button class="pag-btn" onclick="donorsGoPage(${donorsPage-1})" ${donorsPage<=1?'disabled':''}>Previous</button>
          <button class="pag-btn" onclick="donorsGoPage(${donorsPage+1})" ${donorsPage>=pages?'disabled':''}>Next</button>
        </div>
      </div>
    </div>
  `;
}

function donorSearch(v) { state.donorsSearch=v; state.donorsPage=1; renderPage(); }
function donorSort(col) {
  if (state.donorsSortCol===col) state.donorsSortDir = state.donorsSortDir==='asc'?'desc':'asc';
  else { state.donorsSortCol=col; state.donorsSortDir='asc'; }
  renderPage();
}
function donorsGoPage(p) { state.donorsPage=p; renderPage(); }
function toggleDonorRow(id) {
  state.donorsSelected = state.donorsSelected.includes(id)
    ? state.donorsSelected.filter(x=>x!==id)
    : [...state.donorsSelected, id];
  renderPage();
}
function toggleAllDonors(cb) {
  const filtered = state.donors.filter(d=>d.name.toLowerCase().includes(state.donorsSearch.toLowerCase())||d.email.toLowerCase().includes(state.donorsSearch.toLowerCase())||d.city.toLowerCase().includes(state.donorsSearch.toLowerCase()));
  const paged = filtered.slice((state.donorsPage-1)*ITEMS_PER_PAGE, state.donorsPage*ITEMS_PER_PAGE);
  state.donorsSelected = cb.checked ? paged.map(d=>d.id) : [];
  renderPage();
}
function deleteDonor(id) {
  if (confirm('Delete this donor?')) {
    const localDelete = () => {
      state.donors = state.donors.filter(d=>d.id!==id);
      showToast('Donor deleted', 'success');
      renderPage();
    };
    apiRequest(`/donors/${id}`, { method: 'DELETE' })
      .then(localDelete)
      .catch(localDelete);
  }
}
function bulkDeleteDonors() {
  if (!state.donorsSelected.length) { showToast('Select donors first', 'warning'); return; }
  if (confirm(`Delete ${state.donorsSelected.length} donors?`)) {
    state.donors = state.donors.filter(d=>!state.donorsSelected.includes(d.id));
    state.donorsSelected = [];
    showToast('Donors deleted', 'success');
    renderPage();
  }
}
function exportDonorsExcel() { showToast('Excel downloaded!', 'success'); }
function exportDonorsPdf() { showToast(tx('PDF downloaded!','تم تنزيل PDF بنجاح!'), 'success'); }
function showAddDonorModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'add-donor-modal';
  overlay.innerHTML = `
    <div class="modal-box">
      <h2 class="modal-title">Add New Donor</h2>
      <div class="form-row">
        <div class="field"><label>Name</label><input type="text" id="nd-name" /></div>
        <div class="field"><label>Email</label><input type="email" id="nd-email" /></div>
        <div class="field"><label>Phone</label><input type="tel" id="nd-phone" /></div>
        <div class="field"><label>City</label><input type="text" id="nd-city" /></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-muted" onclick="document.getElementById('add-donor-modal').remove()">Cancel</button>
        <button class="btn btn-blue" onclick="addDonor()">Add Donor</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}
function addDonor() {
  const name = document.getElementById('nd-name').value;
  const email = document.getElementById('nd-email').value;
  const phone = document.getElementById('nd-phone').value;
  const city = document.getElementById('nd-city').value;
  if (!name) { showToast('Name is required','warning'); return; }
  const newId = Math.max(...state.donors.map(d=>d.id)) + 1;
  const payload = { name, email, phone, city, address: '' };
  const localAdd = () => {
    state.donors.push({ id:newId, name, email, phone, city, totalDonations:0, dateJoined:new Date().toISOString().split('T')[0] });
    document.getElementById('add-donor-modal').remove();
    showToast('Donor added!', 'success');
    renderPage();
  };
  apiRequest('/donors', { method: 'POST', body: JSON.stringify(payload) })
    .then((saved) => {
      state.donors.push({
        id: saved.id || newId,
        name: saved.name || name,
        email: saved.email || email,
        phone: saved.phone || phone,
        city: saved.city || city,
        totalDonations: 0,
        dateJoined: (saved.created_at || new Date().toISOString()).slice(0, 10)
      });
      document.getElementById('add-donor-modal').remove();
      showToast('Donor added!', 'success');
      renderPage();
    })
    .catch(localAdd);
}

// ======== DONATIONS ========
function renderDonations() {
  const filtered = state.donationsFilter === 'all' ? mockData.donations : mockData.donations.filter(d=>d.status===state.donationsFilter);
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;flex-wrap:wrap;gap:1rem;">
      <h1 class="page-title" style="margin:0;">${tx('Donations Management','إدارة التبرعات')}</h1>
      <select onchange="state.donationsFilter=this.value;renderPage()" style="padding:0.5rem 1rem;background:var(--card);border:1px solid var(--border);border-radius:0.5rem;color:var(--foreground);outline:none;">
        <option value="all" ${state.donationsFilter==='all'?'selected':''}>All Status</option>
        <option value="completed" ${state.donationsFilter==='completed'?'selected':''}>Completed</option>
        <option value="pending" ${state.donationsFilter==='pending'?'selected':''}>Pending</option>
        <option value="failed" ${state.donationsFilter==='failed'?'selected':''}>Failed</option>
      </select>
    </div>
    <div class="card" style="overflow:hidden;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Donor</th><th>Campaign</th><th>Amount</th><th>Method</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
            ${filtered.map(d=>`
              <tr>
                <td style="font-family:monospace;font-size:0.8rem;">${d.id}</td>
                <td>${d.donorName}</td>
                <td>${d.campaign}</td>
                <td style="font-weight:700;color:#16a34a;">$${d.amount}</td>
                <td>${d.paymentMethod}</td>
                <td>${badgePill(d.status)}</td>
                <td style="color:var(--muted-foreground);">${d.date}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ======== CAMPAIGNS ========
function renderCampaigns() {
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;flex-wrap:wrap;gap:1rem;">
      <h1 class="page-title" style="margin:0;">${tx('Campaigns','الحملات')}</h1>
      <button class="btn btn-blue" onclick="showAddCampaignModal()">${getIcon('plus',18).replace('class="nav-icon"','')} Add Campaign</button>
    </div>
    <div class="grid-auto">
      ${state.campaigns.map(c => {
        const pct = Math.min((c.collected/c.target)*100,100).toFixed(1);
        const remaining = c.target - c.collected;
        return `
          <div class="campaign-card">
            <div class="campaign-img-wrap">
              <img src="${c.image}" alt="${c.name}" loading="lazy" />
              <span class="campaign-status">Active</span>
            </div>
            <div class="campaign-body">
              <h3 class="campaign-name">${c.name}</h3>
              <p class="campaign-desc">${c.description}</p>
              <div class="campaign-row"><span class="campaign-label">Target</span><span class="campaign-val">$${c.target.toLocaleString()}</span></div>
              <div class="campaign-row"><span class="campaign-label">Collected</span><span class="campaign-val green">$${c.collected.toLocaleString()}</span></div>
              <div class="campaign-row"><span class="campaign-label">Remaining</span><span class="campaign-val orange">$${remaining.toLocaleString()}</span></div>
              <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span class="campaign-pct">${pct}%</span>
                <span style="font-size:0.8rem;color:#16a34a;display:flex;align-items:center;gap:0.25rem;">${getIcon('trending-up',14).replace('class="nav-icon"','')} +12%</span>
              </div>
              <div class="campaign-footer">
                <button class="btn btn-blue" style="justify-content:center;" onclick="showEditCampaignModal(${c.id})">${getIcon('edit',16).replace('class="nav-icon"','')} Edit</button>
                <button class="btn btn-red" style="justify-content:center;" onclick="deleteCampaign(${c.id})">${getIcon('trash-2',16).replace('class="nav-icon"','')} Delete</button>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}
function deleteCampaign(id) {
  if (confirm('Delete this campaign?')) {
    const localDelete = () => {
      state.campaigns = state.campaigns.filter(c=>c.id!==id);
      showToast('Campaign deleted','success');
      renderPage();
    };
    apiRequest(`/campaigns/${id}`, { method: 'DELETE' })
      .then(localDelete)
      .catch(localDelete);
  }
}

// ======== CASES ========
function renderCases() {
  return `
    <h1 class="page-title">${tx('Cases Management','إدارة الحالات')}</h1>
    <div class="grid-auto">
      ${mockData.cases.map(c => `
        <div class="case-card">
          <div class="case-img">
            <img src="${c.image}" alt="${c.title}" loading="lazy" />
            <span class="urgency-badge urgency-${c.urgency}">${c.urgency.toUpperCase()}</span>
          </div>
          <div class="case-body">
            <h3 class="case-title">${c.title}</h3>
            <p class="case-desc">${c.description}</p>
            <div style="font-size:0.875rem;">
              <div style="display:flex;justify-content:space-between;margin-bottom:0.25rem;"><span>Required:</span><span style="font-weight:700;">$${c.requiredAmount.toLocaleString()}</span></div>
              <div style="display:flex;justify-content:space-between;margin-bottom:0.25rem;"><span>Collected:</span><span style="font-weight:700;color:#16a34a;">$${c.collectedAmount.toLocaleString()}</span></div>
              <div style="display:flex;justify-content:space-between;"><span>Remaining:</span><span style="font-weight:700;color:#f97316;">$${c.remainingAmount.toLocaleString()}</span></div>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${((c.collectedAmount/c.requiredAmount)*100).toFixed(1)}%;background:#22c55e;"></div></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ======== REQUESTS ========
function renderRequests() {
  return `
    <h1 class="page-title">${tx('Requests Management','إدارة الطلبات')}</h1>
    <div class="card" style="overflow:hidden;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Requester</th><th>Type</th><th>Amount</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>
            ${mockData.requests.map(r => `
              <tr>
                <td>${r.requester}</td>
                <td>${r.type}</td>
                <td style="font-weight:700;">$${r.amount.toLocaleString()}</td>
                <td>${badgePill(r.status)}</td>
                <td style="color:var(--muted-foreground);">${r.date}</td>
                <td>
                  <div style="display:flex;gap:0.5rem;">
                    <button class="btn btn-green" style="padding:0.35rem 0.6rem;" onclick="showToast('Request approved','success')">${getIcon('check-circle',16).replace('class="nav-icon"','')}</button>
                    <button class="btn btn-red" style="padding:0.35rem 0.6rem;" onclick="showToast('Request rejected','error')">${getIcon('x-circle',16).replace('class="nav-icon"','')}</button>
                    <button class="btn btn-muted" style="padding:0.35rem 0.6rem;" onclick="viewRequest(${r.id})">${getIcon('eye',16).replace('class="nav-icon"','')}</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ======== PAYMENTS ========
function renderPayments() {
  return `
    <h1 class="page-title">${tx('Payments Management','إدارة المدفوعات')}</h1>
    <div class="card" style="overflow:hidden;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Payment ID</th><th>Donor</th><th>Amount</th><th>Method</th><th>Status</th><th>Date</th><th>Transaction ID</th></tr></thead>
          <tbody>
            ${mockData.payments.map(p => `
              <tr>
                <td style="font-family:monospace;font-size:0.8rem;">${p.id}</td>
                <td>${p.donor}</td>
                <td style="font-weight:700;color:#16a34a;">$${p.amount}</td>
                <td style="display:flex;align-items:center;gap:0.4rem;">${getIcon('credit-card',16).replace('class="nav-icon"','')} ${p.method}</td>
                <td>${badgePill(p.status==='success'?'completed':p.status)}</td>
                <td style="color:var(--muted-foreground);">${p.date}</td>
                <td style="font-family:monospace;font-size:0.75rem;color:var(--muted-foreground);">${p.transactionId}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ======== ACTIVITY LOGS ========
function renderActivityLogs() {
  return `
    <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem;">
      <svg style="color:#a855f7;width:32px;height:32px;" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
      <h1 class="page-title" style="margin:0;">${tx('Activity Logs','سجل النشاط')}</h1>
    </div>
    <div class="card" style="overflow:hidden;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>User</th><th>Action</th><th>Date & Time</th><th>IP Address</th></tr></thead>
          <tbody>
            ${mockData.activityLogs.map(l => `
              <tr>
                <td style="font-weight:500;">${l.user}</td>
                <td>${l.action}</td>
                <td style="color:var(--muted-foreground);">${l.date}</td>
                <td style="font-family:monospace;font-size:0.8rem;color:var(--muted-foreground);">${l.ip}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ======== REPORTS ========
function renderReports() {
  const st = state.analyticsStats;
  const allDonations   = state.donations || mockData.donations;
  const allCampaigns   = state.campaigns || mockData.campaigns;
  const totalAmt       = st ? st.totalDonations : allDonations.reduce((s,d)=>s+d.amount,0);
  const completedCount = allDonations.filter(d=>d.status==='completed').length;
  const totalCount     = allDonations.length || 1;
  const avgAmt         = totalCount ? (totalAmt / totalCount) : 0;
  const complRate      = ((completedCount / totalCount) * 100).toFixed(1);
  const topC           = [...allCampaigns].sort((a,b)=>b.collected-a.collected)[0];
  const token          = localStorage.getItem('token');
  const apiBase        = state.apiBase;

  const monthlyRows = (st?.monthlyChart || mockData.monthlyDonations).map(m => `
    <div class="list-item">
      <span>${m.month || m.month}</span>
      <strong>$${Number(m.total || m.amount || 0).toLocaleString()}</strong>
    </div>`).join('');

  const campaignRows = allCampaigns.slice(0,6).map(c => {
    const t   = Number(c.target_amount || c.target || 1);
    const col = Number(c.current_amount || c.collected || 0);
    const pct = Math.min((col / t) * 100, 100).toFixed(1);
    return `
      <div style="margin-bottom:0.9rem;">
        <div style="display:flex;justify-content:space-between;font-size:0.85rem;">
          <span>${c.name}</span><span style="font-weight:600;">${pct}%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        <div style="font-size:0.75rem;color:var(--muted-foreground);margin-top:2px;">
          $${col.toLocaleString()} / $${t.toLocaleString()}
        </div>
      </div>`;
  }).join('');

  const exportBtn = (label, url, icon) => {
    if (!token) return `<button class="btn" style="opacity:0.5;cursor:not-allowed;" title="Login required">${icon} ${label}</button>`;
    return `<button class="btn btn-blue" onclick="downloadReport('${url}', '${label.replace(/'/g, "\\'")}')">${icon} ${label}</button>`;
  };

  return `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;flex-wrap:wrap;gap:0.5rem;">
      <h1 class="page-title" style="margin:0;">${tx('Reports & Exports','التقارير والتصدير')}</h1>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
        ${exportBtn('Donations Excel', '/reports/export/excel', '📊')}
        ${exportBtn('Donations PDF',   '/reports/export/pdf',   '📄')}
        ${exportBtn('Campaigns Excel', '/reports/export/campaigns/excel', '📋')}
        ${exportBtn('Campaigns PDF',   '/reports/export/campaigns/pdf',   '📑')}
      </div>
    </div>
    <div class="kpi-grid">
      <div class="kpi-card"><p class="kpi-label">Total Raised</p><p class="kpi-value">$${totalAmt.toLocaleString()}</p></div>
      <div class="kpi-card"><p class="kpi-label">Avg Donation</p><p class="kpi-value">$${Number(avgAmt).toFixed(0)}</p></div>
      <div class="kpi-card"><p class="kpi-label">Completion Rate</p><p class="kpi-value">${complRate}%</p></div>
      <div class="kpi-card"><p class="kpi-label">Top Campaign</p><p class="kpi-value" style="font-size:1rem;">${topC?.name || '—'}</p></div>
    </div>
    <div class="split-2">
      <div class="card card-p">
        <h3 style="margin-bottom:1rem;">Monthly Donations</h3>
        <div class="list-stack">${monthlyRows}</div>
      </div>
      <div class="card card-p">
        <h3 style="margin-bottom:1rem;">Campaign Performance</h3>
        ${campaignRows}
      </div>
    </div>
  `;
}

// ======== USERS ========
function renderUsers() {
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem;">
      <h1 class="page-title" style="margin:0;">${tx('Users Management','إدارة المستخدمين')}</h1>
      <button class="btn btn-blue" onclick="showAddUserModal()">${getIcon('plus',16).replace('class="nav-icon"','')} Add User</button>
    </div>
    <div class="card" style="overflow:hidden;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th>Last Login</th><th>Actions</th></tr></thead>
          <tbody>
            ${mockData.users.map(u => `
              <tr>
                <td>
                  <div class="inline">
                    <div class="avatar">${u.name.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
                    <span>${u.name}</span>
                  </div>
                </td>
                <td>${u.email}</td>
                <td><span class="chip">${u.role}</span></td>
                <td>${badgePill(u.status.toLowerCase() === 'active' ? 'completed' : 'pending')}</td>
                <td style="color:var(--muted-foreground);">${u.lastLogin}</td>
                <td>
                  <button class="btn btn-muted" style="padding:0.35rem 0.7rem;" onclick="editUser(${u.id})">Edit</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ======== NOTIFICATIONS ========
function renderNotifications() {
  return `
    <h1 class="page-title">${tx('Notifications Center','مركز الإشعارات')}</h1>
    <div class="split-2">
      <div class="card card-p">
        <h3 style="margin-bottom:1rem;">Recent Alerts</h3>
        <div class="list-stack">
          ${mockData.notifications.map(n => `
            <div class="list-item">
              <div>
                <p style="font-weight:600;">${n.title}</p>
                <p style="font-size:0.85rem;color:var(--muted-foreground);">${n.details}</p>
              </div>
              <span class="chip">${n.time}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="card card-p">
        <h3 style="margin-bottom:1rem;">Delivery Settings</h3>
        ${toggleRow('Email alerts', 'Send new donation alerts by email', 'emailNotifications', state.settings.emailNotifications)}
        ${toggleRow('SMS alerts', 'Send high-priority alerts by SMS', 'smsNotifications', state.settings.smsNotifications)}
        ${toggleRow('Push alerts', 'Show real-time dashboard notifications', 'pushNotifications', state.settings.pushNotifications)}
      </div>
    </div>
  `;
}

// ======== MESSAGES ========
function renderMessages() {
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem;">
      <h1 class="page-title" style="margin:0;">${tx('Messages','الرسائل')}</h1>
      <button class="btn btn-blue" onclick="showComposeMessageModal()">${getIcon('plus',16).replace('class="nav-icon"','')} New Message</button>
    </div>
    <div class="card" style="overflow:hidden;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>From</th><th>Subject</th><th>Preview</th><th>Time</th><th>Status</th></tr></thead>
          <tbody>
            ${mockData.messages.map(m => `
              <tr>
                <td style="font-weight:600;">${m.from}</td>
                <td>${m.subject}</td>
                <td style="color:var(--muted-foreground);">${m.preview}</td>
                <td>${m.time}</td>
                <td>${m.unread ? '<span class="badge-pill badge-yellow">Unread</span>' : '<span class="badge-pill badge-green">Read</span>'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ======== MEDIA ========
function renderMedia() {
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem;">
      <h1 class="page-title" style="margin:0;">${tx('Media Manager','الوسائط')}</h1>
      <button class="btn btn-blue" onclick="uploadMediaAction()">${getIcon('upload',16).replace('class="nav-icon"','')} Upload</button>
    </div>
    <div class="media-grid">
      ${mockData.media.map(m => `
        <div class="media-card">
          <img class="media-thumb" src="${m.url}" alt="${m.name}" loading="lazy" />
          <div class="media-meta">
            <p style="font-weight:600;font-size:0.9rem;word-break:break-word;">${m.name}</p>
            <p style="font-size:0.8rem;color:var(--muted-foreground);">${m.size} • ${m.date}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ======== CONTENT ========
function renderContent() {
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem;">
      <h1 class="page-title" style="margin:0;">${tx('Content Management','إدارة المحتوى')}</h1>
      <button class="btn btn-blue" onclick="createContentItem()">${getIcon('plus',16).replace('class="nav-icon"','')} Create</button>
    </div>
    <div class="card" style="overflow:hidden;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Type</th><th>Status</th><th>Updated</th><th>Actions</th></tr></thead>
          <tbody>
            ${mockData.content.map(c => `
              <tr>
                <td style="font-weight:600;">${c.page}</td>
                <td>${c.type}</td>
                <td>${badgePill(c.status === 'Published' ? 'completed' : 'pending')}</td>
                <td style="color:var(--muted-foreground);">${c.updatedAt}</td>
                <td>
                  <div style="display:flex;gap:0.4rem;">
                    <button class="btn btn-muted" style="padding:0.35rem 0.65rem;" onclick="editContentItem(${c.id})">Edit</button>
                    <button class="btn btn-red" style="padding:0.35rem 0.65rem;" onclick="archiveContentItem(${c.id})">Archive</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ======== SETTINGS ========
function renderSettings() {
  const s = state.settings;
  return `
    <h1 class="page-title">${tx('Settings','الإعدادات')}</h1>
    <div style="max-width:800px;">
      <div class="settings-section">
        <div class="section-header">
          <svg class="section-icon" style="color:#3b82f6;" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          <h2 class="section-title">${tx('General Settings','الإعدادات العامة')}</h2>
        </div>
        <div class="form-row">
          <div class="field"><label>${tx('Site Name','اسم المنصة')}</label><input type="text" value="${s.siteName}" oninput="state.settings.siteName=this.value" /></div>
          <div class="field"><label>${tx('Admin Email','إيميل الإدارة')}</label><input type="email" value="${s.email}" oninput="state.settings.email=this.value" /></div>
          <div class="field"><label>${tx('Currency','العملة')}</label>
            <select onchange="state.settings.currency=this.value">
              <option value="EGP" ${s.currency==='EGP'?'selected':''}>EGP - جنيه مصري</option>
              <option value="USD" ${s.currency==='USD'?'selected':''}>USD - دولار</option>
              <option value="SAR" ${s.currency==='SAR'?'selected':''}>SAR - ريال سعودي</option>
            </select>
          </div>
          <div class="field"><label>${tx('Timezone','التوقيت')}</label>
            <select onchange="state.settings.timezone=this.value">
              <option value="Africa/Cairo" ${s.timezone==='Africa/Cairo'?'selected':''}>Africa/Cairo - توقيت القاهرة</option>
              <option value="UTC" ${s.timezone==='UTC'?'selected':''}>UTC</option>
              <option value="Asia/Riyadh" ${s.timezone==='Asia/Riyadh'?'selected':''}>Asia/Riyadh - توقيت الرياض</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label>${tx('Logo','اللوجو')}</label>
          <div style="display:flex;align-items:center;gap:1rem;">
            <div style="width:96px;height:96px;background:var(--muted);border-radius:0.5rem;display:flex;align-items:center;justify-content:center;">
              <svg style="width:32px;height:32px;color:var(--muted-foreground);" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
            </div>
            <button class="btn btn-blue" onclick="uploadLogoAction()">${tx('Upload Logo','رفع اللوجو')}</button>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <div class="section-header">
          <svg class="section-icon" style="color:#f97316;" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          <h2 class="section-title">${tx('Notification Settings','إعدادات الإشعارات')}</h2>
        </div>
        ${toggleRow(tx('Email Notifications','إشعارات الإيميل'),tx('Receive notifications via email','استقبل التنبيهات على الإيميل'),'emailNotifications',s.emailNotifications)}
        ${toggleRow(tx('SMS Notifications','إشعارات الرسائل'),tx('Receive notifications via SMS','استقبل التنبيهات في رسالة'),'smsNotifications',s.smsNotifications)}
        ${toggleRow(tx('Push Notifications','إشعارات فورية'),tx('Receive push notifications','استقبل تنبيهات مباشرة داخل الداش بورد'),'pushNotifications',s.pushNotifications)}
      </div>

      <div class="settings-section">
        <div class="section-header">
          <svg class="section-icon" style="color:#22c55e;" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="22" height="16" x="1" y="4" rx="2" ry="2"/><line x1="1" x2="23" y1="10" y2="10"/></svg>
          <h2 class="section-title">${tx('Payment Settings','إعدادات الدفع')}</h2>
        </div>
        <div class="field"><label>${tx('PayPal API Key','مفتاح PayPal')}</label><input type="password" placeholder="${tx('Enter PayPal API key','اكتب مفتاح PayPal')}" /></div>
        <div class="field"><label>${tx('Stripe API Key','مفتاح Stripe')}</label><input type="password" placeholder="${tx('Enter Stripe API key','اكتب مفتاح Stripe')}" /></div>
      </div>

      <div style="display:flex;justify-content:flex-end;">
        <button class="btn btn-blue" onclick="saveSettings()" style="padding:0.75rem 1.5rem;font-size:1rem;">${getIcon('save',18).replace('class="nav-icon"','')} ${tx('Save Settings','حفظ الإعدادات')}</button>
      </div>
    </div>
  `;
}

function toggleRow(label, desc, key, val) {
  return `
    <div class="toggle-row" onclick="state.settings['${key}']=!state.settings['${key}'];renderPage();">
      <div><p class="toggle-label">${label}</p><p class="toggle-desc">${desc}</p></div>
      <label class="toggle-switch" onclick="event.stopPropagation()">
        <input type="checkbox" ${val?'checked':''} onchange="state.settings['${key}']=this.checked" />
        <span class="slider"></span>
      </label>
    </div>
  `;
}

// ======== PLACEHOLDER ========
function renderPlaceholder(title) {
  return `<h1 class="page-title">${title}</h1><div class="placeholder"><p>${tx(`${title} - coming soon...`, `${title} - قريبًا`)}</p></div>`;
}

// ======== HELPERS ========
function badgePill(status) {
  const map = { completed:'green', approved:'green', success:'green', pending:'yellow', failed:'red', rejected:'red' };
  const cls = map[status] || 'yellow';
  return `<span class="badge-pill badge-${cls}">${status}</span>`;
}

async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };
  const res = await fetch(`${state.apiBase}${path}`, { ...options, headers });
  if (!res.ok) throw new Error('API failed');
  if (res.status === 204) return null;
  return res.json();
}

async function downloadReport(path, label) {
  const token = localStorage.getItem('token');
  if (!token) {
    showToast('Login required to download reports.', 'error');
    return;
  }

  try {
    const res = await fetch(`${state.apiBase}${path}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error('Download failed');

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = res.headers.get('Content-Disposition')?.split('filename=')[1]?.replace(/"/g, '') || label;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    showToast(`${label} downloaded successfully.`, 'success');
  } catch (_) {
    showToast(`Unable to download ${label}.`, 'error');
  }
}

async function loginWithApi(email, password) {
  try {
    const res = await fetch(`${state.apiBase}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.errors?.email?.[0] || data.message || tx('Invalid credentials','بيانات الدخول غير صحيحة');
      return { success: false, status: res.status, message: msg };
    }
    const token = data.data?.token || data.token;
    const user  = data.data?.user  || data.user || { id:'1', name:'أحمد فؤاد', email, role:'Admin' };
    return { success: true, backendConnected: true, token, user };
  } catch (_) {
    // Backend unreachable — allow offline demo mode
    await new Promise(r => setTimeout(r, 400));
    return {
      success: true,
      backendConnected: false,
      user: { id:'1', name:'أحمد فؤاد', email, role:'Admin' },
      message: tx('Offline mode','وضع دون اتصال'),
    };
  }
}

async function syncDashboardDataFromBackend() {
  const token = localStorage.getItem('token');
  if (!token) return;

  // Helper: our backend wraps paginated lists as {success, data: {data: [...]}}
  function extractList(json) {
    if (Array.isArray(json)) return json;
    if (Array.isArray(json.data)) return json.data;           // {data:[...]}
    if (Array.isArray(json.data?.data)) return json.data.data; // {data:{data:[...]}}
    return [];
  }

  try {
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
    const [donorsRes, campaignsRes, donationsRes, volunteersRes, analyticsRes] = await Promise.all([
      fetch(`${state.apiBase}/donors`,              { headers }),
      fetch(`${state.apiBase}/campaigns`,           { headers }),
      fetch(`${state.apiBase}/donations`,           { headers }),
      fetch(`${state.apiBase}/volunteers`,          { headers }),
      fetch(`${state.apiBase}/dashboard/analytics`, { headers }),
    ]);

    if (donorsRes.ok) {
      const donorsList = extractList(await donorsRes.json());
      if (donorsList.length) {
        state.donors = donorsList.map((d, idx) => ({
          id: d.id ?? idx + 1,
          name: d.name || '-',
          email: d.email || '-',
          phone: d.phone || '-',
          city: d.city || '-',
          totalDonations: Number(d.donations_sum_amount || d.total_donations || d.totalDonations || 0),
          dateJoined: (d.created_at || d.dateJoined || '').slice(0, 10),
        }));
      }
    }

    if (campaignsRes.ok) {
      const campaignsList = extractList(await campaignsRes.json());
      if (campaignsList.length) {
        state.campaigns = campaignsList.map((c, idx) => ({
          id: c.id ?? idx + 1,
          name: c.name || 'Campaign',
          description: c.description || '',
          target: Number(c.target_amount || c.target || 0),
          collected: Number(c.current_amount || c.collected || 0),
          image: c.image_url || c.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400',
          status: c.status || 'active',
        }));
      }
    }

    if (donationsRes.ok) {
      const donationsList = extractList(await donationsRes.json());
      if (donationsList.length) {
        state.donations = donationsList.map((d, idx) => ({
          id: d.reference || 'D' + String(d.id).padStart(3,'0'),
          donorName: d.donor?.name || '-',
          campaign: d.campaign?.name || 'General',
          amount: Number(d.amount || 0),
          paymentMethod: d.payment_method || '-',
          status: d.status || 'pending',
          date: (d.donated_at || d.created_at || '').slice(0, 10),
        }));
      }
    }

    if (volunteersRes.ok) {
      const volunteersList = extractList(await volunteersRes.json());
      if (volunteersList.length) {
        state.volunteers = volunteersList.map((v, idx) => ({
          id: v.id ?? idx + 1,
          name: v.name || '-',
          email: v.email || '-',
          phone: v.phone || '-',
          skills: v.skills || '-',
          status: v.status || 'active',
          campaign: v.campaign?.name || '-',
        }));
      }
    }

    if (analyticsRes.ok) {
      const analyticsJson = await analyticsRes.json();
      const stats = analyticsJson.data || analyticsJson;
      state.analyticsStats = {
        totalDonations:   Number(stats.total_donations || 0),
        totalDonors:      Number(stats.total_donors || 0),
        activeCampaigns:  Number(stats.active_campaigns || 0),
        totalVolunteers:  Number(stats.total_volunteers || 0),
        totalCampaigns:   Number(stats.total_campaigns || 0),
        monthlyChart:     stats.monthly_chart || [],
        recentDonations:  stats.recent_donations || [],
        topCampaigns:     stats.top_campaigns || [],
      };
    }

    state.backendConnected = true;
    if (state.authenticated) renderPage();
  } catch (_) {
    state.backendConnected = false;
  }
}

function consumeWebsiteBridgeEvents() {
  let events = [];
  try {
    events = JSON.parse(localStorage.getItem(BRIDGE_KEY) || '[]');
  } catch (_) {
    events = [];
  }
  if (!events.length) return;

  let newCount = 0;
  events.forEach((evt) => {
    const marker = `Event#${evt.id}`;
    const exists = mockData.activityLogs.some((log) => log.action.includes(marker));
    if (exists) return;
    newCount += 1;

    mockData.activityLogs.unshift({
      id: (mockData.activityLogs[0]?.id || 0) + 1,
      user: 'Website',
      action: `${marker} ${evt.formName} submission received`,
      date: new Date(evt.createdAt || Date.now()).toLocaleString(),
      ip: 'public-site',
    });

    if (evt.formName === 'donation') {
      const amount = Number(evt.formValues?.amount || evt.formValues?.donationAmount || 0);
      mockData.notifications.unshift({
        id: (mockData.notifications[0]?.id || 0) + 1,
        title: tx('New website donation', 'تبرع جديد من الموقع'),
        details: tx(`Amount: $${amount || 0}`, `المبلغ: $${amount || 0}`),
        time: tx('Now', 'الآن'),
        type: 'success',
      });
    } else {
      mockData.messages.unshift({
        id: (mockData.messages[0]?.id || 0) + 1,
        from: tx('Website Form', 'نموذج الموقع'),
        subject: `${evt.formName} submission`,
        preview: tx('A new request arrived from website pages.', 'وصل طلب جديد من صفحات الموقع.'),
        time: tx('Now', 'الآن'),
        unread: true,
      });
    }
  });

  if (newCount > 0 && state.authenticated) {
    showToast(tx(`${newCount} website event(s) synced`, `تمت مزامنة ${newCount} حدث من الموقع`), 'success');
    renderPage();
  }
}

function handleGlobalSearch(value) {
  const q = value.trim().toLowerCase();
  if (state.currentPage === 'donors') {
    donorSearch(value);
    return;
  }
  if (!q) {
    renderPage();
    return;
  }
  const el = document.getElementById('page-inner');
  const rows = Array.from(el.querySelectorAll('tbody tr'));
  rows.forEach((row) => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

function editDonor(id) {
  const donor = state.donors.find(d => d.id === id);
  if (!donor) return;
  showToast(tx(`Editing ${donor.name}`, `جاري تعديل ${donor.name}`), 'success');
}

function showAddCampaignModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'campaign-modal';
  overlay.innerHTML = `
    <div class="modal-box">
      <h2 class="modal-title">${tx('Add Campaign','إضافة حملة')}</h2>
      <div class="field"><label>${tx('Name','الاسم')}</label><input type="text" id="cp-name" /></div>
      <div class="field"><label>${tx('Target Amount','المبلغ المستهدف')}</label><input type="number" id="cp-target" /></div>
      <div class="modal-footer">
        <button class="btn btn-muted" onclick="document.getElementById('campaign-modal').remove()">${tx('Cancel','إلغاء')}</button>
        <button class="btn btn-blue" onclick="addCampaign()">${tx('Save','حفظ')}</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
}

function addCampaign() {
  const name = document.getElementById('cp-name').value.trim();
  const target = Number(document.getElementById('cp-target').value || 0);
  if (!name || target <= 0) {
    showToast(tx('Please add valid campaign data','من فضلك ادخل بيانات حملة صحيحة'), 'warning');
    return;
  }
  const newId = Math.max(...state.campaigns.map(c => c.id)) + 1;
  const payload = {
    name,
    description: tx('New campaign','حملة جديدة'),
    target_amount: target,
    status: 'active'
  };
  apiRequest('/campaigns', { method: 'POST', body: JSON.stringify(payload) })
    .then((saved) => {
      state.campaigns.push({
        id: saved.id || newId,
        name: saved.name || name,
        description: saved.description || tx('New campaign','حملة جديدة'),
        target: Number(saved.target_amount || target),
        collected: Number(saved.current_amount || 0),
        image: saved.image || 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=400',
        status: saved.status || 'active'
      });
      document.getElementById('campaign-modal').remove();
      showToast(tx('Campaign added','تمت إضافة الحملة'), 'success');
      renderPage();
    })
    .catch(() => {
      state.campaigns.push({
        id: newId, name, description: tx('New campaign','حملة جديدة'),
        target, collected: 0, image: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=400', status: 'active'
      });
      document.getElementById('campaign-modal').remove();
      showToast(tx('Campaign added (offline)','تمت إضافة الحملة (بدون اتصال)'), 'warning');
      renderPage();
    });
}

function showEditCampaignModal(id) {
  const campaign = state.campaigns.find(c => c.id === id);
  if (!campaign) return;
  showToast(tx(`Editing campaign: ${campaign.name}`, `جاري تعديل الحملة: ${campaign.name}`), 'success');
}

function viewRequest(id) {
  const req = mockData.requests.find(r => r.id === id);
  if (!req) return;
  showToast(`${req.requester} - ${req.type} - $${req.amount}`, 'success');
}

function uploadLogoAction() {
  showToast(tx('Upload logo action is ready to connect with backend', 'ميزة رفع اللوجو جاهزة للربط مع الباك إند'), 'success');
}

function saveSettings() {
  localStorage.setItem('dashboard_settings', JSON.stringify(state.settings));
  showToast(tx('Settings saved successfully','تم حفظ الإعدادات بنجاح'), 'success');
}

function uploadMediaAction() {
  const now = new Date().toISOString().slice(0, 10);
  mockData.media.unshift({
    id: (mockData.media[0]?.id || 0) + 1,
    name: `new-media-${Date.now()}.jpg`,
    size: '500 KB',
    date: now,
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600'
  });
  showToast(tx('Media uploaded','تم رفع الوسائط'), 'success');
  if (state.currentPage === 'media') renderPage();
}

function showAddUserModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'user-modal';
  overlay.innerHTML = `
    <div class="modal-box">
      <h2 class="modal-title">${tx('Add User','إضافة مستخدم')}</h2>
      <div class="field"><label>${tx('Name','الاسم')}</label><input id="usr-name" type="text" /></div>
      <div class="field"><label>${tx('Email','البريد الإلكتروني')}</label><input id="usr-email" type="email" /></div>
      <div class="field"><label>${tx('Role','الدور')}</label>
        <select id="usr-role"><option>Admin</option><option>Moderator</option></select>
      </div>
      <div class="modal-footer">
        <button class="btn btn-muted" onclick="document.getElementById('user-modal').remove()">${tx('Cancel','إلغاء')}</button>
        <button class="btn btn-blue" onclick="addUser()">${tx('Save','حفظ')}</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
}

function addUser() {
  const name = document.getElementById('usr-name').value.trim();
  const email = document.getElementById('usr-email').value.trim();
  const role = document.getElementById('usr-role').value;
  if (!name || !email) {
    showToast(tx('Please enter valid user data','من فضلك أدخل بيانات مستخدم صحيحة'), 'warning');
    return;
  }
  mockData.users.unshift({
    id: (mockData.users[0]?.id || 0) + 1,
    name, email, role, status: 'Active', lastLogin: tx('Never','لم يسجل دخول بعد')
  });
  document.getElementById('user-modal').remove();
  showToast(tx('User added','تمت إضافة المستخدم'), 'success');
  if (state.currentPage === 'users') renderPage();
}

function editUser(id) {
  const user = mockData.users.find(u => u.id === id);
  if (!user) return;
  user.status = user.status === 'Active' ? 'Inactive' : 'Active';
  showToast(tx('User status updated','تم تحديث حالة المستخدم'), 'success');
  if (state.currentPage === 'users') renderPage();
}

function showComposeMessageModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'msg-modal';
  overlay.innerHTML = `
    <div class="modal-box">
      <h2 class="modal-title">${tx('Compose Message','إنشاء رسالة')}</h2>
      <div class="field"><label>${tx('Recipient','المستلم')}</label><input id="msg-to" type="text" /></div>
      <div class="field"><label>${tx('Subject','الموضوع')}</label><input id="msg-subject" type="text" /></div>
      <div class="field"><label>${tx('Message','الرسالة')}</label><textarea id="msg-body" rows="4"></textarea></div>
      <div class="modal-footer">
        <button class="btn btn-muted" onclick="document.getElementById('msg-modal').remove()">${tx('Cancel','إلغاء')}</button>
        <button class="btn btn-blue" onclick="sendMessageNow()">${tx('Send','إرسال')}</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
}

function sendMessageNow() {
  const to = document.getElementById('msg-to').value.trim();
  const subject = document.getElementById('msg-subject').value.trim();
  const body = document.getElementById('msg-body').value.trim();
  if (!to || !subject || !body) {
    showToast(tx('Please complete all fields','من فضلك أكمل كل الحقول'), 'warning');
    return;
  }
  mockData.messages.unshift({
    id: (mockData.messages[0]?.id || 0) + 1,
    from: tx('You','أنت'),
    subject,
    preview: body.slice(0, 65) + (body.length > 65 ? '...' : ''),
    time: tx('Now','الآن'),
    unread: false
  });
  document.getElementById('msg-modal').remove();
  showToast(tx('Message sent','تم إرسال الرسالة'), 'success');
  if (state.currentPage === 'messages') renderPage();
}

function createContentItem() {
  mockData.content.unshift({
    id: (mockData.content[0]?.id || 0) + 1,
    page: tx('New Content Block','قسم محتوى جديد'),
    type: 'Section',
    status: 'Draft',
    updatedAt: new Date().toISOString().slice(0, 10)
  });
  showToast(tx('Content item created','تم إنشاء عنصر محتوى'), 'success');
  if (state.currentPage === 'content') renderPage();
}

function editContentItem(id) {
  const item = mockData.content.find(c => c.id === id);
  if (!item) return;
  item.updatedAt = new Date().toISOString().slice(0, 10);
  showToast(tx('Content updated','تم تحديث المحتوى'), 'success');
  if (state.currentPage === 'content') renderPage();
}

function archiveContentItem(id) {
  const item = mockData.content.find(c => c.id === id);
  if (!item) return;
  item.status = 'Draft';
  showToast(tx('Content archived','تمت أرشفة المحتوى'), 'warning');
  if (state.currentPage === 'content') renderPage();
}

// ======== BOOT ========
init();
