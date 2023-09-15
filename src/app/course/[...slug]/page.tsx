import CourseSideBar from "@/components/CourseSideBar";
import MainVideoSummary from "@/components/MainVideoSummary";
import QuizCards from "@/components/QuizCards";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

interface Props {
  params: {
    slug: string[];
  };
}

export default async function CoursePage({ params: { slug } }: Props) {
  const [courseId, unitIndexParam, chapterIndexParam] = slug;
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });

  if (!course) {
    return redirect("/gallery");
  }

  let unitIndex = parseInt(unitIndexParam);
  let chapterIndex = parseInt(chapterIndexParam);
  const unit = course.units[unitIndex];
  if (!unit) {
    return redirect(`/gallery`);
  }
  const chapter = unit.chapters[chapterIndex];
  if (!chapter) {
    return redirect(`/gallery`);
  }

  return (
    <div>
      <CourseSideBar course={course} currentChapterId={chapter.id} />
      <div>
        <div className="ml-[400px] px-8">
          <div className="flex">
            <MainVideoSummary
              chapter={chapter}
              chapterIndex={chapterIndex}
              unit={unit}
              unitIndex={unitIndex}
            />
            <QuizCards />
          </div>
        </div>
      </div>
    </div>
  );
}
