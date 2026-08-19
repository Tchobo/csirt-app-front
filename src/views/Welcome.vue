<template>
    <div class="relative bg-site-bg h-svh w-full flex flex-col justify-start ">
<Header />
<div class="w-full md:w-[30rem] absolute top-0 right-0 bg-white z-20  menubarPanel ">
<v-card class="bg-transparent font-mono font-normal border-none shadow-none menubarPanel mt-[14px]">
    
  <v-tabs
      v-model="tab"
      align-tabs="center"
      color="rgba(123, 90, 36, 1)"
    >
      <v-tab :value="1" class="capitalize">
        <span class="capitalize font-mono text-[12px] font-medium leading-[14px]">Location</span>
      </v-tab>
      <v-tab :value="2" class="capitalize">
        <span class="capitalize font-mono text-[12px] font-medium leading-[14px]">About</span>
      </v-tab>
      <v-tab :value="3" class="capitalize">
        <span class="capitalize font-mono text-[12px] font-medium leading-[14px]">Luanguage</span>
      </v-tab>
      <v-tab :value="4" class="capitalize">
        <span class="capitalize font-mono text-[12px] font-medium leading-[14px]">
          {{ isLogged ? 'Logout' : 'Login' }}
        </span>
      </v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item :value="1">
        <v-container  class="flex w-full justify-between items-center">
          <div class="font-mono">
            <h3 class=" text[19px] font-bold leading-5 task-welcom-black text-start">CSIRTs in Africa</h3>
            <p class="text-[12px] mt-2 font-normal leading-3 text-update-color">Updated on 19/8/2026 14:19:29</p>
          </div>
          <a href="#" class="font-mono text-[13px] leading-5  rounded-[4px] btn-search px-[6px] py-[8px] text-white" @click="onSearch">Search</a>
        </v-container>
        <v-container >

        <v-row v-if="clickedSearch==true">
            <SearchForm @search="handleSearch" />
        </v-row>
      </v-container>
      <div>
 <!-- Check if filteredCsirts are not ready, show skeleton loader -->
 <v-skeleton-loader
      v-if="!filteredCsirts || filteredCsirts.length === 0"
      type="list-item-avatar"
      class="mb-3"
    ></v-skeleton-loader>

        <v-expansion-panels
    v-model="expandedPanels"
    :disabled="disabled"
    
    v-else
    
    variant="accordion"
    class="overflow-y-scroll h-[580px]"
  >
    <v-expansion-panel
      v-for="csirt in filteredCsirts"
      :key="csirt.id"
      :value="csirt.id"
      :id="`csirt-panel-${csirt.id}`"
    >

      <v-expansion-panel-title>
        <div class="flex flex-col">
          <div class="flex justify-between w-full items-center">
            <div class="flex items-center">
              <img class="w-[32px] h-[32px] object-cover" src="../assets/images/security_lock.svg" alt="security">
              <div>
                <h4 class="font-mono text-[14px] font-semibold leading-4 text-csirt-name-color">{{ csirt.name }}</h4>
                <p class="font-mono text-[10px] leading-3 text-csirt-name-color">{{ csirt.country }}</p>
              </div>
            </div>

            <a :href="csirt.website"  class="flex items-center z-20" target="_blank">
              <img src="../assets/images/launch_arrow.svg" alt="arrow"> 
              <span class="font-mono text-[10px] ml-1 font-normal leading-8 text-csirt-site">Website</span>
            </a>
          </div>
          <!-- Description + image panel are locked behind auth. Guests see name,
               country, and website only — a teaser that pushes them to the Login tab. -->
          <p v-if="isLogged" class="font-roboto font-light text-[16px] leading-5 text-task-welcom-black mt-3 ml-1">
            {{ csirt.description }}
          </p>
          <p v-else class="font-mono text-[11px] italic text-gray-400 mt-3 ml-1">
            Log in to see the full description.
          </p>
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text v-if="isLogged">
        <img :src="csirt.image" alt="img" class="w-full h-[230px] object-cover rounded-[6px]">
      </v-expansion-panel-text>
  
    </v-expansion-panel>
  </v-expansion-panels>
  </div>
      </v-window-item>

      <v-window-item :value="2">
        <section class="bg-gray-100 py-12 overflow-y-scroll h-[650px]">
  <div class="container mx-auto px-4">
    <div class="text-center">
      <h2 class="text-2xl font-semibold text-gray-800">À propos des CERT</h2>
      <p class="mt-4 text-md text-gray-600">
        Les équipes de réponse aux incidents informatiques (CERT) sont des unités d'experts dédiées à la protection contre les cyberattaques. Leur mission est de prévenir, détecter et atténuer les conséquences des attaques pour les individus et les institutions.
      </p>
    </div>

    <div class="mt-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
      <div class="bg-white p-6 rounded-md shadow-md">
        <h3 class="text-lg font-medium text-gray-700">Protection du réseau</h3>
        <p class="mt-2 text-gray-600">
          Les CERT identifient les logiciels malveillants et empêchent leur propagation dans les réseaux, garantissant la sécurité informatique.
        </p>
      </div>

      <div class="bg-white p-6 rounded-md shadow-md">
        <h3 class="text-lg font-medium text-gray-700">Assistance aux victimes</h3>
        <p class="mt-2 text-gray-600">
          Les CERT offrent un soutien rapide et efficace aux individus et institutions touchés par des cyberattaques.
        </p>
      </div>

      <div class="bg-white p-6 rounded-md shadow-md">
        <h3 class="text-lg font-medium text-gray-700">Partenariat public-privé</h3>
        <p class="mt-2 text-gray-600">
          Travaillant au sein d'entreprises privées ou d'institutions publiques, les CERT collaborent souvent avec des agences gouvernementales.
        </p>
      </div>
    </div>

    <div class="mt-10 text-center">
      <p class="text-md text-gray-600">
        Au niveau national, les CERT peuvent être dotés du statut d'agences gouvernementales, offrant leur assistance à un large éventail d'entités.
      </p>
    </div>
  </div>
