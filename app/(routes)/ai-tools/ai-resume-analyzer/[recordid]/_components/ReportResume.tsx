import ResumeUploadDialog from "@/app/(routes)/dashboard/_components/ResumeUploadDialog";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Sparkle,
  Star,
  ArrowUp,
  ArrowDown,
  AlertTriangle, // Pengganti exclamation-circle untuk 'Good' score
  HelpCircle, // Pengganti question-circle untuk N/A score
  UserCircle2,
  Briefcase,
  GraduationCap,
  Lightbulb as LightbulbIcon, // Alias untuk menghindari konflik jika ada variabel Lightbulb
  Check,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  RefreshCcw, // Untuk tombol Re-analyze
} from "lucide-react";

// Definisikan tipe AIReport (jika belum ada, Anda bisa uncomment atau definisikan di sini)
// interface AIReportSectionDetail {
//   score?: number | null;
//   comment?: string | null;
// }

// interface AIReportSections {
//   contact_info: AIReportSectionDetail;
//   experience: AIReportSectionDetail;
//   education: AIReportSectionDetail;
//   skills: AIReportSectionDetail;
//   [key: string]: AIReportSectionDetail;
// }

// interface AIReport {
//   overall_score?: number | null;
//   summary_comment?: string | null;
//   sections: AIReportSections;
//   tips_for_improvement?: string[] | null;
//   whats_good?: string[] | null;
//   needs_improvement?: string[] | null;
// }

const getScoreColorClasses = (score: number | undefined | null) => {
  const iconProps = { className: "h-5 w-5" }; // Default props untuk ikon feedback

  if (score === undefined || score === null) {
    return {
      textColor: "text-gray-600",
      borderColor: "border-gray-200",
      bgColor: "bg-gray-600",
      progressBgColor: "bg-gray-200",
      feedbackText: "N/A",
      feedbackIconColor: "text-gray-500",
      FeedbackIconComponent: HelpCircle,
      iconProps,
    };
  }

  if (score >= 80) {
    return {
      textColor: "text-green-600",
      borderColor: "border-green-200",
      bgColor: "bg-green-600",
      progressBgColor: "bg-green-600",
      feedbackText: "Excellent!",
      feedbackIconColor: "text-green-500",
      FeedbackIconComponent: ArrowUp,
      iconProps,
    };
  } else if (score >= 60) {
    return {
      textColor: "text-yellow-500",
      borderColor: "border-yellow-200",
      bgColor: "bg-yellow-500",
      progressBgColor: "bg-yellow-500",
      feedbackText: "Good",
      feedbackIconColor: "text-yellow-500",
      FeedbackIconComponent: AlertTriangle,
      iconProps,
    };
  } else {
    return {
      textColor: "text-red-600",
      borderColor: "border-red-200",
      bgColor: "bg-red-600",
      progressBgColor: "bg-red-600",
      feedbackText: "Needs Work",
      feedbackIconColor: "text-red-500",
      FeedbackIconComponent: ArrowDown,
      iconProps,
    };
  }
};

