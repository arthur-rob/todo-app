<template>
    <div
        class="login-wrapper d-flex flex-column align-center justify-center h-screen"
    >
        <InputCard>
            <h2 class="pb-4">Login</h2>
            <v-form ref="loginForm" class="my-4" @submit.prevent>
                <v-text-field
                    v-model="email"
                    variant="outlined"
                    density="compact"
                    label="Email"
                    :rules="[(v) => isStringValid(v) || 'Email is required']"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    variant="outlined"
                    density="compact"
                    label="Password"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="
                        isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :rules="[(v) => isStringValid(v) || 'Password is required']"
                    required
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                ></v-text-field>
            </v-form>
            <template #actions>
                <v-btn
                    variant="tonal"
                    color="primary"
                    :loading="isLoading"
                    @click="handleLogin"
                >
                    Login
                </v-btn>
            </template>
        </InputCard>
        <p>
            Don't have an account?
            <router-link to="/create-account">Create one</router-link>
        </p>
    </div>
</template>
<script setup lang="ts">
import Api from '../lib/Api'
import { ref } from 'vue'
import InputCard from '../components/InputCard.vue'
import { isStringValid } from '../lib/Validators'
import type { VForm } from 'vuetify/components'
import { useIndexStore } from '../store'
const indexStore = useIndexStore()
const isPasswordVisible = ref(false)
const isLoading = ref(false)
const loginForm = ref<VForm>()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
    const formValidation = await loginForm.value?.validate()
    if (!formValidation?.valid) return
    isLoading.value = true
    const loginData = {
        email: email.value,
        password: password.value,
    }
    try {
        const response = await Api.post('/login', loginData)
        if (response.status === 200) {
            console.log('Login successful:', response.data)
            // Redirect to the dashboard or home page
        }
    } catch {
        indexStore.snackbarConfig = {
            display: true,
            message: 'Login failed. Please check your credentials.',
            type: 'error',
        }
    } finally {
        isLoading.value = false
    }
}
</script>
