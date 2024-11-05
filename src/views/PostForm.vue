<!-- src/views/PostForm.vue -->
<template>
    <div class="container">
      <h3>Create Vote</h3>
      <form @submit.prevent="submitData">
        <input v-model="formData.title" type="text" placeholder="Title" />
        <textarea v-model="formData.description" placeholder="Description"></textarea>
       
        <input v-model="formData.image" type="text" placeholder="Image URL" />
  
        <div v-for="(subtype, index) in formData.subtypes" :key="index" class="subtype-entry">
          <input v-model="subtype.title" type="text" placeholder="Subtype Title" />
          <textarea v-model="subtype.description" placeholder="Subtype Description"></textarea>
          <button type="button" @click="removeSubtype(index)">Remove Subtype</button>
        </div>
        <button type="button" @click="addSubtype">Add Subtype</button>
    
        <h5>End Date</h5>
        <input v-model="formData.endDate" type="date" placeholder="End Date" />
  
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
// src/views/PostForm.vue
import { db, auth } from "@/firebase/firebaseConfig"; // Import auth
import { collection, addDoc } from "firebase/firestore";

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
  methods: {
    addSubtype() {
      this.formData.subtypes.push({ title: "", description: "" });
    },
    removeSubtype(index) {
      this.formData.subtypes.splice(index, 1);
    },
    async submitData() {
      const user = auth.currentUser;
      const dataToSave = {
        title: this.formData.title || null,
        description: this.formData.description || null,
        price: this.formData.price || null,
        image: this.formData.image || null,
        subtypes: this.formData.subtypes.map(subtype => ({
          title: subtype.title || null,
          description: subtype.description || null
        })),
        startDate: this.formData.startDate || null,
        endDate: this.formData.endDate || null,
        publisher: user ? user.displayName || user.email : "Anonymous",
        userId: user.uid // Save the user's ID for ownership checks
      };

      try {
        await addDoc(collection(db, "entries"), dataToSave);
        this.$router.push("/dashboard"); // Redirect to dashboard after submission
      } catch (error) {
        console.error("Error submitting data:", error.message);
      }
    }
  }
};

  </script>
  
  <style>
  .container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* Add button and input styling similar to previous setup */
  </style>
  