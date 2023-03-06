<template>
  <div>
    <div v-if="invalidAddress">
      {{ invalidAddress }}
    </div>
    <div v-else>
      <div v-if="displayPlace">{{ displayPlace }}</div>
      <div v-if="date">{{ date }}</div>
      <div v-if="time || zone">{{ time }} {{ zone }}</div>
      <div>
        <the-card :class="{ loading: loading }">
          <iframe
            v-if="showMaps"
            :src="showMaps.src"
            :style="`width:${width}; height:${height}`"
          ></iframe>
        </the-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { TheCard } from "flowbite-vue";
import {
  defineComponent,
  ref,
  computed,
  watch,
  onMounted,
  nextTick,
  reactive,
} from "vue";
import OSM from "osm";
import moment from "moment-timezone";
import axios from "axios";

const Geocode = "https://api.${region}.500apps.com/maps/geocode?address=";
const PositionStack =
  "http://api.positionstack.com/v1/forward?access_key=e8e97a9f0f607a76dd63930a0ff37da2&query=";
export default defineComponent({
  name: "street-map",
  props: {
    /**
     * Address of the location which consists details like
     * street,city,zip code,country, and state
     */
    address: Object,
    /**
     * Position of the location which consists of geological location details like
     * longitude and latitude
     */
    position: Object,
    /**
     * Property to get precise location
     */
    precise: { type: Boolean, default: false },
    /**
     * height of the map to be displayed
     */
    height: {
      type: String,
      default: "250px",
    },
    /**
     * width of the map to be displayed
     */
    width: {
      type: String,
      default: "250px",
    },
  },
  components: {
    TheCard,
  },
  methods: {
    getData(url: string) {
      return axios.get(url);
    },
  },
  setup(props) {
    const invalidAddress = ref("");
    const coordinates = ref({});
    const loading = ref(true);
    const showMaps = reactive({ src: "" });
    const date = ref("");
    const time = ref("");
    const findZone = ref("");
    const zone = ref("");
    const isDateShow = ref(true);

    const displayPlace = computed(() => {
      return (
        props.address?.country ||
        props.address?.state ||
        props.address?.city ||
        props.address?.street
      );
    });

    const getPosition = async () => {
      /**
       * Triggers initially if position is given
       * @event mounted
       * @type {Event}
       */
      let input = "";
      for (const key in props.address) {
        input = `${input}${input && props.address[key] ? "," : ""}${
          props.address[key] ? props.address[key] : ""
        }`;
      }

      await getCoordinates(input, props.precise).then(async (result: any) => {
        console.log("result", result);
        coordinates.value = result;
        if (typeof coordinates.value == "string") {
          loading.value = false;
          invalidAddress.value = "Invalid address!";
        } else {
          await showMap(
            coordinates.value as { latitude: string; longitude: string }
          );
        }
      });
    };

    const getCoordinates = async (input: string, precise: boolean) => {
      let url: string;
      let position: { longitude: string; latitude: string };
      if (!precise) {
        console.log("not precise");
      } else {
        url = eval("`" + PositionStack + "`") + input;
        let response: any = await getData(url);
        console.log("response");
        position = getGeocodeAtStreetLevel(response);
        return position;
      }
    };

    const showMap = async (input: { latitude: string; longitude: string }) => {
      /** Event for Alligator's example
       * @event gator
       * @type {Event}
       */
      getTime(input);
      loading.value = false;
      nextTick().then(async () => {
        let map = OSM().position(input.latitude, input.longitude).radius(0.09);
        showMaps.src = await map.show().src;
        console.log("map", showMaps.src);
      });
    };

    const getTime = async (input: { latitude: string; longitude: string }) => {
      const { default: tzlookup } = await import("tz-lookup");
      findZone.value = tzlookup(input.latitude, input.longitude);
      zone.value = moment.tz(findZone.value).format("z");
      date.value = new Date().toLocaleString("en-US", {
        timeZone: findZone.value,
        dateStyle: "full",
      });
      time.value = new Date().toLocaleString("en-US", {
        timeZone: findZone.value,
        timeStyle: "short",
      });
      if (
        new Date().toLocaleString("en-US", { dateStyle: "full" }) == date.value
      ) {
        isDateShow.value = false;
      }
    };

    const getGeocodeAtStreetLevel = (response: any) => {
      let coordinates: any = {};
      coordinates["latitude"] = response.data[0].latitude;
      coordinates["longitude"] = response.data[0].longitude;
      return coordinates;
    };

    const getData = (url: string) => {
      return axios.get(url);
    };

    watch(() => props.address, getPosition);
    onMounted(async () => {
      if (props.address) {
        await getPosition();
      }
      if (props.position) {
        await showMap(
          props.position as { latitude: string; longitude: string }
        );
      }
    });

    return {
      invalidAddress,
      coordinates,
      loading,
      showMaps,
      date,
      time,
      findZone,
      zone,
      isDateShow,
      displayPlace,
    };
  },
});
</script>
<docs lang="md">
## Examples

```jsx
<street-map :position="{ latitude: 2.478961, longitude: 14.659453 }" :precise="true"></street-map>
```
</docs>
