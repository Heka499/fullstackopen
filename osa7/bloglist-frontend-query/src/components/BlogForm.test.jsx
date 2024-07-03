import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const user = userEvent.setup();
  const createBlog = vi.fn();

  render(<BlogForm createBlog={createBlog} />);

  const title = screen.getByPlaceholderText("Title");
  const author = screen.getByPlaceholderText("Author");
  const url = screen.getByPlaceholderText("URL");
  const sendButton = screen.getByText("save");

  await user.type(title, "testing a form...");
  await user.type(author, "test author...");
  await user.type(url, "https://www.example.com");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing a form...");
  expect(createBlog.mock.calls[0][0].author).toBe("test author...");
  expect(createBlog.mock.calls[0][0].url).toBe("https://www.example.com");
});
