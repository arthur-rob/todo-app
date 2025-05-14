<template>
    <div class="create-account-wrapper">
        <h2>Create Account</h2>
        <v-form>
            <v-text-field
                v-model="newAccountForm.firstName"
                label="First Name"
                required
            />
            <v-text-field
                v-model="newAccountForm.lastName"
                label="Last Name"
                required
            />
            <v-text-field
                v-model="newAccountForm.email"
                label="Email"
                required
            ></v-text-field>
            <v-text-field
                v-model="confirmEmail"
                label="confirm Email"
                required
            ></v-text-field>
            <v-text-field
                v-model="newAccountForm.password"
                label="Password"
                type="password"
                required
            ></v-text-field>
            <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                type="password"
                required
            ></v-text-field>
            <v-btn
                @click="handleCreateAccount"
                :disabled="!isEmailConfirmed || !isPasswordConfirmed"
                >Create Account</v-btn
            >
        </v-form>
        <p>
            Already have an account ? Go to
            <router-link to="/">Login</router-link>
        </p>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import Api from '../lib/Api'
import type { AccountCreate } from '../types/Account'

const newAccountForm = reactive<AccountCreate>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
})

const confirmEmail = ref<string>('')
const confirmPassword = ref<string>('')

const isEmailConfirmed = computed(() => {
    return newAccountForm.email === confirmEmail.value
})
const isPasswordConfirmed = computed(() => {
    return newAccountForm.password === confirmPassword.value
})
const handleCreateAccount = () => {
    // Handle create account logic here
    if (newAccountForm.email !== confirmEmail.value) {
        alert('Emails do not match')
        return
    }
    if (newAccountForm.password !== confirmPassword.value) {
        alert('Passwords do not match')
        return
    }
    Api.post('/users', newAccountForm)
        .then((response) => {
            console.log('Account created successfully', response)
            // Redirect to login or home page
        })
        .catch((error) => {
            console.error('Error creating account', error)
            alert('Error creating account')
        })
}
</script>
