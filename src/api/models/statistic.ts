interface PostData {
  _id: string;
  title: string;
  createdAt: string;
}

export interface UserStatistic {
  _id: string;
  name: string;
  surname: string;
  posts: PostData[];
}
