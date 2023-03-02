import React, { useEffect, useState } from "react";

function useDebouncs(value: number, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<number | undefined>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default useDebouncs;

// export const useLoggerApi = (data, delay) => {
//   const [value, setValue] = useState(data);
//   const [isStuck, setIsStack] = useState(false);

//   useEffect(() => {
//     // if (!delay) return updateErrorLogApi(data);
//     const handler = setTimeout(() => {
//       setIsStack(true);
//       updateErrorLogApi(data);
//     }, delay);
//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);
//   return isStuck;
// };
