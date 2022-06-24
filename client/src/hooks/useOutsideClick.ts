import { useCallback, useEffect } from "react";

export const useOutsideClick = (ref: any, handler: () => void) => {
  const listener = useCallback(
    (event: MouseEvent) => {
      if (!ref?.current || ref.current.contains(event.target)) return;
      handler();
    },
    [handler, ref]
  );

  useEffect(() => {
    window.addEventListener("mousedown", listener);

    return () => window.removeEventListener("mousedown", listener);
  }, [listener]);
};
