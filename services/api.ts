
import { ApiResponse, Category, MovieDetail } from '../types.ts';

const BASE_URL = 'https://zeldvorik.ru/apiv3/api.php';

export const fetchContent = async (action: Category | string, page: number = 1): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${BASE_URL}?action=${action}&page=${page}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return { success: false, items: [], page: 1, hasMore: false };
  }
};

export const searchContent = async (query: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${BASE_URL}?action=search&q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Search failed');
    return await response.json();
  } catch (error) {
    console.error('Search error:', error);
    return { success: false, items: [], page: 1, hasMore: false };
  }
};

export const getDetail = async (detailPath: string): Promise<{ success: boolean; data?: MovieDetail }> => {
  try {
    const response = await fetch(`${BASE_URL}?action=detail&detailPath=${encodeURIComponent(detailPath)}`);
    if (!response.ok) throw new Error('Detail fetch failed');
    const result = await response.json();
    return { success: true, data: result.data };
  } catch (error) {
    console.error('Detail error:', error);
    return { success: false };
  }
};
