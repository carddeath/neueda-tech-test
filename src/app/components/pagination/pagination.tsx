"use client";

import styles from "./pagination.module.css";

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (pageNumber: number) => void;
};

export default function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className={styles.wrapper}>
      <p className={styles.pages}>
        Page {currentPage} of {totalPages}
      </p>
      <button
        className={styles.buttonWrapper}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      <button
        className={styles.buttonWrapper}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
