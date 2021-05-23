<script>
export default {
    props: {},
}
</script>
<template>
    <div class="array-nested">
        <div
            class="array-nested__parent-array"
            v-if="parentArray && parentArray.length"
        >
            <div
                class="array-nested__parent-array__item"
                v-for="(item_1, index) in parentArray"
                :key="index"
            >
                <div
                    class="array-nested__parent-array__item__child-array"
                    v-if="item_1.childArray && item_1.childArray.length"
                >
                    <div
                        class="array-nested__parent-array__item__child-array__item"
                        v-for="(item_2, index) in item_1.childArray"
                        :key="index"
                    >
                        <div
                            class="array-nested__parent-array__item__child-array__item__example-string"
                            v-if="item_2.exampleString"
                        >
                            {{ item_2.exampleString }}
                        </div>
                        <div
                            class="array-nested__parent-array__item__child-array__item__example-integer"
                            v-if="item_2.exampleInteger"
                        >
                            {{ item_2.exampleInteger }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.array-nested {
    $this: ".array-nested";

    &__parent-array {
        &__item {
            &__child-array {
                &__item {
                    &__example-string {
                    }
                    &__example-integer {
                    }
                }
            }
        }
    }
}
</style>
