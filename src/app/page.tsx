"use client";

import { memo, useEffect, useRef, useState } from "react";

declare const NpfWidgetsInit: any;

type EnquiryFormProps = {
  wrapperClass?: string;
  panelClass?: string;
};

const EnquiryForm = memo(function EnquiryForm({ wrapperClass = "", panelClass = "" }: EnquiryFormProps) {
  return (
    <div className={wrapperClass}>
      <div
        className={`flex justify-center items-center w-full bg-gradient-to-br from-[#0f2644] via-[#1a3a63] to-[#234d82] rounded-3xl shadow-[0_35px_90px_-40px_rgba(26,58,99,0.6)] border border-slate-800/50 pt-2.5 pb-2 px-0 sm:p-6 lg:p-8 ${panelClass}`}
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
});

EnquiryForm.displayName = "EnquiryForm";

const NpfWidgetManager = memo(function NpfWidgetManager() {
  const widgetInstanceRef = useRef<any>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const timeoutsRef = useRef<number[]>([]);
  const scriptLoadedRef = useRef(false);
  const hoverCleanupRef = useRef<(() => void) | null>(null);
  const initRetryRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const scriptSrc = "https://in4cdn.npfs.co/js/widget/npfwpopup.js";
    const widgetConfig = {
      widgetId: "37c00655c662ff6100da477dfa203ac7",
      baseurl: "widgets.in4.nopaperforms.com",
      formTitle: "Engineering Mirror B.Tech Enquiry Form",
      titleColor: "#eaa358",
      backgroundColor: "#fef9f4",
      iframeHeight: "500px",
      buttonbgColor: "#eaa358",
      buttonTextColor: "#FFF",
      inputBorderColor: "#eaa358",
      inputFocusColor: "#eaa358",
      textColor: "#1f2937",
    };

    const scheduleCleanup = (timeoutId: number) => {
      timeoutsRef.current.push(timeoutId);
    };

    const styleIframe = () => {
      const frames = document.querySelectorAll<HTMLIFrameElement>(".npf_wgts iframe");

      frames.forEach((iframe) => {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (!iframeDoc) {
            return;
          }

          if (iframeDoc.querySelector("#npf-custom-style")) {
            return;
          }

          const style = iframeDoc.createElement("style");
          style.id = "npf-custom-style";
          style.textContent = `
            body {
              font-family: 'Poppins', sans-serif !important;
              background: linear-gradient(to bottom, #fef9f4, #fef9f4) !important;
            }
            body, p, span, div, label, h1, h2, h3, h4, h5, h6 {
              color: #ffffff !important;
            }
            label {
              color: #ffffff !important;
              font-weight: 500 !important;
            }
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
          `;
          iframeDoc.head.appendChild(style);
        } catch (error) {
          console.log("Cannot access iframe (CORS blocked):", (error as Error).message);
        }
      });
    };

    const centerModal = () => {
      const modals = document.querySelectorAll<HTMLElement>(
        '[id*="npfWidget"], [class*="npf-modal"], [class*="npf_modal"]'
      );

      modals.forEach((modal) => {
        modal.style.display = "flex";
        modal.style.alignItems = "center";
        modal.style.justifyContent = "center";
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.right = "0";
        modal.style.bottom = "0";
        modal.style.zIndex = "9999";
      });
    };

    const attachButtonHover = () => {
      const button = document.querySelector<HTMLButtonElement>(".npfWidgetButton");

      if (!button || button.dataset.hoverBound === "true") {
        return;
      }

      const handleEnter = () => {
        button.style.transform = "translateY(-3px) scale(1.05)";
        button.style.boxShadow = "0 12px 24px rgba(234, 163, 88, 0.4)";
      };

      const handleLeave = () => {
        button.style.transform = "translateY(0) scale(1)";
        button.style.boxShadow = "0 8px 16px rgba(234, 163, 88, 0.3)";
      };

      button.dataset.hoverBound = "true";
      button.addEventListener("mouseenter", handleEnter);
      button.addEventListener("mouseleave", handleLeave);

      hoverCleanupRef.current = () => {
        button.removeEventListener("mouseenter", handleEnter);
        button.removeEventListener("mouseleave", handleLeave);
        delete button.dataset.hoverBound;
        hoverCleanupRef.current = null;
      };
    };

    const attemptAutoOpen = () => {
      const instance = widgetInstanceRef.current as {
        show?: () => void;
        open?: () => void;
      } | null;

      if (!instance) {
        return;
      }

      if (typeof instance.show === "function") {
        instance.show();
      } else if (typeof instance.open === "function") {
        instance.open();
      }
    };

    const scheduleEnhancements = () => {
      scheduleCleanup(window.setTimeout(styleIframe, 1500));
      scheduleCleanup(window.setTimeout(styleIframe, 3000));
      scheduleCleanup(window.setTimeout(centerModal, 1500));
      scheduleCleanup(window.setTimeout(centerModal, 3000));
      scheduleCleanup(window.setTimeout(centerModal, 1200));
      scheduleCleanup(window.setTimeout(attachButtonHover, 200));
      scheduleCleanup(window.setTimeout(attemptAutoOpen, 1000));

      if (!observerRef.current) {
        observerRef.current = new MutationObserver(() => {
          centerModal();
        });
        observerRef.current.observe(document.body, { childList: true, subtree: true });
      }
    };

    const initializeWidget = () => {
      const globalWindow = window as typeof window & {
        NpfWidgetsInit?: new (config: typeof widgetConfig) => unknown;
      };

      const resolveConstructor = () => {
        if (typeof NpfWidgetsInit === "function") {
          return NpfWidgetsInit;
        }

        if (typeof globalWindow.NpfWidgetsInit === "function") {
          return globalWindow.NpfWidgetsInit;
        }

        try {
          const fn = new Function("return typeof NpfWidgetsInit === 'function' ? NpfWidgetsInit : null;");
          return fn();
        } catch (error) {
          console.warn("Unable to probe for NpfWidgetsInit via Function constructor:", error);
          return null;
        }
      };

      const Constructor = resolveConstructor();

      if (widgetInstanceRef.current) {
        scheduleEnhancements();
        return;
      }

      if (!Constructor) {
        const maxRetries = 20;
        if (initRetryRef.current < maxRetries) {
          initRetryRef.current += 1;
          scheduleCleanup(window.setTimeout(initializeWidget, 200));
        } else {
          console.error("NpfWidgetsInit is not available on window even after waiting.");
        }
        return;
      }

      initRetryRef.current = 0;

      try {
        const instance = new Constructor(widgetConfig);
        widgetInstanceRef.current = instance;
        if (typeof globalWindow.NpfWidgetsInit !== "function") {
          globalWindow.NpfWidgetsInit = Constructor;
        }
        scheduleEnhancements();
      } catch (error) {
        console.error("Error initializing NPF widget:", error);
      }
    };

    const handleScriptLoad = () => {
      scriptLoadedRef.current = true;
      if (scriptEl) {
        scriptEl.dataset.npfWidgetLoaded = "true";
      }
      initializeWidget();
    };

    let scriptEl = document.querySelector<HTMLScriptElement>(`script[src="${scriptSrc}"]`);

    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.src = scriptSrc;
      scriptEl.async = true;
      scriptEl.dataset.npfWidgetManaged = "true";
      scriptEl.addEventListener("load", handleScriptLoad);
      scriptEl.addEventListener("error", () => {
        console.error("Failed to load NPF widget script");
      });
      document.body.appendChild(scriptEl);
    } else if (scriptEl.dataset.npfWidgetLoaded === "true") {
      scriptLoadedRef.current = true;
      initializeWidget();
    } else {
      scriptEl.addEventListener("load", handleScriptLoad);
    }

    const initialTimeout = window.setTimeout(() => {
      if (scriptLoadedRef.current) {
        initializeWidget();
      }
    }, 500);
    scheduleCleanup(initialTimeout);

    return () => {
      timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutsRef.current = [];

      hoverCleanupRef.current?.();

      if (scriptEl) {
        scriptEl.removeEventListener("load", handleScriptLoad);
      }

      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  return (
    <button
      type="button"
      className="npfWidgetButton npfWidget-37c00655c662ff6100da477dfa203ac7"
      style={{
        display: "none",
        position: "fixed",
        bottom: "16px",
        right: "16px",
        background: "linear-gradient(to right, #eaa358, #d89035)",
        color: "white",
        padding: "10px 16px",
        border: "none",
        borderRadius: "12px",
        fontWeight: 700,
        boxShadow: "0 8px 16px rgba(234, 163, 88, 0.3)",
        cursor: "pointer",
        zIndex: 50,
        transition: "all 0.3s ease",
        fontSize: "13px",
        letterSpacing: "0.5px",
      }}
    >
      🎓 Enquire Now!
    </button>
  );
});

