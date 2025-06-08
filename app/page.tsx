// "use client";
// import Image from "next/image";

// import { SignIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
// import { TrendingUp } from "lucide-react";

// export default function Home() {
//   // const user = useAuthContext();
//   // console.log(user?.user)

//   const { user } = useUser();

//   return (
//     <div>
//       <header className="flex  flex-wrap sm:justify-start  sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-neutral-800 dark:border-neutral-700">
//         <nav
//           className="relative  p-4 max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
//           aria-label="Global"
//         >
//           <div className="flex items-center text-blue-600 gap-3">
//             {/* <Image src={'/logo.svg'} alt="logo" width={150} height={150} /> */}
//             <TrendingUp className="size-10" />
//             <h1 className="text-lg font-bold text-center">
//               Next AI Career Agent
//             </h1>
//           </div>
//           <div
//             id="navbar-collapse-with-animation"
//             className="hs-collapse hidden overflow-hidden transition-all duration-300 sm:block"
//           >
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end sm:ps-7 cursor-pointer">
//               {/* Clerk Authentication  */}
//               {!user ? (
//                 <SignInButton
//                   mode="modal"
//                   signUpForceRedirectUrl={"/dashboard"}
//                 >
//                   <div className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 sm:border-s sm:border-gray-300 py-2 sm:py-0 sm:ms-4 sm:my-6 sm:ps-6 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500">
//                     <svg
//                       className="flex-shrink-0 size-4"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="16"
//                       height="16"
//                       fill="currentColor"
//                       viewBox="0 0 16 16"
//                     >
//                       <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
//                     </svg>
//                     Get Started
//                   </div>
//                 </SignInButton>
//               ) : (
//                 <UserButton />
//               )}
//             </div>
//           </div>
//         </nav>
//       </header>
//       <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
//         <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
//           <div className="mt-5 max-w-2xl text-center mx-auto">
//             <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
//               Bring Your Career to
//               <span className="text-blue-600"> Next Level with AI</span>
//             </h1>
//           </div>

//           <div className="mt-5 max-w-3xl text-center mx-auto">
//             <p className="text-lg text-gray-600 dark:text-neutral-400">
//               Empower your career with intelligent AI — personalized,
//               insightful, and future-ready.
//             </p>
//           </div>

//           <div className="mt-8 gap-3 flex justify-center">
//             <a
//               className="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-400 border border-transparent cursor-pointer text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800 duration-300"
//               href="/dashboard"
//             >
//               Get started
//               <svg
//                 className="flex-shrink-0 size-4"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="m9 18 6-6-6-6" />
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-2">
//           <a
//             className="group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800"
//             href="#"
//           >
//             <div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl">
//               <svg
//                 className="flex-shrink-0 size-6 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <rect width="10" height="14" x="3" y="8" rx="2" />
//                 <path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" />
//                 <path d="M8 18h.01" />
//               </svg>
//             </div>
//             <div className="mt-5">
//               <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">
//                 25+ templates
//               </h3>
//               <p className="mt-1 text-gray-600 dark:text-neutral-400">
//                 Responsive, and mobile-first project on the web
//               </p>
//               <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 group-hover:underline font-medium">
//                 Learn more
//                 <svg
//                   className="flex-shrink-0 size-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="m9 18 6-6-6-6" />
//                 </svg>
//               </span>
//             </div>
//           </a>

//           <a
//             className="group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800"
//             href="#"
//           >
//             <div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl">
//               <svg
//                 className="flex-shrink-0 size-6 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M20 7h-9" />
//                 <path d="M14 17H5" />
//                 <circle cx="17" cy="17" r="3" />
//                 <circle cx="7" cy="7" r="3" />
//               </svg>
//             </div>
//             <div className="mt-5">
//               <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">
//                 Customizable
//               </h3>
//               <p className="mt-1 text-gray-600 dark:text-neutral-400">
//                 Components are easily customized and extendable
//               </p>
//               <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 group-hover:underline font-medium">
//                 Learn more
//                 <svg
//                   className="flex-shrink-0 size-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="m9 18 6-6-6-6" />
//                 </svg>
//               </span>
//             </div>
//           </a>

