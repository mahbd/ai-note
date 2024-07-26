"use client";

import { deleteNote } from "@/app/[id]/actions";
import Link from "next/link";
import { Note } from "@prisma/client";
import { useState } from "react";
import Spinner from "@/components/Spinner";

const NoteActions = ({
  note,
  className,
}: {
  note: Note;
  className?: string;
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className={className}>
      <Link href={`/${note.id}/edit`} className="btn btn-primary btn-xs">
        {loading ? <Spinner /> : "Edit"}
      </Link>
      <button
        className="btn btn-error btn-xs ms-2"
        onClick={async () => {
          setLoading(true);
          await deleteNote(note.id);
          window.location.reload();
          setLoading(false);
        }}
      >
        {loading ? <Spinner /> : "Delete"}
      </button>
    </div>
  );
};

export default NoteActions;
