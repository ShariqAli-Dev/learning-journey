import { prisma } from "@/lib/db";
import { strict_output } from "@/lib/gpt";
import { getTranscript, searchYoutube } from "@/lib/youtube";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodyParser = z.object({
  chapterId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { chapterId } = bodyParser.parse(body);
    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
    });

    if (!chapter) {
      return NextResponse.json(
        {
          success: false,
          error: "chapter not found",
        },
        { status: 404 }
      );
    }

    const videoId = await searchYoutube(chapter.youtubeSearchQuery);
    let transcript = await getTranscript(videoId);
    const { summary }: { summary: string } = await strict_output(
      "You are an ai capable of summarizing a youtube transcript",
      "summarize in 250 words or less and do not talk of the sponsers or anything unrelated to the topic, also do not introduce what the summary is about\n" +
        transcript,
      { summary: "summary of the transcript" }
    );
    let maxLength = 500;
    transcript = transcript.split(" ").slice(0, maxLength).join(" ");

    // stopped at 3 hours 10 mins

    return NextResponse.json({
      videoId,
      transcript,
      summary,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "invalid body" }, { status: 400 });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "unknown",
        },
        { status: 500 }
      );
    }
  }
}
