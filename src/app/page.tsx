import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex">

<div dangerouslySetInnerHTML={{
        __html: `
          <button type="button" class="npfWidgetButton npfWidget-37c00655c662ff6100da477dfa203ac7" style="display: none; position: fixed; bottom: 24px; right: 24px; background: linear-gradient(to right, #eaa358, #d89035); color: white; padding: 14px 28px; border: none; border-radius: 12px; font-weight: 700; box-shadow: 0 8px 16px rgba(234, 163, 88, 0.3); cursor: pointer; z-index: 50; transition: all 0.3s ease; font-size: 16px; letter-spacing: 0.5px;">
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
      <div className="flex-1 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 flex flex-col justify-center items-center text-white p-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
        
        <div className="max-w-lg text-center relative z-10">
          <h1 className="text-5xl font-bold mb-8 leading-tight tracking-tight">Welcome to GetCollege</h1>
          <p className="text-xl mb-12 opacity-95 leading-relaxed font-light">
            Let's start by entering your personal details. This information helps us provide personalized guidance for your college admission journey.
          </p>
          
          {/* Graduation Cap Icon */}
          <div className="mb-12">
            <div className="w-28 h-28 mx-auto bg-white/15 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl border border-white/20">
              <svg className="w-14 h-14 text-amber-300 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
              </svg>
            </div>
          </div>
          
          {/* Progress Dots */}
          <div className="flex justify-center space-x-3">
            <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
            <div className="w-3 h-3 bg-white/40 rounded-full"></div>
            <div className="w-3 h-3 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 bg-gradient-to-br from-white to-slate-50/50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-10 border-b border-slate-200/60">
          <button className="text-slate-400 hover:text-slate-600 mb-6 p-2 hover:bg-slate-100 rounded-full transition-all duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="text-sm text-indigo-600 font-semibold mb-3 tracking-wider uppercase">COLLEGE ADMISSION</div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">Get Admission Guidance</h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Share your details and our expert counselors will guide you through the college admission process.
          </p>
        </div>

        {/* Form */}
        <div className="flex-1 p-10 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center items-center w-full min-h-[500px] bg-gradient-to-br from-indigo-300 via-purple-300 to-violet-300 rounded-3xl shadow-xl border border-slate-200/50 p-8">
              <div
                        className="npf_wgts relative z-10 w-full max-w-lg rounded-2xl" 
                        data-height="459px" 
                        data-width="40rem"
                        data-w="37c00655c662ff6100da477dfa203ac7"
                      ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
