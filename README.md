## A [vue2-leaflet](https://github.com/vue-leaflet/Vue2Leaflet) component which wraps standard components and makes them active by dynamic component loading outside of leaflet

Entirely untested beyond startup. Requires [arrive.js](https://github.com/uzairfarooq/arrive) to watch the DOM

### Example using Quasar's [QCard](https://quasar.dev/vue-components/card)
```
<l-map :zoom="3" :center="L.latLng(47.413220, -1.219482)">
  <l-tile-layer
    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    attribution="&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors">    
   </l-tile-layer>
  <l-marker
    :interactive="true"
    :lat-lng="L.latLng(47.413220, -1.219482)"
    ref="marker">
    <l-icon ref="icon">
        <l-icon-wrapper
          component="QCard"
        >
          <q-card-actions>
            <q-btn flat @click="$q.notify('Action ## 1 ##')">Action 1</q-btn>
            <q-btn flat @click="$q.notify('Action ## 2 ##')">Action 2</q-btn>
          </q-card-actions>
       </l-icon-wrapper>
    </l-icon>
  </l-marker>
</l-map>
```

Feel free to file any issues, but this thing is just a placeholder for a better way.