export default function ReportResume({ aiReport }: any) {
  // Menambahkan tipe untuk aiReport
  const [openResume, setOpenResume] = useState(false);

  const overallScoreStyles = getScoreColorClasses(aiReport?.overall_score);

  const sections = aiReport?.sections
    ? [
        {
          name: "Contact Info",
          data: aiReport.sections.contact_info,
          IconComponent: UserCircle2,
        },
        {
          name: "Experience",
          data: aiReport.sections.experience,
          IconComponent: Briefcase,
        },
        {
          name: "Education",
          data: aiReport.sections.education,
          IconComponent: GraduationCap,
        },
        {
          name: "Skills",
          data: aiReport.sections.skills,
          IconComponent: LightbulbIcon,
        },
      ]
    : [];

  const commonIconProps = { className: "mr-2 h-5 w-5" }; // Untuk ikon di judul section
  const smallIconProps = { className: "h-4 w-4" }; // Untuk ikon kecil seperti di tombol

  return (
    <div className="px-5 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          AI Analysis Results
        </h2>
        <Button onClick={() => setOpenResume(true)}>
          Re-analyze <RefreshCcw {...smallIconProps} className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div
        className={`bg-white rounded-lg shadow-md p-6 mb-6 border ${overallScoreStyles.borderColor} transform hover:scale-[1.01] transition-transform duration-300 ease-in-out`}
      >
        <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
          <Star
            {...commonIconProps}
            className={`mr-2 h-5 w-5 ${
              // commonIconProps bisa di-override jika perlu
              aiReport?.overall_score && aiReport.overall_score >= 60
                ? "text-yellow-500 fill-yellow-500" // Tambahkan fill untuk Star
                : "text-gray-400"
            }`}
          />
          Overall Score
        </h3>
        <div className="flex items-center justify-between mb-4">
          <span
            className={`text-6xl font-extrabold ${overallScoreStyles.textColor}`}
          >
            {aiReport?.overall_score ?? "N/A"}
            <span className="text-2xl">/100</span>
          </span>
          <div className="flex items-center">
            <overallScoreStyles.FeedbackIconComponent
              {...overallScoreStyles.iconProps} // Gunakan props dari helper
              className={`${overallScoreStyles.iconProps.className} ${overallScoreStyles.feedbackIconColor} mr-2`} // Tambahkan warna dan margin
            />
            <span
              className={`${overallScoreStyles.feedbackIconColor} text-lg font-bold`}
            >
              {overallScoreStyles.feedbackText}
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className={`${overallScoreStyles.progressBgColor} h-2.5 rounded-full`}
            style={{ width: `${aiReport?.overall_score ?? 0}%` }}
          ></div>
        </div>
        <p className="text-gray-600 text-sm">
          {aiReport?.summary_comment ?? "No summary available."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {sections.map((section, index) => {
          const sectionScoreStyles = getScoreColorClasses(section.data?.score);
          const { IconComponent } = section;
          return (
            <div
              key={section.name || index}
              className={`bg-white rounded-lg shadow-md p-5 border ${sectionScoreStyles.borderColor} relative overflow-hidden group`}
            >
              <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                <IconComponent
                  {...commonIconProps}
                  className={`${commonIconProps.className} text-gray-500`}
                />
                {section.name}
              </h4>
              <span
                className={`text-4xl font-bold ${sectionScoreStyles.textColor}`}
              >
                {section.data?.score ?? "N/A"}%
              </span>
              <p className="text-sm text-gray-600 mt-2">
                {section.data?.comment ?? "No comment available."}
              </p>
              <div
                className={`absolute inset-x-0 bottom-0 h-1 ${sectionScoreStyles.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>
            </div>
          );
        })}
        {sections.length === 0 && (
          <p className="text-gray-500 md:col-span-2">
            No section ratings available.
          </p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
          <LightbulbIcon
            {...commonIconProps}
            className={`${commonIconProps.className} text-orange-400`}
          />{" "}
          Tips for Improvement
        </h3>
        <ol className="list-none space-y-4">
          {aiReport?.tips_for_improvement &&
          aiReport.tips_for_improvement.length > 0 ? (
            aiReport.tips_for_improvement.map((tip: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                  <Check
                    {...smallIconProps}
                    className={`${smallIconProps.className} text-blue-600`}
                  />{" "}
                  {/* Ukuran ikon di sini mungkin perlu disesuaikan atau gunakan className dari span */}
                </span>
                <div>
                  <p className="text-gray-600 text-sm">{tip}</p>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No tips available at the moment.</p>
          )}
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-5 border border-green-200">
          <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center">
            <ThumbsUp
              {...commonIconProps}
              className={`${commonIconProps.className} text-green-500`}
            />{" "}
            What's Good
          </h3>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 pl-5">
            {" "}
            {/* Menambahkan pl-5 untuk indentasi list-disc */}
            {aiReport?.whats_good && aiReport.whats_good.length > 0 ? (
              aiReport.whats_good.map(
                (good: string, index: number) => <li key={index}>{good}</li> // list-disc akan membuat bullet point
              )
            ) : (
              <p className="text-gray-500">
                Nothing specific highlighted as good.
              </p>
            )}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-md p-5 border border-red-200">
          <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center">
            <ThumbsDown
              {...commonIconProps}
              className={`${commonIconProps.className} text-red-500`}
            />{" "}
            Needs Improvement
          </h3>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 pl-5">
            {" "}
            {/* Menambahkan pl-5 */}
            {aiReport?.needs_improvement &&
            aiReport.needs_improvement.length > 0 ? (
              aiReport.needs_improvement.map((need: string, index: number) => (
                <li key={index}>{need}</li>
              ))
            ) : (
              <p className="text-gray-500">
                No specific areas for improvement highlighted.
              </p>
            )}
          </ul>
        </div>
      </div>

      <div className="bg-blue-600 text-white rounded-lg shadow-md p-6 text-center gradient-button-bg">
        <h3 className="text-2xl font-bold mb-3">
          Ready to refine your resume? 💪
        </h3>
        <p className="text-base mb-4">
          Make your application stand out with our premium insights and
          features.
        </p>
        <Button
          variant="outline"
          className="inline-flex items-center justify-center px-6 py-3 border-transparent text-base font-medium rounded-full shadow-sm text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
        >
          Upgrade to Premium
          <ArrowRight
            {...smallIconProps}
            className="ml-2 h-4 w-4 text-blue-600"
          />
        </Button>
      </div>
      <ResumeUploadDialog
        openResume={openResume}
        setOpenResume={() => setOpenResume(false)}
      />
    </div>
  );
}
