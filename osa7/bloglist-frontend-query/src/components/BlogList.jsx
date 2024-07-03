import Blog from "./Blog";
import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs";

const BlogList = ({ user }) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log("error", error);
    return <div>blog service not available due to problems in server</div>;
  }

  const blogs = data;

  return (
    <>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </>
  );
};

export default BlogList;
