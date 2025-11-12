import type { Metadata } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Engineering Error | B.Tech Admissions",
  description:
    "Engineering Mirror supports B.Tech aspirants with personalized counseling, curated resources, and streamlined tools to secure the ideal undergraduate engineering seat.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head></head>
      <body className={poppins.className}>
        <Script
          id="npf-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var npf_d='https://getmtechadmission.in4.nopaperforms.com';
              var npf_c='6820';
              var npf_m='1';
              var s=document.createElement("script");
              s.type="text/javascript";
              s.async=true;
              s.src="https://track.nopaperforms.com/js/track.js";
              document.body.appendChild(s);
            `,
          }}
        />
        <Script
          src="https://widgets.in4.nopaperforms.com/emwgts.js"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}


