
<template>
    <div class="dashboard-container">
      <h2>Dashboard</h2>
      <button @click="$router.push('/post-form')" class="create-button">Create New Vote</button>
  
      <div v-if="posts.length" class="posts-container">
        <h3>All Votes Available</h3>
        <div
          v-for="post in posts"
          :key="post.id"
          class="post-card"
          @click="$router.push({ name: 'PostDetails', params: { id: post.id } })"
        >
          <h4>{{ post.title }}</h4>
          <p>{{ post.description }}</p>
          <p><strong>Published by:</strong> {{ post.publisher }}</p>
  
          <!-- Edit/Delete only if current user's email matches post.publisher -->
          <div v-if="post.publisher === userEmail" class="post-actions">
            <button @click.stop="editPost(post.id)" class="edit-button">Edit</button>
            <button @click.stop="deletePost(post.id)" class="delete-button">Delete</button>
           
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { db } from "@/firebase/firebaseConfig";
  import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  
  export default {
    data() {
      return {
        posts: [],
        userEmail: null // Store the logged-in user's email
      };
    },
    async mounted() {
      // Fetch the current user's email
      const auth = getAuth();
      this.userEmail = auth.currentUser ? auth.currentUser.email : null;
  
      // Fetch posts
      await this.fetchPosts();
    },
    methods: {
      async fetchPosts() {
        const querySnapshot = await getDocs(collection(db, "entries"));
        this.posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
      },
      editPost(postId) {
        // Navigate to an edit page with the post ID as a parameter
        this.$router.push({ name: "EditPost", params: { id: postId } });
      },
      addVote(postId){
        this.$router.push({ name: "AddVote", params: { id: postId } });

      },
      async deletePost(postId) {
        try {
          await deleteDoc(doc(db, "entries", postId));
          this.fetchPosts(); // Refresh posts after deletion
        } catch (error) {
          console.error("Error deleting post:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .create-button {
    background-color: #2575fc;
    color: white;
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 15px 0;
    transition: background-color 0.3s;
  }
  
  .create-button:hover {
    background-color: #0057e7;
  }
  
  .posts-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
  }
  
  .post-card {
    padding: 15px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: box-shadow 0.3s;
    position: relative;
  }
  
  .post-card:hover {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  .post-actions {
    margin-top: 10px;
  }
  
  .edit-button, .delete-button {
    margin-right: 5px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
  }
  
  .edit-button {
    background-color: #4caf50;
    color: white;
  }
  
  .delete-button {
    background-color: #f44336;
    color: white;
  }
  
  .edit-button:hover {
    background-color: #43a047;
  }
  
  .delete-button:hover {
    background-color: #e53935;
  }
  </style>
  