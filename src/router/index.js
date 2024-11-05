// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth"; // Import Firebase authentication
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Dashboard from "../views/Dashboard.vue";
import PostForm from "../views/PostForm.vue";
import PostDetails from "../views/PostDetails.vue";
import EditPost from "../views/EditPost.vue";
import Profile from "../views/Profile.vue";
import AddVote from "../views/AddVote.vue";


const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/signup", name: "Signup", component: Signup },
  { path: "/dashboard", name: "Dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/post-form", name: "PostForm", component: PostForm, meta: { requiresAuth: true } },
  { path: "/post/:id", name: "PostDetails", component: PostDetails, meta: { requiresAuth: true } },
  { path: "/edit-post/:id", name: "EditPost", component: EditPost, meta: { requiresAuth: true } },
  { path: "/vote/:id", name: "AddVote", component: AddVote, meta: { requiresAuth: true } },
  { path: "/profile", name: "Profile", component: Profile, meta: { requiresAuth: true } },

  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true } // Set meta field for route guard
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Route guard to check authentication status
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = getAuth().currentUser;

  if (requiresAuth && !isAuthenticated) {
    next("/login"); // Redirect to login if not authenticated
  } else {
    next(); // Proceed if authenticated or if the route doesn’t require authentication
  }
});

export default router;
