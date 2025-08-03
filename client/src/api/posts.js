import axios from "axios";
import {
  GetPostDetailBySlugUri,
  GetPostsBySubCatUri,
  AddCommentUri,
  GetCommentsBySlugUri,
  GetAllBlogsUri,
  GetPostsWithCatUri,
} from "../utils/constant";

export const GetPostsBySubCat = async (slug, currentPage = 1) => {
  try {
    const response = await axios.get(
      `${GetPostsBySubCatUri}/${slug}?page=${currentPage}`
    );
    return response?.data;
  } catch (e) {
    return [];
  }
};
export const GetPostsWithCat = async (slug, currentPage = 1) => {
  try {
    const response = await axios.get(
      `${GetPostsWithCatUri}`
    );
    return response?.data;
  } catch (e) {
    return [];
  }
};

export const GetPostDetailBySlug = async (slug) => {
  try {
    const response = await axios.get(`${GetPostDetailBySlugUri}/${slug}`);
    return response?.data;
  } catch (e) {
    return [];
  }
};

export const AddComment = async (data) => {
  try {
    const response = await axios.post(`${AddCommentUri}`, data);
    return response?.data;
  } catch (e) {
    return [];
  }
};

export const GetPostCommentsBySlug = async (slug) => {
  try {
    const response = await axios.get(`${GetCommentsBySlugUri}/${slug}`);
    return response?.data;
  } catch (e) {
    return [];
  }
};


export const getPostsByLabel = async ({label="latest", limit=10}) => {
  try {
    const response = await axios.get(
      `${GetAllBlogsUri}?label=${label}&limit=${limit}`
    );
    return response?.data;
  } catch (e) {
    return [];
  }
}