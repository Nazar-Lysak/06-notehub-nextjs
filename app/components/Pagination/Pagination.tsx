import ReactPaginateModule from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  setPage: (selected: number) => void;
  totalPages: number
}

function Pagination({ page, setPage, totalPages }: PaginationProps) {

  return (
    <ReactPaginateModule
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}

export default Pagination;