import queryString from "query-string";

import { API_URL } from "../config";
import { UserDataTypes } from "../hooks/useAuthContext";
import { fetchBase } from "./fetchBase";

interface paramsTypes {
  limit?: number,
  search?: string
}

export interface TagDataTypes {
  name: string,
  slug: string,
  createdAt?: string,
  updatedAt?: string,
}

export interface BlogDataTypes {
  _id: string,
  title: string,
  content: string,
  slug?: string,
  excerpt?: string,
  metaTitle?: string,
  metaDescription?: string,
  tags: TagDataTypes[],
  featuredImage?: File,
  author: UserDataTypes
  contributors?: UserDataTypes[],
  createdAt?: string,
  updatedAt?: string,
}

export const getTags = (params: paramsTypes): Promise<TagDataTypes[]> => {
  const { search } = params;
  let url = `${API_URL}/tag/list`, queryParams;
  if (search) {
    queryParams = queryString.stringify({ search });
    url = `${url}?${queryParams}`;
  }

  return fetchBase(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
}

export const getBlogs = (params: paramsTypes = { limit: 10 }): Promise<{ data: BlogDataTypes[], success: boolean, message?: string }> => {
  const { search } = params;
  let url = `${API_URL}/blog/list`, queryParams;
  if (search) {
    queryParams = queryString.stringify({ search });
    url = `${url}?${queryParams}`;
  }

  return fetchBase(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
}