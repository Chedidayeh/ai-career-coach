import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/resume-builder";

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <div className="container mx-auto px-5">
      <ResumeBuilder initialContent={resume?.content!} />
    </div>
  );
}
