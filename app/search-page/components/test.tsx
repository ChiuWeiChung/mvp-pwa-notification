'use client';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

const SearchComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      query: searchParams.get('query') || '',
      age: searchParams.get('age') || '',
    },
  });

  // 更新 URL 查詢參數（修復：一次更新所有參數，避免重複觸發）
  const updateQueryParams = useCallback(
    (params: Record<string, string>) => {
      const currentParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value) currentParams.set(key, value);
        else currentParams.delete(key);
      });
      router.replace(`${pathname}?${currentParams.toString()}`);
    },
    [searchParams, pathname, router],
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', searchParams.get('query'), searchParams.get('age')],
    queryFn: ({ queryKey }) => {
      const [, q, a] = queryKey;
      console.log('query!', q, a);
      return `${q}+${a}`;
    },
  });

  const onSubmit = (data: { query: string; age: string }) => {
    // console.log('data', data);
    // updateQueryParams('query', data.query);
    // updateQueryParams('age', data.age);
    updateQueryParams({ query: data.query, age: data.age });

    // refetch(); // 只有按下按鈕時觸發查詢
  };

  return (
    <div>
      <h2>Search Example</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('query')} type="text" placeholder="Enter query term" className="border border-gray-300 p-2 rounded" />
        <input {...register('age')} type="text" placeholder="Enter age term" className="border border-gray-300 p-2 rounded" />
        <Button type="submit">Search</Button>
      </form>

      <div className="mt-4">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {(error as Error).message}</p>}
        {data && (
          <div>
            <h3>Results:</h3>
            <ul>{data ?? 'empty'}</ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;