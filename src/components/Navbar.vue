<!-- src/components/Navbar.vue -->
<template>
    <nav class="navbar">
      <div class="nav-links">
        <router-link :to="isAuthenticated ? '/dashboard' : '/'" class="nav-link">
          {{ isAuthenticated ? 'Dashboard' : 'Home' }}
        </router-link>
        <router-link v-if="isAuthenticated" to="/profile" class="nav-link">My Profile</router-link>
        <router-link v-if="!isAuthenticated" to="/login" class="nav-link">Login</router-link>
        <router-link v-if="!isAuthenticated" to="/signup" class="nav-link">Signup</router-link>
        <button v-if="isAuthenticated" @click="logoutUser" class="logout-button">Logout</button>
      </div>
    </nav>
  </template>
  
  <script>
  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
  
  export default {
    name: "Navbar",
    data() {
      return {
        isAuthenticated: false
      };
    },
    created() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        this.isAuthenticated = !!user;
      });
    },
    methods: {
      async logoutUser() {
        const auth = getAuth();
        await signOut(auth);
        this.$router.push("/"); // Redirect to home after logout
      }
    }
  };
  </script>
  
  <style>
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #2575fc;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-links {
  display: flex;
  gap: 15px; /* Add more space between each button */
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.logout-button {
  background-color: #ff4d4d;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #ff3333;
}
</style>

  