const Footer = () => {
  return (
    <footer className="bg-izakaya-dark text-izakaya-paper py-12 border-t-4 border-izakaya-gold relative overflow-hidden">
      <div className="absolute inset-0 bg-wood opacity-50 z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start mb-4">
               <div className="w-10 h-10 bg-izakaya-red rounded-full flex items-center justify-center border border-izakaya-gold mr-3">
                <span className="text-izakaya-paper font-serif font-bold text-xl">酒</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-izakaya-gold">IZAKAYA</h3>
            </div>
            <p className="text-gray-400 font-serif">
              Authentic Japanese hospitality in the heart of the city.
            </p>
          </div>
          
          <div className="text-center">
            <h4 className="text-lg font-serif font-bold text-izakaya-gold mb-4 border-b border-izakaya-wood-light inline-block pb-1">Hours</h4>
            <ul className="space-y-2 text-sm">
              <li>Mon - Thu: 5pm - 11pm</li>
              <li>Fri - Sat: 5pm - 1am</li>
              <li>Sunday: 4pm - 10pm</li>
            </ul>
          </div>
          
          <div className="text-center md:text-right">
            <h4 className="text-lg font-serif font-bold text-izakaya-gold mb-4 border-b border-izakaya-wood-light inline-block pb-1">Location</h4>
            <p className="text-sm text-gray-400">
              123 Sakura Lane<br/>
              Kyoto District<br/>
              Japan, 100-0001
            </p>
          </div>
        </div>
        
        <div className="border-t border-izakaya-wood-light pt-8 text-center">
          <p className="text-xs text-gray-500 font-serif">&copy; {new Date().getFullYear()} Izakaya Rey. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
