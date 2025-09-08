import React from 'react';
import { PenTool, Target, Users, Award, Heart, Lightbulb } from 'lucide-react';

const AboutPage = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8 text-amber-500" />,
      title: 'رسالتنا',
      description: 'نهدف إلى تقديم محتوى عربي عالي الجودة يثري المعرفة ويلهم القراء'
    },
    {
      icon: <Users className="h-8 w-8 text-sky-500" />,
      title: 'مجتمعنا',
      description: 'نبني جسراً للتواصل بين الكتاب والقراء في العالم العربي'
    },
    {
      icon: <Award className="h-8 w-8 text-emerald-500" />,
      title: 'جودتنا',
      description: 'نلتزم بأعلى معايير الجودة في كل ما ننشره من محتوى'
    },
    {
      icon: <Heart className="h-8 w-8 text-pink-500" />,
      title: 'شغفنا',
      description: 'نؤمن بقوة الكلمة المكتوبة في تغيير العالم للأفضل'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <PenTool className="h-16 w-16 text-amber-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            مرحباً بك في مِداد
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-sky-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto" dir="rtl">
            منصّة معرفية تهدف إلى ترك أثر دائم من خلال الكلمة المكتوبة
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="h-6 w-6 text-amber-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">قصتنا</h2>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none" dir="rtl">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              اخترنا اسم <strong className="text-amber-500">مِداد</strong> لأنه يعني الحبر الذي تُسطر به الأفكار، وهو رمز للكتابة، المعرفة، والوفرة التي لا تنقطع.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              في مِداد نعمل على تقديم مقالات ومحتوى متنوع يشمل: 
              <span className="text-blue-500 font-medium"> التقنية 💻</span>، 
              <span className="text-green-500 font-medium"> الصحة 🩺</span>، 
              <span className="text-orange-500 font-medium"> الرياضة ⚽</span>، 
              <span className="text-purple-500 font-medium"> الثقافة 📚</span>، و
              <span className="text-pink-500 font-medium"> الترفيه 🎬</span>.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              هدفنا أن نوفّر للقارئ محتوى موثوق، مبسّط، وسهل الوصول، يثري عقله ويلهم فكره.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              نؤمن أن كل كلمة تترك أثرًا، ونسعى أن يكون أثرنا إيجابيًا وباقيًا. 🌟
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                {feature.icon}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed" dir="rtl">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-r from-amber-500 to-sky-500 rounded-2xl text-white p-8 text-center">
          <h2 className="text-3xl font-bold mb-6">قيمنا الأساسية</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">الدقة</h3>
              <p className="text-sm opacity-90">نحرص على تقديم معلومات دقيقة وموثوقة</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-2">الإبداع</h3>
              <p className="text-sm opacity-90">نقدم المحتوى بطرق مبتكرة وجذابة</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">التفاعل</h3>
              <p className="text-sm opacity-90">نبني علاقات قوية مع قرائنا</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" dir="rtl">
            شاركنا رحلة المعرفة
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8" dir="rtl">
            تابعنا لتكون أول من يحصل على أحدث المقالات والمحتوى المميز
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="#"
              className="bg-amber-500 text-white px-6 py-3 rounded-full font-medium hover:bg-amber-600 transition-colors"
            >
              تابعنا على تويتر
            </a>
            <a
              href="#"
              className="bg-sky-500 text-white px-6 py-3 rounded-full font-medium hover:bg-sky-600 transition-colors"
            >
              انضم لنشرتنا البريدية
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;