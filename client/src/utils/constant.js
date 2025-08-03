export const baseuri = "http://localhost:3050";
export const GetAllBlogsUri = `${baseuri}/api/v1/blog`;
export const GetPrimaryMenuUri = `${baseuri}/api/v1/blog/category?limit=5`;
export const GetPostsBySubCatUri = `${baseuri}/api/v1/blog/subcat`;

export const GetPostDetailBySlugUri = `${baseuri}/api/v1/blog/slug`;
export const GetCommentsBySlugUri = `${baseuri}/api/v1/blog/comment/post`;
export const AddCommentUri = `${baseuri}/api/v1/blog/comment`;

export const GetPostsWithCatUri = `${baseuri}/api/v1/blog/category-posts`;