type Post = {
  id: string;
  author: {
    avatar: string;
    username: string;
  };
  image: string;
  likes: {
    total: number;
    by_me: boolean;
  };
  caption: string;
  comments: {
    initial: string[];
    total: number;
  };
  published_at: string;
  saved: boolean;
};
