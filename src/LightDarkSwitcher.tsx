import { useCallback, useEffect, useRef, useState } from "react";
import { useId } from "react";
import styles from "./LightDarkSwitcher.module.css";

type Theme = "light" | "dark" | "system";

// TODO add unit tests, add storybook
export const LightDarkSwitcher = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      return savedTheme;
    }
    return "system";
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalId = useId();
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const root = document.querySelector(":root") as HTMLElement;
    root.classList.remove("light", "dark", "system");
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (isModalOpen) {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ) as NodeListOf<HTMLElement>;
      const firstElement = focusableElements?.[0];
      const lastElement = focusableElements?.[focusableElements.length - 1];

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Tab") {
          if (event.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement?.focus();
            }
          } else {
            // Tab
            if (document.activeElement === lastElement) {
              event.preventDefault();
              firstElement?.focus();
            }
          }
        }
        if (event.key === "Escape") {
          toggleModal();
        }
      };

      firstElement?.focus();
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isModalOpen, toggleModal]);

  return (
    <>
      <button
        type="button"
        data-testid="light-dark-switcher"
        className={styles["switcher-button"]}
        onClick={toggleModal}
        aria-haspopup="dialog"
        aria-expanded={isModalOpen}
        aria-controls={isModalOpen ? modalId : undefined}
      >
        Settings
      </button>
      {isModalOpen && (
        <div
          id={modalId}
          className={styles["modal-overlay"]}
          role="dialog"
          aria-labelledby={titleId}
          aria-modal="true"
          ref={modalRef}
        >
          <div className={styles["modal-content"]}>
            <form className={styles["theme-form"]}>
              <fieldset className={styles["theme-fieldset"]}>
                <legend>Select a theme:</legend>
                <label>
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    checked={theme === "light"}
                    onChange={() => handleThemeChange("light")}
                  />
                  Light
                </label>
                <label>
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    checked={theme === "dark"}
                    onChange={() => handleThemeChange("dark")}
                  />
                  Dark
                </label>
                <label>
                  <input
                    type="radio"
                    name="theme"
                    value="system"
                    checked={theme === "system"}
                    onChange={() => handleThemeChange("system")}
                  />
                  System
                </label>
              </fieldset>
            </form>
            <button
              type="button"
              className={styles["close-button"]}
              onClick={toggleModal}
              aria-label="Close modal"
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};
