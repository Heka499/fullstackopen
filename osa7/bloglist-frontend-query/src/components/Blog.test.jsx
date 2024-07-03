import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders content", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Test Author",
    url: "https://www.example.com",
    likes: 5,
    user: {
      name: "Test User",
      username: "testuser",
    },
  };

  render(<Blog blog={blog} />);

  screen.debug();

  const element = screen.getByText(
    "Component testing is done with react-testing-library by Test Author",
  );
  expect(element).toBeDefined();
});

test("clicking the button shows more info", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Test Author",
    url: "https://www.example.com",
    likes: 5,
    user: {
      name: "Test User",
      username: "testuser",
    },
  };

  const testUser = {
    name: "Test User",
    username: "testuser",
  };

  render(<Blog blog={blog} user={testUser} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const author = screen.getByText("Author: Test Author");
  expect(author).toBeDefined();

  const url = screen.getByText("Link: https://www.example.com");
  expect(url).toBeDefined();

  const likes = screen.getByText("Likes: 5");
  expect(likes).toBeDefined();

  const addedBy = screen.getByText("Added by: Test User");
  expect(addedBy).toBeDefined();
});

test("clicking the like button twice calls the event handler twice", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Test Author",
    url: "https://www.example.com",
    likes: 5,
    user: {
      name: "Test User",
      username: "testuser",
    },
  };

  const testUser = {
    name: "Test User",
    username: "testuser",
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} user={testUser} like={mockHandler} />);

  const user = userEvent.setup();
  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const likeButton = screen.getByText("Like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
