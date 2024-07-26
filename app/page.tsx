import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/prisma/client";
import Link from "next/link";
import NoteActions from "@/components/NoteActions";
import { readableDateTime } from "@/components/helpers";

export default async function Home() {
  const session = await auth();
  if (!session || !session.user) {
    redirect(`/api/auth/signin?callbackUrl=/`);
  }
  const notes = await prisma.note.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return (
    <main>
      <h1 className={"text-center text-4xl font-bold mb-5"}>Saved Notes</h1>
      {notes.length === 0 ? (
        <p>No notes saved yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {notes.map((note) => (
            <Link
              href={`/${note.id}`}
              key={note.id}
              className={"card bg-base-200"}
            >
              <div className={"p-3"}>
                <div className={"flex justify-between"}>
                  <div>
                    <h2 className="card-title">{note.title}</h2>
                    <p className={"text-xs"}>
                      Created: {readableDateTime(note.createdAt.toString())}
                      &nbsp; Updated:
                      {readableDateTime(note.updatedAt.toString())}
                    </p>
                  </div>
                  <div className="card-actions justify-end">
                    <NoteActions note={note} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
