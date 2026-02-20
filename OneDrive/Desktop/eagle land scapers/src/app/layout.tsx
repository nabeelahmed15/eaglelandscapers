import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Import both fonts
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";

// Configure Inter (Sans-serif)
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// Configure Playfair Display (Serif)
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eagle Landscapers — Landscape Architecture",
  description: "Premium landscape architecture and environmental design for discerning clients worldwide.",
};

// Script to neutralize browser extension DOM modifications (e.g. Bitdefender bis_skin_checked)
const STRIP_EXTENSION_ATTRS = `
(function(){
  var attrs = ['bis_skin_checked','bis_size_groups'];
  function strip(root){
    attrs.forEach(function(a){
      root.querySelectorAll('['+a+']').forEach(function(el){ el.removeAttribute(a); });
      if(root.hasAttribute && root.hasAttribute(a)) root.removeAttribute(a);
    });
  }
  strip(document);
  new MutationObserver(function(mutations){
    mutations.forEach(function(m){
      if(m.type==='attributes' && attrs.indexOf(m.attributeName)!==-1){
        m.target.removeAttribute(m.attributeName);
      }
      if(m.type==='childList'){
        m.addedNodes.forEach(function(n){ if(n.nodeType===1) strip(n); });
      }
    });
  }).observe(document.documentElement,{attributes:true,subtree:true,childList:true,attributeFilter:attrs});
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Inject both font variables
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <Script
          id="strip-extension-attrs"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: STRIP_EXTENSION_ATTRS }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <SmoothScroll>
          <Navbar />
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
