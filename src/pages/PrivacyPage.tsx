import React from 'react';
import { Shield, Eye, Cookie, Lock, Mail, AlertCircle } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            سياسة الخصوصية
          </h1>
          <p className="text-gray-600 dark:text-gray-300" dir="rtl">
            آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="prose prose-lg dark:prose-invert max-w-none" dir="rtl">
            
            {/* Introduction */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="h-6 w-6 text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">مقدمة</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                نحن في موقع مِداد نؤمن بأهمية حماية خصوصيتك. هذه السياسة توضح كيفية جمع واستخدام وحماية المعلومات الشخصية التي تقدمها لنا عند زيارة موقعنا أو استخدام خدماتنا.
              </p>
            </div>

            {/* Information Collection */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-amber-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">المعلومات التي نجمعها</h2>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">المعلومات الشخصية</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>الاسم والبريد الإلكتروني (عند التواصل معنا)</li>
                  <li>التعليقات والرسائل التي ترسلها لنا</li>
                  <li>معلومات الاتصال الأخرى التي تقدمها طواعية</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">المعلومات التقنية</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>عنوان IP الخاص بك</li>
                  <li>نوع المتصفح ونظام التشغيل</li>
                  <li>الصفحات التي تزورها ووقت الزيارة</li>
                  <li>مصدر الزيارة (محرك البحث، رابط مباشر، إلخ)</li>
                </ul>
              </div>
            </div>

            {/* Cookies */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Cookie className="h-6 w-6 text-orange-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">الكوكيز (Cookies)</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                نستخدم الكوكيز لتحسين تجربتك على موقعنا. الكوكيز هي ملفات صغيرة تُخزن على جهازك وتساعدنا في:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                <li>تذكر تفضيلاتك (مثل اللغة والثيم)</li>
                <li>تحليل كيفية استخدام الموقع</li>
                <li>تقديم محتوى مخصص</li>
                <li>عرض إعلانات ذات صلة</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                يمكنك تعطيل الكوكيز من خلال إعدادات متصفحك، لكن قد يؤثر ذلك على وظائف الموقع.
              </p>
            </div>

            {/* Google AdSense */}
            <div className="mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Google AdSense</h3>
                <p className="text-blue-800 dark:text-blue-200 leading-relaxed mb-3">
                  نستخدم Google AdSense لعرض الإعلانات على موقعنا. Google قد تستخدم الكوكيز لعرض إعلانات مخصصة بناءً على زياراتك السابقة لمواقع أخرى.
                </p>
                <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                  يمكنك إدارة تفضيلات الإعلانات أو إلغاء الاشتراك في الإعلانات المخصصة من خلال 
                  <a href="https://www.google.com/settings/ads" className="text-blue-600 dark:text-blue-400 underline mx-1" target="_blank" rel="noopener noreferrer">
                    إعدادات الإعلانات في Google
                  </a>.
                </p>
              </div>
            </div>

            {/* Data Usage */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-6 w-6 text-green-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">كيفية استخدام المعلومات</h2>
              </div>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>تحسين محتوى وخدمات الموقع</li>
                <li>الرد على استفساراتك ورسائلك</li>
                <li>إرسال النشرة الإخبارية (في حال الاشتراك)</li>
                <li>تحليل أداء الموقع وسلوك المستخدمين</li>
                <li>حماية الموقع من الاستخدام الضار</li>
                <li>الامتثال للمتطلبات القانونية</li>
              </ul>
            </div>

            {/* Data Protection */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-purple-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">حماية البيانات</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                نتخذ إجراءات أمنية معقولة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الكشف أو التدمير. ومع ذلك، لا يمكن ضمان أمان أي طريقة نقل عبر الإنترنت بنسبة 100%.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">الإجراءات الأمنية</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>تشفير البيانات أثناء النقل</li>
                  <li>الوصول المحدود للبيانات الشخصية</li>
                  <li>مراقبة النشاط المشبوه</li>
                  <li>تحديث الأنظمة الأمنية بانتظام</li>
                </ul>
              </div>
            </div>

            {/* Third Parties */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">الأطراف الثالثة</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                قد نشارك معلوماتك مع أطراف ثالثة موثوقة في الحالات التالية:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>مقدمو خدمات التحليلات (Google Analytics)</li>
                <li>شبكات الإعلانات (Google AdSense)</li>
                <li>مقدمو خدمات الاستضافة</li>
                <li>عند الامتثال للمتطلبات القانونية</li>
              </ul>
            </div>

            {/* User Rights */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">حقوقك</h2>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <p className="text-green-800 dark:text-green-200 leading-relaxed mb-3">
                  لديك الحق في:
                </p>
                <ul className="list-disc list-inside text-green-700 dark:text-green-300 space-y-2">
                  <li>طلب نسخة من بياناتك الشخصية</li>
                  <li>طلب تصحيح أو حذف بياناتك</li>
                  <li>الاعتراض على معالجة بياناتك</li>
                  <li>سحب موافقتك في أي وقت</li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-6 w-6 text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">التواصل معنا</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو كيفية تعاملنا مع بياناتك الشخصية، يرجى التواصل معنا:
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>البريد الإلكتروني:</strong> privacy@midad.com</li>
                  <li><strong>الموقع:</strong> www.midad.com/contact</li>
                </ul>
              </div>
            </div>

            {/* Updates */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">التحديثات</h2>
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
                <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                  قد نحدث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإشعارك بأي تغييرات مهمة عن طريق نشر السياسة الجديدة على موقعنا وتحديث تاريخ "آخر تحديث" في أعلى هذه الصفحة.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;