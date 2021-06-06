<script>
export default {
    props: {
        parentObject: Object,
    },
}
</script>
<template>
    <div class="object">
        <div class="object__parent-object">
            <div
                class="object__parent-object__example-integer"
                v-if="parentObject.exampleInteger"
            >
                {{ parentObject.exampleInteger }}
            </div>
            <div
                class="object__parent-object__example-string"
                v-if="parentObject.exampleString"
            >
                {{ parentObject.exampleString }}
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.object {
    $this: ".object";

    &__parent-object {
        &__example-integer {
        }
        &__example-string {
        }
    }
}
</style>
