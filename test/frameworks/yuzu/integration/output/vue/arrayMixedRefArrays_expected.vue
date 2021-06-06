<script>
export default {
    props: {
        blocks: Array,
    },
}
</script>
<template>
    <div class="array-mixed-ref-arrays">
        <div
            class="array-mixed-ref-arrays__blocks"
            v-if="blocks && blocks.length"
        >
            <div
                class="array-mixed-ref-arrays__blocks__block"
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
    </div>
</template>
<style lang="scss">
.array-mixed-ref-arrays {
    $this: ".array-mixed-ref-arrays";

    &__blocks {
        &__block {
        }
    }
}
</style>
