<script>
export default {
    props: {
        default: String,
        exampleString: String,
        exampleBoolean: Boolean,
        exampleInteger: Number,
        exampleNumber: Number,
        exampleSubBlock: Object,
    },
}
</script>
<template>
    <div class="simple-types">
        <div class="simple-types__default" v-if="default">
            {{default}}
        </div>
        <div class="simple-types__example-string" v-if="exampleString">
            {{ exampleString }}
        </div>
        <div class="simple-types__example-boolean" v-if="exampleBoolean">
            {{ exampleBoolean }}
        </div>
        <div class="simple-types__example-integer" v-if="exampleInteger">
            {{ exampleInteger }}
        </div>
        <div class="simple-types__example-number" v-if="exampleNumber">
            {{ exampleNumber }}
        </div>
        <par-example
            v-if="exampleSubBlock"
            v-bind="exampleSubBlock"
        ></par-example>
    </div>
</template>
<style lang="scss">
.simple-types {
    $this: ".simple-types";

    &__default {
    }
    &__example-string {
    }
    &__example-boolean {
    }
    &__example-integer {
    }
    &__example-number {
    }
}
</style>
