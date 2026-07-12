"use client";

import { useQuery } from "@tanstack/react-query";
import css from "./NoteDetailsClient.module.css";
import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";

function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError) {
    return <p>Oops, something went wrong...</p>;
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note?.title}</h2>
          </div>
          <p className={css.tag}>{note?.tag}</p>
          <p className={css.content}>{note?.content}</p>
          <p className={css.date}>{note?.createdAt}</p>
        </div>
      </div>
    </main>
  );
}

export default NoteDetailsClient;
