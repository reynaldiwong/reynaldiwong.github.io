import { motion } from 'framer-motion';

const MenuCategory = ({ title, items, delay }: { title: string, items: { name: string, price: string, desc: string }[], delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="bg-white/80 border-4 border-izakaya-wood p-6 shadow-lg relative overflow-hidden"
  >
    {/* Shoji Grid Overlay Effect */}
    <div className="absolute inset-0 pointer-events-none opacity-10 bg-shoji"></div>
    
    <div className="relative z-10">
      <h3 className="text-2xl font-serif font-bold text-izakaya-red mb-4 border-b-2 border-izakaya-gold pb-2 inline-block">
        {title}
      </h3>
      <ul className="space-y-4">
        {items.map((item, idx) => (
          <li key={idx} className="flex flex-col border-b border-dashed border-gray-300 pb-2 last:border-0">
            <div className="flex justify-between items-baseline">
              <span className="text-lg font-bold text-gray-800">{item.name}</span>
              <span className="font-serif text-izakaya-wood font-bold">{item.price}</span>
            </div>
            <span className="text-sm text-gray-600 italic">{item.desc}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const Menu = () => {
  const menuData = [
    {
      title: "Yakitori (Grilled Skewers)",
      items: [
        { name: "Negima", price: "¥250", desc: "Chicken thigh with scallion" },
        { name: "Tsukune", price: "¥300", desc: "Minced chicken meatballs with tare sauce" },
        { name: "Tebasaki", price: "¥280", desc: "Crispy grilled chicken wings" },
        { name: "Kawa", price: "¥200", desc: "Crispy chicken skin" },
      ]
    },
    {
      title: "Sashimi & Raw",
      items: [
        { name: "Maguro Sashimi", price: "¥1200", desc: "Fresh tuna slices" },
        { name: "Sake Sashimi", price: "¥1100", desc: "Atlantic salmon" },
        { name: "Hamachi", price: "¥1300", desc: "Yellowtail amberjack" },
      ]
    },
    {
      title: "Izakaya Classics",
      items: [
        { name: "Edamame", price: "¥400", desc: "Boiled soybeans with sea salt" },
        { name: "Karaage", price: "¥750", desc: "Japanese style fried chicken" },
        { name: "Agedashi Tofu", price: "¥600", desc: "Deep fried tofu in dashi broth" },
        { name: "Takoyaki", price: "¥650", desc: "Octopus balls with bonito flakes" },
      ]
    },
    {
      title: "Sake & Drinks",
      items: [
        { name: "Junmai Daiginjo", price: "¥1500", desc: "Premium sake, floral and fruity" },
        { name: "Asahi Super Dry", price: "¥600", desc: "Draft beer" },
        { name: "Highball", price: "¥550", desc: "Whisky and soda" },
        { name: "Umeshu", price: "¥600", desc: "Plum wine on the rocks" },
      ]
    }
  ];

  return (
    <div id="menu" className="py-24 bg-izakaya-paper relative overflow-hidden">
      {/* Bamboo Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-full bg-bamboo opacity-10 blur-3xl transform rotate-12"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-izakaya-red font-serif text-lg tracking-widest uppercase block mb-2"
          >
            Taste of Tradition
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-izakaya-dark mb-6"
          >
            Our Menu
          </motion.h2>
          <div className="w-24 h-1 bg-izakaya-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
          {menuData.map((category, index) => (
            <MenuCategory 
              key={index} 
              title={category.title} 
              items={category.items} 
              delay={index * 0.1} 
            />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 text-center"
        >
          <a href="#reserve" className="inline-block bg-koi-dark dark:bg-koi-water text-amber-500 px-8 py-3 font-serif text-lg border border-amber-500 hover:bg-koi-fish-red hover:text-white transition-colors duration-300 shadow-lg">
            View Full Menu PDF
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Menu;