</section>

      </v-window-item>

      <v-window-item :value="3">
        <v-container fluid>
          <v-row>
            <div class="flex items-center space-x-4">
  <label class="flex items-center space-x-2">
    <input type="radio" name="language" value="en" checked class="text-blue-600 form-radio">
    <span class="text-gray-700">English</span>
  </label>
  <label class="flex items-center space-x-2">
    <input type="radio" name="language" value="fr" class="text-blue-600 form-radio" disabled>
    <span class="text-gray-700">Français</span>
  </label>
</div>

          </v-row>
        </v-container>
      </v-window-item>

      <!-- Tab 4 — auth panel. Renders differently depending on session state:
           guests see an inline login form; logged-in users see a small
           "You're signed in" card with a Logout button. Keeping both in the
           same window slot lets the tab label ('Login' / 'Logout') toggle
           without any routing gymnastics. -->
      <v-window-item :value="4">
        <v-container class="pt-6">
          <div v-if="!isLogged" class="flex flex-col gap-4">
            <h3 class="font-mono font-bold text-[16px] leading-5 task-welcom-black text-start">
              Log in to unlock CSIRT details
            </h3>
            <p v-if="authError" class="font-mono text-red-600 text-[12px]">{{ authError }}</p>

            <div class="flex flex-col">
              <label for="loginEmail" class="font-mono text-[12px] font-medium mb-1">Email</label>
              <input
                id="loginEmail"
                v-model="loginData.email"
                type="email"
                autocomplete="email"
                placeholder="you@company.com"
                class="font-mono border rounded-md h-[38px] px-3 text-[13px] focus:outline-none focus:border-yellow-800"
              />
            </div>

            <div class="flex flex-col">
              <label for="loginPassword" class="font-mono text-[12px] font-medium mb-1">Password</label>
              <input
                id="loginPassword"
                v-model="loginData.password"
                type="password"
                autocomplete="current-password"
                placeholder="••••••••"
                class="font-mono border rounded-md h-[38px] px-3 text-[13px] focus:outline-none focus:border-yellow-800"
                @keydown.enter="onInlineLogin"
              />
            </div>

            <v-btn :loading="isAuthLoading" class="btnLogout text-white rounded-full mt-2" @click="onInlineLogin">
              <span v-if="!isAuthLoading" class="capitalize font-mono text-[13px]">Log in</span>
            </v-btn>
          </div>

          <div v-else class="flex flex-col gap-4 items-start">
            <h3 class="font-mono font-bold text-[16px] leading-5 task-welcom-black">You're signed in</h3>
            <p class="font-mono text-[12px] text-gray-600">Full CSIRT details are unlocked in the Location tab.</p>
            <button
              @click="onLogoutOut"
              class="btnLogout text-white font-medium py-2 px-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
              Logout
            </button>
          </div>
        </v-container>
      </v-window-item>

    </v-window>

  </v-card>
  
