<template>
  <Button @click="handleClick">
    <!-- @slot Use this slot to place the button content -->
    <slot></slot>
  </Button>
</template>

<script>
import { Button } from "flowbite-vue";
export default {
  name: "app-button",
  props: {
    /**
     * Sets the button font color
     */
    color: {
      type: String,
      default: "black",
    },
    /** Sets background color of the button
     * @since 1.2.0
     */
    background: {
      type: String,
      default: "white",
    },
    /** @deprecated Use color instead */
    oldColor: String,
  },
  components: { Button },
  methods: {
    handleClick(e) {
      /** Triggered when button is clicked
       * @event click
       * @type {Event}
       */
      this.$emit("click", e);

      /** Event for Alligator's example
       * @event gator
       * @type {Event}
       */
      this.$emit("gator", e);
    },
  },
};
</script>

<docs lang="md">
This button is amazing, use it responsibly.

## Examples

Orange button:

```jsx
<app-button color="orange">Push Me</app-button>
```

Ugly button with pink font and blue background:

```jsx
<app-button color="pink" background="blue">
  Ugly button
</app-button>
```

Button containing custom tags:

```jsx
<app-button>
  Text with <b>bold</b>
</app-button>
```
</docs>