//           <a
//             className="group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800"
//             href="#"
//           >
//             <div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl">
//               <svg
//                 className="flex-shrink-0 size-6 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
//                 <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
//               </svg>
//             </div>
//             <div className="mt-5">
//               <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">
//                 Free to Use
//               </h3>
//               <p className="mt-1 text-gray-600 dark:text-neutral-400">
//                 Every component and plugin is well documented
//               </p>
//               <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 group-hover:underline font-medium">
//                 Learn more
//                 <svg
//                   className="flex-shrink-0 size-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="m9 18 6-6-6-6" />
//                 </svg>
//               </span>
//             </div>
//           </a>

//           <a
//             className="group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800"
//             href="#"
//           >
//             <div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl">
//               <svg
//                 className="flex-shrink-0 size-6 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
//                 <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
//               </svg>
//             </div>
//             <div className="mt-5">
//               <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">
//                 24/7 Support
//               </h3>
//               <p className="mt-1 text-gray-600 dark:text-neutral-400">
//                 Contact us 24 hours a day, 7 days a week
//               </p>
//               <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 group-hover:underline font-medium">
//                 Learn more
//                 <svg
//                   className="flex-shrink-0 size-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="m9 18 6-6-6-6" />
//                 </svg>
//               </span>
//             </div>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/page.tsx
"use client";

import CanvasParticles from "@/components/CanvasParticles";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { TrendingUp } from "lucide-react";

