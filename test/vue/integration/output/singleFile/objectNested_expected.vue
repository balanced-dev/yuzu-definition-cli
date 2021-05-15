<script>
export default {
    props: {},
}
</script>
<template>
    <div class="object-nested">
        <div class="object-nested__parent-object">
            <div class="object-nested__parent-object__child-object">
                <div
                    class="object-nested__parent-object__child-object__example-string"
                    v-if="parentObject.childObject.exampleString"
                >
                    {{ parentObject.childObject.exampleString }}
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.object-nested {
    $this: ".object-nested";

    &__parent-object {
        &__child-object {
            &__example-string {
            }
        }
    }
}
</style>
