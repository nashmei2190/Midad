import React from 'react';
import { Scale, FileText, AlertTriangle, Copyright, Shield, Users } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Scale className="h-16 w-16 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            اتفاقية الاستخدام
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
                <FileText className="h-6 w-6 text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">مقدمة</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                مرحباً بك في موقع مِداد. باستخدامك لهذا الموقع، فإنك توافق على الالتزام بشروط وأحكام الاستخدام هذه. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الموقع.
              </p>
            </div>

            {/* Acceptance */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-green-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">قبول الشروط</h2>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <p className="text-green-800 dark:text-green-200 leading-relaxed mb-3">
                  بمجرد الدخول إلى موقع مِداد أو استخدام خدماته، فإنك:
                </p>
                <ul className="list-disc list-inside text-green-700 dark:text-green-300 space-y-2">
                  <li>توافق على جميع شروط وأحكام الاستخدام</li>
                  <li>تتعهد بالالتزام بالقوانين المعمول بها</li>
                  <li>تؤكد أنك تبلغ من العمر 13 عاماً على الأقل</li>
                  <li>تقر بمسؤوليتك الكاملة عن استخدام الموقع</li>
                </ul>
              </div>
            </div>

            {/* Usage Rules */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-amber-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">قواعد الاستخدام</h2>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">الاستخدام المسموح</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>قراءة ومشاركة المحتوى للأغراض الشخصية والتعليمية</li>
                  <li>ترك تعليقات بناءة ومفيدة</li>
                  <li>مشاركة الروابط على منصات التواصل الاجتماعي</li>
                  <li>الاقتباس من المقالات مع ذكر المصدر</li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-3">الاستخدام المحظور</h3>
                <ul className="list-disc list-inside text-red-800 dark:text-red-200 space-y-2">
                  <li>نسخ أو إعادة نشر المحتوى بدون إذن</li>
                  <li>استخدام المحتوى لأغراض تجارية بدون موافقة</li>
                  <li>نشر محتوى مسيء أو غير قانوني</li>
                  <li>محاولة اختراق أو إلحاق الضرر بالموقع</li>
                  <li>إرسال رسائل غير مرغوب فيها أو إعلانات</li>
                  <li>انتحال الشخصية أو تقديم معلومات مزيفة</li>
                </ul>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Copyright className="h-6 w-6 text-purple-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">الملكية الفكرية</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">حقوق النشر</h3>
                  <p className="text-purple-800 dark:text-purple-200 leading-relaxed">
                    جميع المحتويات المنشورة على موقع مِداد، بما في ذلك النصوص والصور والرسوم والشعارات، محمية بموجب قوانين حقوق النشر والملكية الفكرية. لا يجوز نسخها أو توزيعها أو تعديلها بدون إذن كتابي صريح.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">الاستخدام العادل</h3>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    <li>يمكن الاقتباس بحد أقصى 200 كلمة مع ذكر المصدر</li>
                    <li>يُسمح بمشاركة الروابط على وسائل التواصل الاجتماعي</li>
                    <li>يمكن استخدام المحتوى للأغراض التعليمية غير التجارية</li>
                    <li>يجب طلب إذن للاستخدام التجاري</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* User Content */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">المحتوى الذي ينشره المستخدم</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                عندما تقوم بنشر تعليقات أو إرسال رسائل عبر الموقع:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                <li>تحتفظ بحقوق الملكية لمحتواك</li>
                <li>تمنحنا ترخيصاً لاستخدام وعرض هذا المحتوى</li>
                <li>تتعهد بأن المحتوى لا ينتهك حقوق الآخرين</li>
                <li>تتحمل المسؤولية الكاملة عن محتواك</li>
              </ul>
            </div>

            {/* Privacy */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">الخصوصية</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                  نحترم خصوصيتك ونحمي بياناتك الشخصية وفقاً لسياسة الخصوصية الخاصة بنا. 
                  يرجى مراجعة 
                  <a href="/privacy" className="text-blue-600 dark:text-blue-400 underline mx-1">سياسة الخصوصية</a>
                  للحصول على معلومات مفصلة حول كيفية جمع واستخدام بياناتك.
                </p>
              </div>
            </div>

            {/* Disclaimers */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">إخلاء المسؤولية</h2>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">المعلومات والمحتوى</h3>
                <p className="text-orange-800 dark:text-orange-200 leading-relaxed">
                  المعلومات المقدمة على موقع مِداد هي لأغراض إعلامية وتعليمية فقط. لا نضمن دقة أو اكتمال أو حداثة هذه المعلومات. لا ينبغي اعتبار المحتوى بديلاً عن الاستشارة المهنية المتخصصة.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">توفر الخدمة</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>قد يكون الموقع غير متاح مؤقتاً للصيانة</li>
                  <li>لا نضمن عدم انقطاع الخدمة</li>
                  <li>قد نعدل أو نوقف أي خدمة دون إشعار مسبق</li>
                  <li>لا نتحمل مسؤولية الأضرار الناتجة عن عدم توفر الخدمة</li>
                </ul>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">حدود المسؤولية</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                لا نتحمل أي مسؤولية عن:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>الأضرار المباشرة أو غير المباشرة الناتجة عن استخدام الموقع</li>
                <li>فقدان البيانات أو الأرباح</li>
                <li>الأخطاء أو الانقطاعات في الخدمة</li>
                <li>أي محتوى ينشره المستخدمون</li>
                <li>الروابط الخارجية ومحتواها</li>
              </ul>
            </div>

            {/* Modifications */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">التعديلات</h2>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت دون إشعار مسبق. التعديلات ستكون سارية فور نشرها على الموقع. ننصحك بمراجعة هذه الصفحة بانتظام للاطلاع على أي تحديثات.
                </p>
              </div>
            </div>

            {/* Termination */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">إنهاء الاستخدام</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                نحتفظ بالحق في:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>منع الوصول إلى الموقع لأي مستخدم ينتهك الشروط</li>
                <li>حذف أي محتوى ينتهك سياساتنا</li>
                <li>إنهاء أو تعليق الخدمة في أي وقت</li>
                <li>اتخاذ الإجراءات القانونية ضد المخالفين</li>
              </ul>
            </div>

            {/* Governing Law */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">القانون المعمول به</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                  تخضع هذه الشروط والأحكام للقوانين المعمول بها في المملكة العربية السعودية. أي نزاع ينشأ عن استخدام الموقع سيتم حله وفقاً لهذه القوانين.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">التواصل</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                إذا كانت لديك أي أسئلة حول شروط الاستخدام هذه، يرجى التواصل معنا:
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>البريد الإلكتروني:</strong> legal@midad.com</li>
                  <li><strong>الموقع:</strong> www.midad.com/contact</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;