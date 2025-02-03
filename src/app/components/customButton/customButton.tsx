"use client";

import styles from "./customButton.module.css";

type CustomButtonProps = {
  onClickEvent: () => void;
  disabled: boolean;
  buttonText: string;
};

export default function CustomButton({
  onClickEvent,
  disabled,
  buttonText,
}: CustomButtonProps) {
  return (
    <button
      className={`${styles.buttonWrapper} ${disabled ? styles.disabledButton : ""}`}
      onClick={onClickEvent}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
}
