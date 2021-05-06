<script>
export default {
    props: {
        parentObject: Object,
    },
}
</script>
<template>
    <div class="object-single-property">
        <div class="object-single-property__parent-object">
            <div
                class="object-single-property__parent-object__example-integer"
                v-if="parentObject.exampleInteger"
            >
                {{ parentObject.exampleInteger }}
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.object-single-property {
    $this: ".object-single-property";

    &__parent-object {
        &__example-integer {
        }
    }
}
</style>
