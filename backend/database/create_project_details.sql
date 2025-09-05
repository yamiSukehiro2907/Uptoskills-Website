CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  student_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tech_stack VARCHAR(255) NOT NULL,
  contributions TEXT NOT NULL,
  is_open_source BOOLEAN DEFAULT FALSE,
  github_pr_link TEXT
);
