<template>
  <div class="container">
    <h2>{{ post.title }}</h2>
    <p><strong>Description:</strong> {{ post.description }}</p>
    <img v-if="post.image" :src="post.image" alt="Post Image" />
    <p><strong>Published by:</strong> {{ post.publisher }}</p>

    <div class="comments-section">
      <h3>Vote:</h3>
      
      <!-- Add vote -->
      <div class="add-vote" v-if="!hasVoted">
        <textarea v-model="newVote" placeholder="Write 'yes' or 'no'"></textarea>
        <button @click="addVote">Submit Vote</button>
      </div>
      <p v-else>You have already voted!</p>

      <h4>Total Votes</h4>
      <p>Yes: {{ voteCount.yes }} | No: {{ voteCount.no }}</p>
    </div>

    <button @click="$router.push('/dashboard')">Back to Dashboard</button>
  </div>
</template>

<script>
import { db, auth } from "@/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default {
  data() {
    return {
      post: {},
      newVote: "",
      hasVoted: false,
      voteCount: {
        yes: 0,
        no: 0,
      },
    };
  },
  async created() {
    await this.fetchPost();
    this.checkIfVoted();
    this.calculateVotes();
  },
  methods: {
    async fetchPost() {
      const postId = this.$route.params.id;
      const postDoc = await getDoc(doc(db, "entries", postId));
      if (postDoc.exists()) {
        this.post = { id: postDoc.id, ...postDoc.data() };
        this.post.votes = this.post.votes || [];
      } else {
        console.error("Post not found");
      }
    },
    async addVote() {
      if (!this.newVote || !["yes", "no"].includes(this.newVote.toLowerCase())) {
        alert("Please enter 'yes' or 'no' as your vote.");
        return;
      }

      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in to vote.");
        return;
      }

      const vote = {
        userId: user.uid,
        vote: this.newVote.toLowerCase(),
      };

      try {
        await updateDoc(doc(db, "entries", this.post.id), {
          votes: [...this.post.votes, vote],
        });
        this.newVote = ""; // Clear vote input
        await this.fetchPost(); // Refresh post data
        this.checkIfVoted();
        this.calculateVotes();
      } catch (error) {
        console.error("Error adding vote:", error.message);
      }
    },
    checkIfVoted() {
      const user = auth.currentUser;
      if (user) {
        this.hasVoted = this.post.votes.some((vote) => vote.userId === user.uid);
      }
    },
    calculateVotes() {
      this.voteCount = this.post.votes.reduce(
        (acc, vote) => {
          if (vote.vote === "yes") acc.yes += 1;
          if (vote.vote === "no") acc.no += 1;
          return acc;
        },
        { yes: 0, no: 0 }
      );
    },
  },
};
</script>




<style scoped>
/* Main container styling */
.post-details-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
}

/* Form styling for adding new comments */
.comment-form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.comment-input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
  resize: vertical;
}

.submit-comment-button {
  align-self: flex-end;
  background-color: #2575fc;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-comment-button:hover {
  background-color: #0057e7;
}

/* Styling for individual comments */
.comment-card {
  background-color: #ffffff;
  padding: 15px;
  margin-top: 15px;
  border-radius: 8px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
}

.comment-author {
  font-weight: bold;
  color: #333;
}

.comment-text {
  margin-top: 5px;
  color: #555;
}

/* Reply button styling */
.reply-button {
  margin-top: 10px;
  background-color: transparent;
  border: none;
  color: #2575fc;
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: underline;
}

/* Styling for replies container */
.replies-container {
  margin-top: 10px;
  padding-left: 20px;
  border-left: 2px solid #ddd;
}

.reply-card {
  background-color: #f9f9f9;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
}

.reply-author {
  font-weight: bold;
  color: #444;
}

.reply-text {
  margin-top: 5px;
  color: #666;
}
</style>
