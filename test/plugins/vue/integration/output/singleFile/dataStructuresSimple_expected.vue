<script>
export default {
    props: {},
}
</script>
<template>
    <div class="data-structures-simple">
        <picture
            v-if="exampleImage.src"
            class="data-structures-simple__example-image"
        >
            <img :src="exampleImage.src" :alt="exampleImage.alt" />
        </picture>
        <a
            v-if="exampleLink.href && exampleLink.label"
            class="data-structures-simple__example-link"
            :href="exampleLink.href"
            :title="exampleLink.title"
            :target="exampleLink.isNewTab ? '_blank' : false"
            :rel="exampleLink.isExternalLink ? 'noopener noreferrer' : false"
        >
            {{ exampleLink.label }}
        </a>
        <!-- Insert exampleForm form here -->
    </div>
</template>
<style lang="scss">
.data-structures-simple {
    $this: ".data-structures-simple";

    &__example-image {
    }
    &__example-link {
    }
}
</style>
