import prisma from "@/prisma/client";
import { notFound, redirect } from "next/navigation";
import NoteForm from "@/app/[id]/edit/NoteForm";
import { auth } from "@/auth";

interface Props {
  params: { id: string };
}

const EditNote = async ({ params }: Props) => {
  const session = await auth();
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/${params.id}`);
  }
  if (params.id === "new") {
    return (
      <div className="m-2 w-full">
        <h1 className="text-center text-4xl">New Note</h1>
        <NoteForm />
      </div>
    );
  }

  const note = await prisma.note.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!note) {
    notFound();
  }

  return (
    <div className="m-2 w-full">
      <h1 className="text-center text-4xl">{note.title}</h1>
      <NoteForm note={note} />
    </div>
  );
};

export default EditNote;
