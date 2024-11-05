<!-- src/views/Login.vue -->
<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Log In</h2>
      <form @submit.prevent="loginUser" class="login-form">
        <input v-model="email" type="email" placeholder="Email" required class="input-field" />
        <input v-model="password" type="password" placeholder="Password" required class="input-field" />
        <button type="submit" class="login-button">Login</button>
      </form>
      <div class="login-footer">
        <p>Log in via</p>
        <div class="social-icons">
          <!-- Placeholder icons; replace with actual icons if needed -->
          <i class="fab fa-facebook-f"></i>
          <i class="fab fa-google"></i>
          <i class="fab fa-twitter"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "@/firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    async loginUser() {
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push("/dashboard");
      } catch (error) {
        this.errorMessage = error.message;
      }
    }
  }
};
</script>

<style scoped>
/* Outer container for the login page */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
}

/* Card container for login form */
.login-card {
  background-color: #fff;
  padding: 2rem;
  width: 350px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  position: relative;
}

/* Form title */
.login-card h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

/* Form styling */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Input fields */
.input-field {
  padding: 0.8rem;
  border: none;
  border-radius: 25px;
  background-color: #f2f2f2;
  font-size: 1rem;
  color: #333;
  text-align: center;
  outline: none;
  transition: background-color 0.3s;
}

.input-field:focus {
  background-color: #e0e0e0;
}

/* Login button */
.login-button {
  padding: 0.8rem;
  border: none;
  border-radius: 25px;
  background-color: #6a11cb;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #2575fc;
}

/* Footer section for social icons */
.login-footer {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #666;
}

/* Social icons styling */
.social-icons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.social-icons i {
  font-size: 1.2rem;
  color: #6a11cb;
  cursor: pointer;
  transition: color 0.3s;
}

.social-icons i:hover {
  color: #2575fc;
}
</style>
