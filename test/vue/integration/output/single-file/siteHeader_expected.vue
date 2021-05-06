<script>
export default {
props: <!-- YUZU PROPS -->
};
</script>
<template>
    <div class="site-header">
        <div
            class="site-header__primary-links"
            v-if="primaryLinks && primaryLinks.length"
        >
            <div
                class="site-header__primary-links__primary-link"
                v-for="(primaryLink, index) in primaryLinks"
                :key="index"
            >
                <a
                    v-if="primaryLink.link.href && primaryLink.link.label"
                    class="site-header__primary-links__primary-link__link"
                    :href="primaryLink.link.href"
                    :title="primaryLink.link.title"
                    :target="primaryLink.link.isNewTab ? '_blank' : false"
                    :rel="
                        primaryLink.link.isExternalLink
                            ? 'noopener noreferrer'
                            : false
                    "
                >
                    {{ primaryLink.link.label }}
                </a>
                <div
                    class="site-header__primary-links__primary-link__mobile-links"
                    v-if="
                        primaryLink.mobileLinks &&
                        primaryLink.mobileLinks.length
                    "
                >
                    <a
                        v-for="(mobileLink, index) in primaryLink.mobileLinks"
                        :key="index"
                        v-if="mobileLink.href && mobileLink.label"
                        class="site-header__primary-links__primary-link__mobile-links__mobile-link"
                        :href="mobileLink.href"
                        :title="mobileLink.title"
                        :target="mobileLink.isNewTab ? '_blank' : false"
                        :rel="
                            mobileLink.isExternalLink
                                ? 'noopener noreferrer'
                                : false
                        "
                    >
                        {{ mobileLink.label }}
                    </a>
                </div>
            </div>
        </div>
        <div
            class="site-header__secondary-links"
            v-if="secondaryLinks && secondaryLinks.length"
        >
            <a
                v-for="(secondaryLink, index) in secondaryLinks"
                :key="index"
                v-if="secondaryLink.href && secondaryLink.label"
                class="site-header__secondary-links__secondary-link"
                :href="secondaryLink.href"
                :title="secondaryLink.title"
                :target="secondaryLink.isNewTab ? '_blank' : false"
                :rel="
                    secondaryLink.isExternalLink ? 'noopener noreferrer' : false
                "
            >
                {{ secondaryLink.label }}
            </a>
        </div>
        <div
            class="site-header__document-links"
            v-if="documentLinks && documentLinks.length"
        >
            <a
                v-for="(documentLink, index) in documentLinks"
                :key="index"
                v-if="documentLink.href && documentLink.label"
                class="site-header__document-links__document-link"
                :href="documentLink.href"
                :title="documentLink.title"
                :target="documentLink.isNewTab ? '_blank' : false"
                :rel="
                    documentLink.isExternalLink ? 'noopener noreferrer' : false
                "
            >
                {{ documentLink.label }}
            </a>
        </div>
        <div
            class="site-header__social-links"
            v-if="socialLinks && socialLinks.length"
        >
            <a
                v-for="(socialLink, index) in socialLinks"
                :key="index"
                v-if="socialLink.href && socialLink.label"
                class="site-header__social-links__social-link"
                :href="socialLink.href"
                :title="socialLink.title"
                :target="socialLink.isNewTab ? '_blank' : false"
                :rel="socialLink.isExternalLink ? 'noopener noreferrer' : false"
            >
                {{ socialLink.label }}
            </a>
        </div>
        <div class="site-header__address">
            <a
                v-if="address.email.href && address.email.label"
                class="site-header__address__email"
                :href="address.email.href"
                :title="address.email.title"
                :target="address.email.isNewTab ? '_blank' : false"
                :rel="
                    address.email.isExternalLink ? 'noopener noreferrer' : false
                "
            >
                {{ address.email.label }}
            </a>
            <a
                v-if="address.telephone.href && address.telephone.label"
                class="site-header__address__telephone"
                :href="address.telephone.href"
                :title="address.telephone.title"
                :target="address.telephone.isNewTab ? '_blank' : false"
                :rel="
                    address.telephone.isExternalLink
                        ? 'noopener noreferrer'
                        : false
                "
            >
                {{ address.telephone.label }}
            </a>
            <div
                class="site-header__address__address-lines"
                v-if="address.addressLines && address.addressLines.length"
            >
                <div
                    class="site-header__address__address-lines__address-line"
                    v-for="(addressLine, index) in address.addressLines"
                    :key="index"
                >
                    <div
                        class="site-header__address__address-lines__address-line__line"
                        v-if="addressLine.line"
                    >
                        {{ addressLine.line }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.site-header {
    &__primary-links {
        &__primary-link {
            &__link {
            }
            &__mobile-links {
                &__mobile-link {
                }
            }
        }
    }
    &__secondary-links {
        &__secondary-link {
        }
    }
    &__document-links {
        &__document-link {
        }
    }
    &__social-links {
        &__social-link {
        }
    }
    &__address {
        &__email {
        }
        &__telephone {
        }
        &__address-lines {
            &__address-line {
                &__line {
                }
            }
        }
    }
}
</style>
