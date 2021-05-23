<script>
export default {
    props: {},
}
</script>
<template>
    <div class="data-structures-ref-array">
        <div
            class="data-structures-ref-array__blocks"
            v-if="blocks && blocks.length"
        >
            <div
                class="data-structures-ref-array__blocks__block"
                v-for="(block, index) in blocks"
                :key="index"
            >
                <component
                    :is="block._ref.replace('/par', '')"
                    :key="index"
                    v-bind="block"
                ></component>
            </div>
        </div>
        <div
            class="data-structures-ref-array__people"
            v-if="people && people.length"
        >
            <par-person
                v-for="(person, index) in people"
                :key="index"
                v-bind="person"
            ></par-person>
        </div>
    </div>
</template>
<style lang="scss">
.data-structures-ref-array {
    $this: ".data-structures-ref-array";

    &__blocks {
        &__block {
        }
    }
    &__people {
    }
}
</style>
