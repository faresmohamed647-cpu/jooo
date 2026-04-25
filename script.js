// Language Toggle - ترجمة كاملة للويب
let currentLanguage = localStorage.getItem('siteLang') || 'en';
const SITE_API_BASE = localStorage.getItem('apiBase') || 'http://127.0.0.1:8000/api';
const SITE_BRIDGE_KEY = 'siteDashboardEvents';

function readBridgeEvents() {
  try {
    return JSON.parse(localStorage.getItem(SITE_BRIDGE_KEY) || '[]');
  } catch (_) {
    return [];
  }
}

function pushBridgeEvent(eventData) {
  const events = readBridgeEvents();
  events.unshift({
    id: Date.now() + Math.floor(Math.random() * 1000),
    ...eventData,
    createdAt: new Date().toISOString()
  });
  localStorage.setItem(SITE_BRIDGE_KEY, JSON.stringify(events.slice(0, 150)));
}

async function postToBackend(path, payload) {
  try {
    await fetch(`${SITE_API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return true;
  } catch (_) {
    return false;
  }
}

async function bridgeFormToDashboard(formName, formValues) {
  const commonEvent = {
    source: 'public-site',
    formName,
    formValues,
    status: 'received'
  };
  pushBridgeEvent(commonEvent);

  if (formName === 'donation') {
    const amount = Number(formValues.amount || formValues.donationAmount || formValues['donation-amount'] || 0);
    await postToBackend('/notifications/admin-alert', {
      message: `New website donation request received. Amount: ${amount || 'N/A'}`
    });
  }
}

const textReplacements = [
  { en: 'Module', ar: 'الوحدة' },
  { en: 'Routes', ar: 'المسارات' },
  { en: 'Role', ar: 'الدور' },
  { en: 'Dashboard & Reports', ar: 'لوحة التحكم والتقارير' },
  { en: 'Dashboard & Reports: aggregate stats, analytics, CSV export, and PDF export.', ar: 'لوحة التحكم والتقارير: تجميع الإحصائيات، التحليلات، تصدير CSV، وتصدير PDF.' },

  { en: 'Authentication', ar: 'المصادقة' },
  { en: 'POST /api/auth/register, POST /api/auth/login, POST /api/auth/logout, GET /api/auth/me', ar: 'POST /api/auth/register ، POST /api/auth/login ، POST /api/auth/logout ، GET /api/auth/me' },
  { en: 'Public login/register, authenticated profile/logout.', ar: 'تسجيل دخول/تسجيل عام، ملف شخصي مصادق عليه/تسجيل خروج.' },
  { en: 'Public Site', ar: 'الموقع العام' },
  { en: 'GET /api/campaigns, GET /api/campaigns/{id}, POST /api/donations, POST /api/volunteers', ar: 'GET /api/campaigns ، GET /api/campaigns/{id} ، POST /api/donations ، POST /api/volunteers' },
  { en: 'Feeds the website without requiring dashboard access.', ar: 'يغذي الموقع الإلكتروني دون الحاجة إلى الوصول إلى لوحة التحكم.' },
  { en: 'Admin CRUD', ar: 'عمليات CRUD للمسؤول' },
  { en: '/api/donors, /api/campaigns, /api/donations, /api/volunteers, /api/users', ar: '/api/donors ، /api/campaigns ، /api/donations ، /api/volunteers ، /api/users' },
  { en: 'Protected admin operations behind token and role middleware.', ar: 'عمليات المسؤول المحمية خلف التوكن والبرمجية الوسيطة للأدوار.' },
  { en: 'Dashboard', ar: 'لوحة التحكم' },
  { en: 'GET /api/dashboard/analytics, GET /api/dashboard/stats', ar: 'GET /api/dashboard/analytics ، GET /api/dashboard/stats' },
  { en: 'Returns aggregate metrics for dashboard widgets and summaries.', ar: 'يعيد المقاييس المجمعة لأدوات وملخصات لوحة التحكم.' },
  { en: 'Reports', ar: 'التقارير' },
  { en: '/api/reports/donations, .../export/excel, .../export/pdf', ar: '/api/reports/donations ، .../export/excel ، .../export/pdf' },
  { en: 'Provides reporting JSON and downloadable files.', ar: 'يوفر تقارير JSON وملفات قابلة للتنزيل.' },
  { en: 'Notifications', ar: 'الإشعارات' },
  { en: 'POST /api/notifications/admin-alert', ar: 'POST /api/notifications/admin-alert' },
  { en: 'Lets the public site push lightweight admin-side alerts.', ar: 'يسمح للموقع العام بإرسال تنبيهات خفيفة لجانب المسؤول.' },
  { en: 'Dashboard & Reports: aggregate stats, analytics, CSV export, and PDF export.', ar: 'لوحة التحكم والتقارير: تجميع الإحصائيات، التحليلات، تصدير CSV، وتصدير PDF.' },

  { en: 'Backend Architecture', ar: 'هيكلية الواجهة الخلفية (Backend Architecture)' },
  { en: 'The backend is a Laravel 13 API with role-based admin access and public endpoints for website actions.', ar: 'الواجهة الخلفية هي عبارة عن Laravel 13 API مع وصول للمسؤول يعتمد على الدور ونقاط نهاية عامة لإجراءات الموقع.' },
  { en: 'Main Backend Areas', ar: 'مناطق الواجهة الخلفية الرئيسية' },
  { en: '<strong>Auth</strong>: register, login, logout, current user, email verification, password reset.', ar: '<strong>المصادقة</strong>: التسجيل، تسجيل الدخول، تسجيل الخروج، المستخدم الحالي، التحقق من البريد الإلكتروني، إعادة تعيين كلمة المرور.' },
  { en: '<strong>Campaigns</strong>: public listing and protected admin CRUD.', ar: '<strong>الحملات</strong>: القائمة العامة وإدارة العمليات (CRUD) المحمية للمسؤول.' },
  { en: '<strong>Donations</strong>: donation creation, donor auto-creation, campaign total updates, queued mail notifications.', ar: '<strong>التبرعات</strong>: إنشاء التبرع، الإنشاء التلقائي للمتبرع، تحديثات إجمالي الحملة، وإشعارات البريد في الطابور.' },
  { en: '<strong>Users / Donors / Volunteers</strong>: admin management plus public volunteer registration.', ar: '<strong>المستخدمون / المتبرعون / المتطوعون</strong>: إدارة المسؤول بالإضافة إلى تسجيل المتطوعين العام.' },
  { en: '<strong>Dashboard & Reports</strong>: aggregate stats, analytics, CSV export, and PDF export.', ar: '<strong>لوحة التحكم والتقارير</strong>: تجميع الإحصائيات، التحليلات، تصدير CSV، وتصدير PDF.' },
  { en: 'Key Backend Folders', ar: 'مجلدات الواجهة الخلفية الرئيسية' },
  { en: '<strong>`app/Http/Controllers/Api`</strong> request entry points for all API modules.', ar: '<strong>`app/Http/Controllers/Api`</strong> نقاط دخول الطلبات لجميع وحدات API.' },
  { en: '<strong>`app/Services`</strong> business rules for campaign, donation, donor, dashboard, and user flows.', ar: '<strong>`app/Services`</strong> قواعد الأعمال لتدفقات الحملة، التبرع، المتبرع، لوحة التحكم، والمستخدم.' },
  { en: '<strong>`app/Http/Requests`</strong> validation logic for auth and CRUD operations.', ar: '<strong>`app/Http/Requests`</strong> منطق التحقق من الصحة لعمليات المصادقة والـ CRUD.' },
  { en: '<strong>`app/Http/Resources`</strong> API shaping layer for campaigns, donations, donors, volunteers, and users.', ar: '<strong>`app/Http/Resources`</strong> طبقة تشكيل API للحملات، التبرعات، المتبرعين، المتطوعين، والمستخدمين.' },
  { en: '<strong>`database/migrations`</strong> schema definitions for users, campaigns, donors, donations, and volunteers.', ar: '<strong>`database/migrations`</strong> تعريفات المخطط (Schema) للمستخدمين، الحملات، المتبرعين، التبرعات، والمتطوعين.' },
  { en: 'Laravel Sanctum is used for token-based API authentication.', ar: 'يتم استخدام Laravel Sanctum للمصادقة المعتمدة على التوكن لواجهة برمجة التطبيقات (API).' },
  { en: 'Admin route group is protected by `auth:sanctum` and custom `role:admin` middleware.', ar: 'مجموعة مسارات المسؤول محمية بـ `auth:sanctum` وبرمجية وسيطة مخصصة `role:admin`.' },
  { en: 'Public routes remain open for campaigns, donations, volunteers, and alert notifications.', ar: 'تظل المسارات العامة مفتوحة للحملات، التبرعات، المتطوعين، وإشعارات التنبيه.' },
  { en: 'User model supports role checks with `isAdmin()` and `isModerator()` helpers.', ar: 'يدعم نموذج المستخدم التحقق من الدور باستخدام مساعدي `isAdmin()` و `isModerator()`.' },
  { en: 'Campaigns expose progress calculation and active-status helpers.', ar: 'تعرض الحملات مساعدين لحساب التقدم وحالة النشاط.' },
  { en: 'Donations automatically receive a reference code and donation timestamp when missing.', ar: 'تتلقى التبرعات تلقائيًا رمزًا مرجعيًا وطابعًا زمنيًا للتبرع عند فقدانهما.' },
  { en: 'Donation create/update/delete operations can synchronize campaign `current_amount` totals.', ar: 'يمكن لعمليات إنشاء/تحديث/حذف التبرع مزامنة إجماليات `current_amount` للحملة.' },
  { en: 'Dashboard service calculates totals, top campaigns, recent donations, and monthly chart data.', ar: 'تحسب خدمة لوحة التحكم الإجماليات، وأفضل الحملات، وأحدث التبرعات، وبيانات الرسم البياني الشهري.' },
  { en: 'API Overview', ar: 'نظرة عامة على واجهة برمجة التطبيقات (API)' },
  { en: 'Representative routes that already exist in the backend.', ar: 'المسارات التمثيلية الموجودة بالفعل في الواجهة الخلفية.' },
  { en: 'Module', ar: 'الوحدة' },
  { en: 'Routes', ar: 'المسارات' },
  { en: 'Role', ar: 'الدور' },
  { en: 'Authentication', ar: 'المصادقة' },
  { en: 'Public login/register, authenticated profile/logout.', ar: 'تسجيل الدخول/التسجيل العام، الملف الشخصي المصادق عليه/تسجيل الخروج.' },
  { en: 'Public Site', ar: 'الموقع العام' },
  { en: 'Feeds the website without requiring dashboard access.', ar: 'يغذي الموقع دون الحاجة إلى الوصول إلى لوحة التحكم.' },
  { en: 'Admin CRUD', ar: 'عمليات CRUD للمسؤول' },
  { en: 'Protected admin operations behind token and role middleware.', ar: 'عمليات المسؤول المحمية خلف التوكن والبرمجية الوسيطة للأدوار.' },
  { en: 'Returns aggregate metrics for dashboard widgets and summaries.', ar: 'يعيد المقاييس المجمعة لأدوات وملخصات لوحة التحكم.' },
  { en: 'Reports', ar: 'التقارير' },
  { en: 'Provides reporting JSON and downloadable files.', ar: 'يوفر تقارير JSON وملفات قابلة للتنزيل.' },
  { en: 'Notifications', ar: 'الإشعارات' },
  { en: 'Lets the public site push lightweight admin-side alerts.', ar: 'يسمح للموقع العام بإرسال تنبيهات خفيفة لجانب المسؤول.' },
  { en: 'Data Model Summary', ar: 'ملخص نموذج البيانات' },
  { en: 'High-level relationships used by the application.', ar: 'العلاقات رفيعة المستوى المستخدمة في التطبيق.' },
  { en: 'Users', ar: 'المستخدمون' },
  { en: 'Authenticated actors with role-based permissions. Admin users control protected dashboard actions.', ar: 'جهات فاعلة مصادق عليها مع أذونات تعتمد على الدور. يتحكم مستخدمو المسؤول في إجراءات لوحة التحكم المحمية.' },
  { en: 'Donors and Donations', ar: 'المتبرعون والتبرعات' },
  { en: 'Donations belong to donors and may belong to campaigns. Donor records can be created automatically from public donation input.', ar: 'تنتمي التبرعات إلى المتبرعين وقد تنتمي إلى الحملات. يمكن إنشاء سجلات المتبرعين تلقائيًا من مدخلات التبرع العامة.' },
  { en: 'Campaigns and Volunteers', ar: 'الحملات والمتطوعون' },
  { en: 'Campaigns track goals and collected amounts. Volunteers are stored independently and counted by the dashboard analytics service.', ar: 'تتتبع الحملات الأهداف والمبالغ المجمعة. يتم تخزين المتطوعين بشكل مستقل ويتم عددهم بواسطة خدمة تحليلات لوحة التحكم.' },
  { en: 'Testing Coverage Added', ar: 'تمت إضافة تغطية الاختبار' },
  { en: 'Default example tests were replaced by actual backend feature coverage.', ar: 'تم استبدال اختبارات الأمثلة الافتراضية بتغطية ميزات الواجهة الخلفية الفعلية.' },
  { en: '<strong>`AuthApiTest`</strong> covers registration, login, and authenticated user profile retrieval.', ar: '<strong>`AuthApiTest`</strong> يغطي التسجيل، تسجيل الدخول، واسترجاع الملف الشخصي للمستخدم المصادق عليه.' },
  { en: '<strong>`CampaignApiTest`</strong> covers public listing, admin creation, and access denial for non-admin users.', ar: '<strong>`CampaignApiTest`</strong> يغطي القائمة العامة، إنشاء المسؤول، ومنع الوصول للمستخدمين غير المسؤولين.' },
  { en: '<strong>`DonationApiTest`</strong> covers donor creation, donation persistence, queued emails, and campaign amount synchronization.', ar: '<strong>`DonationApiTest`</strong> يغطي إنشاء المتبرع، استمرار التبرع، رسائل البريد في الطابور، ومزامنة مبلغ الحملة.' },
  { en: '<strong>`DashboardApiTest`</strong> covers dashboard summary totals and top campaign output.', ar: '<strong>`DashboardApiTest`</strong> يغطي إجماليات ملخص لوحة التحكم وعرض أفضل الحملات.' },
  { en: 'New model factories for `Campaign`, `Donor`, and `Donation`.', ar: 'مصانع نماذج جديدة لـ `Campaign` و `Donor` و `Donation`.' },
  { en: 'Tests use `RefreshDatabase` so each scenario runs against a clean in-memory database.', ar: 'تستخدم الاختبارات `RefreshDatabase` بحيث يتم تشغيل كل سيناريو مقابل قاعدة بيانات نظيفة في الذاكرة.' },
  { en: 'A single page reference for the complete website and backend architecture.', ar: 'مرجع لصفحة واحدة لهيكل الموقع الكامل والواجهة الخلفية.' },
  { en: 'Header/footer structure is duplicated across HTML pages instead of being templated.', ar: 'يتم تكرار هيكل الهيدر/الفوتر عبر صفحات HTML بدلاً من استخدام القوالب.' },
  { en: 'Auth token handling on the static frontend is lightweight and suitable for demo/admin shortcut behavior, not a full production auth shell.', ar: 'معالجة توكن المصادقة على الواجهة الأمامية الثابتة خفيف الوزن ومناسب لسلوك العروض التوضيحية/اختصارات المسؤول، وليس نظام مصادقة إنتاجي كامل.' },

  { en: 'Full Stack Overview', ar: 'نظرة عامة على النظام' },
  { en: 'Backend and Frontend Details', ar: 'تفاصيل الواجهة الأمامية والخلفية' },
  { en: 'This page documents the full project structure, including UI pages, shared frontend logic, Laravel backend modules, APIs, database entities, and backend test coverage.', ar: 'توثق هذه الصفحة هيكل المشروع بالكامل، بما في ذلك صفحات واجهة المستخدم، والمنطق المشترك، ووحدات الواجهة الخلفية (Laravel)، وواجهات برمجة التطبيقات (APIs)، وكيانات قاعدة البيانات، وتغطية اختبارات الواجهة الخلفية.' },
  { en: 'Frontend Architecture', ar: 'هيكلية الواجهة الأمامية (Frontend)' },
  { en: 'The client side is a static multi-page site that shares one design system and one main JavaScript controller.', ar: 'جانب العميل هو موقع ثابت متعدد الصفحات يشارك نظام تصميم واحد ومتحكم جافا سكريبت رئيسي واحد.' },
  { en: 'Frontend Files', ar: 'ملفات الواجهة الأمامية' },
  { en: 'Frontend Logic', ar: 'منطق الواجهة الأمامية' },
  { en: 'Frontend Strengths', ar: 'نقاط قوة الواجهة الأمامية' },
  { en: 'Frontend Gaps Noted', ar: 'ملاحظات/نواقص في الواجهة الأمامية' },
  { en: 'Backend Architecture (Laravel 11)', ar: 'هيكلية الواجهة الخلفية (Laravel 11)' },
  { en: 'The backend is a robust REST API serving JSON to the frontend, featuring auth, models, and specialized services.', ar: 'الواجهة الخلفية هي REST API قوية تقدم بيانات JSON للواجهة الأمامية، وتتميز بنظام المصادقة والنماذج والخدمات المتخصصة.' },
  { en: 'Core Modules', ar: 'الوحدات الأساسية (Core Modules)' },
  { en: 'API Endpoints Overview', ar: 'نظرة عامة على مسارات الـ API' },
  { en: 'Security & Services', ar: 'الأمان والخدمات' },
  { en: 'Backend Testing Coverage', ar: 'تغطية اختبار الواجهة الخلفية' },
  { en: 'Database Schema', ar: 'مخطط قاعدة البيانات (Database Schema)' },
  { en: 'A quick look at the main database tables and their relationships.', ar: 'نظرة سريعة على الجداول الرئيسية في قاعدة البيانات وعلاقاتها.' },
  { en: 'Users Table', ar: 'جدول المستخدمين (Users)' },
  { en: 'Campaigns Table', ar: 'جدول الحملات (Campaigns)' },
  { en: 'Donations Table', ar: 'جدول التبرعات (Donations)' },
  { en: 'Volunteers Table', ar: 'جدول المتطوعين (Volunteers)' },
  { en: 'Frontend pages', ar: 'صفحات واجهة مستخدم' },
  { en: 'API routes', ar: 'مسارات API' },
  { en: 'Core services', ar: 'خدمات أساسية' },
  { en: 'Real feature test files', ar: 'ملفات اختبار فعلية' },
  { en: '<strong>`index.html`</strong> landing page with hero, stats, featured campaigns, and donation CTAs.', ar: '<strong>`index.html`</strong> الصفحة الرئيسية التي تحتوي على البانر، الإحصائيات، الحملات المميزة، وأزرار التبرع.' },
  { en: '<strong>`about.html`</strong> organization mission, values, and team.', ar: '<strong>`about.html`</strong> رسالة المنظمة، قيمها، وفريق العمل.' },
  { en: '<strong>`campaigns.html`</strong> public campaigns page that can render backend campaign data.', ar: '<strong>`campaigns.html`</strong> صفحة الحملات العامة التي تعرض بيانات الحملات من الواجهة الخلفية.' },
  { en: '<strong>`donate.html`</strong> donation input flow connected to the backend donations endpoint.', ar: '<strong>`donate.html`</strong> تدفق إدخال التبرعات المتصل بنقطة نهاية التبرعات في الواجهة الخلفية.' },
  { en: '<strong>`volunteer.html`</strong> volunteer registration form connected to the volunteer API.', ar: '<strong>`volunteer.html`</strong> نموذج تسجيل المتطوعين المتصل بواجهة برمجة تطبيقات التطوع.' },
  { en: '<strong>`beneficiaries.html`, `news.html`, `contact.html`, `login1.html`</strong> support content and user actions.', ar: '<strong>`beneficiaries.html`, `news.html`, `contact.html`, `login1.html`</strong> محتوى الدعم وإجراءات المستخدم.' },
  { en: '<strong>`admain/WEB.html`</strong> admin-facing dashboard area.', ar: '<strong>`admain/WEB.html`</strong> لوحة تحكم المسؤول.' },
  { en: '<strong>`styles.css`</strong> contains the shared theme, layout, cards, forms, buttons, and responsive rules.', ar: '<strong>`styles.css`</strong> يحتوي على الثيم المشترك، التخطيط، البطاقات، النماذج، الأزرار، وقواعد الاستجابة للشاشات المختلفة.' },
  { en: '<strong>`script.js`</strong> handles translations, nav state, form submission, stats animation, API calls, and dashboard shortcuts.', ar: '<strong>`script.js`</strong> يتعامل مع الترجمات، حالة التنقل، إرسال النماذج، حركة الإحصائيات، استدعاءات الـ API، واختصارات لوحة التحكم.' },
  { en: 'Campaigns are loaded from `GET /api/campaigns` when available, with static cards as fallback.', ar: 'يتم تحميل الحملات من `GET /api/campaigns` عند توفرها، مع بطاقات ثابتة كبديل.' },
  { en: 'Donation and volunteer forms submit with `fetch` using `SITE_API_BASE` from local storage.', ar: 'تُرسل نماذج التبرع والتطوع باستخدام `fetch` عبر الاعتماد على `SITE_API_BASE` المحفوظ محلياً.' },
  { en: 'Local storage also keeps language preference and lightweight site-to-dashboard event data.', ar: 'يحفظ التخزين المحلي (Local storage) أيضاً تفضيلات اللغة وبيانات الأحداث الخفيفة بين الموقع ولوحة التحكم.' },
  { en: 'Simple deployment because the website is mostly static files.', ar: 'سهولة النشر لأن الموقع يتكون بشكل أساسي من ملفات ثابتة.' },
  { en: 'Reusable UI via shared classes and repeated header/footer patterns.', ar: 'واجهة مستخدم قابلة لإعادة الاستخدام عبر الفئات المشتركة وأنماط الهيدر والفوتر المتكررة.' },
  { en: 'Responsive layout already exists for navigation, cards, and grids.', ar: 'تخطيط متجاوب موجود بالفعل للتنقل والبطاقات والشبكات.' },
  { en: 'The site can still show useful content when the API is unavailable.', ar: 'يمكن للموقع الاستمرار في عرض محتوى مفيد حتى في حال عدم توفر الـ API.' },
  { en: 'Some existing files contain character encoding artifacts in visible text.', ar: 'تحتوي بعض الملفات الحالية على تشوهات في ترميز الأحرف في النص المرئي.' },
  { en: 'No frontend framework (React/Vue) means DOM manipulation is manual and scattered.', ar: 'عدم وجود إطار عمل للواجهة الأمامية (مثل React أو Vue) يعني أن معالجة عناصر DOM يدوية ومشتتة.' },
  { en: 'Translations exist mostly in `script.js` via text replacement, missing a robust i18n JSON structure.', ar: 'الترجمات موجودة بشكل أساسي في `script.js` عبر استبدال النصوص، مما يفتقر إلى هيكل i18n JSON قوي.' },
  { en: '<strong>Auth:</strong> Sanctum token-based authentication (`AuthController`).', ar: '<strong>المصادقة:</strong> مصادقة تعتمد على التوكن باستخدام Sanctum (`AuthController`).' },
  { en: '<strong>Donations:</strong> Processes and records financial contributions (`DonationController`).', ar: '<strong>التبرعات:</strong> معالجة وتسجيل المساهمات المالية (`DonationController`).' },
  { en: '<strong>Campaigns:</strong> Manages fundraising targets and display details (`CampaignController`).', ar: '<strong>الحملات:</strong> إدارة أهداف جمع التبرعات وتفاصيل العرض (`CampaignController`).' },
  { en: '<strong>Volunteers:</strong> Handles volunteer onboarding forms (`VolunteerController`).', ar: '<strong>المتطوعين:</strong> معالجة نماذج تسجيل المتطوعين (`VolunteerController`).' },
  { en: '<strong>Reports:</strong> Exports system data to PDF and CSV (`ReportController`).', ar: '<strong>التقارير:</strong> تصدير بيانات النظام إلى PDF و CSV (`ReportController`).' },
  { en: '<strong>Dashboard:</strong> Aggregates stats for the admin panel (`DashboardController`).', ar: '<strong>لوحة التحكم:</strong> تجميع الإحصائيات للوحة تحكم المسؤول (`DashboardController`).' },
  { en: '<code>POST /api/auth/login</code> - Authenticates and issues a token.', ar: '<code>POST /api/auth/login</code> - يصادق ويصدر توكن.' },
  { en: '<code>GET /api/campaigns</code> - Lists active campaigns.', ar: '<code>GET /api/campaigns</code> - يعرض الحملات النشطة.' },
  { en: '<code>POST /api/donations</code> - Saves a new donation record.', ar: '<code>POST /api/donations</code> - يحفظ سجل تبرع جديد.' },
  { en: '<code>POST /api/volunteers</code> - Registers a new volunteer.', ar: '<code>POST /api/volunteers</code> - يسجل متطوعاً جديداً.' },
  { en: '<code>GET /api/dashboard/stats</code> - Returns aggregated metrics.', ar: '<code>GET /api/dashboard/stats</code> - يعرض الإحصائيات المجمعة.' },
  { en: '<code>GET /api/reports/donations/pdf</code> - Generates a PDF report.', ar: '<code>GET /api/reports/donations/pdf</code> - يُصدر تقرير PDF.' },
  { en: '<strong>Sanctum Middleware:</strong> Protects admin routes (dashboard, reports, CRUD).', ar: '<strong>Sanctum Middleware:</strong> يحمي المسارات الخاصة بالمسؤولين.' },
  { en: '<strong>Role Validation:</strong> Checks `is_admin` or `role === admin`.', ar: '<strong>التحقق من الدور:</strong> يتحقق من الحقل `is_admin` أو `role === admin`.' },
  { en: '<strong>Export Services:</strong> Uses <code>barryvdh/laravel-dompdf</code> for PDFs and manual headers for CSVs.', ar: '<strong>خدمات التصدير:</strong> يستخدم <code>barryvdh/laravel-dompdf</code> للـ PDF ورؤوس برمجية لملفات CSV.' },
  { en: '<strong>DonationTest:</strong> Tests validation, successful creation, and required fields.', ar: '<strong>اختبار التبرعات:</strong> يختبر التحقق من الصحة، الإنشاء الناجح، والحقول المطلوبة.' },
  { en: '<strong>VolunteerTest:</strong> Tests application submission and required data.', ar: '<strong>اختبار المتطوعين:</strong> يختبر إرسال الطلب والبيانات المطلوبة.' },
  { en: '<strong>DashboardTest:</strong> Ensures stats API is protected and returns correct metrics.', ar: '<strong>اختبار لوحة التحكم:</strong> يضمن حماية مسار الإحصائيات وإرجاع البيانات الصحيحة.' },
  { en: '<strong>ReportTest:</strong> Validates PDF and CSV endpoint responses and headers.', ar: '<strong>اختبار التقارير:</strong> يتحقق من استجابات مسارات تصدير الـ PDF و CSV.' },
  { en: '<code>id</code>, <code>name</code>, <code>email</code>, <code>password</code>, <code>role</code> (admin/user)', ar: '<code>id</code>, <code>name</code>, <code>email</code>, <code>password</code>, <code>role</code> (مسؤول/مستخدم)' },
  { en: '<code>id</code>, <code>title</code>, <code>description</code>, <code>goal_amount</code>, <code>raised_amount</code>, <code>image</code>', ar: '<code>id</code>, <code>title</code>, <code>description</code>, <code>goal_amount</code>, <code>raised_amount</code>, <code>image</code>' },
  { en: '<code>id</code>, <code>donor_name</code>, <code>amount</code>, <code>payment_method</code>, <code>campaign_id</code> (nullable)', ar: '<code>id</code>, <code>donor_name</code>, <code>amount</code>, <code>payment_method</code>, <code>campaign_id</code> (اختياري)' },
  { en: '<code>id</code>, <code>name</code>, <code>email</code>, <code>phone</code>, <code>skills</code>, <code>availability</code>', ar: '<code>id</code>, <code>name</code>, <code>email</code>, <code>phone</code>, <code>skills</code>, <code>availability</code>' },
  { en: 'Security Model', ar: 'النموذج الأمني' },
  { en: 'Authentication (Sanctum)', ar: 'المصادقة (Sanctum)' },
  { en: 'Provides token-based auth for mobile devices and admin single-page applications.', ar: 'يوفر مصادقة تعتمد على التوكن للأجهزة المحمولة وتطبيقات لوحة تحكم المسؤول.' },
  { en: 'Role-Based Access', ar: 'الوصول المعتمد على الدور' },
  { en: 'Ensures regular users can only read public endpoints while admins can manage entities.', ar: 'يضمن أن المستخدمين العاديين يمكنهم فقط قراءة المسارات العامة بينما يمكن للمسؤولين إدارة الكيانات.' },
  { en: 'API Rate Limiting', ar: 'تحديد معدل استدعاء API' },
  { en: "Uses Laravel's default `api` middleware group to prevent brute force attacks.", ar: 'يستخدم مجموعة `api` الافتراضية في Laravel لمنع هجمات القوة الغاشمة.' },
  { en: 'Input Validation', ar: 'التحقق من صحة المدخلات' },
  { en: 'Strict `FormRequest` validation for user creation, donations, and campaign updates.', ar: 'تحقق صارم `FormRequest` لإنشاء المستخدمين، التبرعات، وتحديثات الحملات.' },
  { en: 'Business Rules', ar: 'قواعد الأعمال' },
  { en: 'Donation Assignment', ar: 'تخصيص التبرعات' },
  { en: 'Donations can be tied to a specific `campaign_id` or left null for general organizational funding.', ar: 'يمكن ربط التبرعات بـ `campaign_id` محدد أو تركها فارغة للتمويل العام للمنظمة.' },
  { en: 'Campaign Goal Sync', ar: 'مزامنة أهداف الحملة' },
  { en: 'When a donation is completed, the `raised_amount` on the campaign is incremented.', ar: 'عند اكتمال تبرع، يتم زيادة `raised_amount` في الحملة.' },
  { en: 'Volunteer Approval', ar: 'الموافقة على المتطوعين' },
  { en: "Volunteers default to 'pending' status until an admin approves them.", ar: "حالة المتطوعين الافتراضية هي 'معلق' حتى يوافق عليهم مسؤول." },
  { en: 'Report Generation', ar: 'توليد التقارير' },
  { en: 'Reports run queries on donations over time and convert the view to PDF via dompdf.', ar: 'تجري التقارير استعلامات على التبرعات بمرور الوقت وتحول العرض إلى PDF عبر dompdf.' },
  { en: 'Testing and Quality', ar: 'الاختبار والجودة' },
  { en: 'Implemented Test Files', ar: 'ملفات الاختبار المنفذة' },
  { en: '`AuthApiTest`', ar: '`AuthApiTest`' },
  { en: 'covers registration, login, and authenticated user profile retrieval.', ar: 'يغطي التسجيل، تسجيل الدخول، واسترجاع الملف الشخصي للمستخدم المصادق عليه.' },
  { en: '`CampaignApiTest`', ar: '`CampaignApiTest`' },
  { en: 'covers public listing, admin creation, and access denial for non-admin users.', ar: 'يغطي العرض العام، إنشاء المسؤولين، ومنع الوصول لغير المسؤولين.' },
  { en: '`DonationApiTest`', ar: '`DonationApiTest`' },
  { en: 'covers donor creation, donation persistence, queued emails, and campaign amount synchronization.', ar: 'يغطي إنشاء المتبرعين، حفظ التبرعات، رسائل البريد الإلكتروني المجدولة، ومزامنة مبلغ الحملة.' },
  { en: '`DashboardApiTest`', ar: '`DashboardApiTest`' },
  { en: 'covers dashboard summary totals and top campaign output.', ar: 'يغطي إجماليات ملخص لوحة التحكم وعرض أفضل الحملات.' },
  { en: 'Testing Support Added', ar: 'دعم الاختبار المضاف' },
  { en: 'New model factories for `Campaign`, `Donor`, and `Donation`.', ar: 'مصانع نماذج جديدة لـ `Campaign`, `Donor`, و `Donation`.' },
  { en: 'New `admin()` state in `UserFactory`.', ar: 'حالة `admin()` جديدة في `UserFactory`.' },
  { en: 'Tests use `RefreshDatabase` so each scenario runs against a clean in-memory database.', ar: 'تستخدم الاختبارات `RefreshDatabase` ليعمل كل سيناريو على قاعدة بيانات نظيفة في الذاكرة.' },
  { en: 'NOUR AL- KHEIR', ar: 'نور الخير' },
  { en: 'A single page reference for the complete website and backend architecture.', ar: 'مرجع لصفحة واحدة لهيكل الموقع الكامل والواجهة الخلفية.' },
  { en: 'Backend', ar: 'الواجهة الخلفية' },
  { en: 'Laravel 13', ar: 'Laravel 13' },
  { en: 'Sanctum auth', ar: 'مصادقة Sanctum' },
  { en: 'CSV and PDF reports', ar: 'تقارير CSV و PDF' },
  { en: 'Admin middleware', ar: 'Admin middleware' },
  { en: 'Frontend', ar: 'الواجهة الأمامية' },
  { en: 'Static HTML pages', ar: 'صفحات HTML ثابتة' },
  { en: 'Shared CSS and JS', ar: 'CSS و JS مشترك' },
  { en: 'API-connected forms', ar: 'نماذج متصلة بـ API' },
  { en: 'Responsive UI', ar: 'واجهة مستخدم متجاوبة' },
  { en: '9+', ar: '9+' },
  { en: '20+', ar: '20+' },
  { en: '5', ar: '5' },
  { en: '4', ar: '4' },

  { en: 'Medical Treatments', ar: 'علاجات طبية' },
  { en: 'Their Stories', ar: 'قصصهم' },
  { en: 'Real stories of hope, resilience, and transformation', ar: 'قصص حقيقية من الأمل والصمود والتحول' },
  { en: "Nour's Education Journey", ar: 'رحلة نور التعليمية' },
  { en: `"Thanks to Hope Foundation, I was able to complete my education. They provided me with books, supplies, and a scholarship. Today, I'm a university graduate pursuing my dream of becoming a teacher."`, ar: 'بفضل مؤسسة الأمل استطعت إكمال تعليمي. وفروا لي الكتب والمستلزمات ومنحة دراسية. واليوم أنا خريجة جامعة وأسعى لتحقيق حلمي بأن أصبح معلمة.' },
  { en: '- Nour, 22 years old', ar: '- نور، 22 سنة' },
  { en: "Ahmed's Recovery", ar: 'تعافي أحمد' },
  { en: `"When I fell ill and couldn't afford treatment, Hope Foundation stepped in. They covered my medical expenses and supported my family during the difficult time. I'm now healthy and back to work."`, ar: 'عندما مرضت ولم أستطع تحمل تكلفة العلاج، تدخلت مؤسسة الأمل. غطت نفقاتي الطبية ودعمت أسرتي خلال الفترة الصعبة. أنا الآن بصحة جيدة وعدت إلى عملي.' },
  { en: '- Ahmed, 35 years old', ar: '- أحمد، 35 سنة' },
  { en: "Fatima's New Beginning", ar: 'بداية فاطمة الجديدة' },
  { en: `"After losing everything, Hope Foundation helped my family find shelter and provided us with food and clothing. Their support gave us hope when we had none. We're now rebuilding our lives."`, ar: 'بعد أن فقدنا كل شيء، ساعدت مؤسسة الأمل أسرتي في إيجاد مأوى ووفرت لنا الطعام والملابس. منحنا دعمهم الأمل حين كنا نفتقده. ونحن الآن نعيد بناء حياتنا.' },
  { en: '- Fatima, 40 years old', ar: '- فاطمة، 40 سنة' },
  { en: 'What They Say', ar: 'ماذا يقولون' },
  { en: "Hear directly from those we've helped", ar: 'استمع مباشرة إلى من ساعدناهم' },
  { en: 'Amira Mohamed', ar: 'أميرة محمد' },
  { en: 'Mother of 3', ar: 'أم لثلاثة أطفال' },
  { en: `"Hope Foundation didn't just provide material support, they gave us dignity and hope. The volunteers treated us with respect and kindness. My children can now go to school with full bellies and warm clothes."`, ar: 'لم تقدم مؤسسة الأمل دعمًا ماديًا فقط، بل منحتنا الكرامة والأمل. تعامل معنا المتطوعون باحترام ولطف. وأصبح أطفالي الآن يذهبون إلى المدرسة ببطون ممتلئة وملابس دافئة.' },
  { en: 'Mahmoud Ali', ar: 'محمود علي' },
  { en: 'Small Business Owner', ar: 'صاحب مشروع صغير' },
  { en: `"The business training and small loan I received changed my life completely. I went from unemployment to running a successful shop. Hope Foundation believes in people and empowers them to succeed."`, ar: 'غيّر التدريب التجاري والقرض الصغير اللذان حصلت عليهما حياتي بالكامل. انتقلت من البطالة إلى إدارة متجر ناجح. مؤسسة الأمل تؤمن بالناس وتمكنهم من النجاح.' },
  { en: 'Help Us Create More Success Stories', ar: 'ساعدنا في صناعة المزيد من قصص النجاح' },
  { en: 'Your contribution can transform lives and create lasting change', ar: 'مساهمتك يمكن أن تغير حياة الناس وتصنع أثرًا دائمًا' },
  { en: 'Become a Volunteer', ar: 'كن متطوعًا' },
  { en: 'Executive Director', ar: 'المدير التنفيذي' },
  { en: 'Program Manager', ar: 'مدير البرامج' },
  { en: 'Community Outreach', ar: 'التواصل المجتمعي' },
  { en: 'Volunteer Coordinator', ar: 'منسق المتطوعين' },
  { en: 'Meet New People', ar: 'تعرف على أشخاص جدد' },
  { en: 'Connect with like-minded individuals', ar: 'تواصل مع أشخاص يشاركونك نفس القيم' },
  { en: 'Develop Skills', ar: 'طوّر مهاراتك' },
  { en: 'Gain valuable experience and skills', ar: 'اكتسب خبرات ومهارات قيمة' },
  { en: 'Feel Fulfilled', ar: 'اشعر بالرضا' },
  { en: 'Experience the joy of giving back', ar: 'عش فرحة رد الجميل' },
  { en: 'Volunteer Opportunities', ar: 'فرص التطوع' },
  { en: 'Choose from various ways to contribute', ar: 'اختر من بين طرق متعددة للمساهمة' },
  { en: 'Help us reach and support families in need through door-to-door visits and community events.', ar: 'ساعدنا في الوصول إلى الأسر المحتاجة ودعمها من خلال الزيارات الميدانية والفعاليات المجتمعية.' },
  { en: 'Weekend availability required', ar: 'يتطلب التفرغ في عطلة نهاية الأسبوع' },
  { en: 'Transportation provided', ar: 'توفير المواصلات' },
  { en: 'Training included', ar: 'يشمل التدريب' },
  { en: 'Apply Now', ar: 'قدّم الآن' },
  { en: 'Event Coordination', ar: 'تنسيق الفعاليات' },
  { en: 'Organize and manage fundraising events, charity drives, and community gatherings.', ar: 'نظّم وأدر فعاليات جمع التبرعات والحملات الخيرية والتجمعات المجتمعية.' },
  { en: 'Flexible schedule', ar: 'جدول مرن' },
  { en: 'Event planning experience', ar: 'خبرة في تنظيم الفعاليات' },
  { en: 'Team collaboration', ar: 'عمل جماعي' },
  { en: 'Teaching & Tutoring', ar: 'التدريس والدروس' },
  { en: 'Share your knowledge by tutoring children and adults in various subjects.', ar: 'شارك معرفتك من خلال تعليم الأطفال والبالغين في مواد مختلفة.' },
  { en: '2-4 hours per week', ar: 'من ساعتين إلى أربع ساعات أسبوعيًا' },
  { en: 'Subject expertise required', ar: 'يشترط التخصص أو الخبرة' },
  { en: 'Remote options available', ar: 'خيارات عن بعد متاحة' },
  { en: 'Medical Support', ar: 'دعم طبي' },
  { en: 'Healthcare professionals can provide medical assistance to underserved communities.', ar: 'يمكن للمتخصصين في الرعاية الصحية تقديم مساعدة طبية للمجتمعات الأقل حظًا.' },
  { en: 'Licensed professionals', ar: 'متخصصون مرخصون' },
  { en: 'Monthly commitment', ar: 'التزام شهري' },
  { en: 'Medical insurance provided', ar: 'تأمين طبي متوفر' },
  { en: 'Food Distribution', ar: 'توزيع الغذاء' },
  { en: 'Help prepare and distribute meals to families experiencing food insecurity.', ar: 'ساعد في إعداد وتوزيع الوجبات على الأسر التي تعاني من انعدام الأمن الغذائي.' },
  { en: 'Physical activity involved', ar: 'يتضمن مجهودًا بدنيًا' },
  { en: 'Weekly shifts available', ar: 'تتوفر ورديات أسبوعية' },
  { en: 'Group volunteering welcome', ar: 'التطوع الجماعي مرحب به' },
  { en: 'Administrative Support', ar: 'دعم إداري' },
  { en: 'Assist with office tasks, data entry, and organizational management.', ar: 'ساعد في المهام المكتبية وإدخال البيانات والتنظيم الإداري.' },
  { en: 'Office or remote work', ar: 'عمل مكتبي أو عن بعد' },
  { en: 'Computer skills required', ar: 'مهارات الحاسوب مطلوبة' },
  { en: 'Flexible hours', ar: 'ساعات مرنة' },
  { en: 'Volunteer Registration', ar: 'تسجيل التطوع' },
  { en: 'Fill out the form below to join our volunteer team', ar: 'املأ النموذج التالي للانضمام إلى فريق المتطوعين' },
  { en: 'Full Name *', ar: 'الاسم الكامل *' },
  { en: 'Email Address *', ar: 'البريد الإلكتروني *' },
  { en: 'Phone Number *', ar: 'رقم الهاتف *' },
  { en: 'Age', ar: 'العمر' },
  { en: 'Volunteer Opportunity *', ar: 'فرصة التطوع *' },
  { en: 'Select an opportunity', ar: 'اختر فرصة' },
  { en: 'Availability *', ar: 'التفرغ *' },
  { en: 'Select your availability', ar: 'اختر مدى التفرغ' },
  { en: 'Weekdays', ar: 'أيام الأسبوع' },
  { en: 'Weekends', ar: 'عطلات نهاية الأسبوع' },
  { en: 'Both Weekdays & Weekends', ar: 'أيام الأسبوع والعطلات' },
  { en: 'Flexible', ar: 'مرن' },
  { en: 'Why do you want to volunteer? *', ar: 'لماذا تريد التطوع؟ *' },
  { en: 'Previous Volunteer Experience', ar: 'خبرات تطوعية سابقة' },
  { en: 'Submit Application', ar: 'إرسال الطلب' },
  { en: 'Mon-Fri: 9AM - 6PM', ar: 'الاثنين - الجمعة: 9 ص - 6 م' },
  { en: 'Sun-Thu: 9AM - 5PM', ar: 'الأحد - الخميس: 9 ص - 5 م' },
  { en: 'Emergency Contact', ar: 'جهة اتصال للطوارئ' },
  { en: 'For urgent matters or emergency assistance, please call our 24/7 hotline:', ar: 'للحالات العاجلة أو المساعدة الطارئة، يرجى الاتصال بخط الطوارئ المتاح 24/7:' },
  { en: 'Map Placeholder', ar: 'خريطة الموقع' },
  { en: '123 Charity Street, Cairo, Egypt', ar: '123 شارع الخير، القاهرة، مصر' },
  { en: 'CVV', ar: 'رمز التحقق CVV' },
  { en: '85% of every dollar donated goes directly to our programs and services.', ar: '85% من كل دولار يتم التبرع به يذهب مباشرة إلى برامجنا وخدماتنا.' },
  { en: 'March 8, 2026', ar: '8 مارس 2026' },
  { en: 'March 5, 2026', ar: '5 مارس 2026' },
  { en: 'February 28, 2026', ar: '28 فبراير 2026' },
  { en: 'February 20, 2026', ar: '20 فبراير 2026' },
  { en: 'February 15, 2026', ar: '15 فبراير 2026' },
  { en: 'February 10, 2026', ar: '10 فبراير 2026' },
  { en: 'MAR', ar: 'مارس' },
  { en: 'APR', ar: 'أبريل' },
  { en: '123 Community Street, Cairo 10:00 AM - 2:00 PM', ar: '123 شارع المجتمع، القاهرة 10:00 ص - 2:00 م' },
  { en: 'City Park, Starting Point 7:00 AM - 12:00 PM', ar: 'حديقة المدينة، نقطة البداية 7:00 ص - 12:00 م' },
  { en: 'Hope Foundation Center 9:00 AM - 4:00 PM', ar: 'مركز مؤسسة الأمل 9:00 ص - 4:00 م' },
  { en: 'Online (Zoom) 6:00 PM - 8:00 PM', ar: 'عبر الإنترنت (زوم) 6:00 م - 8:00 م' }
];

function normalizeText(value) {
  return (value || '').replace(/\s+/g, ' ').trim();
}

function applyTextReplacements() {
  var lookup = new Map();

  textReplacements.forEach(function (item) {
    lookup.set(normalizeText(item.en), currentLanguage === 'ar' ? item.ar : item.en);
    lookup.set(normalizeText(item.ar), currentLanguage === 'ar' ? item.ar : item.en);
  });

  document.querySelectorAll('h1, h2, h3, h4, p, a, button, label, li, option, span, div, strong, th, td').forEach(function (el) {
    if (el.hasAttribute('data-i18n') || el.hasAttribute('data-i18n-placeholder')) return;

    // Try innerHTML first (for elements with nested tags)
    var originalHTML = el.innerHTML.trim();
    var normalizedHTML = normalizeText(originalHTML);
    var htmlReplacement = lookup.get(normalizedHTML) || lookup.get(originalHTML);
    
    if (htmlReplacement) {
      el.setAttribute('data-original-html', originalHTML);
      el.innerHTML = htmlReplacement;
      return;
    }

    if (el.children.length > 0 && !el.querySelector('br')) return;

    var originalText = el.textContent.trim();
    var normalizedText = normalizeText(originalText);
    if (!normalizedText) return;

    var textReplacement = lookup.get(normalizedText) || lookup.get(originalText);
    if (textReplacement) {
      el.setAttribute('data-original-text', originalText);
      el.textContent = textReplacement;
    }
  });
}

const translations = {
  en: {
    // Brand
    'brand.name': 'NOUR AL- KHEIR',

    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.donate': 'Donate',
    'nav.campaigns': 'Campaigns',
    'nav.volunteer': 'Volunteer',
    'nav.beneficiaries': 'Beneficiaries',
    'nav.news': 'News & Events',
    'nav.projectDetails': 'Project Details',
    'nav.dashboard': 'Dashboard',
    'nav.contact': 'Contact Us',

    // Header
    'header.login': 'Login',
    'hero.donate': 'Donate Now',

    // Hero
    'hero.title': 'Together We Build Hope',
    'hero.subtitle': 'Your donation today creates a brighter tomorrow for those in need',
    'hero.learn': 'Learn More',

    // Stats
    'stats.beneficiaries': 'Beneficiaries',
    'stats.volunteers': 'Volunteers',
    'stats.donations': 'Donations',
    'stats.campaigns': 'Active Campaigns',

    // Index - About
    'index.about.title': 'About Our Organization',
    'index.about.text': 'We are a non-profit organization dedicated to helping those in need. Our mission is to provide support, hope, and opportunities to vulnerable communities through various charitable programs and initiatives.',

    // Index - Featured Campaigns
    'index.featured.title': 'Featured Campaigns',
    'index.featured.subtitle': 'Support our current initiatives',
    'index.campaign1.title': 'Winter Relief Campaign',
    'index.campaign1.text': 'Providing warm clothes and blankets to families in need during winter',
    'index.campaign2.title': 'Education for All',
    'index.campaign2.text': 'Supporting underprivileged children with school supplies and tuition',
    'index.campaign3.title': 'Medical Aid Program',
    'index.campaign3.text': 'Providing medical treatment and medication to those who cannot afford it',
    'index.raised': 'Raised',
    'index.goal': 'Goal',
    'index.viewAllCampaigns': 'View All Campaigns',

    // Common
    'common.readmore': 'Read More',
    'common.donate': 'Donate to Campaign',
    'common.submit': 'Submit',

    // Footer
    'footer.tagline': 'We are dedicated to helping those in need and building a better tomorrow for everyone.',
    'footer.quickLinks': 'Quick Links',
    'footer.contactInfo': 'Contact Information',
    'footer.donate': 'Donate',
    'footer.donateText': "Make a difference in someone's life today.",
    'footer.copyright': '© 2024 NOUR AL- KHEIR. All rights reserved.',

    // Login page (login.html)
    'login.welcome': 'Welcome Back',
    'login.subtitle': 'Login to your account',
    'login.email': 'Email Address',
    'login.emailPlaceholder': 'your@email.com',
    'login.password': 'Password',
    'login.passwordPlaceholder': 'Enter your password',
    'login.remember': 'Remember me',
    'login.forgot': 'Forgot Password?',
    'login.btn': 'Login',
    'login.noAccount': "Don't have an account?",
    'login.signUp': 'Sign Up',

    // Login1 page (login1.html - form box)
    'login1.login': 'Login',
    'login1.register': 'Register',
    'login1.username': 'Username',
    'login1.password': 'Password',
    'login1.signUp': 'Sign Up',
    'login1.signIn': 'Sign In',
    'login1.noAccount': "Don't have an account?",
    'login1.haveAccount': 'Already have an account?',
    'login1.welcome': 'Welcome back!',
    'login1.welcomeText': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,',

    // About page
    'about.hero.subtitle': 'Learn about our mission, vision, and the people behind our charitable work',
    'about.mission.title': 'Our Mission',
    'about.mission.text': 'To provide comprehensive support and assistance to those in need, creating sustainable positive change in communities through charitable work and community engagement.',
    'about.vision.title': 'Our Vision',
    'about.vision.text': 'A society where everyone has access to basic necessities, education, and healthcare. We envision a world where compassion and solidarity eliminate poverty and suffering.',
    'about.values.title': 'Our Values',
    'about.value1': 'Transparency and Trust',
    'about.value2': 'Compassion and Empathy',
    'about.value3': 'Integrity and Excellence',
    'about.value4': 'Community Partnership',
    'about.story.title': 'Our Story',
    'about.story.p1': 'Founded in 2015, our organization began with a small group of volunteers who wanted to make a difference. Today, we have grown into a large community of dedicated individuals working together to help thousands of families across the region.',
    'about.story.p2': 'Our journey has been marked by countless success stories and the unwavering support of our community. Every day, we witness the transformative power of compassion and collective action in creating meaningful change.',
    'about.team.title': 'Our Team',
    'about.team.subtitle': 'Meet the dedicated individuals leading our mission',

    // Donate page
    'donate.hero.title': 'Make a Donation',
    'donate.hero.subtitle': 'Your generosity changes lives',
    'donate.type1.title': 'Money Donation',
    'donate.type1.text': 'Financial support helps us serve more families',
    'donate.type2.title': 'Food Donation',
    'donate.type2.text': 'Provide meals to those in hunger',
    'donate.type3.title': 'Clothes Donation',
    'donate.type3.text': 'Donate clothing for families in need',
    'donate.type4.title': 'Medical Support',
    'donate.type4.text': 'Help us provide healthcare services',
    'donate.type5.title': 'Education Support',
    'donate.type5.text': 'Empower children through education',
    'donate.department.title': 'Choose Where Your Donation Goes',
    'donate.department.noteLabel': 'Selected Department',
    'donate.department.food': 'Food Support',
    'donate.department.medical': 'Medical Care',
    'donate.department.education': 'Education',
    'donate.department.orphans': 'Orphan Support',
    'donate.department.housing': 'Housing Support',
    'donate.department.urgent': 'Urgent Cases',
    'donate.amountLabel': 'Donation Amount',
    'donate.amountPlaceholder': 'Enter your donation amount',
    'donate.paymentTitle': 'Payment Information',
    'donate.fullName': 'Full Name',
    'donate.email': 'Email Address',
    'donate.phone': 'Phone Number',
    'donate.cardNumber': 'Card Number',
    'donate.cardPlaceholder': '1234 5678 9012 3456',
    'donate.expiry': 'Expiry Date',
    'donate.expiryPlaceholder': 'MM/YY',
    'donate.complete': 'Complete Donation',
    'donate.transparency.title': 'How Your Donation Is Used',
    'donate.transparency.subtitle': 'We are committed to transparency in all our operations',
    'donate.programs': 'Programs & Services',
    'donate.operations': 'Operations',
    'donate.fundraising': 'Fundraising',

    // Campaigns page
    'campaigns.hero.title': 'Our Campaigns',
    'campaigns.hero.subtitle': 'Support our active initiatives and make a real difference',
    'campaigns.campaign1.title': 'Winter Relief Campaign',
    'campaigns.campaign1.text': 'Providing warm clothes and blankets to families in need during the cold winter months',
    'campaigns.campaign2.title': 'Education for All',
    'campaigns.campaign2.text': 'Supporting underprivileged children with school supplies, books, and tuition assistance',
    'campaigns.campaign3.title': 'Medical Aid Program',
    'campaigns.campaign3.text': 'Providing medical treatment and medication to those who cannot afford healthcare',
    'campaigns.campaign4.title': 'Feed the Hungry',
    'campaigns.campaign4.text': 'Providing nutritious meals to families experiencing food insecurity',
    'campaigns.campaign5.title': 'Shelter and Housing',
    'campaigns.campaign5.text': 'Helping homeless families find safe and affordable housing',
    'campaigns.campaign6.title': 'Orphan Support',
    'campaigns.campaign6.text': 'Providing care, education, and support for orphaned children',
    'campaigns.raised': 'Raised',
    'campaigns.goal': 'Goal',
    'campaigns.cta.title': "Can't find the right campaign?",
    'campaigns.cta.subtitle': "Make a general donation and we'll allocate it where it's needed most",
    'campaigns.cta.btn': 'Make General Donation',

    // Contact page
    'contact.hero.title': 'Contact Us',
    'contact.hero.subtitle': 'Get in touch with our team',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.responseTime': 'Response within 24 hours',
    'contact.form.title': 'Send Us a Message',
    'contact.form.subtitle': "We'd love to hear from you",
    'contact.fullName': 'Full Name *',
    'contact.emailLabel': 'Email Address *',
    'contact.phoneLabel': 'Phone Number',
    'contact.subject': 'Subject *',
    'contact.subjectPlaceholder': 'Select a subject',
    'contact.optionGeneral': 'General Inquiry',
    'contact.optionDonation': 'Donation Question',
    'contact.optionVolunteer': 'Volunteer Inquiry',
    'contact.optionPartnership': 'Partnership Opportunity',
    'contact.optionMedia': 'Media Inquiry',
    'contact.optionOther': 'Other',
    'contact.message': 'Message *',
    'contact.sendBtn': 'Send Message',
    'contact.officeHours': 'Office Hours',
    'contact.officeSunThu': 'Sunday - Thursday: 9:00 AM - 5:00 PM',
    'contact.officeFriSat': 'Friday - Saturday: Closed',
    'contact.officeNote': 'Note: During Ramadan and holidays, our hours may vary. Please call ahead to confirm.',
    'contact.socialTitle': 'Social Media',
    'contact.socialText': 'Follow us on social media for the latest updates, stories, and events.',

    // Volunteer page
    'volunteer.hero.title': 'Join Our Volunteer Team',
    'volunteer.hero.subtitle': 'Make a difference in your community through volunteering',
    'volunteer.why.title': 'Why Volunteer With Us?',
    'volunteer.why.subtitle': 'Volunteering is a rewarding experience that benefits everyone',
    'volunteer.impact.title': 'Make an Impact',
    'volunteer.impact.text': 'Directly improve lives in your community',

    // Beneficiaries page
    'beneficiaries.hero.title': 'Success Stories',
    'beneficiaries.hero.subtitle': "Read about the lives we've touched and transformed",
    'beneficiaries.peopleHelped': 'People Helped',
    'beneficiaries.familiesSupported': 'Families Supported',
    'beneficiaries.childrenEducated': 'Children Educated',
    'beneficiaries.medicalTreatments': 'Medical Treatments',
    'beneficiaries.stories.title': 'Their Stories',
    'beneficiaries.stories.subtitle': 'Real stories of hope, resilience, and transformation',
    'beneficiaries.story1.title': "Nour's Education Journey",
    'beneficiaries.story1.text': `"Thanks to Hope Foundation, I was able to complete my education. They provided me with books, supplies, and a scholarship. Today, I'm a university graduate pursuing my dream of becoming a teacher."`,
    'beneficiaries.story1.author': '- Nour, 22 years old',
    'beneficiaries.story2.title': "Ahmed's Recovery",
    'beneficiaries.story2.text': `"When I fell ill and couldn't afford treatment, Hope Foundation stepped in. They covered my medical expenses and supported my family during the difficult time. I'm now healthy and back to work."`,
    'beneficiaries.story2.author': '- Ahmed, 35 years old',
    'beneficiaries.story3.title': "Fatima's New Beginning",
    'beneficiaries.story3.text': `"After losing everything, Hope Foundation helped my family find shelter and provided us with food and clothing. Their support gave us hope when we had none. We're now rebuilding our lives."`,
    'beneficiaries.story3.author': '- Fatima, 40 years old',
    'beneficiaries.testimonials.title': 'What They Say',
    'beneficiaries.testimonials.subtitle': "Hear directly from those we've helped",
    'beneficiaries.testimonial1.name': 'Amira Mohamed',
    'beneficiaries.testimonial1.role': 'Mother of 3',
    'beneficiaries.testimonial1.text': `"Hope Foundation didn't just provide material support, they gave us dignity and hope. The volunteers treated us with respect and kindness. My children can now go to school with full bellies and warm clothes."`,
    'beneficiaries.testimonial2.name': 'Mahmoud Ali',
    'beneficiaries.testimonial2.role': 'Small Business Owner',
    'beneficiaries.testimonial2.text': `"The business training and small loan I received changed my life completely. I went from unemployment to running a successful shop. Hope Foundation believes in people and empowers them to succeed."`,
    'beneficiaries.cta.title': 'Help Us Create More Success Stories',
    'beneficiaries.cta.subtitle': 'Your contribution can transform lives and create lasting change',
    'beneficiaries.cta.volunteer': 'Become a Volunteer',

    // News page
    'news.hero.title': 'News & Events',
    'news.hero.subtitle': 'Stay updated with our latest activities and announcements',
    'news.latest.title': 'Latest News',
    'news.latest.subtitle': 'Recent updates from our organization',
    'news.readMore': 'Read More',
    'news.item1.title': '1,000 Children Receive School Supplies',
    'news.item1.text': 'Our back-to-school campaign successfully distributed school supplies and uniforms to 1,000 underprivileged children across the region, ensuring they can start the new term prepared.',
    'news.item2.title': 'Annual Fundraising Gala Success',
    'news.item2.text': 'Our annual gala raised over $500,000, surpassing our goal. The funds will support our medical aid and education programs throughout the year. Thank you to all who attended!',
    'news.item3.title': 'New Medical Clinic Opening',
    'news.item3.text': "We're proud to announce the opening of our third medical clinic, providing free healthcare services to 500+ families in underserved communities. Grand opening on March 15th.",
    'news.item4.title': 'Ramadan Food Drive Launch',
    'news.item4.text': 'Our annual Ramadan food drive begins next week. We aim to distribute 10,000 food packages to families in need. Volunteer and donation opportunities available.',
    'news.item5.title': 'Volunteer Appreciation Day',
    'news.item5.text': 'We celebrated our amazing volunteers who dedicate their time and energy to our cause. Over 500 volunteers were honored for their outstanding service to the community.',
    'news.item6.title': 'New Corporate Partnership',
    'news.item6.text': "We've partnered with leading corporations to expand our reach and impact. This collaboration will fund scholarships for 200 students over the next three years.",
    'news.events.title': 'Upcoming Events',
    'news.events.subtitle': 'Join us at our upcoming events',
    'news.event1.title': 'Medical Clinic Grand Opening',
    'news.event1.desc': 'Join us for the grand opening of our new medical clinic. Free health screenings and consultations will be available to all attendees.',
    'news.event2.title': 'Charity Run for Education',
    'news.event2.desc': 'Participate in our 5K charity run to raise funds for education programs. All proceeds go toward scholarships for underprivileged students.',
    'news.event3.title': 'Community Food Distribution',
    'news.event3.desc': 'Monthly food distribution event. Volunteers needed to help pack and distribute food packages to families in need.',
    'news.event4.title': 'Volunteer Training Workshop',
    'news.event4.desc': 'Comprehensive training for new volunteers. Learn about our programs, volunteer guidelines, and how to make the most impact.',
    'news.registerNow': 'Register Now',
    'news.newsletter.title': 'Stay Informed',
    'news.newsletter.subtitle': 'Subscribe to our newsletter for updates and news',
    'news.newsletter.placeholder': 'Enter your email address',
    'news.newsletter.btn': 'Subscribe',

    // Login1 Register extra
    'login1.email': 'Email',
    'login1.confirmPassword': 'Confirm Password',
    'login1.passwordHint': 'At least 8 characters, including letters and numbers',
    'login1.errorPasswordWeak': 'Password must be at least 8 characters and include letters and numbers',
    'login1.errorPasswordMismatch': 'Passwords do not match',
  },

  ar: {
    // Brand
    'brand.name': 'نور الخير',

    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.donate': 'تبرع',
    'nav.campaigns': 'الحملات',
    'nav.volunteer': 'تطوع',
    'nav.beneficiaries': 'المستفيدون',
    'nav.news': 'الأخبار والفعاليات',
    'nav.projectDetails': 'تفاصيل المشروع',
    'nav.dashboard': 'لوحة التحكم',
    'nav.contact': 'اتصل بنا',

    // Header
    'header.login': 'تسجيل الدخول',
    'hero.donate': 'تبرع الآن',

    // Hero
    'hero.title': 'معاً نبني الأمل',
    'hero.subtitle': 'تبرعك اليوم يصنع غداً مشرقاً للمحتاجين',
    'hero.learn': 'اعرف المزيد',

    // Stats
    'stats.beneficiaries': 'مستفيد',
    'stats.volunteers': 'متطوع',
    'stats.donations': 'تبرع',
    'stats.campaigns': 'حملة نشطة',

    // Index
    'index.about.title': 'عن منظمتنا',
    'index.about.text': 'نحن منظمة غير ربحية ملتزمة بمساعدة المحتاجين. مهمتنا تقديم الدعم والأمل والفرص للمجتمعات الضعيفة من خلال برامج ومبادرات خيرية متنوعة.',

    'index.featured.title': 'حملات مميزة',
    'index.featured.subtitle': 'ادعم مبادراتنا الحالية',
    'index.campaign1.title': 'حملة الإغاثة الشتوية',
    'index.campaign1.text': 'تقديم ملابس وبطانيات دافئة للأسر المحتاجة في الشتاء',
    'index.campaign2.title': 'التعليم للجميع',
    'index.campaign2.text': 'دعم الأطفال المحرومين بمستلزمات الدراسة والرسوم',
    'index.campaign3.title': 'برنامج المساعدة الطبية',
    'index.campaign3.text': 'تقديم العلاج والدواء لمن لا يقدر على تكلفته',
    'index.raised': 'تم جمعه',
    'index.goal': 'الهدف',
    'index.viewAllCampaigns': 'عرض كل الحملات',

    // Common
    'common.readmore': 'اقرأ المزيد',
    'common.donate': 'تبرع للحملة',
    'common.submit': 'إرسال',

    // Footer
    'footer.tagline': 'نحن ملتزمون بمساعدة المحتاجين وبناء غد أفضل للجميع.',
    'footer.quickLinks': 'روابط سريعة',
    'footer.contactInfo': 'معلومات الاتصال',
    'footer.donate': 'تبرع',
    'footer.donateText': 'اصنع فرقاً في حياة شخص اليوم.',
    'footer.copyright': '© 2024 نور الخير. جميع الحقوق محفوظة.',

    // Login
    'login.welcome': 'مرحباً بعودتك',
    'login.subtitle': 'سجّل الدخول إلى حسابك',
    'login.email': 'البريد الإلكتروني',
    'login.emailPlaceholder': 'your@email.com',
    'login.password': 'كلمة المرور',
    'login.passwordPlaceholder': 'أدخل كلمة المرور',
    'login.remember': 'تذكرني',
    'login.forgot': 'نسيت كلمة المرور؟',
    'login.btn': 'تسجيل الدخول',
    'login.noAccount': 'ليس لديك حساب؟',
    'login.signUp': 'إنشاء حساب',

    // Login1
    'login1.login': 'تسجيل الدخول',
    'login1.register': 'التسجيل',
    'login1.username': 'اسم المستخدم',
    'login1.password': 'كلمة المرور',
    'login1.signUp': 'إنشاء حساب',
    'login1.signIn': 'لديك حساب؟ سجّل الدخول',
    'login1.noAccount': 'ليس لديك حساب؟',
    'login1.haveAccount': 'لديك حساب بالفعل؟',
    'login1.welcome': 'مرحباً بعودتك!',
    'login1.welcomeText': 'مرحباً بك في نور الخير.',

    // About
    'about.hero.subtitle': 'تعرف على رسالتنا ورؤيتنا والفريق خلف عملنا الخيري',
    'about.mission.title': 'رسالتنا',
    'about.mission.text': 'تقديم الدعم والمساندة الشاملة للمحتاجين، وخلق تغيير إيجابي مستدام في المجتمعات من خلال العمل الخيري والمشاركة المجتمعية.',
    'about.vision.title': 'رؤيتنا',
    'about.vision.text': 'مجتمع يتمتع فيه الجميع بالوصول إلى الاحتياجات الأساسية والتعليم والرعاية الصحية. نتصور عالماً تقضي فيه الرحمة والتضامن على الفقر والمعاناة.',
    'about.values.title': 'قيمنا',
    'about.value1': 'الشفافية والثقة',
    'about.value2': 'الرحمة والتعاطف',
    'about.value3': 'النزاهة والتميز',
    'about.value4': 'الشراكة المجتمعية',
    'about.story.title': 'قصتنا',
    'about.story.p1': 'تأسست منظمتنا عام 2015 بمجموعة صغيرة من المتطوعين الراغبين في صنع فرق. اليوم نمونا لنجتمعاً كبيراً من الأفراد الملتزمين يعملون معاً لمساعدة آلاف الأسر في المنطقة.',
    'about.story.p2': 'تميزت رحلتنا بقصص نجاح لا حصر لها ودعم لا يتزعزع من مجتمعنا. نشهد كل يوم قوة التحول للرحمة والعمل الجماعي في صنع تغيير حقيقي.',
    'about.team.title': 'فريقنا',
    'about.team.subtitle': 'تعرف على الأفراد الملتزمين الذين يقودون مهمتنا',

    // Donate
    'donate.hero.title': 'قدم تبرعاً',
    'donate.hero.subtitle': 'كرمك يغير حيوات',
    'donate.type1.title': 'تبرع نقدي',
    'donate.type1.text': 'الدعم المالي يساعدنا على خدمة المزيد من الأسر',
    'donate.type2.title': 'تبرع غذائي',
    'donate.type2.text': 'تقديم وجبات للجوعى',
    'donate.type3.title': 'تبرع بالملابس',
    'donate.type3.text': 'تبرع بملابس للأسر المحتاجة',
    'donate.type4.title': 'دعم طبي',
    'donate.type4.text': 'ساعدنا في تقديم خدمات الرعاية الصحية',
    'donate.type5.title': 'دعم تعليمي',
    'donate.type5.text': 'تمكين الأطفال من خلال التعليم',
    'donate.department.title': 'اختر الجهة التي سيذهب لها تبرعك',
    'donate.department.noteLabel': 'القسم المختار',
    'donate.department.food': 'دعم الغذاء',
    'donate.department.medical': 'الرعاية الطبية',
    'donate.department.education': 'التعليم',
    'donate.department.orphans': 'دعم الأيتام',
    'donate.department.housing': 'دعم السكن',
    'donate.department.urgent': 'الحالات العاجلة',
    'donate.amountLabel': 'مبلغ التبرع',
    'donate.amountPlaceholder': 'أدخل مبلغ التبرع',
    'donate.paymentTitle': 'معلومات الدفع',
    'donate.fullName': 'الاسم الكامل',
    'donate.email': 'البريد الإلكتروني',
    'donate.phone': 'رقم الهاتف',
    'donate.cardNumber': 'رقم البطاقة',
    'donate.cardPlaceholder': '1234 5678 9012 3456',
    'donate.expiry': 'تاريخ الانتهاء',
    'donate.expiryPlaceholder': 'MM/YY',
    'donate.complete': 'إتمام التبرع',
    'donate.transparency.title': 'كيف نستخدم تبرعك',
    'donate.transparency.subtitle': 'نلتزم بالشفافية في كل عملياتنا',
    'donate.programs': 'البرامج والخدمات',
    'donate.operations': 'التشغيل',
    'donate.fundraising': 'جمع التبرعات',

    // Campaigns
    'campaigns.hero.title': 'حملاتنا',
    'campaigns.hero.subtitle': 'ادعم مبادراتنا النشطة واصنع فرقاً حقيقياً',
    'campaigns.campaign1.title': 'حملة الإغاثة الشتوية',
    'campaigns.campaign1.text': 'تقديم ملابس وبطانيات دافئة للأسر المحتاجة في أشهر الشتاء',
    'campaigns.campaign2.title': 'التعليم للجميع',
    'campaigns.campaign2.text': 'دعم الأطفال المحرومين بمستلزمات الدراسة والكتب والرسوم',
    'campaigns.campaign3.title': 'برنامج المساعدة الطبية',
    'campaigns.campaign3.text': 'تقديم العلاج والدواء لمن لا يقدر على تكلفة الرعاية الصحية',
    'campaigns.campaign4.title': 'إطعام الجياع',
    'campaigns.campaign4.text': 'تقديم وجبات مغذية للأسر التي تعاني من انعدام الأمن الغذائي',
    'campaigns.campaign5.title': 'المأوى والسكن',
    'campaigns.campaign5.text': 'مساعدة الأسر المشردة في إيجاد سكن آمن وميسور',
    'campaigns.campaign6.title': 'دعم الأيتام',
    'campaigns.campaign6.text': 'تقديم الرعاية والتعليم والدعم للأطفال الأيتام',
    'campaigns.raised': 'تم جمعه',
    'campaigns.goal': 'الهدف',
    'campaigns.cta.title': 'لم تجد الحملة المناسبة؟',
    'campaigns.cta.subtitle': 'قدم تبرعاً عاماً وسنوجهه لأكبر احتياج',
    'campaigns.cta.btn': 'تبرع عام',

    // Contact
    'contact.hero.title': 'اتصل بنا',
    'contact.hero.subtitle': 'تواصل مع فريقنا',
    'contact.phone': 'هاتف',
    'contact.email': 'بريد إلكتروني',
    'contact.address': 'عنوان',
    'contact.responseTime': 'الرد خلال 24 ساعة',
    'contact.form.title': 'أرسل لنا رسالة',
    'contact.form.subtitle': 'نحن نحب أن نسمع منك',
    'contact.fullName': 'الاسم الكامل *',
    'contact.emailLabel': 'البريد الإلكتروني *',
    'contact.phoneLabel': 'رقم الهاتف',
    'contact.subject': 'الموضوع *',
    'contact.subjectPlaceholder': 'اختر موضوعاً',
    'contact.optionGeneral': 'استفسار عام',
    'contact.optionDonation': 'سؤال عن التبرع',
    'contact.optionVolunteer': 'استفسار عن التطوع',
    'contact.optionPartnership': 'فرصة شراكة',
    'contact.optionMedia': 'استفسار إعلامي',
    'contact.optionOther': 'أخرى',
    'contact.message': 'الرسالة *',
    'contact.sendBtn': 'إرسال الرسالة',
    'contact.officeHours': 'ساعات العمل',
    'contact.officeSunThu': 'الأحد - الخميس: 9:00 ص - 5:00 م',
    'contact.officeFriSat': 'الجمعة - السبت: مغلق',
    'contact.officeNote': 'ملاحظة: في رمضان والعطلات قد تتغير ساعات العمل. يرجى الاتصال للتأكيد.',
    'contact.socialTitle': 'وسائل التواصل',
    'contact.socialText': 'تابعنا على وسائل التواصل لآخر الأخبار والقصص والفعاليات.',

    // Volunteer
    'volunteer.hero.title': 'انضم لفريق المتطوعين',
    'volunteer.hero.subtitle': 'اصنع فرقاً في مجتمعك من خلال التطوع',
    'volunteer.why.title': 'لماذا تتطوع معنا؟',
    'volunteer.why.subtitle': 'التطوع تجربة مجزية يستفيد منها الجميع',
    'volunteer.impact.title': 'اصنع أثراً',
    'volunteer.impact.text': 'حسّن حيوات مجتمعك مباشرة',

    // Beneficiaries
    'beneficiaries.hero.title': 'قصص النجاح',
    'beneficiaries.hero.subtitle': 'اقرأ عن الحيوات التي لمسناها وغيّرناها',
    'beneficiaries.peopleHelped': 'شخص تمت مساعدتهم',
    'beneficiaries.familiesSupported': 'أسرة مدعومة',
    'beneficiaries.childrenEducated': 'طفل تعليمهم',
    'beneficiaries.medicalTreatments': 'علاجات طبية',
    'beneficiaries.stories.title': 'قصصهم',
    'beneficiaries.stories.subtitle': 'قصص حقيقية من الأمل والصمود والتحول',
    'beneficiaries.story1.title': 'رحلة نور التعليمية',
    'beneficiaries.story1.text': 'بفضل مؤسسة الأمل استطعت إكمال تعليمي. وفروا لي الكتب والمستلزمات ومنحة دراسية. واليوم أنا خريجة جامعة وأسعى لتحقيق حلمي بأن أصبح معلمة.',
    'beneficiaries.story1.author': '- نور، 22 سنة',
    'beneficiaries.story2.title': 'تعافي أحمد',
    'beneficiaries.story2.text': 'عندما مرضت ولم أستطع تحمل تكلفة العلاج، تدخلت مؤسسة الأمل. غطت نفقاتي الطبية ودعمت أسرتي خلال الفترة الصعبة. أنا الآن بصحة جيدة وعدت إلى عملي.',
    'beneficiaries.story2.author': '- أحمد، 35 سنة',
    'beneficiaries.story3.title': 'بداية فاطمة الجديدة',
    'beneficiaries.story3.text': 'بعد أن فقدنا كل شيء، ساعدت مؤسسة الأمل أسرتي في إيجاد مأوى ووفرت لنا الطعام والملابس. منحنا دعمهم الأمل حين كنا نفتقده. ونحن الآن نعيد بناء حياتنا.',
    'beneficiaries.story3.author': '- فاطمة، 40 سنة',
    'beneficiaries.testimonials.title': 'ماذا يقولون',
    'beneficiaries.testimonials.subtitle': 'استمع مباشرة إلى من ساعدناهم',
    'beneficiaries.testimonial1.name': 'أميرة محمد',
    'beneficiaries.testimonial1.role': 'أم لثلاثة أطفال',
    'beneficiaries.testimonial1.text': 'لم تقدم مؤسسة الأمل دعمًا ماديًا فقط، بل منحتنا الكرامة والأمل. تعامل معنا المتطوعون باحترام ولطف. وأصبح أطفالي الآن يذهبون إلى المدرسة ببطون ممتلئة وملابس دافئة.',
    'beneficiaries.testimonial2.name': 'محمود علي',
    'beneficiaries.testimonial2.role': 'صاحب مشروع صغير',
    'beneficiaries.testimonial2.text': 'غيّر التدريب التجاري والقرض الصغير اللذان حصلت عليهما حياتي بالكامل. انتقلت من البطالة إلى إدارة متجر ناجح. مؤسسة الأمل تؤمن بالناس وتمكنهم من النجاح.',
    'beneficiaries.cta.title': 'ساعدنا في صناعة المزيد من قصص النجاح',
    'beneficiaries.cta.subtitle': 'مساهمتك يمكن أن تغير حياة الناس وتصنع أثرًا دائمًا',
    'beneficiaries.cta.volunteer': 'كن متطوعًا',

    // News
    'news.hero.title': 'الأخبار والفعاليات',
    'news.hero.subtitle': 'تابع آخر أنشطتنا وإعلاناتنا',
    'news.latest.title': 'آخر الأخبار',
    'news.latest.subtitle': 'أحدث التحديثات من منظمتنا',
    'news.readMore': 'اقرأ المزيد',
    'news.item1.title': '1,000 طفل يستلمون مستلزمات مدرسية',
    'news.item1.text': 'وزعت حملة العودة للمدارس مستلزمات وزي مدرسي لـ 1,000 طفل محروم في المنطقة، لبدء الفصل الجديد بجاهزية.',
    'news.item2.title': 'نجاح الحفل الخيري السنوي',
    'news.item2.text': 'جمع حفلنا السنوي أكثر من 500,000 دولار متجاوزاً الهدف. الدعم سيمول برامجنا الطبية والتعليمية طوال العام. شكراً للحضور!',
    'news.item3.title': 'افتتاح عيادة طبية جديدة',
    'news.item3.text': 'نفتتح عيادتنا الطبية الثالثة لتقديم رعاية صحية مجانية لأكثر من 500 أسرة في مجتمعات محرومة. الافتتاح الرسمي في 15 مارس.',
    'news.item4.title': 'انطلاق حملة إطعام رمضان',
    'news.item4.text': 'تبدأ حملة إطعام رمضان الأسبوع القادم. نهدف لتوزيع 10,000 حصة غذائية على الأسر المحتاجة. فرص تطوع وتبرع متاحة.',
    'news.item5.title': 'يوم تقدير المتطوعين',
    'news.item5.text': 'احتفلنا بمتطوعينا المميزين الذين يكرسون وقتهم وطاقتهم لقضيتنا. تم تكريم أكثر من 500 متطوع على خدمتهم المتميزة للمجتمع.',
    'news.item6.title': 'شراكة مؤسسية جديدة',
    'news.item6.text': 'انضممنا لشركات رائدة لتوسيع نطاقنا وأثرنا. هذه الشراكة ستمول منحاً دراسية لـ 200 طالب خلال السنوات الثلاث القادمة.',
    'news.events.title': 'فعاليات قادمة',
    'news.events.subtitle': 'انضم إلينا في فعالياتنا القادمة',
    'news.event1.title': 'الافتتاح الرسمي للعيادة الطبية',
    'news.event1.desc': 'انضم لنا في الافتتاح الرسمي للعيادة الجديدة. فحوصات واستشارات صحية مجانية للحضور.',
    'news.event2.title': 'سباق خيري للتعليم',
    'news.event2.desc': 'شارك في سباقنا الخيري 5 كلم لجمع تبرعات لبرامج التعليم. العائدات كاملة لمنح الطلاب المحرومين.',
    'news.event3.title': 'توزيع غذاء مجتمعي',
    'news.event3.desc': 'فعالية توزيع غذاء شهرية. نحتاج متطوعين لتعبئة وتوزيع الحصص الغذائية على الأسر المحتاجة.',
    'news.event4.title': 'ورشة تدريب المتطوعين',
    'news.event4.desc': 'تدريب شامل للمتطوعين الجدد. تعرف على برامجنا وإرشادات التطوع وكيفية تحقيق أكبر أثر.',
    'news.registerNow': 'سجّل الآن',
    'news.newsletter.title': 'ابقَ على اطلاع',
    'news.newsletter.subtitle': 'اشترك في نشرتنا لآخر التحديثات والأخبار',
    'news.newsletter.placeholder': 'أدخل بريدك الإلكتروني',
    'news.newsletter.btn': 'اشترك',

    'login1.email': 'البريد الإلكتروني',
    'login1.confirmPassword': 'تأكيد كلمة المرور',
    'login1.passwordHint': '8 أحرف على الأقل، تتضمن حروفاً وأرقاماً',
    'login1.errorPasswordWeak': 'كلمة المرور 8 أحرف على الأقل وتتضمن حروفاً وأرقاماً',
    'login1.errorPasswordMismatch': 'كلمتا المرور غير متطابقتين',
  }
};


function getTranslation(key) {
  return (translations[currentLanguage] && translations[currentLanguage][key]) || key;
}

/** يطبق الترجمة على كل العناصر في الصفحة مرة واحدة */
function applyTranslations() {
  // حفظ اللغة المختارة
  localStorage.setItem('siteLang', currentLanguage);

  // اتجاه الصفحة
  if (currentLanguage === 'ar') {
    document.body.classList.add('rtl');
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
  } else {
    document.body.classList.remove('rtl');
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
  }

  // ترجمة كل عناصر data-i18n
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    var text = getTranslation(key);
    if (text && text !== key) {
      if (text.indexOf('<') !== -1 && text.indexOf('>') !== -1) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    }
  });

  // ترجمة placeholders (حقول الإدخال)
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
    var key = el.getAttribute('data-i18n-placeholder');
    var text = getTranslation(key);
    if (text && text !== key) {
      el.placeholder = text;
    }
  });

  // ترجمة اسم الشركة في الـ nav والفوتر (كل .logo-text)
  document.querySelectorAll('.logo-text').forEach(function (el) {
    el.textContent = getTranslation('brand.name');
  });

  applyTextReplacements();
  syncTranslatedValues();

  // نص زر اللغة
  var langBtn = document.querySelector('.lang-toggle');
  if (langBtn) {
    langBtn.textContent = currentLanguage === 'en' ? 'العربية' : 'English';
  }

  // زر Login في الهيدر
  var loginLinks = document.querySelectorAll('a[href*="login"]');
  loginLinks.forEach(function (link) {
    if (link.classList.contains('btn-outline') && link.textContent.trim().toLowerCase().indexOf('login') !== -1) {
      link.textContent = getTranslation('header.login');
    }
  });

  ensureDashboardQuickLink();
  ensureProjectDetailsLink();
}

function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
  applyTranslations();
}

function syncTranslatedValues() {
  document.querySelectorAll('[data-i18n-value]').forEach(function (el) {
    var key = el.getAttribute('data-i18n-value');
    var text = getTranslation(key);
    if (text && text !== key) {
      el.value = text;
    }
  });
}

// Form Submission Handler
function handleFormSubmit(event) {
  event.preventDefault();
  var formName = event.target.getAttribute('data-form');
  var formData = new FormData(event.target);
  var formValues = {};
  formData.forEach(function (value, key) {
    formValues[key] = value;
  });

  if (formName === 'donation') {
    fetch(SITE_API_BASE + '/donations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        donor_name: formValues.donor_name,
        donor_email: formValues.donor_email,
        donor_phone: formValues.donor_phone,
        amount: Number(formValues.donation_amount || 0),
        payment_method: 'card_placeholder',
        status: 'completed'
      })
    })
      .then(function (response) {
        return response.json().catch(function () { return {}; }).then(function (json) {
          if (!response.ok) {
            throw new Error(json.message || 'Unable to submit the donation right now.');
          }
          alert(currentLanguage === 'en'
            ? 'Thank you for your generous donation!'
            : 'Ø´ÙƒØ±Ø§Ù‹ Ù„ØªØ¨Ø±Ø¹Ùƒ Ø§Ù„Ø³Ø®ÙŠ!');
          event.target.reset();
          syncTranslatedValues();
        });
      })
      .catch(function (error) {
        alert(error.message || (currentLanguage === 'en'
          ? 'Unable to submit the donation right now.'
          : 'ØªØ¹Ø°Ø± Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„ØªØ¨Ø±Ø¹ Ø­Ø§Ù„ÙŠÙ‹Ø§.'));
      });
    return false;
  }

  if (formName === 'volunteer') {
    fetch(SITE_API_BASE + '/volunteers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone,
        skills: [
          formValues.opportunity,
          formValues.availability,
          formValues.motivation,
          formValues.experience
        ].filter(Boolean).join(' | ')
      })
    })
      .then(function (response) {
        return response.json().catch(function () { return {}; }).then(function (json) {
          if (!response.ok) {
            throw new Error(json.message || 'Unable to submit the volunteer application right now.');
          }
          alert(currentLanguage === 'en'
            ? 'Volunteer application submitted successfully!'
            : 'ØªÙ… Ø¥Ø±Ø³Ø§Ù„ Ø·Ù„Ø¨ Ø§Ù„ØªØ·ÙˆØ¹ Ø¨Ù†Ø¬Ø§Ø­!');
          event.target.reset();
        });
      })
      .catch(function (error) {
        alert(error.message || (currentLanguage === 'en'
          ? 'Unable to submit the volunteer application right now.'
          : 'ØªØ¹Ø°Ø± Ø¥Ø±Ø³Ø§Ù„ Ø·Ù„Ø¨ Ø§Ù„ØªØ·ÙˆØ¹ Ø­Ø§Ù„ÙŠÙ‹Ø§.'));
      });
    return false;
  }

  var message = currentLanguage === 'en'
    ? 'Thank you! We will contact you soon.'
    : 'شكراً! سنتواصل معك قريباً.';

  if (formName === 'donation') {
    message = currentLanguage === 'en'
      ? 'Thank you for your generous donation!'
      : 'شكراً لتبرعك السخي!';
  }
  if (formName === 'login') {
    message = currentLanguage === 'en'
      ? 'Login request submitted.'
      : 'تم إرسال طلب تسجيل الدخول.';
  }
  if (formName === 'contact') {
    message = currentLanguage === 'en'
      ? 'Thank you! Your message has been sent.'
      : 'شكراً! تم إرسال رسالتك.';
  }
  if (formName === 'register') {
    message = currentLanguage === 'en'
      ? 'Registration submitted successfully!'
      : 'تم إرسال التسجيل بنجاح!';
  }
  if (formName === 'newsletter') {
    message = currentLanguage === 'en'
      ? 'Thank you for subscribing!'
      : 'شكراً على الاشتراك!';
  }

  bridgeFormToDashboard(formName, formValues).finally(function () {
    alert(message);
    event.target.reset();
  });
  return false;
}

function loadCampaignsPage() {
  var campaignsGrid = document.getElementById('campaigns-grid');
  if (!campaignsGrid) return;

  fetch(SITE_API_BASE + '/campaigns')
    .then(function (response) {
      return response.json().catch(function () { return {}; }).then(function (json) {
        if (!response.ok || !Array.isArray(json.data) || !json.data.length) {
          return;
        }

        campaignsGrid.innerHTML = json.data.map(function (campaign) {
          var target = Number(campaign.target_amount || 0);
          var current = Number(campaign.current_amount || 0);
          var progress = Math.min(Number(campaign.progress_percentage || 0), 100);
          var raisedLabel = currentLanguage === 'ar' ? 'ØªÙ… Ø¬Ù…Ø¹' : 'Raised';
          var goalLabel = currentLanguage === 'ar' ? 'Ø§Ù„Ù‡Ø¯Ù' : 'Goal';
          var donateLabel = currentLanguage === 'ar' ? 'ØªØ¨Ø±Ø¹ Ù„Ù„Ø­Ù…Ù„Ø©' : 'Donate to Campaign';

          return `
            <div class="card">
              <img
                src="${campaign.image_url || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1080'}"
                alt="${campaign.name}" class="card-image">
              <div class="card-content">
                <h3 class="card-title">${campaign.name}</h3>
                <p class="card-text">${campaign.description || ''}</p>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${progress}%;"></div>
                </div>
                <div class="progress-text">
                  <span><strong>${raisedLabel}</strong>: $${current.toLocaleString()}</span>
                  <span><strong>${goalLabel}</strong>: $${target.toLocaleString()}</span>
                </div>
                <a href="donate.html" class="btn-primary"
                  style="display: block; text-align: center; margin-top: 20px;">${donateLabel}</a>
              </div>
            </div>
          `;
        }).join('');
      });
    })
    .catch(function () {
      // Keep the original static cards as fallback when the API is unavailable.
    });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  var nav = document.querySelector('.nav');
  if (nav) nav.classList.toggle('mobile-active');
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Active Navigation
function setActiveNav() {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function ensureDashboardQuickLink() {
  var headerActions = document.querySelector('.header-actions');
  if (!headerActions) return;
  if (headerActions.querySelector('.dashboard-link')) return;
  var link = document.createElement('a');
  link.href = 'admain/WEB.html';
  link.className = 'btn-outline dashboard-link';
  link.style.padding = '10px 16px';
  link.style.marginInlineStart = '8px';
  link.setAttribute('data-i18n', 'nav.dashboard');
  link.textContent = currentLanguage === 'ar' ? 'لوحة التحكم' : 'Dashboard';
  headerActions.insertBefore(link, headerActions.firstChild);
}

function ensureProjectDetailsLink() {
  var nav = document.querySelector('.nav');
  if (!nav || nav.querySelector('.project-details-link')) return;

  var link = document.createElement('a');
  link.href = 'project-details.html';
  link.className = 'project-details-link';
  link.setAttribute('data-i18n', 'nav.projectDetails');
  link.textContent = currentLanguage === 'ar' ? 'تفاصيل المشروع' : 'Project Details';

  var contactLink = nav.querySelector('a[href="contact.html"]');
  if (contactLink) {
    nav.insertBefore(link, contactLink);
    return;
  }

  nav.appendChild(link);
}

// Donation Type Selection
function selectDonationType(element) {
  document.querySelectorAll('.donation-type').forEach(function (type) {
    type.classList.remove('active');
  });
  element.classList.add('active');
}

// Amount Selection
function selectAmount(element) {
  document.querySelectorAll('.amount-btn').forEach(function (btn) {
    btn.classList.remove('active');
  });
  element.classList.add('active');

  var customInput = document.getElementById('custom-amount');
  if (customInput) customInput.value = '';
}

function selectDonationDepartment(element) {
  document.querySelectorAll('.amount-btn').forEach(function (btn) {
    btn.classList.remove('active');
  });
  element.classList.add('active');

  var departmentInput = document.getElementById('donation-department');
  if (departmentInput) {
    departmentInput.value = element.getAttribute('data-department') || '';
  }

  var selectedDepartment = document.getElementById('selected-department');
  var translationKey = element.getAttribute('data-i18n');
  if (selectedDepartment && translationKey) {
    selectedDepartment.setAttribute('data-i18n-value', translationKey);
    syncTranslatedValues();
  }
}

// Stats counter animation - الأرقام تتحرك لما الصفحة تنزل للقسم
function formatStatValue(num, suffix) {
  if (suffix === 'M+') {
    return num.toLocaleString() + suffix;
  }
  return num.toLocaleString() + suffix;
}

function animateStatValue(el) {
  var count = parseInt(el.getAttribute('data-count'), 10);
  var suffix = el.getAttribute('data-suffix') || '';
  var duration = 1800;
  var start = 0;
  var startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    var elapsed = timestamp - startTime;
    var progress = Math.min(elapsed / duration, 1);
    // easeOutQuart
    var ease = 1 - Math.pow(1 - progress, 4);
    var current = Math.floor(ease * count);
    el.textContent = formatStatValue(current, suffix);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = formatStatValue(count, suffix);
    }
  }

  requestAnimationFrame(step);
}

function initStatsCounter() {
  var statsSection = document.querySelector('.stats');
  if (!statsSection) return;

  var animated = false;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statsSection.querySelectorAll('.stat-value[data-count]').forEach(animateStatValue);
      }
    });
  }, { threshold: 0.3, rootMargin: '0px' });

  observer.observe(statsSection);
}

// Register form: تحقق قوة كلمة المرور (8 أحرف، حروف وأرقام) وتأكيد كلمة المرور
function isPasswordStrong(password) {
  if (!password || password.length < 8) return false;
  return /[a-zA-Z]/.test(password) && /\d/.test(password);
}

function initRegisterValidation() {
  var form = document.getElementById('register-form');
  if (!form) return;

  var passInput = document.getElementById('reg-password');
  var confirmInput = document.getElementById('reg-confirm-password');
  var errorEl = document.getElementById('reg-password-error');

  function hideError() {
    if (errorEl) {
      errorEl.style.display = 'none';
      errorEl.textContent = '';
    }
  }

  function showError(key) {
    if (errorEl) {
      errorEl.textContent = getTranslation(key);
      errorEl.style.display = 'block';
    }
  }

  function validateConfirm() {
    if (!confirmInput || !passInput) return true;
    return confirmInput.value === passInput.value;
  }

  if (confirmInput) {
    confirmInput.addEventListener('input', function () {
      if (confirmInput.value && passInput.value !== confirmInput.value) {
        showError('login1.errorPasswordMismatch');
      } else {
        hideError();
      }
    });
    confirmInput.addEventListener('blur', function () {
      if (confirmInput.value && passInput.value !== confirmInput.value) {
        showError('login1.errorPasswordMismatch');
      } else {
        hideError();
      }
    });
  }

  form.addEventListener('submit', function (e) {
    var password = passInput ? passInput.value : '';
    var confirm = confirmInput ? confirmInput.value : '';

    if (!isPasswordStrong(password)) {
      e.preventDefault();
      showError('login1.errorPasswordWeak');
      if (passInput) passInput.focus();
      return false;
    }
    if (password !== confirm) {
      e.preventDefault();
      showError('login1.errorPasswordMismatch');
      if (confirmInput) confirmInput.focus();
      return false;
    }
    hideError();
    return true;
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
  loadCampaignsPage();
  setActiveNav();
  applyTranslations(); // تطبيق الترجمة عند تحميل أي صفحة
  initStatsCounter();   // حركة أرقام الإحصائيات عند الظهور
  initRegisterValidation(); // تحقق نموذج التسجيل (كلمة مرور قوية + تأكيد)

  document.querySelectorAll('form').forEach(function (form) {
    if (form.id === 'register-form') return; // already handled
    form.addEventListener('submit', handleFormSubmit);
  });
});
