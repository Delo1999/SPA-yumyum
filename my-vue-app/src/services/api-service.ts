const apiUrl = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";
interface ApiResponse {
  key: string;
}

export async function getApiKey(): Promise<string> {
  try {
    const response = await fetch(`${apiUrl}/keys`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        // Lägg till andra headers om du har autentisering eller API-nycklar att skicka
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Unauthorized: Access key is missing or invalid");
      } else if (response.status === 404) {
        console.error("Not Found: Requested resource not found");
      } else {
        console.error("Something went wrong");
      }
      throw new Error("Failed to fetch API key");
    }

    const data: ApiResponse = await response.json();
    return data.key; // Returnera API-nyckeln från svaret
  } catch (error) {
    console.error("Error fetching API key:", error);
    throw new Error("Failed to fetch API key");
  }
}

async function fetchData(endpoint: string) {
  const apiKey = await getApiKey();

  return await fetch(
    `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/${endpoint}`,
    {
      method: "GET",
      headers: { "x-zocom": apiKey },
    }
  );
}

// interface TenantResponse {
//   data: string;
// }

// async function getTenantId(): Promise<string> {
//   const tenantData = {
//     name: "Dillis",
//   };
//   const apiKey = await getApiKey();

//   try {
//     const response = await fetch(`${apiUrl}/tenants`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-zocom": apiKey,
//       },
//       body: JSON.stringify(tenantData),
//     });

//     if (response.ok) {
//       const data: TenantResponse = await response.json();
//       console.log(data);
//       return data.data;
//     } else {
//       const errorData = await response.json();
//       throw new Error(`${errorData.error}: ${errorData.message}`);
//     }
//   } catch (error) {
//     console.error("Error registering tenant:", error);
//     throw error;
//   }
// }

// async function logTenantId() {
//   try {
//     const tenantId = await getTenantId();
//     console.log("Tenant ID:", tenantId);

//     // Om du vill logga tenantId igen senare, kan du anropa getTenantId() på nytt
//     const newTenantId = await getTenantId();
//     console.log("New Tenant ID:", newTenantId);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// logTenantId();

const myTenantId = "y71n";

fetchData(`${myTenantId}/orders`);

export { fetchData, myTenantId };
