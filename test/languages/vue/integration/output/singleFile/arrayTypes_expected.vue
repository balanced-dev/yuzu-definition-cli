<script>
export default {
    props: {
        integers: Array,
        numbers: Array,
        strings: Array,
    },
}
</script>
<template>
    <div class="array-types">
        <div class="array-types__integers" v-if="integers && integers.length">
            <div
                class="array-types__integers__integer"
                v-for="(integer, index) in integers"
                :key="index"
            >
                {{ integer }}
            </div>
        </div>
        <div class="array-types__numbers" v-if="numbers && numbers.length">
            <div
                class="array-types__numbers__number"
                v-for="(number, index) in numbers"
                :key="index"
            >
                {{ number }}
            </div>
        </div>
        <div class="array-types__strings" v-if="strings && strings.length">
            <div
                class="array-types__strings__string"
                v-for="(string, index) in strings"
                :key="index"
            >
                {{ string }}
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.array-types {
    $this: ".array-types";

    &__integers {
        &__integer {
        }
    }
    &__numbers {
        &__number {
        }
    }
    &__strings {
        &__string {
        }
    }
}
</style>
