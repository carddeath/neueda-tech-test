"use client";

import CustomButton from "../customButton/customButton";
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
      <CustomButton
        onClickEvent={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        buttonText="Previous"
      />
      <CustomButton
        onClickEvent={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        buttonText="Next"
      />
    </div>
  );
}
