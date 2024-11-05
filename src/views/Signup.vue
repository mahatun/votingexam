<!-- src/views/Signup.vue -->
<template>
  <div class="container">
    <h2>Signup</h2>
    <form @submit.prevent="signupUser">
      <input v-model="name" type="text" placeholder="Name" />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <select v-model="gender">
        <option value="" disabled>Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <textarea v-model="bio" placeholder="Bio"></textarea>
      <input v-model="dob" type="date" placeholder="Date of Birth" />
      <button type="submit">Signup</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { auth, db } from "@/firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      gender: "",
      bio: "",
      dob: "",
      errorMessage: ""
    };
  },
  methods: {
  async signupUser() {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        name: this.name || null,
        email: this.email,
        gender: this.gender || null,
        bio: this.bio || null,
        dob: this.dob || null
      });
      this.$router.push("/dashboard"); // Redirect to dashboard without alert
    } catch (error) {
      this.errorMessage = error.message;
    }
  }
}


};
</script>
