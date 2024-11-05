<!-- src/views/Profile.vue -->
<template>
    <div class="profile-container">
      <h2>My Profile</h2>
      <div v-if="profileData">
        <p><strong>Email:</strong> {{ profileData.email }}</p>
        <p v-if="profileData.name"><strong>Name:</strong> {{ profileData.name }}</p>
        <p v-if="profileData.gender"><strong>Gender:</strong> {{ profileData.gender }}</p>
        <p v-if="profileData.bio"><strong>Bio:</strong> {{ profileData.bio }}</p>
        <p v-if="profileData.dob"><strong>Date of Birth:</strong> {{ profileData.dob }}</p>
      </div>
      <button @click="$router.push('/dashboard')" class="nav-button">Back to Dashboard</button>
    </div>
  </template>
  
  <script>
  import { db } from "@/firebase/firebaseConfig";
  import { collection, query, where, getDocs } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  
  export default {
    data() {
      return {
        profileData: null
      };
    },
    async created() {
      const auth = getAuth();
      const userEmail = auth.currentUser ? auth.currentUser.email : null;
  
      if (userEmail) {
        try {
          const q = query(collection(db, "users"), where("email", "==", userEmail));
          const querySnapshot = await getDocs(q);
  
          if (!querySnapshot.empty) {
            // Assuming there's only one document per email
            this.profileData = querySnapshot.docs[0].data();
            console.log("Profile Data Retrieved:", this.profileData);
          } else {
            console.error("No profile data found for email:", userEmail);
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .profile-container {
    max-width: 500px;
    margin: auto;
    padding: 20px;
    text-align: center;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .profile-info p {
    font-size: 1.1rem;
    margin: 10px 0;
  }
  
  .nav-button {
    background-color: #2575fc;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 15px;
  }
  
  .nav-button:hover {
    background-color: #0057e7;
  }
  </style>
  