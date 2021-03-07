<script>
export default {
    props: {
        title: String,
        internalLinks: Array,
        externalLinks: Array,
    },
}
</script>
<template>
    <div class="page-nav">
        <div class="page-nav__title" v-if="title">
            {{ title }}
        </div>
        <div
            class="page-nav__internal-links"
            v-if="internalLinks && internalLinks.length"
        >
            <a
                v-for="(internalLink, index) in internalLinks"
                :key="index"
                v-if="internalLink.href && internalLink.label"
                class="page-nav__internal-links__internal-link"
                :href="internalLink.href"
                :title="internalLink.title"
                :target="internalLink.isNewTab ? '_blank' : false"
                :rel="
                    internalLink.isExternalLink ? 'noopener noreferrer' : false
                "
            >
                {{ internalLink.label }}
            </a>
        </div>
        <div
            class="page-nav__external-links"
            v-if="externalLinks && externalLinks.length"
        >
            <a
                v-for="(externalLink, index) in externalLinks"
                :key="index"
                v-if="externalLink.href && externalLink.label"
                class="page-nav__external-links__external-link"
                :href="externalLink.href"
                :title="externalLink.title"
                :target="externalLink.isNewTab ? '_blank' : false"
                :rel="
                    externalLink.isExternalLink ? 'noopener noreferrer' : false
                "
            >
                {{ externalLink.label }}
            </a>
        </div>
    </div>
</template>
<style lang="scss">
.page-nav {
    &__title {
    }
    &__internal-links {
        &__internal-link {
        }
    }
    &__external-links {
        &__external-link {
        }
    }
}
</style>
