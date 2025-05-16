<template>
    <v-list class="ma-2">
        <v-list-item-title class="text-h6">List</v-list-item-title>
        <v-list-item
            v-for="list in listStore.taskLists"
            :key="list.id"
            :value="list.id"
            @click="listStore.setSelectedList(list.id)"
        >
            <v-list-item-title
                class="d-flex align-center justify-space-between"
            >
                {{ list.name }}
                <v-list-item-action>
                    <v-btn
                        icon
                        density="compact"
                        @click="displayDeleteModal(list)"
                    >
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="listStore.taskLists.length === 0">
            <p class="text-center">No lists available</p>
        </v-list-item>
        <v-list-item-action class="d-flex align-center justify-end">
            <v-text-field
                v-model="listToAdd"
                variant="outlined"
                density="compact"
                label="New List"
                hide-details
                counter
                :maxlength="100"
                required
            />
            <v-btn
                icon
                density="compact"
                color="primary"
                @click="createList(listToAdd)"
                :loading="isLoading"
                :disabled="isLoading"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-list-item-action>
    </v-list>

    <v-divider></v-divider>
    <v-dialog v-model="isDeleteModalOpen" max-width="500" title="Delete Task">
        <v-card>
            <v-card-text>
                <p>Are you sure you want to delete this task?</p>
                <p class="">{{ listToDelete.name }}</p>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="isDeleteModalOpen = false">Cancel</v-btn>
                <v-btn
                    color="error"
                    variant="elevated"
                    :loading="isLoading"
                    @click="deleteList(listToDelete.id)"
                    >Delete</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useListStore } from '../store/list'
import { useIndexStore } from '../store'
import type { List } from '../../types/List'

const listToAdd = ref<string>('')
const isLoading = ref<boolean>(false)
const isDeleteModalOpen = ref<boolean>(false)
const listStore = useListStore()
const listToDelete = ref<List | null>(null)
const indexStore = useIndexStore()

listStore.getMyList()

const displayDeleteModal = (list: List) => {
    listToDelete.value = list
    isDeleteModalOpen.value = true
}

const createList = async () => {
    if (!listToAdd.value) return
    isLoading.value = true
    try {
        await listStore.createList(listToAdd.value)
        indexStore.displaySnackBar('List created successfully')
        listToAdd.value = ''
    } catch (error) {
        console.error('Error creating list:', error)
        indexStore.displaySnackBar('Error creating list', 'error')
    } finally {
        isLoading.value = false
    }
}
const deleteList = async (listId: number) => {
    isLoading.value = true
    try {
        await listStore.deleteList(listId)
        indexStore.displaySnackBar('List deleted successfully')
        isDeleteModalOpen.value = false
    } catch (error) {
        console.error('Error deleting list:', error)
        indexStore.displaySnackBar('Error deleting list', 'error')
    } finally {
        isLoading.value = false
    }
}
</script>
