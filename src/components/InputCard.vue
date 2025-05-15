<template>
    <v-card
        variant="outlined"
        class="w-50 my-4 py-4 px-8 elevation-4 bg-white border-0"
        min-width="600"
        max-width="600"
    >
        <slot> </slot>

        <div class="btn-aligner d-flex justify-end my-2">
            <slot name="actions"></slot>
        </div>
    </v-card>
</template>
