'use client';

import { useQueryState } from 'nuqs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export default function BlogFilter() {
  const [sortOrder, setSortOrder] = useQueryState('sort', {
    history: 'replace',
    defaultValue: 'desc',
  });

  // const sortedPosts = allPosts.sort((a, b) => {
  //   // sort by createdAt: string;
  //   if (sortOrder === 'asc') {
  //     return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  //   } else {
  //     return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  //   }
  // });

  return (
    <Select
      value={sortOrder}
      onValueChange={(value) => {
        setSortOrder(value);
      }}>
      <SelectTrigger className='w-full md:w-45'>
        <SelectValue placeholder='Sort (A-Z)' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          <SelectItem value='asc'>Ascending</SelectItem>
          <SelectItem value='desc'>Descending</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
