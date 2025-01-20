const postsArray = [
  { id: 2, title: 'Post 2', content: 'Content 2' },
  { id: 1, title: 'Post 1', content: 'Content 1' },
  { id: 3, title: 'Post 3', content: 'Content 3' },
];

class Posts {
  static getAll(req, res) {
    res.json(postsArray);
  }
  static addPost(req, res) {
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).json({ error: 'Title and content are required' });
      return;
    }
    let id = 0;
    for (const p of postsArray) {
      id = id > p.id ? id : p.id;
    }
    id++;
    const newPost = { id, title, content };
    postsArray.push(newPost);
    res.json(postsArray);
  }
  static getAllSorted(req, res) {
    const sorted = JSON.parse(JSON.stringify(postsArray));
    res.json(sorted.sort((a, b) => b.id - a.id));
  }
  static deletePost(req, res) {
    const { id } = req.params;
    const postIndex = postsArray.findIndex((p) => p.id == id);
    if (postIndex === -1) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    postsArray.splice(postIndex, 1);
    res.json(postsArray);
  }
  static updatePost(req, res) {
    const { id } = req.params;
    const postIndex = postsArray.findIndex((p) => p.id == id);
    if (postIndex === -1) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    postsArray[postIndex].title = req.body.title
      ? req.body.title
      : postsArray[postIndex].title;
    postsArray[postIndex].content = req.body.content
      ? req.body.content
      : postsArray[postIndex].content;
    res.json(postsArray);
  }
  static searchPost(req, res) {
    const { id } = req.params;
    const postIndex = postsArray.findIndex((p) => p.id == id);
    if (postIndex === -1) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.json(postsArray[postIndex]);
  }
}

export default Posts;
