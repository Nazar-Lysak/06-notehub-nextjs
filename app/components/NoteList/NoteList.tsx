import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import { deleteNote } from "@/app/lib/api";
import css from "./NoteList.module.css";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(note => {
        const { id, title, content, tag } = note;
        return (
          <li className={css.listItem} key={id}>
            <h2 className={css.title}>{title}</h2>
            <p className={css.content}>{content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{tag}</span>
              <Link href={`/notes/${id}`} className={css.link}>View details</Link>
              <button className={css.button} onClick={() => deleteNoteMutation.mutate(id)}>Delete</button>
            </div>
          </li>
        )
      })}
    </ul>
  );
}

export default NoteList;