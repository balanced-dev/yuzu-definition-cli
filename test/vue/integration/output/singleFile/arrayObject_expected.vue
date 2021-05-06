<script>
export default {
    props: {
        singlePropertyObjects: Array,
        multiplePropertyObjects: Array,
    },
}
</script>
<template>
    <div class="array-object">
        <div
            class="array-object__single-property-objects"
            v-if="singlePropertyObjects && singlePropertyObjects.length"
        >
            <div
                class="array-object__single-property-objects__single-property-object"
                v-for="(singlePropertyObject, index) in singlePropertyObjects"
                :key="index"
            >
                <div
                    class="array-object__single-property-objects__single-property-object__example-property"
                    v-if="singlePropertyObject.exampleProperty"
                >
                    {{ singlePropertyObject.exampleProperty }}
                </div>
            </div>
        </div>
        <div
            class="array-object__multiple-property-objects"
            v-if="multiplePropertyObjects && multiplePropertyObjects.length"
        >
            <div
                class="array-object__multiple-property-objects__multiple-property-object"
                v-for="(
                    multiplePropertyObject, index
                ) in multiplePropertyObjects"
                :key="index"
            >
                <div
                    class="array-object__multiple-property-objects__multiple-property-object__example-string"
                    v-if="multiplePropertyObject.exampleString"
                >
                    {{ multiplePropertyObject.exampleString }}
                </div>
                <div
                    class="array-object__multiple-property-objects__multiple-property-object__example-integer"
                    v-if="multiplePropertyObject.exampleInteger"
                >
                    {{ multiplePropertyObject.exampleInteger }}
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.array-object {
    $this: ".array-object";

    &__single-property-objects {
        &__single-property-object {
            &__example-property {
            }
        }
    }
    &__multiple-property-objects {
        &__multiple-property-object {
            &__example-string {
            }
            &__example-integer {
            }
        }
    }
}
</style>
