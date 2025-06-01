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
      // Validate input if provided
      if (term && !isValidIPAddress(term) && !isValidDomain(term)) {
        throw new Error("Please enter a valid IP address or domain name");
      }

      // Simulate an API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create different mock responses based on the search term
      const mockResponses = {
        "google.com": {
          ip: "8.8.8.8",
          location: {
            region: "Mountain View",
            country: "United States",
            timezone: "-08:00",
            lat: 37.4223,
            lng: -122.0842,
          },
          isp: "Google LLC",
        },
        "github.com": {
          ip: "140.82.114.4",
          location: {
            region: "San Francisco",
            country: "United States",
            timezone: "-08:00",
            lat: 37.7749,
            lng: -122.4194,
          },
          isp: "GitHub Inc.",
        },
        default: {
          ip: term || "192.168.1.1",
          location: {
            region: "Lagos",
            country: "Nigeria",
            timezone: "+01:00",
            lat: 6.5244,
            lng: 3.3792,
          },
          isp: "Mock ISP Ltd.",
        },
      };

      // Simulate error for specific inputs
      if (term === "invalid" || term === "error") {
        throw new Error("Invalid IP address or domain name");
      }

      // Select mock data based on search term
      const mockData =
        mockResponses[term as keyof typeof mockResponses] ||
        mockResponses.default;

      if (!mockData.ip || !mockData.location) {
        throw new Error("Invalid response");
      }

      ipData.value = [
        {
          id: 1,
          label: "IP Address",
          value: mockData.ip,
        },
        {
          id: 2,
          label: "Location",
          value: `${mockData.location.region}, ${mockData.location.country}`,
        },
        {
          id: 3,
          label: "Time Zone",
          value: `UTC${mockData.location.timezone || "N/A"}`,
        },
        {
          id: 4,
          label: "ISP",
          value: mockData.isp || "Unknown",
        },
      ];

      if (mockData.location.lat && mockData.location.lng) {
        mapCoordinates.value = {
          lat: mockData.location.lat,
          lng: mockData.location.lng,
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

  return {
    ipData,
    mapCoordinates,
    loading,
    error,
    fetchIPDetails,
  };
}
