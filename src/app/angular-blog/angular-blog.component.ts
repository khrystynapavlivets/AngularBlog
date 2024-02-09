import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularBlogService } from '../shared/services/angular-blog.service';
import { UserInterface } from '../shared/interfaces/user.interface';
import { BlogInterface } from '../shared/interfaces/blog.interface';

@Component({
  selector: 'app-angular-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './angular-blog.component.html',
  styleUrl: './angular-blog.component.scss'
})
export class AngularBlogComponent {
  public users!: UserInterface[];
  public posts!: BlogInterface[];
  public username!: string;
  public email!: string;
  public password!: string;
  public isUserAdmin: boolean = false;
  public isChangeBtn: boolean = false;
  public isClosed: boolean = false;
  public title!: string;
  public text!: string;
  public selectedPostId!: number;
  public editStatus = false;
  public isEditPost = false;

  usernameRegExp: RegExp = /^\w{4,16}$/i;
  emailRegExp: RegExp = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{1,5}/;
  passwordRegExp: RegExp = /^[a-z|0-9|\.|_|-]{4,16}$/i;

  constructor(private blogService: AngularBlogService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getPosts();

  }

  getUsers(): void {
    this.users = this.blogService.getUsers();
  }

  getPosts(): void {
    this.posts = this.blogService.getPosts();
  }

  private userExists(newUser: UserInterface): boolean {
    return this.users.some(user => user.email === newUser.email || user.username === newUser.username);
  }


  submitUser(): void {
    const foundUser = this.users.find((user) => user.email === this.email && user.password === this.password);
    if (foundUser) {
      this.username = foundUser.username;
      this.isChangeBtn = true;
      this.isUserAdmin = true;
    } else {
      this.isUserAdmin = false;
      alert('User not found.');
      this.isChangeBtn = false;
      this.resetForm();
    }
  }

  submitNewUser(): void {
    if (this.email.match(this.emailRegExp) && this.password.match(this.passwordRegExp) && this.username.match(this.usernameRegExp)) {
      const newUser: UserInterface = {
        id: this.users.length + 1,
        username: this.username,
        email: this.email,
        password: this.password
      };

      if (!this.userExists(newUser)) {
        this.username = newUser.username;
        this.isChangeBtn = true;
        this.isUserAdmin = true;
        this.blogService.addUsers(newUser);
        console.log(this.users);
      } else {
        alert("User with the same email or username already exists.");
        this.isUserAdmin = false;
        this.isChangeBtn = false;
      }
      this.resetForm();
    }
    else {
      alert("Invalid input. Please check your email, password, and username.");
    }

  }

  signOut(): void {
    this.isUserAdmin = true;
    this.isChangeBtn = false;
    this.resetForm();
    this.username = ''

  }

  submitPost(): void {
    if (this.title && this.text) {
      const newPost: BlogInterface = {
        id: 1,
        topic: this.title,
        postedBy: this.username,
        message: this.text,
        date: new Date()
      };
      if (this.posts.length > 0) {
        const id = this.posts.slice(-1)[0].id;
        newPost.id = id + 1
      }
      this.blogService.addPosts(newPost);
      console.log(this.posts);
    } else {
      alert("Title and text cannot be empty.");
    }
    this.resetForm();
  }

  editPost(post: BlogInterface): void {
    this.title = post.topic;
    this.text = post.message;
    this.editStatus = true;
    this.selectedPostId = post.id;
    this.isEditPost = true;
  }

  savePost(): void {
    const updatePost = {
      id: this.selectedPostId,
      topic: this.title,
      postedBy: this.username,
      message: this.text,
      date: new Date()
    };
    this.isEditPost = false;
    this.blogService.updatePost(updatePost, this.selectedPostId);
    this.resetForm();
    this.editStatus = false;
  }

  deletePost(post: BlogInterface): void {
    const existingPost = this.posts.find(p => p.id === post.id);

    if (existingPost && ((existingPost.postedBy === this.username) || (this.isUserAdmin))) {
      this.blogService.deletePost(post.id);
      console.log(this.posts);
    } else {
      console.log("You don't have permission to delete this post.");
    }
  }

  currentUserIsAuthorOrAdmin(post: BlogInterface): boolean {
    return this.isEditPost || (this.username === post.postedBy) || (this.username === 'admin');
  }
  private resetForm(): void {
    this.email = '';
    this.password = '';
    this.title = '';
    this.text = '';
  }
}



