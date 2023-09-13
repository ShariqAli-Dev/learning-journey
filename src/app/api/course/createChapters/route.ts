import { NextResponse } from "next/server";
import { createChaptersSchema } from "@/validators/course";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";
import { getUnsplashImage } from "@/lib/unsplash";
import { prisma } from "@/lib/db";

interface OutputUnit {
  title: string;
  chapters: {
    youtube_search_query: string;
    chapter_title: string;
  }[];
}

export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, units } = createChaptersSchema.parse(body);

    let output_units: OutputUnit[] = await strict_output(
      "You are an AI capable of curating course content, coming up with relevent chapter titles, and finding relevant youtube videos for each chapter",
      new Array(units.length).fill(
        `It is your job to create a course about ${title}. The user has requested to create chapters for each of the units. For each chapter, provide a detailed youtube seach query that can be used to find an informative educational video for each chapter. Each query should give an educational informative course in youtube.`
      ),
      {
        title: "title of the unit",
        chapters:
          "an array of chapters, each chapter should have a youtube_search_query and chapter_title key in the JSON object",
      }
    );

    const imageSearchTerm = await strict_output(
      "You are an AI capable of finding the most relevent image for a course",
      `Please provide a good image search term for the title of a course about ${title}. This search term wil be fed into the unsplash API, so make sure it is a good search term that will return good results.`,
      {
        image_search_term: "a good search term for the title of the course",
      }
    );

    const course_image = await getUnsplashImage(
      imageSearchTerm.image_search_term
    );

    const course = await prisma.course.create({
      data: { name: title, image: course_image },
    });

    for (const unit of output_units) {
      const title = unit.title;
      const prismaUnit = await prisma.unit.create({
        data: {
          name: title,
          courseId: course.id,
        },
      });
      await prisma.chapter.createMany({
        data: unit.chapters.map((chapter) => {
          return {
            name: chapter.chapter_title,
            youtubeSearchQuery: chapter.youtube_search_query,
            unitId: prismaUnit.id,
          };
        }),
      });
    }

    return NextResponse.json({ course_id: course.id });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json("invalid body", { status: 400 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}
