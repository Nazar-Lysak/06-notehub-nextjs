import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./NoteForm.module.css";
import type { NoteTag } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";

interface NoteFormProps {
  onClose: () => void;
}

interface handleSubmitInterface {
  title: string;
  content: string;
  tag: NoteTag
}

const initialValuesObj: handleSubmitInterface = {
  title: "",
  content: "",
  tag: "Todo"
}

const SignupSchema = Yup.object({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  content: Yup.string()
    .max(500, "Too Long!"),

  tag: Yup.string()
    .oneOf(
      ["Todo", "Work", "Personal", "Meeting", "Shopping"],
      "Invalid tag"
    )
    .required("Required"),
});

function NoteForm({ onClose }: NoteFormProps) {

  const queryClient = useQueryClient();

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  const onSubmit = (data: handleSubmitInterface) => {
    createNoteMutation.mutate(data);
  };
  return (
    <Formik
      initialValues={initialValuesObj}
      onSubmit={onSubmit}
      validationSchema={SignupSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name='title' className={css.error} component="span" />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field id="tag" name="tag" className={css.select} as="select">
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={createNoteMutation.isPending}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default NoteForm;