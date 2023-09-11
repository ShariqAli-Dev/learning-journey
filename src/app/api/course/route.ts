import { NextResponse } from "next/server";
import { createChaptersSchema } from "@/validators/course";
import { ZodError } from "zod";

interface OutputUnit {
  title: string;
  chapter: {
    youtube_search_query: string;
    chapter_title: string;
  }[];
}

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { title, units } = createChaptersSchema.parse(body.value);

    return NextResponse.json({ message: "Hello World" });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json("invalid body", { status: 400 });
    }
  }
}
