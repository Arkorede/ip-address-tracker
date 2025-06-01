import { isValidIPAddress, isValidDomain } from "../utils/ip";
import { ref } from "vue";

export type IPDetail = {
  id: number;
  label: string;
  value: string;
};

export type MapCoordinates = {
  lat: number;
  lng: number;
};

const apiKey = import.meta.env.VITE_IPIFY_PUBLIC_KEY;
const baseUrl = "https://geo.ipify.org/api/v2/country,city";

export function useIPDetails() {
  const ipData = ref<IPDetail[] | null>(null);
  const mapCoordinates = ref<MapCoordinates>({
    lat: 0,
    lng: 0,
  });
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const buildAPIUrl = (term: string = "") => {
    let url = `${baseUrl}?apiKey=${apiKey}`;

    if (term.trim()) {
      const trimmedTerm = term.trim();

      if (isValidIPAddress(trimmedTerm)) {
        url += `&ipAddress=${encodeURIComponent(trimmedTerm)}`;
      } else if (isValidDomain(trimmedTerm)) {
        url += `&domain=${encodeURIComponent(trimmedTerm)}`;
      } else {
        throw new Error("Please enter a valid IP address or domain name");
      }
    }

    return url;
  };

  // const fetchIPDetails = async (term?: string) => {
  //   loading.value = true;
  //   error.value = null;

  //   try {
  //     const url = buildAPIUrl(term);
  //     const response = await fetch(url);

  //     if (!response.ok) {
  //       if (response.status === 422) {
  //         throw new Error("Invalid IP address or domain name");
  //       } else if (response.status === 403) {
  //         throw new Error("API key is invalid or quota exceeded");
  //       } else {
  //         throw new Error(`Failed to fetch IP data: ${response.status}`);
  //       }
  //     }

  //     const data = await response.json();

  //     if (!data.ip || !data.location) {
  //       throw new Error("Invalid response");
  //     }

  //     ipData.value = [
  //       {
  //         id: 1,
  //         label: "IP Address",
  //         value: data.ip,
  //       },
  //       {
  //         id: 2,
  //         label: "Location",
  //         value: `${data.location.region}, ${data.location.country}`,
  //       },
  //       {
  //         id: 3,
  //         label: "Time Zone",
  //         value: `UTC${data.location.timezone || "N/A"}`,
  //       },
  //       {
  //         id: 4,
  //         label: "ISP",
  //         value: data.isp || "Unknown",
  //       },
  //     ];

  //     if (data.location.lat && data.location.lng) {
  //       mapCoordinates.value = {
  //         lat: data.location.lat,
  //         lng: data.location.lng,
  //       };
  //     } else {
  //       throw new Error("Location coordinates are not available");
  //     }
  //   } catch (err: any) {
  //     error.value = err.message;
  //     console.error("Error fetching IP details:", err);

  //     ipData.value = null;
  //     mapCoordinates.value = { lat: 0, lng: 0 };
  //   } finally {
  //     loading.value = false;
  //   }
  // };

  const fetchIPDetails = async (term?: string) => {
    loading.value = true;
    error.value = null;

    try {
      // Simulate an API delay
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay

      // Mock response data
      const mockData = {
        ip: "192.168.1.1",
        location: {
          region: "Lagos",
          country: "Nigeria",
          timezone: "+01:00",
          lat: 6.5244,
          lng: 3.3792,
        },
        isp: "Mock ISP Ltd.",
      };

      // Optionally, you can simulate errors based on input
      if (term === "invalid") {
        throw new Error("Invalid IP address or domain name");
      }

      const data = mockData; // Replace real fetch with mock data

      if (!data.ip || !data.location) {
        throw new Error("Invalid response");
      }

      ipData.value = [
        {
          id: 1,
          label: "IP Address",
          value: data.ip,
        },
        {
          id: 2,
          label: "Location",
          value: `${data.location.region}, ${data.location.country}`,
        },
        {
          id: 3,
          label: "Time Zone",
          value: `UTC${data.location.timezone || "N/A"}`,
        },
        {
          id: 4,
          label: "ISP",
          value: data.isp || "Unknown",
        },
      ];

      if (data.location.lat && data.location.lng) {
        mapCoordinates.value = {
          lat: data.location.lat,
          lng: data.location.lng,
        };
      } else {
        throw new Error("Location coordinates are not available");
      }
    } catch (err: any) {
      error.value = err.message;
      console.error("Error fetching IP details:", err);

      ipData.value = null;
      mapCoordinates.value = { lat: 0, lng: 0 };
    } finally {
      loading.value = false;
    }
  };

  const reset = () => {
    ipData.value = null;
    mapCoordinates.value = { lat: 0, lng: 0 };
    loading.value = false;
    error.value = null;
  };

  return {
    ipData,
    mapCoordinates,
    loading,
    error,
    fetchIPDetails,
    reset,
    buildAPIUrl,
  };
}