export default function Home() {
  const { user } = useUser();

  // Warna partikel disesuaikan dengan bg-blue-600 Tailwind (#2563EB atau RGB: 37, 99, 235)
  const particleColorsForCanvas = [
    "rgba(37, 99, 235, 0.7)", // Warna utama (blue-600) dengan opacity
    "rgba(59, 130, 246, 0.6)", // Sedikit lebih terang (blue-500) dengan opacity
    "rgba(96, 165, 250, 0.5)", // Lebih terang lagi (blue-400) dengan opacity
  ];
  const lineColorForCanvas = "rgba(59, 130, 246, 0.15)"; // Garis penghubung dengan warna biru muda transparan

  return (
    <div className="bg-white">
      <header className="sticky top-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 text-sm py-3 sm:py-0">
        <nav
          className="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center text-blue-600 gap-3">
            <TrendingUp className="size-10" />
            <h1 className="text-lg font-bold">Next AI Career Agent</h1>
          </div>
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block sm:w-auto sm:basis-auto"
          >
            <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
              {!user ? (
                <SignInButton
                  mode="modal"
                  signUpForceRedirectUrl={"/dashboard"}
                  forceRedirectUrl={"/dashboard"}
                >
                  <div className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 sm:border-s sm:border-gray-300 py-2 sm:py-0 sm:ms-4 sm:my-6 sm:ps-6 cursor-pointer">
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg>
                    Get Started
                  </div>
                </SignInButton>
              ) : (
                <div className="sm:border-s sm:border-gray-300 py-2 sm:py-0 sm:ms-4 sm:my-6 sm:ps-6">
                  <UserButton afterSignOutUrl="/" />
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Bagian Hero dengan Background Partikel */}
      <div
        className="relative overflow-hidden min-h-[calc(100vh-60px)] flex flex-col justify-center" // 60px adalah perkiraan tinggi header
        // Hapus kelas 'before:...' jika Anda TIDAK ingin background SVG Preline di belakang partikel.
        // Jika ingin background SVG Preline, biarkan kelas 'before:...' dan pastikan partikel di atasnya.
        // Saat ini, dengan before:-z-[1], partikel akan di atas background SVG Preline.
        // Hapus 'before:...' jika hanya ingin partikel dan warna latar belakang solid/gradien.
        // Contoh dengan latar belakang solid terang jika before dihapus: style={{ backgroundColor: '#f9fafb' }}
      >
        {/* Komponen Partikel Canvas diletakkan di sini, di dalam div relative */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        >
          <CanvasParticles
            particleCount={80}
            particleColor={particleColorsForCanvas}
            particleSize={{ min: 2, max: 4 }}
            speed={0.15}
            connectLines={true}
            lineColor={lineColorForCanvas}
            maxLineDistance={120}
          />
        </div>

        {/* Konten Hero Anda */}
        <div
          className="relative max-w-[85rem] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24"
          style={{ zIndex: 1 }}
        >
          <div className="text-center">
            <h1 className="block font-bold text-gray-800 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Bring Your Career to
              <br />
              <span className="text-blue-600">Next Level with AI</span>
            </h1>
          </div>

          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-600">
              Empower your career with intelligent AI — personalized,
              insightful, and future-ready.
            </p>
          </div>

          <div className="mt-8 gap-3 flex justify-center">
            {user ? (
              <a
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                href="/dashboard"
              >
                Go to Dashboard
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
            ) : (
              <SignInButton
                mode="modal"
                signUpForceRedirectUrl="/dashboard"
                forceRedirectUrl="/dashboard"
              >
                <button className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                  Get started
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
      {/* Akhir Bagian Hero */}

      {/* Bagian Fitur */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-6 md:gap-10">
          {/* Item Fitur 1 */}
          <a
            className="group size-full flex flex-col justify-center items-center text-center p-4 md:p-7 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            href="/dashboard"
          >
            <div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl mb-3">
              <svg
                className="flex-shrink-0 size-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="10" height="14" x="3" y="8" rx="2" />
                <path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" />
                <path d="M8 18h.01" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 duration-300">
                AI Resume Analyzer
              </h3>
              <p className="mt-1 text-gray-600">
                Optimize your resume with AI-driven insights.
              </p>
            </div>
          </a>
          {/* Item Fitur 2 */}
          <a
            className="group size-full flex flex-col justify-center items-center text-center p-4 md:p-7 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            href="/dashboard"
          >
            <div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl mb-3">
              <svg
                className="flex-shrink-0 size-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 7h-9" />
                <path d="M14 17H5" />
                <circle cx="17" cy="17" r="3" />
                <circle cx="7" cy="7" r="3" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 duration-300">
                Roadmap Generator
              </h3>
              <p className="mt-1 text-gray-600">
                Chart your career path with personalized AI roadmaps.
              </p>
            </div>
          </a>
          {/* Item Fitur 3 */}
          <a
            className="group size-full flex flex-col justify-center items-center text-center p-4 md:p-7 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            href="/dashboard"
          >
            <div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl mb-3">
              <svg
                className="flex-shrink-0 size-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 duration-300">
                Cover Letter AI
              </h3>
              <p className="mt-1 text-gray-600">
                Craft compelling cover letters in minutes.
              </p>
            </div>
          </a>
          {/* Item Fitur 4 */}
          <a
            className="group size-full flex flex-col justify-center items-center text-center p-4 md:p-7 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            href="/dashboard"
          >
            <div className="flex justify-center items-center size-12 bg-blue-600 rounded-xl mb-3">
              <svg
                className="flex-shrink-0 size-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 duration-300">
                Q&A Career Chat
              </h3>
              <p className="mt-1 text-gray-600">
                Get instant answers to your career questions.
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* Footer Sederhana */}
      <footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center">
          <div>
            <a
              className="flex-none text-xl font-semibold text-blue-600"
              href="/"
              aria-label="Brand"
            >
              Next AI Career Agent
            </a>
          </div>
          <div className="mt-3">
            <p className="text-gray-500">Empowering careers with AI.</p>
            <p className="text-gray-500">
              © {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
