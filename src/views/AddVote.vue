<!-- src/views/EditPost.vue -->
<template>
    <div class="container">
      <h3>Vote</h3>
      <form @submit.prevent="updatePost">
        <select v-model="gender">
            <option value="" disabled>Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </select>
        
        <button type="submit">Save</button>
      </form>
    </div>
  </template>
  
  <script>
  import { db } from "@/firebase/firebaseConfig";
  import { doc, getDoc, updateDoc } from "firebase/firestore";
  
  export default {
    data() {
      return {
        formData: {
          vote:"",
        }
      };
    },
    async created() {
      const postId = this.$route.params.id;
      const postDoc = await getDoc(doc(db, "entries", postId));
      if (postDoc.exists()) {
        this.formData = { ...postDoc.data() };
      } else {
        console.error("Post not found");
      }
    },
    methods: {
      async updatePost() {
        const postId = this.$route.params.id;
        try {
          await updateDoc(doc(db, "entries", postId), this.formData);
          this.$router.push("/dashboard"); // Redirect to dashboard after update
        } catch (error) {
          console.error("Error updating post:", error.message);
        }
      }
    }
  };
  </script>
  
  <style>
  /* Styling for edit form */
  </style>
  