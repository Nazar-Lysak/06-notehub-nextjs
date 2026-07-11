import css from "./NoteDetailsClient.module.css";

function NoteDetailsClient() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>Note title</h2>
          </div>
          <p className={css.tag}>tag</p>
          <p className={css.content}>Note content</p>
          <p className={css.date}>Created date</p>
        </div>
      </div>
    </main>
  );
}

export default NoteDetailsClient;
