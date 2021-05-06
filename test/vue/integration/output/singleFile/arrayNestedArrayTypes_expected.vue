<script>
export default {
    props: {
        parentNamedStringArray: Array,
        parentStringArray: Array,
        stringArray: String,
        parentNamedNumberArray: Array,
        parentNumberArray: Array,
        numberArray: String,
        parentNamedIntegerArray: Array,
        parentIntegerArray: Array,
        integerArray: String,
    },
}
</script>
<template>
    <div class="array-nested-array-types">
        <div
            class="array-nested-array-types__parent-named-string-array"
            v-if="parentNamedStringArray && parentNamedStringArray.length"
        >
            <div
                class="array-nested-array-types__parent-named-string-array__item"
                v-for="(item_1, index) in parentNamedStringArray"
                :key="index"
            >
                <div
                    class="array-nested-array-types__parent-named-string-array__item__child-string-array"
                    v-if="
                        item_1.childStringArray &&
                        item_1.childStringArray.length
                    "
                >
                    <div
                        class="array-nested-array-types__parent-named-string-array__item__child-string-array__item"
                        v-for="(item_2, index) in item_1.childStringArray"
                        :key="index"
                    >
                        {{ item_2 }}
                    </div>
                </div>
            </div>
        </div>
        <div
            class="array-nested-array-types__parent-string-array"
            v-if="parentStringArray && parentStringArray.length"
        >
            <div
                class="array-nested-array-types__parent-string-array__item"
                v-for="(item_1, index) in parentStringArray"
                :key="index"
            ></div>
        </div>
        <div class="array-nested-array-types__string-array" v-if="stringArray">
            {{ stringArray }}
        </div>
        <div
            class="array-nested-array-types__parent-named-number-array"
            v-if="parentNamedNumberArray && parentNamedNumberArray.length"
        >
            <div
                class="array-nested-array-types__parent-named-number-array__item"
                v-for="(item_1, index) in parentNamedNumberArray"
                :key="index"
            >
                <div
                    class="array-nested-array-types__parent-named-number-array__item__child-number-array"
                    v-if="
                        item_1.childNumberArray &&
                        item_1.childNumberArray.length
                    "
                >
                    <div
                        class="array-nested-array-types__parent-named-number-array__item__child-number-array__item"
                        v-for="(item_2, index) in item_1.childNumberArray"
                        :key="index"
                    >
                        {{ item_2 }}
                    </div>
                </div>
            </div>
        </div>
        <div
            class="array-nested-array-types__parent-number-array"
            v-if="parentNumberArray && parentNumberArray.length"
        >
            <div
                class="array-nested-array-types__parent-number-array__item"
                v-for="(item_1, index) in parentNumberArray"
                :key="index"
            ></div>
        </div>
        <div class="array-nested-array-types__number-array" v-if="numberArray">
            {{ numberArray }}
        </div>
        <div
            class="array-nested-array-types__parent-named-integer-array"
            v-if="parentNamedIntegerArray && parentNamedIntegerArray.length"
        >
            <div
                class="array-nested-array-types__parent-named-integer-array__item"
                v-for="(item_1, index) in parentNamedIntegerArray"
                :key="index"
            >
                <div
                    class="array-nested-array-types__parent-named-integer-array__item__child-string-array"
                    v-if="
                        item_1.childStringArray &&
                        item_1.childStringArray.length
                    "
                >
                    <div
                        class="array-nested-array-types__parent-named-integer-array__item__child-string-array__item"
                        v-for="(item_2, index) in item_1.childStringArray"
                        :key="index"
                    >
                        {{ item_2 }}
                    </div>
                </div>
            </div>
        </div>
        <div
            class="array-nested-array-types__parent-integer-array"
            v-if="parentIntegerArray && parentIntegerArray.length"
        >
            <div
                class="array-nested-array-types__parent-integer-array__item"
                v-for="(item_1, index) in parentIntegerArray"
                :key="index"
            ></div>
        </div>
        <div
            class="array-nested-array-types__integer-array"
            v-if="integerArray"
        >
            {{ integerArray }}
        </div>
    </div>
</template>
<style lang="scss">
.array-nested-array-types {
    $this: ".array-nested-array-types";

    &__parent-named-string-array {
        &__item {
            &__child-string-array {
                &__item {
                }
            }
        }
    }
    &__parent-string-array {
        &__item {
        }
    }
    &__string-array {
    }
    &__parent-named-number-array {
        &__item {
            &__child-number-array {
                &__item {
                }
            }
        }
    }
    &__parent-number-array {
        &__item {
        }
    }
    &__number-array {
    }
    &__parent-named-integer-array {
        &__item {
            &__child-string-array {
                &__item {
                }
            }
        }
    }
    &__parent-integer-array {
        &__item {
        }
    }
    &__integer-array {
    }
}
</style>