NpfWidgetManager.displayName = "NpfWidgetManager";

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

  const createFallbackAvatar = (name: string) =>
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      name
    )}&backgroundType=gradientLinear&radius=50`;

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
    const counterInterval = setInterval(() => {
      setStudentCount((prev) => prev + 1);
    }, 15000);

    const toastInterval = setInterval(() => {
      const randomProfile = indianProfiles[Math.floor(Math.random() * indianProfiles.length)];
      const newToast = {
        id: Date.now(),
        name: randomProfile.name,
        avatar: randomProfile.avatar,
      };

      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== newToast.id));
      }, 4000);
    }, 8000);

    return () => {
      clearInterval(counterInterval);
      clearInterval(toastInterval);
    };
  }, []);

  return (
    <div className="min-h-screen lg:h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex flex-col lg:flex-row overflow-x-hidden lg:overflow-hidden">
      <NpfWidgetManager />
      {/* Left Panel */}
      <div className="flex-1 bg-gradient-to-br from-[#081120] via-[#0f1c33] to-[#122540] flex flex-col justify-center items-center text-white p-4 sm:p-5 md:p-12 lg:p-16 relative overflow-hidden min-h-[50vh] lg:h-full">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-sky-400/5 mix-blend-screen"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl -translate-y-48 translate-x-48 hidden lg:block"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl translate-y-32 -translate-x-32 hidden lg:block"></div>
        
        <div className="relative z-10 w-full max-w-lg space-y-6 px-2 sm:px-4 text-left">
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

          <div className="w-full rounded-3xl border border-cyan-200/45 bg-[#102b4c]/90 p-4 sm:p-6 shadow-[0_35px_80px_-35px_rgba(14,165,233,0.65)] backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-50/80">What we cover</p>
                <ul className="space-y-2 text-sm md:text-[15px] text-white/95">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-[0_6px_12px_-6px_rgba(8,145,178,0.8)]">
                      <svg className="h-[14px] w-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Expert counselling across 250+ Indian private &amp; deemed universities
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-[0_6px_12px_-6px_rgba(8,145,178,0.8)]">
                      <svg className="h-[14px] w-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Profile evaluation, shortlisting and scholarship maximisation
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-[0_6px_12px_-6px_rgba(8,145,178,0.8)]">
                      <svg className="h-[14px] w-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    End-to-end application tracking with dedicated admission specialist
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 sm:gap-6 rounded-3xl border border-cyan-200/45 bg-[#0f2744]/90 p-4 sm:p-6 backdrop-blur-xl shadow-[0_35px_80px_-35px_rgba(14,165,233,0.6)]">
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

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
              <div className="flex items-center self-start sm:self-auto">
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
                        event.currentTarget.src = createFallbackAvatar(student.name);
                        event.currentTarget.dataset.fallback = "true";
                      }
                    }}
                  />
                ))}
                </div>
                <span className="ml-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-cyan-200/50 bg-cyan-100/80 text-sm font-semibold text-slate-900 shadow-[0_8px_20px_-10px_rgba(34,211,238,0.8)] shrink-0">
                  +54
                </span>
              </div>
              <p className="text-[15px] font-medium text-slate-100/95 sm:text-right leading-snug">
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
                      event.currentTarget.src = createFallbackAvatar(toast.name);
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
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-900 mb-1 lg:mb-2 leading-tight">B.Tech Admission Guidance</h2>
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
