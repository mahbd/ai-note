"use client";

import useFormComponents from "@/components/useFormComponents";
import { NoteFormData, noteSchema } from "@/app/[id]/edit/noteSchema";
import { Note } from "@prisma/client";
import { createNote, updateNote } from "@/app/[id]/actions";

interface Props {
  note?: Note;
}

const NoteForm = ({ note }: Props) => {
  const { Editor, Input, SubmitBtn, handleSubmit, setIsSubmitting } =
    useFormComponents<NoteFormData>(noteSchema, {
      content: note?.content,
      title: note?.title,
      summary: note?.summary || "No summary",
      tags: note?.tagIds,
    });

  const doSubmit = async (data: NoteFormData) => {
    setIsSubmitting(true);
    if (note) {
      const res = await updateNote(note.id, JSON.stringify(data));
      if (res.ok) {
        alert("Note updated");
        window.location.href = `/${note.id}`;
      } else {
        alert(res.message);
      }
    } else {
      const res = await createNote(JSON.stringify(data));
      if (res.ok) {
        alert("Note created");
        window.location.href = "/";
      } else {
        alert(res.message);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <form
      className="horizontal-center lg:max-w-2xl w-full mx-5 md:mx-10 lg:mx-auto p-2"
      onSubmit={handleSubmit(doSubmit)}
    >
      <Input name={"title"} />
      <Editor name={"content"} />
      <SubmitBtn label={`${note ? "Update" : "Create"} Note`} />
    </form>
  );
};

export default NoteForm;
