<template>
    <div class="d-flex flex-column align-center justify-center h-screen">
        <InputCard>
            <h2 class="pb-4">Create Account</h2>
            <v-form ref="accountForm" class="my-4" @submit.prevent>
                <v-text-field
                    v-model="newAccountForm.firstName"
                    variant="outlined"
                    density="compact"
                    label="First Name"
                    :rules="[
                        (v) => isStringValid(v) || 'First Name is required',
                    ]"
                    required
                />
                <v-text-field
                    v-model="newAccountForm.lastName"
                    variant="outlined"
                    density="compact"
                    label="Last Name"
                    required
                />
                <v-text-field
                    v-model="newAccountForm.email"
                    variant="outlined"
                    density="compact"
                    label="Email"
                    :rules="[(v) => isEmailValid(v) || 'Email is required']"
                    required
                >
                </v-text-field>
                <v-text-field
                    v-model="confirmEmail"
                    variant="outlined"
                    density="compact"
                    label="confirm Email"
                    :rules="[isEmailConfirmed || 'Email mismatch']"
                    required
                >
                </v-text-field>
                <v-text-field
                    v-model="newAccountForm.password"
                    variant="outlined"
                    density="compact"
                    label="Password"
                    hint="Password must be at least 8 characters long"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :rules="[
                        (v) =>
                            isPasswordLongEnough(v) ||
                            'Password must be at least 8 characters long',
                    ]"
                    :append-inner-icon="
                        isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    required
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                >
                </v-text-field>
                <v-text-field
                    v-model="confirmPassword"
                    variant="outlined"
                    density="compact"
                    label="Confirm Password"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :rules="[isPasswordConfirmed || 'Password mismatch']"
                    :append-inner-icon="
                        isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    required
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                >
                </v-text-field>
            </v-form>
            <template #actions>
                <v-btn
                    variant="tonal"
                    color="primary"
                    @click="handleCreateAccount"
                >
                    Create Account
                </v-btn>
            </template>
        </InputCard>
        <p class="ma-2">
            Already have an account ? Go to
            <router-link to="/">Login</router-link>
        </p>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import Api from '../lib/Api'
import InputCard from '../components/InputCard.vue'
import {
    isEmailValid,
    isPasswordLongEnough,
    isStringValid,
} from '../lib/Validators'
import type { AccountCreate } from '../types/Account'
import type { VForm } from 'vuetify/components'

const newAccountForm = reactive<AccountCreate>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
})
const isPasswordVisible = ref(false)
const confirmEmail = ref<string>('')
const confirmPassword = ref<string>('')
const accountForm = ref<VForm>()
const isEmailConfirmed = computed(() => {
    return newAccountForm.email === confirmEmail.value
})
const isPasswordConfirmed = computed(() => {
    return newAccountForm.password === confirmPassword.value
})
const handleCreateAccount = async () => {
    const formValidation = await accountForm.value?.validate()
    if (!formValidation?.valid) return
    try {
        const response = await Api.post('/users', newAccountForm)
        console.log(response.data)
    } catch (error) {
        console.error('Error creating account:', error)
    }
}
</script>
