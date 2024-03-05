export const getRangeBetween = (start: number, end: number): number[] => {
    const realStart = Math.min(start, end);
    const length = Math.abs(start - end) + 1;
    return Array.from({ length }, (_, i) => i + realStart);
  };
  
  export const updateArray = (
    theArray: number[],
    updates: number[],
    add: boolean
  ) => {
    if (add) {
      return [...theArray, ...updates].filter(
        (num, i, og) => og.indexOf(num) === i
      );
    }
    return theArray.filter((i) => !updates.includes(i));
  };