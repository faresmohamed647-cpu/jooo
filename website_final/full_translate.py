import re
import json

with open('project-details.html', 'r', encoding='utf-8') as f:
    html = f.read()

# remove tags with data-i18n for matching
# but we want to modify html, so we just iterate over text nodes

# I'll provide a dict of translations
translations_ar = {
    "Project Information": "معلومات المشروع",
    "Target Goal": "الهدف",
    "Amount Raised": "المبلغ المجمع",
    "Donors": "المتبرعين",
    "Days Left": "أيام متبقية",
    "Project Story": "قصة المشروع",
    "Security Model": "النموذج الأمني",
    "Authentication (Sanctum)": "المصادقة (Sanctum)",
    "Provides token-based auth for mobile devices and admin single-page applications.": "يوفر مصادقة تعتمد على التوكن للأجهزة المحمولة وتطبيقات لوحة تحكم المسؤول.",
    "Role-Based Access": "الوصول المعتمد على الدور",
    "Ensures regular users can only read public endpoints while admins can manage entities.": "يضمن أن المستخدمين العاديين يمكنهم فقط قراءة المسارات العامة بينما يمكن للمسؤولين إدارة الكيانات.",
    "API Rate Limiting": "تحديد معدل استدعاء API",
    "Uses Laravel's default `api` middleware group to prevent brute force attacks.": "يستخدم مجموعة `api` الافتراضية في Laravel لمنع هجمات القوة الغاشمة.",
    "Input Validation": "التحقق من صحة المدخلات",
    "Strict `FormRequest` validation for user creation, donations, and campaign updates.": "تحقق صارم `FormRequest` لإنشاء المستخدمين، التبرعات، وتحديثات الحملات.",
    "Business Rules": "قواعد الأعمال",
    "Donation Assignment": "تخصيص التبرعات",
    "Donations can be tied to a specific `campaign_id` or left null for general organizational funding.": "يمكن ربط التبرعات بـ `campaign_id` محدد أو تركها فارغة للتمويل العام للمنظمة.",
    "Campaign Goal Sync": "مزامنة أهداف الحملة",
    "When a donation is completed, the `raised_amount` on the campaign is incremented.": "عند اكتمال تبرع، يتم زيادة `raised_amount` في الحملة.",
    "Volunteer Approval": "الموافقة على المتطوعين",
    "Volunteers default to 'pending' status until an admin approves them.": "حالة المتطوعين الافتراضية هي 'معلق' حتى يوافق عليهم مسؤول.",
    "Report Generation": "توليد التقارير",
    "Reports run queries on donations over time and convert the view to PDF via dompdf.": "تجري التقارير استعلامات على التبرعات بمرور الوقت وتحول العرض إلى PDF عبر dompdf.",
    "Testing and Quality": "الاختبار والجودة",
    "Implemented Test Files": "ملفات الاختبار المنفذة",
    "`AuthApiTest`": "`AuthApiTest`",
    "covers registration, login, and authenticated user profile retrieval.": "يغطي التسجيل، تسجيل الدخول، واسترجاع الملف الشخصي للمستخدم المصادق عليه.",
    "`CampaignApiTest`": "`CampaignApiTest`",
    "covers public listing, admin creation, and access denial for non-admin users.": "يغطي العرض العام، إنشاء المسؤولين، ومنع الوصول لغير المسؤولين.",
    "`DonationApiTest`": "`DonationApiTest`",
    "covers donor creation, donation persistence, queued emails, and campaign amount synchronization.": "يغطي إنشاء المتبرعين، حفظ التبرعات، رسائل البريد الإلكتروني المجدولة، ومزامنة مبلغ الحملة.",
    "`DashboardApiTest`": "`DashboardApiTest`",
    "covers dashboard summary totals and top campaign output.": "يغطي إجماليات ملخص لوحة التحكم وعرض أفضل الحملات.",
    "Testing Support Added": "دعم الاختبار المضاف",
    "New model factories for `Campaign`, `Donor`, and `Donation`.": "مصانع نماذج جديدة لـ `Campaign`, `Donor`, و `Donation`.",
    "New `admin()` state in `UserFactory`.": "حالة `admin()` جديدة في `UserFactory`.",
    "Tests use `RefreshDatabase` so each scenario runs against a clean in-memory database.": "تستخدم الاختبارات `RefreshDatabase` ليعمل كل سيناريو على قاعدة بيانات نظيفة في الذاكرة.",
    "NOUR AL- KHEIR": "نور الخير",
    "A single page reference for the complete website and backend architecture.": "مرجع لصفحة واحدة لهيكل الموقع الكامل والواجهة الخلفية.",
    "Backend": "الواجهة الخلفية",
    "Laravel 13": "Laravel 13",
    "Sanctum auth": "مصادقة Sanctum",
    "CSV and PDF reports": "تقارير CSV و PDF",
    "Admin middleware": "Admin middleware",
    "Frontend": "الواجهة الأمامية",
    "Static HTML pages": "صفحات HTML ثابتة",
    "Shared CSS and JS": "CSS و JS مشترك",
    "API-connected forms": "نماذج متصلة بـ API",
    "Responsive UI": "واجهة مستخدم متجاوبة"
}

en_js = {}
ar_js = {}
counter = 100

for eng, ar in translations_ar.items():
    key = f'pd.more.{counter}'
    en_js[key] = eng
    ar_js[key] = ar
    
    # regex to replace exact text in HTML that isn't inside attributes
    # finding >text< and replacing with > <span data-i18n="key">text</span> <
    # Handle newlines carefully
    escaped = [re.escape(w) for w in eng.split()]
    pattern_str = r'\s+'.join(escaped)
    pattern = re.compile(pattern_str)
    
    if f'data-i18n="{key}"' not in html:
        html = pattern.sub(lambda m: f'<span data-i18n="{key}">{m.group(0)}</span>', html)
    
    counter += 1

with open('project-details.html', 'w', encoding='utf-8') as f:
    f.write(html)

with open('script.js', 'r', encoding='utf-8') as f:
    script = f.read()

def dict_to_js(d):
    return "\n".join([f"    '{k}': {json.dumps(v, ensure_ascii=False)}," for k, v in d.items()])

en_block = "\n    // More PD\n" + dict_to_js(en_js)
ar_block = "\n    // More PD\n" + dict_to_js(ar_js)

script = re.sub(r'(\n\s*)(ar:\s*\{)', lambda m: en_block + m.group(1) + m.group(2), script)
script = re.sub(r'(\n\s*)(\}\s*;\s*\n\s*function getTranslation)', lambda m: ar_block + m.group(1) + m.group(2), script)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(script)

print("Done translating more text.")