</div>
<!--     Display map -->
<div id="map" class="w-[90%] z-10 h-screen map-container"></div>
    </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import Hero from '../components/Hero.vue';
import SearchForm from '../components/SearchForm.vue';
import leaflet from "leaflet"
import store from "../store";
import { onMounted, ref, onBeforeMount, computed, watch, nextTick } from "vue"

import customIconUrl from '../assets/images/security_lock.svg';
import { useRoute, useRouter } from 'vue-router'
// Variable section
const tab = ref(1); // Default to the first tab
const map = ref(null)
const router = useRouter();
const disabled = ref(false);
const clickedSearch = ref(false)
const searchFilter = ref("")
const selectedCsirt = ref(null);
const markersLayer = ref(null);
// Initialize layer group
// Use a reactive array to manage expanded panels
const expandedPanels = ref([]);

// Inline login state (used by the Login/Logout tab). Kept local — the form
// only lives in this Welcome view so no reason to push it to a component.
const loginData = ref({ email: "", password: "" });
const isAuthLoading = ref(false);
const authError = ref("");

// Auth state derived from the Vuex store. The store is hydrated from
// localStorage on mount (see onBeforeMount below) so a refresh keeps the
// user signed in without a round-trip to the API.
const isLogged = computed(() => Boolean(store.state.userToken));


//Make search input visible
const onSearch=()=>{
    clickedSearch.value= !clickedSearch.value
}

// Hydrate the store from localStorage so the tab label and gated content
// reflect the real auth state as soon as the component mounts.
onBeforeMount(() => {
  const token = localStorage.getItem("token");
  if (token) {
    store.commit("setLoggedUserToken", token);
  }
});

// Get the search component input
const handleSearch = (search)=>{
searchFilter.value = search
}



onMounted(async ()=>{
     await store.dispatch('getCsirtList') 
    map.value = leaflet.map('map').setView([0, 20], 3.49);
    // Mapbox access token is read from the env at build time. Even though
    // pk.* tokens are designed to live in the frontend, keeping it out of the
    // source (and pinning it to a domain in the Mapbox dashboard) avoids
    // leaking it via git history / GitHub push protection.
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
    leaflet.tileLayer(
          `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`,
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken: mapboxToken,
          }
        )
        .addTo(map.value);
  // Initial map markers update
    // Add markers layer to the map
    markersLayer.value = leaflet.layerGroup().addTo(map.value);
  updateMapMarkers();

})

// custum  icon for marker

const customIcon = leaflet.icon({
  iconUrl: customIconUrl, // URL to your custom icon image
  iconSize: [40, 40], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
});
// Computed property for filtered list
const filteredCsirts = computed(() => {
  const filterText = searchFilter.value.toLowerCase();
  return store.state.csirtList.filter(csirt => {
    return (
      csirt.name.toLowerCase().includes(filterText) ||
      csirt.country.toLowerCase().includes(filterText) ||
      csirt.website.toLowerCase().includes(filterText) ||
      csirt.description.toLowerCase().includes(filterText)
    );
  });
});

