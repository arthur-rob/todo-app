<template>
    <div class="login-wrapper">
        <h2>Login</h2>
        <v-form @submit.prevent="handleLogin">
            <v-text-field v-model="email" label="Email" required></v-text-field>
            <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
            ></v-text-field>
            <v-btn @click="handleLogin">Login</v-btn>
        </v-form>
        <p>
            Don't have an account?
            <router-link to="/create-account">Create one</router-link>
        </p>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleLogin = () => {
    // Handle login logic here
    console.log('Logging in with', email.value, password.value)
}
</script>
