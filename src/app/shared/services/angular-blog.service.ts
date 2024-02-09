import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';
import { BlogInterface } from '../interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class AngularBlogService {

  private posts: BlogInterface[] = [
    {
      id: 1,
      topic: 'First post',
      postedBy: 'admin',
      message: 'Sing up to create you account and start to use Angular Blog',
      date: new Date(2024, 1, 5, 10, 0)
    }
  ];

  private users: UserInterface[] = [
    {
      id: 1,
      username: `admin`,
      email: 'admin@gmail.com',
      password: 'qwerty'
    }
  ];

  constructor() { }

  getUsers(): Array<UserInterface> {
    return this.users;
  }

  getPosts(): Array<BlogInterface> {
    return this.posts;
  }

  addUsers(user: UserInterface): void {
    this.users.push(user);
  }
  addPosts(blog: BlogInterface): void {
    this.posts.push(blog);
  }
  deletePost(id: number): void {
    const index = this.posts.findIndex(post => post.id === id);
    this.posts.splice(index, 1);
  }
  updatePost(post: BlogInterface, id: number): void {
    const index = this.posts.findIndex(post => post.id === id);
    this.posts.splice(index, 1, post);
  }
}
