import re
import json

with open('project-details.html', 'r', encoding='utf-8') as f:
    html = f.read()

translations_en = {}
translations_ar = {}

mapping = {
    'Full Stack Overview': 'نظرة عامة على النظام',
    'Backend and Frontend Details': 'تفاصيل الواجهة الأمامية والخلفية',
    'This page documents the full project structure, including UI pages, shared frontend logic, Laravel backend modules, APIs, database entities, and backend test coverage.': 'توثق هذه الصفحة هيكل المشروع بالكامل، بما في ذلك صفحات واجهة المستخدم، والمنطق المشترك، ووحدات الواجهة الخلفية (Laravel)، وواجهات برمجة التطبيقات (APIs)، وكيانات قاعدة البيانات، وتغطية اختبارات الواجهة الخلفية.',
    'Frontend Architecture': 'هيكلية الواجهة الأمامية (Frontend)',
    'The client side is a static multi-page site that shares one design system and one main JavaScript controller.': 'جانب العميل هو موقع ثابت متعدد الصفحات يشارك نظام تصميم واحد ومتحكم جافا سكريبت رئيسي واحد.',
    'Frontend Files': 'ملفات الواجهة الأمامية',
    'Frontend Logic': 'منطق الواجهة الأمامية',
    'Frontend Strengths': 'نقاط قوة الواجهة الأمامية',
    'Frontend Gaps Noted': 'ملاحظات/نواقص في الواجهة الأمامية',
    'Backend Architecture (Laravel 11)': 'هيكلية الواجهة الخلفية (Laravel 11)',
    'The backend is a robust REST API serving JSON to the frontend, featuring auth, models, and specialized services.': 'الواجهة الخلفية هي REST API قوية تقدم بيانات JSON للواجهة الأمامية، وتتميز بنظام المصادقة والنماذج والخدمات المتخصصة.',
    'Core Modules': 'الوحدات الأساسية (Core Modules)',
    'API Endpoints Overview': 'نظرة عامة على مسارات الـ API',
    'Security & Services': 'الأمان والخدمات',
    'Backend Testing Coverage': 'تغطية اختبار الواجهة الخلفية',
    'Database Schema': 'مخطط قاعدة البيانات (Database Schema)',
    'A quick look at the main database tables and their relationships.': 'نظرة سريعة على الجداول الرئيسية في قاعدة البيانات وعلاقاتها.',
    'Users Table': 'جدول المستخدمين (Users)',
    'Campaigns Table': 'جدول الحملات (Campaigns)',
    'Donations Table': 'جدول التبرعات (Donations)',
    'Volunteers Table': 'جدول المتطوعين (Volunteers)',
    'Frontend pages': 'صفحات واجهة مستخدم',
    'API routes': 'مسارات API',
    'Core services': 'خدمات أساسية',
    'Real feature test files': 'ملفات اختبار فعلية',
    '<strong>`index.html`</strong> landing page with hero, stats, featured campaigns, and donation CTAs.': '<strong>`index.html`</strong> الصفحة الرئيسية التي تحتوي على البانر، الإحصائيات، الحملات المميزة، وأزرار التبرع.',
    '<strong>`about.html`</strong> organization mission, values, and team.': '<strong>`about.html`</strong> رسالة المنظمة، قيمها، وفريق العمل.',
    '<strong>`campaigns.html`</strong> public campaigns page that can render backend campaign data.': '<strong>`campaigns.html`</strong> صفحة الحملات العامة التي تعرض بيانات الحملات من الواجهة الخلفية.',
    '<strong>`donate.html`</strong> donation input flow connected to the backend donations endpoint.': '<strong>`donate.html`</strong> تدفق إدخال التبرعات المتصل بنقطة نهاية التبرعات في الواجهة الخلفية.',
    '<strong>`volunteer.html`</strong> volunteer registration form connected to the volunteer API.': '<strong>`volunteer.html`</strong> نموذج تسجيل المتطوعين المتصل بواجهة برمجة تطبيقات التطوع.',
    '<strong>`beneficiaries.html`, `news.html`, `contact.html`, `login1.html`</strong> support content and user actions.': '<strong>`beneficiaries.html`, `news.html`, `contact.html`, `login1.html`</strong> محتوى الدعم وإجراءات المستخدم.',
    '<strong>`admain/WEB.html`</strong> admin-facing dashboard area.': '<strong>`admain/WEB.html`</strong> لوحة تحكم المسؤول.',
    '<strong>`styles.css`</strong> contains the shared theme, layout, cards, forms, buttons, and responsive rules.': '<strong>`styles.css`</strong> يحتوي على الثيم المشترك، التخطيط، البطاقات، النماذج، الأزرار، وقواعد الاستجابة للشاشات المختلفة.',
    '<strong>`script.js`</strong> handles translations, nav state, form submission, stats animation, API calls, and dashboard shortcuts.': '<strong>`script.js`</strong> يتعامل مع الترجمات، حالة التنقل، إرسال النماذج، حركة الإحصائيات، استدعاءات الـ API، واختصارات لوحة التحكم.',
    'Campaigns are loaded from `GET /api/campaigns` when available, with static cards as fallback.': 'يتم تحميل الحملات من `GET /api/campaigns` عند توفرها، مع بطاقات ثابتة كبديل.',
    'Donation and volunteer forms submit with `fetch` using `SITE_API_BASE` from local storage.': 'تُرسل نماذج التبرع والتطوع باستخدام `fetch` عبر الاعتماد على `SITE_API_BASE` المحفوظ محلياً.',
    'Local storage also keeps language preference and lightweight site-to-dashboard event data.': 'يحفظ التخزين المحلي (Local storage) أيضاً تفضيلات اللغة وبيانات الأحداث الخفيفة بين الموقع ولوحة التحكم.',
    'Simple deployment because the website is mostly static files.': 'سهولة النشر لأن الموقع يتكون بشكل أساسي من ملفات ثابتة.',
    'Reusable UI via shared classes and repeated header/footer patterns.': 'واجهة مستخدم قابلة لإعادة الاستخدام عبر الفئات المشتركة وأنماط الهيدر والفوتر المتكررة.',
    'Responsive layout already exists for navigation, cards, and grids.': 'تخطيط متجاوب موجود بالفعل للتنقل والبطاقات والشبكات.',
    'The site can still show useful content when the API is unavailable.': 'يمكن للموقع الاستمرار في عرض محتوى مفيد حتى في حال عدم توفر الـ API.',
    'Some existing files contain character encoding artifacts in visible text.': 'تحتوي بعض الملفات الحالية على تشوهات في ترميز الأحرف في النص المرئي.',
    'No frontend framework (React/Vue) means DOM manipulation is manual and scattered.': 'عدم وجود إطار عمل للواجهة الأمامية (مثل React أو Vue) يعني أن معالجة عناصر DOM يدوية ومشتتة.',
    'Translations exist mostly in `script.js` via text replacement, missing a robust i18n JSON structure.': 'الترجمات موجودة بشكل أساسي في `script.js` عبر استبدال النصوص، مما يفتقر إلى هيكل i18n JSON قوي.',
    '<strong>Auth:</strong> Sanctum token-based authentication (`AuthController`).': '<strong>المصادقة:</strong> مصادقة تعتمد على التوكن باستخدام Sanctum (`AuthController`).',
    '<strong>Donations:</strong> Processes and records financial contributions (`DonationController`).': '<strong>التبرعات:</strong> معالجة وتسجيل المساهمات المالية (`DonationController`).',
    '<strong>Campaigns:</strong> Manages fundraising targets and display details (`CampaignController`).': '<strong>الحملات:</strong> إدارة أهداف جمع التبرعات وتفاصيل العرض (`CampaignController`).',
    '<strong>Volunteers:</strong> Handles volunteer onboarding forms (`VolunteerController`).': '<strong>المتطوعين:</strong> معالجة نماذج تسجيل المتطوعين (`VolunteerController`).',
    '<strong>Reports:</strong> Exports system data to PDF and CSV (`ReportController`).': '<strong>التقارير:</strong> تصدير بيانات النظام إلى PDF و CSV (`ReportController`).',
    '<strong>Dashboard:</strong> Aggregates stats for the admin panel (`DashboardController`).': '<strong>لوحة التحكم:</strong> تجميع الإحصائيات للوحة تحكم المسؤول (`DashboardController`).',
    '<code>POST /api/auth/login</code> - Authenticates and issues a token.': '<code>POST /api/auth/login</code> - يصادق ويصدر توكن.',
    '<code>GET /api/campaigns</code> - Lists active campaigns.': '<code>GET /api/campaigns</code> - يعرض الحملات النشطة.',
    '<code>POST /api/donations</code> - Saves a new donation record.': '<code>POST /api/donations</code> - يحفظ سجل تبرع جديد.',
    '<code>POST /api/volunteers</code> - Registers a new volunteer.': '<code>POST /api/volunteers</code> - يسجل متطوعاً جديداً.',
    '<code>GET /api/dashboard/stats</code> - Returns aggregated metrics.': '<code>GET /api/dashboard/stats</code> - يعرض الإحصائيات المجمعة.',
    '<code>GET /api/reports/donations/pdf</code> - Generates a PDF report.': '<code>GET /api/reports/donations/pdf</code> - يُصدر تقرير PDF.',
    '<strong>Sanctum Middleware:</strong> Protects admin routes (dashboard, reports, CRUD).': '<strong>Sanctum Middleware:</strong> يحمي المسارات الخاصة بالمسؤولين.',
    '<strong>Role Validation:</strong> Checks `is_admin` or `role === admin`.': '<strong>التحقق من الدور:</strong> يتحقق من الحقل `is_admin` أو `role === admin`.',
    '<strong>Export Services:</strong> Uses <code>barryvdh/laravel-dompdf</code> for PDFs and manual headers for CSVs.': '<strong>خدمات التصدير:</strong> يستخدم <code>barryvdh/laravel-dompdf</code> للـ PDF ورؤوس برمجية لملفات CSV.',
    '<strong>DonationTest:</strong> Tests validation, successful creation, and required fields.': '<strong>اختبار التبرعات:</strong> يختبر التحقق من الصحة، الإنشاء الناجح، والحقول المطلوبة.',
    '<strong>VolunteerTest:</strong> Tests application submission and required data.': '<strong>اختبار المتطوعين:</strong> يختبر إرسال الطلب والبيانات المطلوبة.',
    '<strong>DashboardTest:</strong> Ensures stats API is protected and returns correct metrics.': '<strong>اختبار لوحة التحكم:</strong> يضمن حماية مسار الإحصائيات وإرجاع البيانات الصحيحة.',
    '<strong>ReportTest:</strong> Validates PDF and CSV endpoint responses and headers.': '<strong>اختبار التقارير:</strong> يتحقق من استجابات مسارات تصدير الـ PDF و CSV.',
    '<code>id</code>, <code>name</code>, <code>email</code>, <code>password</code>, <code>role</code> (admin/user)': '<code>id</code>, <code>name</code>, <code>email</code>, <code>password</code>, <code>role</code> (مسؤول/مستخدم)',
    '<code>id</code>, <code>title</code>, <code>description</code>, <code>goal_amount</code>, <code>raised_amount</code>, <code>image</code>': '<code>id</code>, <code>title</code>, <code>description</code>, <code>goal_amount</code>, <code>raised_amount</code>, <code>image</code>',
    '<code>id</code>, <code>donor_name</code>, <code>amount</code>, <code>payment_method</code>, <code>campaign_id</code> (nullable)': '<code>id</code>, <code>donor_name</code>, <code>amount</code>, <code>payment_method</code>, <code>campaign_id</code> (اختياري)',
    '<code>id</code>, <code>name</code>, <code>email</code>, <code>phone</code>, <code>skills</code>, <code>availability</code>': '<code>id</code>, <code>name</code>, <code>email</code>, <code>phone</code>, <code>skills</code>, <code>availability</code>'
}

