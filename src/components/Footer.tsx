import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, PenTool } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <PenTool className="h-8 w-8 text-amber-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-sky-500 bg-clip-text text-transparent">
                مِداد
              </span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md" dir="rtl">
              منصّة معرفية تهدف إلى ترك أثر دائم من خلال الكلمة المكتوبة. 
              نقدم محتوى متنوع في التقنية، الصحة، الرياضة، الثقافة، والترفيه.
            </p>
            
            {/* Social Media */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse mt-6">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-amber-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-sky-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-pink-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-red-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="mailto:info@midad.com" className="p-2 bg-gray-800 rounded-full hover:bg-green-500 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-500">روابط مهمة</h3>
            <div className="space-y-3">
              <Link to="/" className="block text-gray-400 hover:text-white transition-colors">
                الصفحة الرئيسية
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-white transition-colors">
                من نحن
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">
                اتصل بنا
              </Link>
              <Link to="/admin" className="block text-gray-400 hover:text-white transition-colors">
                لوحة التحكم
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-500">الشروط والأحكام</h3>
            <div className="space-y-3">
              <Link to="/privacy" className="block text-gray-400 hover:text-white transition-colors">
                سياسة الخصوصية
              </Link>
              <Link to="/terms" className="block text-gray-400 hover:text-white transition-colors">
                اتفاقية الاستخدام
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400" dir="rtl">
            © {new Date().getFullYear()} مِداد - جميع الحقوق محفوظة | 
            <span className="text-amber-500 mx-2">مع كل كلمة نترك أثراً</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;