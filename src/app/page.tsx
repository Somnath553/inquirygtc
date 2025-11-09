"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [studentCount, setStudentCount] = useState(58);
  const [toasts, setToasts] = useState<Array<{ id: number; name: string; avatar: string }>>([]);
  const [isDesktop, setIsDesktop] = useState(false); 

  const indianProfiles = [
    {
      name: "Aman Khanna",
      avatar:
        "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=facearea&facepad=3&w=120&h=120&q=80",
    },
    {
      name: "Priya Sharma",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=3&w=120&h=120&q=80",
    },
    {
      name: "Rahul Gupta",
      avatar:
        "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=facearea&facepad=3&w=120&h=120&q=80",
    },
    {
      name: "Sandhya Nair",
      avatar:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=facearea&facepad=3&w=120&h=120&q=80",
    },
    {
      name: "Ananya Patel",
      avatar:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=facearea&facepad=3&w=120&h=120&q=80",
    },
    {
      name: "Varun Chawla",
      avatar:
        "https://images.unsplash.com/photo-1580894906472-5f33e74bd53b?auto=format&fit=facearea&facepad=3&w=120&h=120&q=80",
    },
    {
      name: "Isha Trivedi",
      avatar:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&facepad=3&w=120&h=120&q=80",
    },
    {
      name: "Rishabh Kapoor",
      avatar:
        "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d?auto=format&fit=facearea&facepad=3&w=120&h=120&q=80",
    },
  ];

  const featuredStudents = indianProfiles.slice(0, 4);

  const getFallbackAvatar = (name: string) =>
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      name
    )}&backgroundType=gradientLinear&radius=50`;

  const EnquiryForm = ({
    wrapperClass = "",
    panelClass = "",
  }: {
    wrapperClass?: string;
    panelClass?: string;
  }) => (
    <div className={wrapperClass}>
      <div
        className={`flex justify-center items-center w-full bg-gradient-to-br from-[#0f2644] via-[#1a3a63] to-[#234d82] rounded-3xl shadow-[0_35px_90px_-40px_rgba(26,58,99,0.6)] border border-slate-800/50 p-5 sm:p-6 lg:p-8 ${panelClass}`}
      >
        <div
          className="npf_wgts relative z-10 w-full min-h-[460px] lg:min-h-[520px] rounded-3xl"
          data-height="520px"
          data-width="55rem"
          data-w="37c00655c662ff6100da477dfa203ac7"
        ></div>
      </div>
    </div>
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    setIsDesktop(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    // Increment counter periodically
    const counterInterval = setInterval(() => {
      setStudentCount((prev) => prev + 1);
    }, 15000); // Increment every 15 seconds

    // Show toast notifications periodically
    const toastInterval = setInterval(() => {
      const randomProfile = indianProfiles[Math.floor(Math.random() * indianProfiles.length)];
      const newToast = {
        id: Date.now(),
        name: randomProfile.name,
        avatar: randomProfile.avatar,
      };

      setToasts((prev) => [...prev, newToast]);

      // Remove toast after 4 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== newToast.id));
      }, 4000);
    }, 8000); // Show new toast every 8 seconds

    return () => {
      clearInterval(counterInterval);
      clearInterval(toastInterval);
    };
  }, []);

  return (
    <div className="min-h-screen lg:h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex flex-col lg:flex-row overflow-x-hidden lg:overflow-hidden">

<div dangerouslySetInnerHTML={{
        __html: `
          <button type="button" class="npfWidgetButton npfWidget-37c00655c662ff6100da477dfa203ac7" style="display: none; position: fixed; bottom: 16px; right: 16px; background: linear-gradient(to right, #eaa358, #d89035); color: white; padding: 10px 16px; border: none; border-radius: 12px; font-weight: 700; box-shadow: 0 8px 16px rgba(234, 163, 88, 0.3); cursor: pointer; z-index: 50; transition: all 0.3s ease; font-size: 13px; letter-spacing: 0.5px;">
            🎓 Enquire Now!
          </button>
          <script src="https://in4cdn.npfs.co/js/widget/npfwpopup.js" onload="console.log('NPF script loaded successfully')" onerror="console.error('Failed to load NPF script')"></script>
          <script>
            // Wait for DOM to be fully loaded
            document.addEventListener('DOMContentLoaded', function() {
              console.log('DOM fully loaded, initializing NPF widget...');
              
              // Wait a bit more for all scripts to load
              setTimeout(function() {
                try {
                  console.log('NpfWidgetsInit available:', typeof NpfWidgetsInit);
                  
                  let npfW37c00655c662ff6100da477dfa203ac7 = new NpfWidgetsInit({
                    "widgetId": "37c00655c662ff6100da477dfa203ac7",
                    "baseurl": "widgets.in4.nopaperforms.com",
                    "formTitle": "Engineering Error Enquiry Form",
                    "titleColor": "#eaa358",
                    "backgroundColor": "#fef9f4",
                    "iframeHeight": "500px",
                    "buttonbgColor": "#eaa358",
                    "buttonTextColor": "#FFF",
                    "inputBorderColor": "#eaa358",
                    "inputFocusColor": "#eaa358",
                    "textColor": "#1f2937",
                  });
                  
                  console.log('NPF Widget initialized:', npfW37c00655c662ff6100da477dfa203ac7);
                  
                  // Add hover effect to button
                  const enquireButton = document.querySelector('.npfWidgetButton');
                  if (enquireButton) {
                    enquireButton.addEventListener('mouseenter', function() {
                      this.style.transform = 'translateY(-3px) scale(1.05)';
                      this.style.boxShadow = '0 12px 24px rgba(234, 163, 88, 0.4)';
                    });
                    enquireButton.addEventListener('mouseleave', function() {
                      this.style.transform = 'translateY(0) scale(1)';
                      this.style.boxShadow = '0 8px 16px rgba(234, 163, 88, 0.3)';
                    });
                  }
                  
                  // Try to style iframe content (may be blocked by CORS)
                  function styleIframe() {
                    const iframes = document.querySelectorAll('.npf_wgts iframe');
                    iframes.forEach(function(iframe) {
                      try {
                        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                        if (iframeDoc) {
                          const style = iframeDoc.createElement('style');
                          style.textContent = \`
                            body { 
                              font-family: 'Poppins', sans-serif !important; 
                              background: linear-gradient(to bottom, #fef9f4, #fef9f4) !important;
                            }
                            /* Keep all text white for visibility on dark background */
                            body, p, span, div, label, h1, h2, h3, h4, h5, h6 {
                              color: #ffffff !important;
                            }
                            /* Form labels white */
                            label {
                              color: #ffffff !important;
                              font-weight: 500 !important;
                            }
                            /* Input fields with white background for contrast */
                            input, select, textarea { 
                              border: 2px solid #14b8a6 !important;
                              border-radius: 8px !important;
                              padding: 10px 14px !important;
                              transition: all 0.2s ease !important;
                              background: white !important;
                              color: #1f2937 !important;
                            }
                            input::placeholder {
                              color: #9ca3af !important;
                            }
                            input:focus, select:focus, textarea:focus {
                              border-color: #eaa358 !important;
                              outline: none !important;
                              box-shadow: 0 0 0 3px rgba(234, 163, 88, 0.15) !important;
                            }
                            /* Submit button with contrasting color */
                            button[type="submit"], .submit-btn, [class*="submit"] {
                              background: linear-gradient(to right, #eaa358, #d89035) !important;
                              border: none !important;
                              color: white !important;
                              padding: 12px 24px !important;
                              border-radius: 8px !important;
                              font-weight: 600 !important;
                              cursor: pointer !important;
                              transition: all 0.3s ease !important;
                              box-shadow: 0 4px 6px rgba(245, 158, 11, 0.3) !important;
                            }
                            button[type="submit"]:hover {
                              background: linear-gradient(to right, #c67d1a, #a66915) !important;
                              transform: translateY(-1px) !important;
                            }
                          \`;
                          iframeDoc.head.appendChild(style);
                          console.log('Custom styles injected into iframe');
                        }
                      } catch (e) {
                        console.log('Cannot access iframe (CORS blocked):', e.message);
                      }
                    });
                  }
                  
                  // Function to center the modal
                  function centerModal() {
                    const modals = document.querySelectorAll('[id*="npfWidget"], [class*="npf-modal"], [class*="npf_modal"]');
                    modals.forEach(function(modal) {
                      if (modal) {
                        modal.style.display = 'flex';
                        modal.style.alignItems = 'center';
                        modal.style.justifyContent = 'center';
                        modal.style.position = 'fixed';
                        modal.style.top = '0';
                        modal.style.left = '0';
                        modal.style.right = '0';
                        modal.style.bottom = '0';
                        modal.style.zIndex = '9999';
                        console.log('Modal centered');
                      }
                    });
                  }
                  
                  // Try to inject styles after iframe loads
                  setTimeout(styleIframe, 1500);
                  setTimeout(styleIframe, 3000);
                  
                  // Center modal on load
                  setTimeout(centerModal, 1500);
                  setTimeout(centerModal, 3000);
                  
                  // Observer to center modal when it appears
                  const observer = new MutationObserver(function(mutations) {
                    centerModal();
                  });
                  observer.observe(document.body, { childList: true, subtree: true });
                  
                  // Try to auto-open the popup
                  setTimeout(function() {
                    console.log('Attempting to auto-open popup...');
                     
                    // Try different methods
                    if (npfW37c00655c662ff6100da477dfa203ac7.show) {
                      npfW37c00655c662ff6100da477dfa203ac7.show();
                      console.log('Popup opened using show()');
                    } else if (npfW37c00655c662ff6100da477dfa203ac7.open) {
                      npfW37c00655c662ff6100da477dfa203ac7.open();
                      console.log('Popup opened using open()');
                    } else {
                      // Try clicking the button
                      const button = document.querySelector('.npfWidgetButton');
                      // if (button) {
                      //   button.click();
                      //   console.log('Popup opened by clicking button');
                      //   // Try to style and center after popup opens
                      //   setTimeout(styleIframe, 500);
                      //   setTimeout(centerModal, 500);
                      //   setTimeout(centerModal, 1000);
                      // } else {
                      //   console.log('Button not found');
                      // }
                    }
                    
                    // Also try centering immediately after opening
                    setTimeout(centerModal, 1200);
                  }, 1000);
                  
                } catch (error) {
                  console.error('Error initializing NPF widget:', error);
                }
              }, 500);
            });
          </script>
        `
      }} />
      {/* Left Panel */}
      <div className="flex-1 bg-gradient-to-br from-[#081120] via-[#0f1c33] to-[#122540] flex flex-col justify-center items-center text-white p-8 md:p-12 lg:p-16 relative overflow-hidden min-h-[50vh] lg:h-full">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-sky-400/5 mix-blend-screen"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl -translate-y-48 translate-x-48 hidden lg:block"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl translate-y-32 -translate-x-32 hidden lg:block"></div>
        
        <div className="relative z-10 w-full max-w-lg space-y-9 px-4 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/60 bg-cyan-500/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-100 shadow-[0_12px_40px_-20px_rgba(34,211,238,0.8)] backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300"></span>
            Premier Guidance
          </div>

          <div className="space-y-4">
            <h1 className="text-[2.25rem] md:text-[2.5rem] lg:text-[2.75rem] font-semibold leading-tight text-white drop-shadow-md">
              Personalized admission support
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-slate-100/90 leading-relaxed max-w-xl">
              Share your details and our expert counsellors will design a tailored plan to help you secure the right college seat, scholarship and course fit.
            </p>
          </div>

          {!isDesktop && (
            <EnquiryForm wrapperClass="w-full max-w-xl mx-auto mt-6" />
          )}

          <div className="w-full rounded-3xl border border-cyan-200/45 bg-[#102b4c]/90 p-6 shadow-[0_35px_80px_-35px_rgba(14,165,233,0.65)] backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-cyan-400/25 p-3 shadow-inner">
                <svg className="h-8 w-8 text-cyan-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                </svg>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-50/80">What we cover</p>
                <ul className="space-y-2 text-sm md:text-[15px] text-white/95">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/35 text-cyan-50 shadow-inner">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Expert counselling across 250+ Indian private &amp; deemed universities
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/35 text-cyan-50 shadow-inner">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Profile evaluation, shortlisting and scholarship maximisation
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/35 text-cyan-50 shadow-inner">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    End-to-end application tracking with dedicated admission specialist
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-6 rounded-3xl border border-cyan-200/45 bg-[#0f2744]/90 p-6 backdrop-blur-xl shadow-[0_35px_80px_-35px_rgba(14,165,233,0.6)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-cyan-100/85">Families onboarded</p>
                <p className="text-3xl font-semibold text-white drop-shadow-md">
                  {studentCount}<span className="text-sm font-medium text-cyan-100/75 ml-1">+ this season</span>
                </p>
              </div>
              <div className="rounded-2xl bg-emerald-400/25 px-3 py-1 text-sm font-medium text-emerald-50 shadow-inner">
                Growing daily
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-3">
                {featuredStudents.map((student, index) => (
                  <img
                    key={`${student.name}-${index}`}
                    src={student.avatar}
                    alt={student.name}
                    className="h-10 w-10 rounded-full border-2 border-cyan-200/60 object-cover shadow-[0_6px_18px_-8px_rgba(34,211,238,0.9)]"
                    style={{ zIndex: featuredStudents.length - index }}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(event) => {
                      if (event.currentTarget.dataset.fallback !== "true") {
                        event.currentTarget.src = getFallbackAvatar(student.name);
                        event.currentTarget.dataset.fallback = "true";
                      }
                    }}
                  />
                ))}
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cyan-200/50 bg-cyan-100/80 text-sm font-semibold text-slate-900 shadow-[0_8px_20px_-10px_rgba(34,211,238,0.8)]">
                  +54
                </span>
              </div>
              <p className="text-[15px] font-medium text-slate-100/95">
                Trusted by aspirants from 30+ cities
              </p>
            </div>
          </div>

        </div>

        {/* Toast Notifications */}
        <div className="fixed bottom-4 left-4 lg:bottom-6 lg:left-6 z-50 space-y-2 lg:space-y-3 max-w-[300px]">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="bg-white/95 backdrop-blur-md rounded-lg px-4 py-3 shadow-2xl border border-white/30 flex items-center space-x-3 animate-slide-in-left min-w-[260px] lg:min-w-[280px]"
            >
              <div className="relative flex-shrink-0">
                <img
                  src={toast.avatar}
                  alt={toast.name}
                  className="h-10 w-10 rounded-full object-cover border-2 border-emerald-200/80"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(event) => {
                    if (event.currentTarget.dataset.fallback !== "true") {
                      event.currentTarget.src = getFallbackAvatar(toast.name);
                      event.currentTarget.dataset.fallback = "true";
                    }
                  }}
                />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{toast.name}</p>
                <p className="text-xs text-gray-600">Enquiry resolved</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isDesktop && (
        <div className="flex-1 bg-white flex flex-col shadow-2xl overflow-hidden lg:h-full">
          {/* Header */}
          <div className="flex-shrink-0 px-6 lg:px-8 xl:px-10 pt-4 pb-3 lg:pt-5 lg:pb-4 border-b border-slate-200/60">
            <div className="text-sm text-indigo-600 font-semibold mb-1 lg:mb-1.5 tracking-wider uppercase">COLLEGE ADMISSION</div>
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-900 mb-1 lg:mb-2 leading-tight">Get Admission Guidance</h2>
            <p className="text-slate-600 text-sm lg:text-base leading-relaxed">
              Share your details and our expert counselors will guide you through the college admission process.
            </p>
          </div>

          {/* Form */}
          <div className="flex-1 p-4 lg:p-6 xl:p-8 overflow-hidden min-h-0 flex items-center justify-center">
            <EnquiryForm wrapperClass="max-w-2xl w-full h-full" panelClass="h-full" />
          </div>
        </div>
      )}
    </div>
  );
}
