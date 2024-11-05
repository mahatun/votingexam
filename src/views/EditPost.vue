<!-- src/views/EditPost.vue -->
<template>
    <div class="container">
      <h3>Edit Vote Details</h3>
      <form @submit.prevent="updatePost">
        <input v-model="formData.title" type="text" placeholder="Title" />
        <textarea v-model="formData.description" placeholder="Description"></textarea>
      
        <input v-model="formData.image" type="text" placeholder="Image URL" />
  
        <div v-for="(subtype, index) in formData.subtypes" :key="index" class="subtype-entry">
          <input v-model="subtype.title" type="text" placeholder="Subtype Title" />
          <textarea v-model="subtype.description" placeholder="Subtype Description"></textarea>
        </div>
  
        <input v-model="formData.endDate" type="date" placeholder="End Date" />
  
        <button type="submit">Save Changes</button>
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
          title: "",
          description: "",
          price: null,
          image: "",
          subtypes: [],
          startDate: "",
          endDate: ""
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
  