import type { Metadata } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "GATE M.Tech - Post-Graduate Engineering Admissions",
  description: "Get admission to premier M.Tech programs with expert guidance and counseling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${poppins.variable} font-sans antialiased`}
      >
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


