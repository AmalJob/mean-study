import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http:HttpClient) { }

  register(data:any){
    return this.http.post<any>('http://localhost:8880/users/register', data);
  }
  login(data:any){
    return this.http.post<any>('http://localhost:8880/users/login', data)
  }

  getPosts(userId:any){
    return this.http.get<any>(`http://localhost:8880/posts/${userId}`,userId)
  }

  addPost(data:any){
    return this.http.post<any>('http://localhost:8880/posts/', data);
  }

  getUserPosts(userId:any){
    return this.http.get<any>(`http://localhost:8880/posts/user/${userId}`,userId)
  }

  getPost(id:any){
    return this.http.get<any>(`http://localhost:8880/posts/post/${id}`)
  }

  editPost(data:any){
    console.log(data.text);
    
    return this.http.put<any>(`http://localhost:8880/posts/${data.postId}`,{text:data.text} );
  }

  deletePost(id:any){
    return this.http.delete<any>(`http://localhost:8880/posts/${id}`)
  }

  blockPost(ids:any){
    console.log("iiii",ids);
    
    return this.http.post<any>(`http://localhost:8880/posts/block/${ids.postId}`,{userId:ids.userId})
  }

  blockUser(ids:any){
    console.log("iiii",ids);
    
    return this.http.post<any>(`http://localhost:8880/users/blockUser/${ids.id}`,{userId:ids.userId})
  }

  userDetails(id:any){
   return this.http.get<any>(`http://localhost:8880/users/user/${id}`)
  }

  editUser(data:any){
    return this.http.patch<any>(`http://localhost:8880/users/${data.id}`,data)
   }

   deactivateUser(id:any){
    return this.http.post<any>(`http://localhost:8880/users/deactivate/${id}`,id)
   }

   activateUser(id:any){
    return this.http.post<any>(`http://localhost:8880/users/activate/${id}`,id)
   }

   imageUpload(data:any){
    return this.http.post<any>('http://localhost:8880/upload',data);
   }
   imageidUpload(data:any){
    return this.http.post<any>(`http://localhost:8880/users/profilePic/${data.id}`,{pic:data.pic})
   }
}

