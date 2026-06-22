/**
 * MapLibre GL -> Leaflet-compatibility adapter.
 *
 * The site migrated its maps from Leaflet to MapLibre GL JS (WebGL) for a more
 * advanced engine (smooth zoom/rotate/pitch, vector-ready, navigation controls).
 * To preserve existing map behavior EXACTLY, this script exposes a global `L`
 * that implements only the small subset of the Leaflet API our pages use,
 * backed by MapLibre GL. Page code keeps calling L.map / L.marker / L.tileLayer
 * / L.divIcon / L.polyline unchanged.
 *
 * Load order: include AFTER maplibre-gl.js and BEFORE the page's map code.
 *
 * Coordinate note: Leaflet uses [lat, lng]; MapLibre uses [lng, lat]. The
 * adapter converts at the boundary so all call sites keep using [lat, lng].
 * Tiles remain OpenStreetMap (rendered via MapLibre's WebGL canvas).
 */
(function (global) {
  var maplibregl = global.maplibregl;
  if (!maplibregl) {
    console.error('maplibre-leaflet-adapter: maplibregl global not found. Load maplibre-gl.js first.');
    return;
  }

  var DEFAULT_CENTER = [-117.1611, 32.7157]; // [lng, lat]
  function osmRasterStyle() {
    return {
      version: 8,
      sources: {
        osm: {
          type: 'raster',
          tiles: [
            'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
          ],
          tileSize: 256,
          attribution: '&copy; OpenStreetMap contributors',
        },
      },
      layers: [{ id: 'osm-tiles', type: 'raster', source: 'osm' }],
    };
  }

  function toLngLat(latlng) { return [latlng[1], latlng[0]]; }

  // Each L.map() call gets its own MapInstance (pages may have several maps).
  function MapInstance(containerId) {
    var self = this;
    this._styleReady = false;
    this._readyQueue = [];
    this._layers = []; // markers + polylines (for eachLayer/removeLayer)
    this._polySeq = 0;

    this._gl = new maplibregl.Map({
      container: containerId,
      style: osmRasterStyle(),
      center: DEFAULT_CENTER,
      zoom: 12,
    });
    this._gl.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
    this._gl.on('load', function () {
      self._styleReady = true;
      var q = self._readyQueue.splice(0);
      q.forEach(function (fn) { fn(); });
    });
  }
  MapInstance.prototype._whenReady = function (fn) {
    if (this._styleReady || (this._gl && this._gl.isStyleLoaded())) fn();
    else this._readyQueue.push(fn);
  };
  MapInstance.prototype.setView = function (center, zoom, opts) {
    if (this._gl) {
      var c = toLngLat(center);
      if (opts && opts.animate) this._gl.easeTo({ center: c, zoom: zoom, duration: 700 });
      else this._gl.jumpTo({ center: c, zoom: zoom });
    }
    return this;
  };
  MapInstance.prototype.fitBounds = function (bounds, opts) {
    var self = this;
    var pad = (opts && opts.padding)
      ? (Array.isArray(opts.padding) ? opts.padding[0] : opts.padding) : 0;
    this._whenReady(function () { if (self._gl && bounds) self._gl.fitBounds(bounds, { padding: pad, duration: 700 }); });
    return this;
  };
  MapInstance.prototype.removeLayer = function (layer) {
    if (layer && typeof layer.remove === 'function') layer.remove();
    return this;
  };
  MapInstance.prototype.eachLayer = function (cb) {
    this._layers.slice().forEach(cb);
    return this;
  };
  MapInstance.prototype.on = function (type, cb) {
    var self = this;
    if (!this._gl) return this;
    if (type === 'click') {
      this._gl.on('click', function (e) {
        cb({
          latlng: { lat: e.lngLat.lat, lng: e.lngLat.lng },
          lngLat: e.lngLat,
          originalEvent: e.originalEvent,
        });
      });
    } else {
      this._gl.on(type, cb);
    }
    return this;
  };
  MapInstance.prototype.invalidateSize = function () { if (this._gl) this._gl.resize(); return this; };
  MapInstance.prototype.getZoom = function () { return this._gl ? this._gl.getZoom() : undefined; };
  MapInstance.prototype.remove = function () { if (this._gl) this._gl.remove(); return this; };

  function Marker(latlng, opts) {
    this._map = null;
    this._latlng = latlng; // [lat, lng]
    this._popup = null;
    var iconObj = (opts && opts.icon) ? opts.icon : null;
    this.options = { icon: iconObj || { options: {} } }; // preserves layer.options.icon.options.className
    var markerOpts = {};
    if (iconObj && iconObj.options) {
      var io = iconObj.options;
      var el = document.createElement('div');
      if (io.className) el.className = io.className;
      if (io.html) el.innerHTML = io.html;
      if (io.iconSize) { el.style.width = io.iconSize[0] + 'px'; el.style.height = io.iconSize[1] + 'px'; }
      markerOpts.element = el;
      // Replicate Leaflet iconAnchor: place the element's (ax,ay) on the point.
      if (io.iconAnchor) { markerOpts.anchor = 'top-left'; markerOpts.offset = [-io.iconAnchor[0], -io.iconAnchor[1]]; }
      this._popupAnchor = io.popupAnchor || [0, 0];
    } else {
      // No icon supplied -> use MapLibre's default marker pin (like Leaflet's default).
      this._popupAnchor = null;
    }
    this._marker = new maplibregl.Marker(markerOpts).setLngLat(toLngLat(latlng));
  }
  Marker.prototype.addTo = function (mapInstance) {
    this._map = mapInstance;
    if (mapInstance && mapInstance._gl) this._marker.addTo(mapInstance._gl);
    if (mapInstance) mapInstance._layers.push(this);
    return this;
  };
  Marker.prototype.bindPopup = function (html) {
    var popupOpts = { closeButton: true };
    if (this._popupAnchor) popupOpts.offset = this._popupAnchor;
    this._popup = new maplibregl.Popup(popupOpts).setHTML(html);
    this._marker.setPopup(this._popup);
    return this;
  };
  Marker.prototype.openPopup = function () {
    if (this._popup && !this._popup.isOpen()) this._marker.togglePopup();
    return this;
  };
  Marker.prototype.setLatLng = function (latlng) {
    this._latlng = latlng;
    this._marker.setLngLat(toLngLat(latlng));
    return this;
  };
  Marker.prototype.getLatLng = function () { return { lat: this._latlng[0], lng: this._latlng[1] }; };
  Marker.prototype.remove = function () {
    this._marker.remove();
    if (this._map) { var i = this._map._layers.indexOf(this); if (i >= 0) this._map._layers.splice(i, 1); }
    return this;
  };

  function Polyline(latlngs, opts) {
    this._map = null;
    this._latlngs = latlngs; // array of [lat, lng]
    this.options = Object.assign({}, opts || {});
    this._id = null;
  }
  Polyline.prototype.addTo = function (mapInstance) {
    var self = this;
    this._map = mapInstance;
    this._id = 'sd-polyline-' + (mapInstance._polySeq++);
    mapInstance._whenReady(function () {
      var gl = mapInstance._gl;
      if (!gl) return;
      var geojson = { type: 'Feature', geometry: { type: 'LineString', coordinates: self._latlngs.map(toLngLat) } };
      if (gl.getSource(self._id)) {
        gl.getSource(self._id).setData(geojson);
      } else {
        gl.addSource(self._id, { type: 'geojson', data: geojson });
        gl.addLayer({
          id: self._id, type: 'line', source: self._id,
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: {
            'line-color': self.options.color || '#0066cc',
            'line-width': self.options.weight || 4,
            'line-opacity': self.options.opacity != null ? self.options.opacity : 1,
          },
        });
      }
    });
    mapInstance._layers.push(this);
    return this;
  };
  Polyline.prototype.getLatLngs = function () { return this._latlngs.map(function (ll) { return { lat: ll[0], lng: ll[1] }; }); };
  Polyline.prototype.getBounds = function () {
    var b = new maplibregl.LngLatBounds();
    this._latlngs.forEach(function (ll) { b.extend(toLngLat(ll)); });
    return b;
  };
  Polyline.prototype.remove = function () {
    var self = this;
    if (this._map) {
      this._map._whenReady(function () {
        var gl = self._map._gl;
        if (gl && gl.getLayer(self._id)) gl.removeLayer(self._id);
        if (gl && gl.getSource(self._id)) gl.removeSource(self._id);
      });
      var i = this._map._layers.indexOf(this); if (i >= 0) this._map._layers.splice(i, 1);
    }
    return this;
  };

  global.L = {
    map: function (containerId) { return new MapInstance(containerId); },
    tileLayer: function () { return { addTo: function () { return this; } }; }, // tiles baked into the style
    divIcon: function (opts) { return { options: opts || {} }; },
    marker: function (latlng, opts) { return new Marker(latlng, opts); },
    polyline: function (latlngs, opts) { return new Polyline(latlngs, opts); },
  };
})(window);
