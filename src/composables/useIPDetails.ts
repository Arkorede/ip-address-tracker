import { isValidIPAddress, isValidDomain } from "../utils/ip";
import { ref } from "vue";
import { useToast } from "vue-toastification";

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
        url += `&domains=${encodeURIComponent(trimmedTerm)}`;
      } else {
        toast.error("Please enter a valid IP address or domain name");
      }
    }

    return url;
  };

  const toast = useToast();

  const fetchIPDetails = async (term?: string) => {
    loading.value = true;
    error.value = null;

    try {
      const url = buildAPIUrl(term);
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 422) {
          toast.error("Invalid IP address or domain name");
        } else if (response.status === 403) {
          toast.error("API key is invalid or quota exceeded");
        } else {
          toast.error(`Failed to fetch IP data: ${response.status}`);
        }
      }

      const data = await response.json();

      if (!data.ip || !data.location) {
        toast.error("Invalid response");
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
        toast.error("Location coordinates are not available");
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

  // Mock implementation for testing purposes
  // const fetchIPDetails = async (term?: string) => {
  //   loading.value = true;
  //   error.value = null;

  //   try {
  //     if (term && !isValidIPAddress(term) && !isValidDomain(term)) {
  //       toast.error("Please enter a valid IP address or domain name");
  //     }

  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     const mockResponses = {
  //       "google.com": {
  //         ip: "8.8.8.8",
  //         location: {
  //           region: "Mountain View",
  //           country: "United States",
  //           timezone: "-08:00",
  //           lat: 37.4223,
  //           lng: -122.0842,
  //         },
  //         isp: "Google LLC",
  //       },
  //       "github.com": {
  //         ip: "140.82.114.4",
  //         location: {
  //           region: "San Francisco",
  //           country: "United States",
  //           timezone: "-08:00",
  //           lat: 37.7749,
  //           lng: -122.4194,
  //         },
  //         isp: "GitHub Inc.",
  //       },
  //       default: {
  //         ip: term || "192.168.1.1",
  //         location: {
  //           region: "Lagos",
  //           country: "Nigeria",
  //           timezone: "+01:00",
  //           lat: 6.5244,
  //           lng: 3.3792,
  //         },
  //         isp: "Mock ISP Ltd.",
  //       },
  //     };

  //     if (term === "invalid" || term === "error") {
  //       throw new Error("Invalid IP address or domain name");
  //     }

  //     const mockData =
  //       mockResponses[term as keyof typeof mockResponses] ||
  //       mockResponses.default;

  //     if (!mockData.ip || !mockData.location) {
  //       throw new Error("Invalid response");
  //     }

  //     ipData.value = [
  //       {
  //         id: 1,
  //         label: "IP Address",
  //         value: mockData.ip,
  //       },
  //       {
  //         id: 2,
  //         label: "Location",
  //         value: `${mockData.location.region}, ${mockData.location.country}`,
  //       },
  //       {
  //         id: 3,
  //         label: "Time Zone",
  //         value: `UTC${mockData.location.timezone || "N/A"}`,
  //       },
  //       {
  //         id: 4,
  //         label: "ISP",
  //         value: mockData.isp || "Unknown",
  //       },
  //     ];

  //     if (mockData.location.lat && mockData.location.lng) {
  //       mapCoordinates.value = {
  //         lat: mockData.location.lat,
  //         lng: mockData.location.lng,
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

  return {
    ipData,
    mapCoordinates,
    loading,
    fetchIPDetails,
  };
}
