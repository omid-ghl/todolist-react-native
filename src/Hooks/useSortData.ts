import {Todo} from '@Models';
import {useEffect, useState} from 'react';

export type SortBy = 'creationDate' | 'title';

const useSortData = (data: Todo[], sortBy: SortBy) => {
  const [sortedData, setSortedData] = useState<Todo[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      let sorted: Todo[];

      if (sortBy === 'creationDate') {
        sorted = [...data].sort(
          (a, b) =>
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime(),
        );
      } else {
        sorted = [...data].sort((a, b) => a.title.localeCompare(b.title));
      }

      if (!arraysEqual(sorted, sortedData)) {
        setSortedData(sorted);
      }
    }
  }, [data, sortBy, sortedData]);

  if (!data?.length) {
    return data;
  }

  return sortedData;
};

// Function to check if two arrays are equal
const arraysEqual = (a: any[], b: any[]) => {
  if (a === b) {
    return true;
  }

  if (a == null || b == null) {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
};

export default useSortData;
