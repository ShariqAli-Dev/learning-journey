import { Chapter, Course, Unit } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  course: Course & {
    units: (Unit & { chapters: Chapter[] })[];
  };
}

export default async function GalleryCourseCard({ course }: Props) {
  return (
    <>
      <div className="border rounded-lg border-secondary">
        <div className="relative">
          <Link
            href={`/course/${course.id}/0/0`}
            className="relative block w-fit"
          >
            <Image
              src={course.image || ""}
              className="object-cover w-full max-h-[300px] rounded-t-lg"
              alt="course image"
              width={300}
              height={300}
            />
            <span className="absolute px-2 py-1 text-white rounded-md bg-black/60 w-fit bottom-2 left-2 right-2">
              {course.name}
            </span>
          </Link>
        </div>

        <div className="p-4">
          <h4 className="text-sm text-secondary-foreground/60">Units</h4>
          <div className="space-y-1">
            {course.units.map((unit, unitIndex) => {
              return (
                <Link
                  className="block underline w-fit"
                  href={`/course/${course.id}/${unitIndex}/0`}
                  key={unit.id}
                >
                  {unit.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
