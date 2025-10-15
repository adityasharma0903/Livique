// import { Button } from "@/components/ui/button";
// import heroImage from "@/assets/hero-woman.jpg";

// const HeroSection = () => {
//   return (
//     <section className="bg-[hsl(var(--hero-bg))]">
//       <div className="container mx-auto px-4 py-8 md:py-12">
//         <div className="flex flex-col md:flex-row items-center justify-between gap-8">
//           <div className="flex-1 space-y-4 md:space-y-6">
//             {/* <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
//               Grab Upto 50% Off On<br />
//               Selected Headphone
//             </h1> */}
//             <Button size="lg" className="px-8 rounded-full">
//               Buy Now
//             </Button>
//           </div>
//           <div className="flex-1 flex justify-end">
//             <img 
//               src={heroImage} 
//               alt="Woman wearing headphones" 
//               className="w-full max-w-md h-auto object-contain"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

import heroImage from "@/assets/image.png"; // desktop banner
import ecomImage from "@/assets/ecom.jpg";  // mobile square banner

const HeroSection = () => {
  return (
    <section className="w-full relative bg-[hsl(var(--hero-bg))]">
      {/* 💻 Desktop / Laptop View (unchanged) */}
      <div className="hidden sm:block">
        <img
          src={heroImage}
          alt="Hero Banner"
          className="w-full h-[50vh] object-cover object-center"
        />
      </div>

      {/* 📱 Mobile View */}
      <div className="sm:hidden flex flex-col items-center justify-center px-4 py-8 text-center">
        <img
          src={ecomImage}
          alt="Mobile Hero"
          className="w-4/5 max-w-[400px] aspect-square object-cover rounded-xl shadow-lg mb-5"
        />

        {/* Enhanced mobile text */}
        <div className="space-y-3">
          <h2 className="text-2xl font-extrabold text-[hsl(var(--foreground))] tracking-tight drop-shadow-sm">
           New Collection is Here 
          </h2>

          <p className="text-base font-medium text-[hsl(var(--muted-foreground))] leading-snug">
            Discover trendy earrings that define your style.
          </p>

          <button className="mt-4 bg-primary text-white px-6 py-2.5 rounded-full text-base font-semibold shadow-md hover:bg-primary/90 active:scale-95 transition-all">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
