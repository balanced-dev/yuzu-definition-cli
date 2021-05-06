<script>
export default {
    props: {
        mixedDataStructures: Array,
        forms: Array,
    },
}
</script>
<template>
    <div class="array-refs">
        <div
            class="array-refs__mixed-data-structures"
            v-if="mixedDataStructures && mixedDataStructures.length"
        >
            <div
                class="array-refs__mixed-data-structures__mixed-data-structure"
                v-for="(mixedDataStructure, index) in mixedDataStructures"
                :key="index"
            >
                <component
                    :is="mixedDataStructure._ref.replace('/par', '')"
                    :key="index"
                    v-bind="mixedDataStructure"
                ></component>
            </div>
        </div>
        <div class="array-refs__forms" v-if="forms && forms.length">
            <div
                class="array-refs__forms__form"
                v-for="(form, index) in forms"
                :key="index"
            >
                <div
                    class="array-refs__forms__form__data-form"
                    v-if="form.dataForm"
                >
                    {{ form.dataForm }}
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.array-refs {
    $this: ".array-refs";

    &__mixed-data-structures {
        &__mixed-data-structure {
        }
    }
    &__forms {
        &__form {
            &__data-form {
            }
        }
    }
}
</style>