// Method to update map markers based on filtered list
const updateMapMarkers = () => {
  if (!map.value) return; // Ensure map is initialized

  // Clear existing markers
  if (markersLayer.value) {
    markersLayer.value.clearLayers();
  }

  // Add new markers based on filtered list
  filteredCsirts.value.forEach(csirt => {
    if (csirt.location && csirt.location.latitude && csirt.location.longitude) {
      // Note: no `.openPopup()` here — opening a popup for every marker inside
      // the loop means only the LAST one stays visible (Leaflet closes previous
      // popups when a new one opens). Popup opens on user click via bindPopup.
      // Guests get a name-only popup — description is part of the gated
      // content that requires login.
      const popupHtml = isLogged.value
        ? `<b>${csirt.name}</b><br>${csirt.description}`
        : `<b>${csirt.name}</b>`;
      const marker =  leaflet.marker([csirt.location.latitude, csirt.location.longitude] , { icon: customIcon })
        .addTo(markersLayer.value)
        .bindPopup(popupHtml);


        // Click event for each marker — always OPEN the panel (never toggle)
        // so the description reliably shows, then scroll it into view inside
        // the CSIRT list container even if the panel sits far down the list.
marker.on('click', () => {
  if (Array.isArray(expandedPanels.value) && !expandedPanels.value.includes(csirt.id)) {
    expandedPanels.value.push(csirt.id);
  }

  // Two nextTicks: 1st lets Vue commit the expandedPanels change, 2nd lets
  // Vuetify's v-expansion-panel finish its expansion transition so the panel
  // has its final height before we scroll — otherwise scrollIntoView targets
  // the collapsed height and lands slightly off.
  nextTick(() => {
    nextTick(() => {
      const el = document.getElementById(`csirt-panel-${csirt.id}`);
      if (el) {
        // block: "nearest" avoids scrolling if the panel is already visible,
        // and only scrolls the closest scrollable ancestor (the list column).
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
});

    }
  });
};


// Watch the filtered list — refresh markers whenever the source data (csirtList
// fetched from the API) or the current search filter changes. Deep watch
// because we care about item shape changes, not just array identity.
watch(filteredCsirts, () => {
  updateMapMarkers();
}, { deep: true });


// Inline login — used by the Login tab. Reuses the loginUser Vuex action
// (same one the standalone Login.vue page uses), so this is just a thinner
// entry point that keeps the user on the map.
const onInlineLogin = async () => {
  authError.value = "";
  if (!loginData.value.email || !loginData.value.password) {
    authError.value = "Email and password are required.";
    return;
  }
  isAuthLoading.value = true;
  try {
    const ok = await store.dispatch("loginUser", loginData.value);
    if (ok) {
      loginData.value = { email: "", password: "" };
      // Refetch the CSIRT list now that we have a token — the anonymous fetch
      // on mount may have returned less data (or nothing) depending on the
      // backend's read policy for guests. Await so markers are drawn on the
      // fresh, authenticated dataset.
      await store.dispatch("getCsirtList");
      // Redraw markers so popups switch to the richer variant (name + description)
      // and unlocked panels render descriptions.
      updateMapMarkers();
      tab.value = 1; // land back on the Location tab so the user sees the unlocked list
    } else {
      authError.value = "Invalid credentials.";
    }
  } catch (err) {
    console.error("Inline login failed:", err);
    authError.value = "Something went wrong. Try again.";
  } finally {
    isAuthLoading.value = false;
  }
};

// Logout stays on the Welcome page — no redirect. Clears the token so the
// tab label flips back to "Login" and the gated content re-hides.
const onLogoutOut = () => {
  localStorage.removeItem("token");
  store.commit("setLoggedUserToken", "");
  // Redraw markers so popups drop the description again for guest mode.
  updateMapMarkers();
  tab.value = 1;
};
</script>

<style  scoped>
.menubarPanel{
    border: none;
    border-color: white;
    outline: none;
    box-shadow: none;
}

.v-tab-panel {
  padding: 16px;
}
.v-tabs {
  border-bottom: 1px solid rgba(123, 90, 36, 0.2);
}


.btn-search{
    border: none;
    background: rgba(0, 0, 0, 1)!important;
}

.active-panel {
  background: rgba(239, 233, 223, 1)!important;

}


.v-expansion-panel--active {
  background-color: rgba(239, 233, 223, 1) !important;
}


.btnLogout{
  background: #825B32;
}
</style>