counter = 1

for eng, ar in mapping.items():
    key = f"pd.text{counter}"
    translations_en[key] = eng
    translations_ar[key] = ar
    
    # We will just inject data-i18n directly into the html string
    # We find the string between > and <
    # If the string contains HTML tags, we must match it carefully.
    
    # Actually, a simpler way: just wrap the whole matched string in a span if it's text, or add data-i18n to its parent.
    # To avoid corrupting HTML, let's use string replace:
    # E.g. <li><strong>Auth:</strong> Sanctum token-based authentication (`AuthController`).</li>
    # we can replace ><strong>Auth...</li> with > <span data-i18n="key">...</span> </li>
    # Wait, the exact string is known!
    if eng in html:
        # if the string is already inside an element, just add data-i18n to the tag that encloses it
        pattern = r'(<[^>]+)>(?:\s*)' + re.escape(eng) + r'(?:\s*)<'
        match = re.search(pattern, html)
        if match:
            html = re.sub(pattern, f'\\1 data-i18n="{key}">{eng}<', html)
        else:
            # maybe it's the exact content of some tag but with newlines inside
            html = html.replace(eng, f'<span data-i18n="{key}">{eng}</span>')
    else:
        # replace newlines or formatting
        pass
    
    counter += 1

with open('project-details.html', 'w', encoding='utf-8') as f:
    f.write(html)

with open('pd_translations.json', 'w', encoding='utf-8') as f:
    json.dump({'en': translations_en, 'ar': translations_ar}, f, indent=2, ensure_ascii=False)

print('Done translating.')
