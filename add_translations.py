import json
import re

# New translation pairs
new_translations = [
    ('Backend Architecture', 'هيكلية الواجهة الخلفية (Backend Architecture)'),
    ('The backend is a Laravel 13 API with role-based admin access and public endpoints for website actions.', 'الواجهة الخلفية هي عبارة عن Laravel 13 API مع وصول للمسؤول يعتمد على الدور ونقاط نهاية عامة لإجراءات الموقع.'),
    ('Main Backend Areas', 'مناطق الواجهة الخلفية الرئيسية'),
    ('<strong>Auth</strong>: register, login, logout, current user, email verification, password reset.', '<strong>المصادقة</strong>: التسجيل، تسجيل الدخول، تسجيل الخروج، المستخدم الحالي، التحقق من البريد الإلكتروني، إعادة تعيين كلمة المرور.'),
    ('<strong>Campaigns</strong>: public listing and protected admin CRUD.', '<strong>الحملات</strong>: القائمة العامة وإدارة العمليات (CRUD) المحمية للمسؤول.'),
    ('<strong>Donations</strong>: donation creation, donor auto-creation, campaign total updates, queued mail notifications.', '<strong>التبرعات</strong>: إنشاء التبرع، الإنشاء التلقائي للمتبرع، تحديثات إجمالي الحملة، وإشعارات البريد في الطابور.'),
    ('<strong>Users / Donors / Volunteers</strong>: admin management plus public volunteer registration.', '<strong>المستخدمون / المتبرعون / المتطوعون</strong>: إدارة المسؤول بالإضافة إلى تسجيل المتطوعين العام.'),
    ('<strong>Dashboard & Reports</strong>: aggregate stats, analytics, CSV export, and PDF export.', '<strong>لوحة التحكم والتقارير</strong>: تجميع الإحصائيات، التحليلات، تصدير CSV، وتصدير PDF.'),
    ('Key Backend Folders', 'مجلدات الواجهة الخلفية الرئيسية'),
    ('<strong>`app/Http/Controllers/Api`</strong> request entry points for all API modules.', '<strong>`app/Http/Controllers/Api`</strong> نقاط دخول الطلبات لجميع وحدات API.'),
    ('<strong>`app/Services`</strong> business rules for campaign, donation, donor, dashboard, and user flows.', '<strong>`app/Services`</strong> قواعد الأعمال لتدفقات الحملة، التبرع، المتبرع، لوحة التحكم، والمستخدم.'),
    ('<strong>`app/Http/Requests`</strong> validation logic for auth and CRUD operations.', '<strong>`app/Http/Requests`</strong> منطق التحقق من الصحة لعمليات المصادقة والـ CRUD.'),
    ('<strong>`app/Http/Resources`</strong> API shaping layer for campaigns, donations, donors, volunteers, and users.', '<strong>`app/Http/Resources`</strong> طبقة تشكيل API للحملات، التبرعات، المتبرعين، المتطوعين، والمستخدمين.'),
    ('<strong>`database/migrations`</strong> schema definitions for users, campaigns, donors, donations, and volunteers.', '<strong>`database/migrations`</strong> تعريفات المخطط (Schema) للمستخدمين، الحملات، المتبرعين، التبرعات، والمتطوعين.'),
    ('Laravel Sanctum is used for token-based API authentication.', 'يتم استخدام Laravel Sanctum للمصادقة المعتمدة على التوكن لواجهة برمجة التطبيقات (API).'),
    ('Admin route group is protected by `auth:sanctum` and custom `role:admin` middleware.', 'مجموعة مسارات المسؤول محمية بـ `auth:sanctum` وبرمجية وسيطة مخصصة `role:admin`.'),
    ('Public routes remain open for campaigns, donations, volunteers, and alert notifications.', 'تظل المسارات العامة مفتوحة للحملات، التبرعات، المتطوعين، وإشعارات التنبيه.'),
    ('User model supports role checks with `isAdmin()` and `isModerator()` helpers.', 'يدعم نموذج المستخدم التحقق من الدور باستخدام مساعدي `isAdmin()` و `isModerator()`.'),
    ('Campaigns expose progress calculation and active-status helpers.', 'تعرض الحملات مساعدين لحساب التقدم وحالة النشاط.'),
    ('Donations automatically receive a reference code and donation timestamp when missing.', 'تتلقى التبرعات تلقائيًا رمزًا مرجعيًا وطابعًا زمنيًا للتبرع عند فقدانهما.'),
    ('Donation create/update/delete operations can synchronize campaign `current_amount` totals.', 'يمكن لعمليات إنشاء/تحديث/حذف التبرع مزامنة إجماليات `current_amount` للحملة.'),
    ('Dashboard service calculates totals, top campaigns, recent donations, and monthly chart data.', 'تحسب خدمة لوحة التحكم الإجماليات، وأفضل الحملات، وأحدث التبرعات، وبيانات الرسم البياني الشهري.'),
    ('API Overview', 'نظرة عامة على واجهة برمجة التطبيقات (API)'),
    ('Representative routes that already exist in the backend.', 'المسارات التمثيلية الموجودة بالفعل في الواجهة الخلفية.'),
    ('Module', 'الوحدة'),
    ('Routes', 'المسارات'),
    ('Role', 'الدور'),
    ('Authentication', 'المصادقة'),
    ('Public login/register, authenticated profile/logout.', 'تسجيل الدخول/التسجيل العام، الملف الشخصي المصادق عليه/تسجيل الخروج.'),
    ('Public Site', 'الموقع العام'),
    ('Feeds the website without requiring dashboard access.', 'يغذي الموقع دون الحاجة إلى الوصول إلى لوحة التحكم.'),
    ('Admin CRUD', 'عمليات CRUD للمسؤول'),
    ('Protected admin operations behind token and role middleware.', 'عمليات المسؤول المحمية خلف التوكن والبرمجية الوسيطة للأدوار.'),
    ('Returns aggregate metrics for dashboard widgets and summaries.', 'يعيد المقاييس المجمعة لأدوات وملخصات لوحة التحكم.'),
    ('Reports', 'التقارير'),
    ('Provides reporting JSON and downloadable files.', 'يوفر تقارير JSON وملفات قابلة للتنزيل.'),
    ('Notifications', 'الإشعارات'),
    ('Lets the public site push lightweight admin-side alerts.', 'يسمح للموقع العام بإرسال تنبيهات خفيفة لجانب المسؤول.'),
    ('Data Model Summary', 'ملخص نموذج البيانات'),
    ('High-level relationships used by the application.', 'العلاقات رفيعة المستوى المستخدمة في التطبيق.'),
    ('Users', 'المستخدمون'),
    ('Authenticated actors with role-based permissions. Admin users control protected dashboard actions.', 'جهات فاعلة مصادق عليها مع أذونات تعتمد على الدور. يتحكم مستخدمو المسؤول في إجراءات لوحة التحكم المحمية.'),
    ('Donors and Donations', 'المتبرعون والتبرعات'),
    ('Donations belong to donors and may belong to campaigns. Donor records can be created automatically from public donation input.', 'تنتمي التبرعات إلى المتبرعين وقد تنتمي إلى الحملات. يمكن إنشاء سجلات المتبرعين تلقائيًا من مدخلات التبرع العامة.'),
    ('Campaigns and Volunteers', 'الحملات والمتطوعون'),
    ('Campaigns track goals and collected amounts. Volunteers are stored independently and counted by the dashboard analytics service.', 'تتتبع الحملات الأهداف والمبالغ المجمعة. يتم تخزين المتطوعين بشكل مستقل ويتم عددهم بواسطة خدمة تحليلات لوحة التحكم.'),
    ('Testing Coverage Added', 'تمت إضافة تغطية الاختبار'),
    ('Default example tests were replaced by actual backend feature coverage.', 'تم استبدال اختبارات الأمثلة الافتراضية بتغطية ميزات الواجهة الخلفية الفعلية.'),
    ('<strong>`AuthApiTest`</strong> covers registration, login, and authenticated user profile retrieval.', '<strong>`AuthApiTest`</strong> يغطي التسجيل، تسجيل الدخول، واسترجاع الملف الشخصي للمستخدم المصادق عليه.'),
    ('<strong>`CampaignApiTest`</strong> covers public listing, admin creation, and access denial for non-admin users.', '<strong>`CampaignApiTest`</strong> يغطي القائمة العامة، إنشاء المسؤول، ومنع الوصول للمستخدمين غير المسؤولين.'),
    ('<strong>`DonationApiTest`</strong> covers donor creation, donation persistence, queued emails, and campaign amount synchronization.', '<strong>`DonationApiTest`</strong> يغطي إنشاء المتبرع، استمرار التبرع، رسائل البريد في الطابور، ومزامنة مبلغ الحملة.'),
    ('<strong>`DashboardApiTest`</strong> covers dashboard summary totals and top campaign output.', '<strong>`DashboardApiTest`</strong> يغطي إجماليات ملخص لوحة التحكم وعرض أفضل الحملات.'),
    ('New model factories for `Campaign`, `Donor`, and `Donation`.', 'مصانع نماذج جديدة لـ `Campaign` و `Donor` و `Donation`.'),
    ('Tests use `RefreshDatabase` so each scenario runs against a clean in-memory database.', 'تستخدم الاختبارات `RefreshDatabase` بحيث يتم تشغيل كل سيناريو مقابل قاعدة بيانات نظيفة في الذاكرة.'),
    ('A single page reference for the complete website and backend architecture.', 'مرجع لصفحة واحدة لهيكل الموقع الكامل والواجهة الخلفية.'),
    ('Header/footer structure is duplicated across HTML pages instead of being templated.', 'يتم تكرار هيكل الهيدر/الفوتر عبر صفحات HTML بدلاً من استخدام القوالب.'),
    ('Auth token handling on the static frontend is lightweight and suitable for demo/admin shortcut behavior, not a full production auth shell.', 'معالجة توكن المصادقة على الواجهة الأمامية الثابتة خفيف الوزن ومناسب لسلوك العروض التوضيحية/اختصارات المسؤول، وليس نظام مصادقة إنتاجي كامل.')
]

with open('script.js', 'r', encoding='utf-8') as f:
    script = f.read()

new_lines = []
for en, ar in new_translations:
    en_clean = ' '.join(en.split())
    ar_clean = ' '.join(ar.split())
    new_lines.append(f'  {{ en: {repr(en_clean)}, ar: {repr(ar_clean)} }},')

combined_lines = '\n' + '\n'.join(new_lines) + '\n'
script = re.sub(r'(const textReplacements = \[)', lambda m: m.group(1) + combined_lines, script)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(script)

print("Finished")
