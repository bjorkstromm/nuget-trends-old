import axios from "axios";

export async function nugetAutoComplete(packageId: string): Promise<any> {
  const response = await axios.get(
    `https://api-v2v3search-0.nuget.org/autocomplete?q=${packageId}&prerelease=true`
  );

  return response.data.data;
}
